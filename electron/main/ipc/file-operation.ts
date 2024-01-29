import { BrowserWindow, ipcMain, shell } from 'electron';
import chokidar from 'chokidar';
import { ResourceKey, resourceMap } from '../lib/resource';
import { createFile, readJson, updateJson } from '../lib/fs-helper';

export function fileOperation(win: BrowserWindow) {
  let pMap: { [key: string]: ResourceKey } = {};
  Object.entries(resourceMap).forEach(([key, value]) => {
    // @ts-ignore
    pMap[value] = key;
  });

  const handleFileChange = (path: string) => {
    const key = pMap[path];
    const json = readJson(path);
    console.log('🚀 File Change: ', path);
    win?.webContents.send('file-change', { type: 'change', [key]: json });
  };

  const handleFileRemoved = (path: string) => {
    const key = pMap[path];
    win?.webContents.send('file-change', { type: 'removed', key });
  };

  const watcher = chokidar.watch([
    resourceMap.smbInfo,
    resourceMap.hypothesis,
    resourceMap.configJson,
    resourceMap.betaConfigJson,
    resourceMap.test,
  ]);

  watcher
    .on('add', handleFileChange)
    .on('change', handleFileChange)
    .on('unlink', handleFileRemoved)
    .on('ready', () => {
      console.log('🔥 Initial scan complete. Ready for changes');
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
