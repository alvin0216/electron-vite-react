import { BrowserWindow } from 'electron';
import { FileKeyEnum, FileStatus, IPCEnum } from '@constants/enum';
import { useBridge } from '../utils/bridge';
import { tranMap } from '@constants/tran';
import fse from 'fs-extra';
import { MergeRecursive, sortProperties } from '../utils';

export function ipcWatchFiles(win: BrowserWindow) {
  const bridge = useBridge(win);

  bridge.handle(IPCEnum.Translate, (args, payload: IPCPayload.Tran) => {
    const { sort, indentation, source, target } = payload;
    // Object.keys(tranMap);

    source.map((s) => {
      const key = s.name.toUpperCase().replace('.JSON', '');
      // @ts-ignore
      const match: string[] = tranMap[key] || [];
      const sourceFilePath = s.path;
      const targetFilePath = target.find((t) => match.some((m) => m === t.name))?.path;
      if (targetFilePath) {
        // ...
        const [sourceJson, targetJson] = [fse.readJSONSync(sourceFilePath), fse.readJSONSync(targetFilePath)];
        let resultJson = JSON.parse(JSON.stringify(sourceJson));
        MergeRecursive(resultJson, targetJson);
        if (sort) resultJson = sortProperties(target);

        fse.writeJSONSync(targetFilePath, target, { spaces: indentation });
      }
    });

    return true;
  });
}
