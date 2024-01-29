import { BrowserWindow } from 'electron';
import shelljs from 'shelljs';

export function demo(win: BrowserWindow) {
  // shelljs.exec(
  //   // 'cd /Users/guoshaowei/Desktop/code/vite-react-playground && npm run dev',
  //   'cd /Users/guoshaowei/Desktop/code/vite-react-playground && npm run build',
  //   function (code, stdout, stderr) {
  //     console.log(1111);
  //     console.log('Exit code:', code);
  //     console.log('Program output:', stdout);
  //     console.log('Program stderr:', stderr);
  //   }
  // );

  // 定义要执行的命令
  const command = 'ls -l';

  // 执行命令并捕获输出
  const result = shelljs.exec(command, { silent: true });

  // 打印输出作为日志
  console.log(111, result.stdout);
}
