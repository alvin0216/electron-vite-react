import { BrowserWindow, ipcMain } from 'electron';
import { IPCEnum } from '@constants/enum';
import { tranList } from '@constants/tran';
import fse from 'fs-extra';
import { MergeRecursive, sortProperties } from '../utils';

export function ipcTranslation(win: BrowserWindow) {

  ipcMain.handle(IPCEnum.Translate, (args, payload: IPCPayload.Tran) => {
    const { sort, indentation, source, target } = payload;
    let completeList: any[] = [];
    source.map((s) => {
      const sourceFilePath = s.path;
      const sourceFileName = s.name.toLowerCase();
      const items = tranList.find((items) => items.includes(sourceFileName));
      // find target
      if (items) {
        const targetFilePath = target.find((t) => items.includes(t.name.toLowerCase()))?.path;
        if (targetFilePath) {
          const [sourceJson, targetJson] = [fse.readJSONSync(sourceFilePath), fse.readJSONSync(targetFilePath)];
          let resultJson = JSON.parse(JSON.stringify(targetJson));
          MergeRecursive(sourceJson, resultJson);
          if (sort) resultJson = sortProperties(resultJson);
          fse.writeJSONSync(targetFilePath, resultJson, { spaces: Number(indentation) });
          completeList.push({ sourceFilePath, targetFilePath });
        }
      }
    });

    return completeList;
  });
}
