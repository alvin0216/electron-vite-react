import { IPCEnum, SerivceBinAction } from '@constants/enum';
import { ipcMain } from 'electron';
import { simpleGit } from 'simple-git';
import { generateSha256 } from '../utils';
import fse from 'fs-extra';

export function ipcSSRB() {
  ipcMain.handle(IPCEnum.GetMD5, (arg, path) => generateSha256(path));

  ipcMain.handle(IPCEnum.GetRepoInfo, (arg, repoPath) => getRepoInfo(repoPath));

  ipcMain.handle(IPCEnum.RunCodeDiff, (arg, repoPath) => getRepoInfo(repoPath));
}

async function getRepoInfo(packageJsonPath: string) {
  const git = simpleGit(packageJsonPath.replace('package.json', ''));
  const branches = await git.branchLocal();

  const lastestBranchs = branches.all
    .filter((b) => /^(release|hotfix|develop)/.test(b))
    .reverse()
    .slice(0, 10);

  const result = await Promise.all(
    lastestBranchs.map((branch) =>
      git.show([`${branch}:./package.json`]).then((s) => ({ name: branch, version: JSON.parse(s).version }))
    )
  );

  console.log(111, result)

  return { branches: result };
}

// ...

async function runCodeDiff() {
  const repoPath = 'C:\\Users\\guosw5\\Desktop\\codes\\ui-consumer\\';
  const packageJsonPath = 'C:\\Users\\guosw5\\Desktop\\codes\\ui-consumer\\packages\\vantage-ui-consumer';

  const next = 'release/vantage2401';
  const prev = 'release/vantage2311';

  const excludePattern = ':!package-lock.json';

  const git = simpleGit(repoPath);
  const diffText = await git.diff(!excludePattern ? [next, prev] : [next, prev, '--', excludePattern]);
  const diffLine = diffText.split('\n').length;

  // const size = useMemo(() => {
  //   if (diffLen < 1000) return "Small";
  //   else if (diffLen < 10000) return "Medium";
  //   return "Large";
  // }, [diffLen]);

  fse.writeFileSync(`${repoPath}/b.diff`, diffText);
  return { diffLine };
}
