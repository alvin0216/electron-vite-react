import { dialog, shell } from "electron";
import { EMCEnum } from "../../universal/enum";

const fs = require("fs-extra");
const path = require("path");
const exec = require("child_process").exec;

export function readOrCreateJson(filePath: string, create = true, json = {}) {
  const exits = fs.pathExistsSync(filePath);
  if (!exits) {
    if (create) {
      // 不存在则创建
      fs.ensureFileSync(filePath);
      fs.writeJSONSync(filePath, json, { spaces: 2 });
    } else {
      return {};
    }
  }
  try {
    return fs.readJSONSync(filePath);
  } catch (e) {
    return {};
  }
}

export function updateJsonFile(filePath, data) {
  try {
    fs.writeJSONSync(filePath, data, { spaces: 2 });
    return fs.readJSONSync(filePath);
  } catch (err) {
    if (err.errno === -4048) {
      dialog.showErrorBox(
        "Operation not permitted",
        "please open the file path, then update the permissions to allow Modify"
      );
    } else {
      dialog.showErrorBox("Operation Exception", err.message);
    }
    return false;
  }
}

/** 对象属性排序 返回新对象*/
export function sortProperties(obj) {
  let o = {};

  Object.keys(obj)
    .sort()
    .forEach((k) => {
      o[k] = obj[k].constructor === Object ? sortProperties(obj[k]) : obj[k];
    });

  return o;
}

/** 合并对象，target 对象会被修改 */
export function MergeRecursive(origin, target) {
  for (const p in origin) {
    if (origin[p].constructor === Object && target[p]) {
      MergeRecursive(origin[p], target[p]);
    } else {
      target[p] = origin[p];
    }
  }
}

type TraversingFilesCallback = (
  path: string,
  file: File,
  done: () => void
) => void;

// 遍历目录下的所有文件
export function traversingFiles(
  currentDirPath: string,
  callback: TraversingFilesCallback
) {
  let isBreak = false;
  function recv(currentDirPath) {
    const list = fs.readdirSync(currentDirPath, { withFileTypes: true });
    for (const dirent of list) {
      const filePath = path.join(currentDirPath, dirent.name);
      if (isBreak) break;
      if (dirent.isFile()) {
        callback(filePath, dirent, () => {
          isBreak = true;
        });
        if (isBreak) break;
      } else if (
        dirent.isDirectory() &&
        !/node_modules|vscode|dist|git/.test(currentDirPath)
      ) {
        recv(filePath);
      }
    }
  }

  recv(currentDirPath);
}

export async function selectFolder(args, params) {
  const { canceled, filePaths } = await dialog.showOpenDialog({
    properties: params?.properties || ["openDirectory"],
  });
  if (canceled) {
    return;
  } else {
    return filePaths[0];
  }
}

export function cmd(cmdStr: string) {
  return new Promise<string>((resolve, reject) => {
    exec(cmdStr, function (error, stdout, stderr) {
      if (stderr) {
        global.win?.webContents.send(EMCEnum.ON_LOG, {
          command: cmdStr,
          stderr,
        });
        reject(stderr);
      } else resolve(stdout);
    });
  });
}

export function findPackageJsonPath(
  projectPath: string,
  relativePos: boolean = true
) {
  let packageJsonFilePath = "";
  traversingFiles(projectPath, (filePath, file, done) => {
    if (file.name === "package.json") {
      packageJsonFilePath = filePath;
      done();
    }
  });

  if (relativePos) {
    let rpath = packageJsonFilePath
      .replace(projectPath, "")
      .replace(/\\/g, "/");

    if (rpath.indexOf("/") === 0) rpath = rpath.slice(1);

    return rpath;
  }

  return packageJsonFilePath;
}

export function readFile(args, filePath) {
  return fs.readFileSync(filePath, "utf8");
}
