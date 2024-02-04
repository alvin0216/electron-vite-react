import { fileWatchMap } from '@constants/resource';
import chokidar from 'chokidar';
import { BrowserWindow, ipcMain, shell } from 'electron';
import { existsSync, isFileWritable, readJson, setFileReadOnly, setFileWritable, updateJson } from '../utils/fs-helper';
import { FileKeyEnum, FileStatus, IPCEnum } from '@constants/enum';

export function ipcWatchFiles(win: BrowserWindow) {
  ipcMain
    .on(IPCEnum.UpdateFile, (args, payload) => {
      const { key, json } = payload;
      const path = fileWatchMap.get(key)!;
      updateJson(path, json);
    })
    .on(IPCEnum.OpenFile, (args, fileKey: FileKeyEnum) => {
      const path = fileWatchMap.get(fileKey);
      if (path) shell.showItemInFolder(path);
    });

  ipcMain.handle(IPCEnum.ToggleFileStatus, (args, { fileKey, status }) => {
    const path = fileWatchMap.get(fileKey);
    if (path) {
      return status === FileStatus.Writeable ? setFileWritable(path) : setFileReadOnly(path);
    }
    return false;
  });

  ipcMain.handle(IPCEnum.ReadFile, () => {
    return {
      ...readFile(fileWatchMap.get(FileKeyEnum.ConfigJson)!),
      ...readFile(fileWatchMap.get(FileKeyEnum.BetaConfigJson)!),
      ...readFile(fileWatchMap.get(FileKeyEnum.SMBInfo)!),
      ...readFile(fileWatchMap.get(FileKeyEnum.Hypothesis)!),
    };
  });

  // File Watch - handle cahnge & removed
  function watchFunc() {
    const filePaths = [...fileWatchMap.values()];
    const watcher = chokidar.watch(filePaths);

    // file watcher.......
    const handleFileChange = (path: string) => {
      try {
        win?.webContents.send(IPCEnum.OnFileChange, readFile(path));
      } catch (e) {
        console.log('Error', e);
      }
    };
    watcher
      .on('add', handleFileChange)
      .on('change', handleFileChange)
      .on('unlink', handleFileChange)
      .on('ready', () => {
        console.log('Initial scan complete. Ready for changes');
      });

    // read file && init data to web
  }

  watchFunc();
}

function getFileKey(path: string) {
  for (const [key, value] of fileWatchMap) {
    if (value === path) return key;
  }
}

function readFile(path: string) {
  try {
    const key = getFileKey(path)!;
    const exists = existsSync(path);
    if (!exists) return { [key]: { value: {}, status: FileStatus.NotFound } };
    const writeable = isFileWritable(path);
    const value = readJson(path);
    return { [key]: { value, status: writeable ? FileStatus.Writeable : FileStatus.Readonly } };
  } catch (e) {
    console.log('readFile Error', e);
  }
}
