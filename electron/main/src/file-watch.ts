import { fileWatchMap } from '@constants/resource';
import chokidar from 'chokidar';
import { BrowserWindow, ipcMain } from 'electron';
import { existsSync, isFileWritable, readJson, updateJson } from './utils/fs-helper';
import { FileKeyEnum, FileStatus, IPCEnum } from '@constants/enum';
import { useBridge } from './utils/bridge';

export function ipcWatchFiles(win: BrowserWindow) {
  const bridge = useBridge(win);

  // File Watch - handle cahnge & removed
  function watchFunc() {
    const filePaths = [...fileWatchMap.values()];
    const watcher = chokidar.watch(filePaths);

    // file watcher.......
    const handleFileChange = (path: string) => {
      const key = getFileKey(path)!;
      bridge.sendToWeb(IPCEnum.OnFileChange, readFile(key, path));
    };
    watcher
      .on('add', handleFileChange)
      .on('change', handleFileChange)
      .on('unlink', handleFileChange)
      .on('ready', () => {
        console.log('Initial scan complete. Ready for changes');
      });

    // read file && init data to web

    bridge.handle(IPCEnum.ReadFile, () => {
      const result = [...fileWatchMap.keys()].map((k) => readFile(k, fileWatchMap.get(k)!));

      return result;
    });
  }

  watchFunc();

  bridge.on(IPCEnum.UpdateFile, (args, payload: { key: FileKeyEnum; json: object }) => {
    const { key, json } = payload;
    const path = fileWatchMap.get(key)!;
    updateJson(path, json);
  });
}

function getFileKey(path: string) {
  for (const [key, value] of fileWatchMap) {
    if (value === path) return key;
  }
}

function readFile(key: FileKeyEnum, path: string) {
  console.log(key, path);
  const exists = existsSync(path);
  if (!exists) return { key, value: {}, status: FileStatus.NotFound };
  const writeable = isFileWritable(path);
  const value = readJson(path);
  return { key, value, status: writeable ? FileStatus.Writeable : FileStatus.Readonly };
}
