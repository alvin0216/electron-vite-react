import { BrowserWindow, ipcMain, shell } from 'electron';
import chokidar from 'chokidar';
import { ResourceKey, resourceMap } from '../assets/resource';
import { createFile, readJson, updateJson } from '../utils/fs-helper';

const fileList = [
  { key: 'smbInfo', filePath: resourceMap.smbInfo },
  { key: 'hypothesis', filePath: resourceMap.hypothesis },
  { key: 'configJson', filePath: resourceMap.configJson },
  { key: 'betaConfigJson', filePath: resourceMap.betaConfigJson },
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
    win?.webContents.send('file-change', { type: 'change', [key]: json });
  };

  const handleFileRemoved = (path: string) => {
    const key = getFileKey(path);
    win?.webContents.send('file-change', { type: 'removed', key });
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
  ipcMain.on('on-update-file', (args, payload: { key: ResourceKey; json: object }) => {
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
  ipcMain.on('on-open-file', (args, key: ResourceKey) => {
    const path = resourceMap[key];
    shell.openPath(path);
  });
}
