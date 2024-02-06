import { IPCEnum, SerivceBinAction } from '@constants/enum';
import { ipcMain } from 'electron';
import { simpleGit } from 'simple-git';
import { generateSha256, selectFolder, selectPackageJson } from '../utils';
import fse from 'fs-extra';

export function ipcSSRB() {
  ipcMain.handle(IPCEnum.GetMD5, (arg, path) => generateSha256(path));
  ipcMain.handle(IPCEnum.GetRepoInfo, (arg, repoPath) => getRepoInfo(repoPath));
  ipcMain.handle(IPCEnum.SelectFolder, () => selectFolder());
  ipcMain.handle(IPCEnum.SelectPackageJson, () => selectPackageJson());
  ipcMain.handle(IPCEnum.RunCodeDiff, (arg, cdFields: IPCPayload.CodeDiff) => runCodeDiff(cdFields));
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

  console.log(111, result);

  return { branches: result };
}

// ...

async function runCodeDiff(cdFields: IPCPayload.CodeDiff) {
  const { repoPath, repoName, filename, prevBranch, nextBranch, prevVersion, nextVersion, excludePattern } = cdFields;

  const fileName = filename || `${repoName}-v${prevVersion}-${nextVersion}.diff`;

  const git = simpleGit(repoPath);
  const diffText = await git.diff(
    !excludePattern
      ? [nextBranch, prevBranch, '>', fileName]
      : [nextBranch, prevBranch, '--', excludePattern, '>', fileName]
  );
  const diffLine = diffText.split('\n').length;
  fse.writeFileSync(fileName, diffText);

  return { diffLine };
}
