import fs from 'fs-extra';

export function readJson(path: string) {
  try {
    return fs.readJSONSync(path) as object;
  } catch (e) {
    return {};
  }
}

export function updateJson(path: string, json: object) {
  try {
    const exits = fs.pathExistsSync(path);
    if (!exits) fs.ensureFileSync(path);
    return fs.writeJSONSync(path, json, { spaces: 2 });
  } catch (e) {
    console.log('updateJson error', e);
    return {};
  }
}

export function createFile(path: string, json: object) {
  try {
    const exits = fs.pathExistsSync(path);
    if (!exits) fs.ensureFileSync(path);
    return fs.writeJSONSync(path, json, { spaces: 2 });
  } catch (e) {
    return {};
  }
}

export function isFileWritable(filePath: string) {
  try {
    fs.accessSync(filePath, fs.constants.R_OK | fs.constants.W_OK);
    return true;
  } catch (err) {
    return false;
  }
}

export function setFileWritable(path: string) {
  fs.chmodSync(path, '666');
}

export function setFileReadOnly(path: string) {
  fs.chmodSync(path, '444');
}

export const existsSync = fs.existsSync;
