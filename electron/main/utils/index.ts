/** 合并对象，target 对象会被修改 */
export function MergeRecursive(source: any, target: any) {
  for (const p in source) {
    if (source[p].constructor === Object && target[p]) {
      MergeRecursive(source[p], target[p]);
    } else {
      target[p] = source[p];
    }
  }
}
