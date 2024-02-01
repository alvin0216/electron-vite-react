import { ipcMain } from "electron";
import fs from "fs-extra";
import { EMCEnum } from "../../../universal/enum";

const { execSync, spawnSync } = require("child_process");

const isWindows = process.platform === "win32";
const findstr = isWindows ? "findstr" : "grep";

enum ShellPwd {
  Root = "root",
  PackageJson = "packageJson",
}

export default function ipcReleaseHelper() {
  ipcMain.handle(EMCEnum.GET_PROJECT_INFO, (args, { repo }): ProjectInfo => {
    // ...
    // Change the current working directory to the parent directory
    setShellPWD(repo, ShellPwd.Root);
    const current = getCurrentBranch();
    const tagList = execSync(`git tag --sort=-creatordate`)
      .toString()
      .trim()
      .split(/\n/)
      .filter(Boolean)
      .slice(0, 5)
      .map((branch) => ({ branch, isTag: true }));

    const branchList = execSync(`git branch --sort=-creatordate`)
      .toString()
      .trim()
      .split(/\n/)
      .filter((val) => /\*|release/.test(val) && !val.includes("("))
      .slice(0, 5)
      .map((val) => {
        let branch = val.trim().replace("* ", "");
        return { branch, isTag: false };
      });

    const branchInfoList: BranchItem[] = [...tagList, ...branchList].map(
      (item) => {
        return {
          branch: item.branch,
          isCurrent: current === item.branch,
          isTag: item.isTag,
          packJson: getPackJson(repo, item.branch),
        };
      }
    );

    return {
      current: branchInfoList.find((item) => item.isCurrent),
      branchList: branchInfoList,
    };
  });

  ipcMain.handle(
    EMCEnum.GENERATE_CODE_DIFF,
    (args, params: ReleaseHelperValues): RCodeDiff => {
      const { prevBranch, nextBranch, repo, savePath, codeDiff, ignoreLock } =
        params;
      setShellPWD(repo, ShellPwd.Root);
      // -- . ":(exclude)vtr-ui/package-lock.json"
      let command = `git diff ${prevBranch} ${nextBranch} > ${savePath}/${codeDiff}.diff`;

      if (ignoreLock) {
        const relative = getPackJsonRelative(repo);
        command = `git diff ${prevBranch} ${nextBranch} -- . ":(exclude)${relative}package-lock.json"> ${savePath}/${codeDiff}.diff`;
      }
      execSync(command);

      const diffText = fs.readFileSync(`${savePath}/${codeDiff}.diff`, "utf8");

      return {
        diffText,
        diffLen: diffText?.split("\n").length,
        diffFileName: `${codeDiff}.diff`,
      };
    }
  );

  ipcMain.handle(
    EMCEnum.GENERATE_AUDIT_REPORT,
    (args, params: ReleaseHelperValues): RAuditReport => {
      const { repo, savePath, auditReport } = params;
      setShellPWD(repo, ShellPwd.PackageJson);

      const result = spawnSync(
        "npm",
        ["audit", "--registry=https://registry.npmjs.org", "--json"],
        { shell: true }
      ).stdout.toString();

      const commandToJson = `npm audit --registry=https://registry.npmjs.org --json > ${savePath}/${auditReport}.json`;
      spawnSync(commandToJson, { shell: true });

      if (result) return JSON.parse(result);
    }
  );

  ipcMain.handle(
    EMCEnum.CHECK_DEPENDENCIES,
    (args, { repo }: ReleaseHelperValues): DependenceInfo => {
      setShellPWD(repo, ShellPwd.PackageJson);
      const result = spawnSync("npm", ["outdated", "--json"], {
        shell: true,
      });
      const outdated = JSON.parse(result.stdout.toString());
      return { outdated };
    }
  );
}

function getCurrentBranch() {
  let currentBranch = execSync("git rev-parse --abbrev-ref HEAD")
    .toString()
    .trim();
  if (currentBranch === "HEAD") {
    currentBranch = execSync("git describe --tags --exact-match")
      .toString()
      .trim();
  }

  return currentBranch;
}

function setShellPWD(repo, pos = ShellPwd.Root) {
  if (pos === ShellPwd.Root) {
    process.chdir(repo);
    return;
  }

  const relative = getPackJsonRelative(repo);
  process.chdir(`${repo}/${relative}`);
}

// packjson 相对于文件所在目录
function getPackJsonRelative(repo = "", branchName = "") {
  // 根目录直接返回
  if (!repo || fs.existsSync(`${repo}/package.json`)) return "";
  // 常用的二级目录
  if (fs.existsSync(`${repo}/vtr-ui/package.json`)) return "vtr-ui/";

  const branch = branchName || getCurrentBranch();

  // 找到第一个 package.json 的相对位置
  const relative = execSync(`git ls-tree -r --name-only ${branch}`)
    .toString()
    .split("\n")
    .filter((name) => name.endsWith("package.json"))
    .map((name) => name.replace("package.json", ""))[0];

  console.log({ relative, repo, branch, branchName });
  return relative;
}

function getPackJson(repo, branch) {
  const relative = getPackJsonRelative(repo, branch);
  const command = `git show ${branch}:${relative}package.json`;
  const output = execSync(command).toString().trim();
  const packJson = JSON.parse(output);

  return packJson;
}
