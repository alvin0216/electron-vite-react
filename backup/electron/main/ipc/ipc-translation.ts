import { dialog, ipcMain } from "electron";
import { MergeRecursive, sortProperties, traversingFiles } from "../utils";
import fse from "fs-extra";
import { EMCEnum } from "../../../universal/enum";

const Translation_Map = {
  AR: "ar.json",
  BR: "pt-br.json",
  CR: "hr.json",
  CZ: "cs.json",
  DK: "da.json",
  FI: "fi.json",
  FR: "fr.json",
  GK: "el.json",
  GR: "de.json",
  HE: "he.json",
  HU: "hu.json",
  IT: "it.json",
  JP: "ja.json",
  KR: "ko.json",
  NL: "nl.json",
  NO: "nb.json",
  PL: "pl.json",
  PO: "pt.json",
  RO: "ro.json",
  RU: "ru.json",
  SC: "zh-hans.json",
  SH: "sr-latn.json",
  SK: "sk.json",
  SL: "sl.json",
  SP: "es.json",
  SV: "sv.json",
  TC: "zh-hant.json",
  TU: "tr.json",
  UA: "uk.json",
};

export default function ipcTranslation() {
  ipcMain.handle(EMCEnum.TRANSLATION_IMPORT, (args, params) => {
    const { source, projectPath, spaces, sort } = params;
    // [项目语言完整路径, 项目名称]
    const [files, filenames] = getJSonFilePaths(projectPath);
    let [updateCount, addCount] = [0, 0];

    const whitelist = [
      ...Object.values(Translation_Map).map((f) => f.toUpperCase()),
      ...Object.keys(Translation_Map).map((key) => `${key}.JSON`),
      "sr.json",
    ];

    traversingFiles(
      source,
      // 只检索 json 文件
      function (sourceFilePath, file, done) {
        const filename = file.name.toUpperCase();
        if (/\.json/i.test(filename)) {
          if (whitelist.includes(filename)) {
            let target = Translation_Map[filename.replace(".JSON", "")];

            const filePath = files.find((f) => {
              const name = f.split(/\\/g).pop();
              // let targetName = target || name;
              // return targetName === filename.toUpperCase();
              if (name.toUpperCase() === filename) return true;
              if (name.toUpperCase() === target.toUpperCase()) return true;

              if (
                target.toLowerCase() === "sr-latn.json" &&
                name.toLowerCase() === "sr.json"
              )
                return true;
            });

            if (filePath) {
              let [source, target] = [
                fse.readJSONSync(sourceFilePath),
                fse.readJSONSync(filePath),
              ];
              MergeRecursive(source, target);
              if (sort) target = sortProperties(target);
              fse.writeJSONSync(filePath, target, { spaces });
              updateCount++;
            }
          }
        }
      }
    );

    return [updateCount, addCount];
  });
}

function getJSonFilePaths(dirPath) {
  let [paths, filenames] = [[], []];
  traversingFiles(dirPath, (filePath, file, done) => {
    if (file.name.includes(".json")) {
      paths.push(filePath);
      filenames.push(file.name);
    }
  });
  return [paths, filenames];
}
