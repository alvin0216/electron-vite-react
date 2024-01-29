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
    const writeable = isFileWritable(path);

    if (!writeable) setFileWritable(path);
    fs.writeJSONSync(path, json, { spaces: 2 });
    if (!writeable) setFileReadOnly(path);
  } catch (e) {
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

function isFileWritable(filePath: string) {
  try {
    return fs.accessSync(filePath, fs.constants.R_OK | fs.constants.W_OK);
  } catch (err) {
    return false;
  }
}

function setFileWritable(path: string) {
  fs.chmodSync(path, '666');
}

function setFileReadOnly(path: string) {
  fs.chmodSync(path, '444');
}
