import { exec } from 'child_process';

export function runExec(cmdStr: string) {
  return new Promise<string>((resolve, reject) => {
    exec(cmdStr, function (error, stdout, stderr) {
      if (stderr) {
        reject(stderr);
      } else resolve(stdout);
    });
  });
}
