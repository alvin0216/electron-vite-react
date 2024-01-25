import { exec } from 'child_process';

export function cmd(cmdStr: string) {
  console.log('🚀 run cmd: ', cmdStr);
  return new Promise<string>((resolve, reject) => {
    exec(cmdStr, function (error, stdout, stderr) {
      if (stderr) {
        console.log('cmd error: ', stderr);
        reject(stderr);
      } else resolve(stdout);
    });
  });
}
