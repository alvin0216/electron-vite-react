import { IPCEnum, SerivceBinAction } from '@constants/enum';
import { ipcMain } from 'electron';
import { simpleGit } from 'simple-git';
import { generateSha256, selectFolder, selectPackageJson } from '../utils';
import fse from 'fs-extra';
import { resolve } from 'path';
export function ipcSSRB() {
  ipcMain.handle(IPCEnum.GetMD5, (arg, path) => generateSha256(path));
  ipcMain.handle(IPCEnum.GetRepoInfo, (arg, payload) => getRepoInfo(payload));
  ipcMain.handle(IPCEnum.SelectFolder, () => selectFolder());
  ipcMain.handle(IPCEnum.SelectPackageJson, () => selectPackageJson());
  ipcMain.handle(IPCEnum.RunCodeDiff, (arg, cdFields: IPCPayload.CodeDiff) => runCodeDiff(cdFields));
}

async function getRepoInfo({ repoPath, packageJsonPath }: IPCPayload.RepoInfo) {
  const git = simpleGit(repoPath);
  const packageRelative = getRelative(repoPath, packageJsonPath);

  const branches = await git.branchLocal();

  const lastestBranchs = branches.all
    .filter((b) => /^(release|hotfix|develop)/.test(b))
    .reverse()
    .slice(0, 10);

  const result = await Promise.all(
    lastestBranchs.map((branch) =>
      git.show([`${branch}:${packageRelative}`]).then((s) => ({ name: branch, version: JSON.parse(s).version }))
    )
  );

  return { branches: result };
}

async function runCodeDiff(cdFields: IPCPayload.CodeDiff) {
  const {
    repoPath,
    packageJsonPath,
    repoName,
    filename,
    prevBranch,
    nextBranch,
    prevVersion,
    nextVersion,
    excludePattern,
  } = cdFields;

  const fileName = filename || `${repoName}-v${prevVersion}-${nextVersion}.diff`;

  const git = simpleGit(repoPath);

  const diffText = (await git.diff([nextBranch, prevBranch, '--', '.', excludePattern, '>', fileName])).trim();
  const diffLine = diffText.split('\n').length;

  fse.writeFileSync(resolve(repoPath, fileName), diffText);

  const packageRelative = getRelative(repoPath, packageJsonPath);

  const packagediffText = await git.diff([nextBranch, prevBranch, '--', packageRelative]);

  return { diffLine, packagediffText };
}

function getRelative(repoPath: string, packageJsonPath: string) {
  return '.' + packageJsonPath.replace(repoPath, '').split(/\\/).join('/');
}
