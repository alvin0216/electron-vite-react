import { BrowserWindow, ipcMain, shell } from 'electron';
import chokidar from 'chokidar';
import { ResourceKey, resourceMap } from '../assets/resource';
import { createFile, readJson, updateJson } from '../utils/fs-helper';
import { FileKeyEnum, IPCEnum } from '@enum/index';

const fileList = [
  { key: FileKeyEnum.smbInfo, filePath: resourceMap.smbInfo },
  { key: FileKeyEnum.hypothesis, filePath: resourceMap.hypothesis },
  { key: FileKeyEnum.configJson, filePath: resourceMap.configJson },
  { key: FileKeyEnum.betaConfigJson, filePath: resourceMap.betaConfigJson },
];

function getFileKey(filePath: string) {
  return fileList.find((f) => f.filePath === filePath)!.key;
}

function getFilePaths() {
  return fileList.map((f) => f.filePath);
}

export function fileHandler(win: BrowserWindow) {
  const handleFileChange = (path: string) => {
    const key = getFileKey(path);
    const json = readJson(path);
    console.log('🚀 File Change: ', path);
    win?.webContents.send(IPCEnum.OnFileChange, { type: 'change', [key]: json });
  };

  const handleFileRemoved = (path: string) => {
    const key = getFileKey(path);
    win?.webContents.send(IPCEnum.OnFileChange, { type: 'removed', key });
  };

  const watcher = chokidar.watch(getFilePaths());

  watcher
    .on('add', handleFileChange)
    .on('change', handleFileChange)
    .on('unlink', handleFileRemoved)
    .on('ready', () => {
      console.log('🔥 Initial scan complete. Ready for changes');
      // ....
      //
    });

  // update file
  ipcMain.on(IPCEnum.UpdateFile, (args, payload: { key: ResourceKey; json: object }) => {
    const { key, json } = payload;
    const path = resourceMap[key];
    updateJson(path, json);
  });

  // create file
  ipcMain.on('on-create-file', (args, payload: { key: ResourceKey; json: object }) => {
    const { key, json } = payload;
    const path = resourceMap[key];
    createFile(path, json);
  });

  // open file
  ipcMain.on(IPCEnum.OpenFile, (args, key: ResourceKey) => {
    const path = resourceMap[key];
    shell.openPath(path);
  });
}
