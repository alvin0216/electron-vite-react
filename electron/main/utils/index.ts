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

/** 对象属性排序 返回新对象*/
export function sortProperties(obj: object) {
  let o = {};

  Object.keys(obj)
    .sort()
    .forEach((k) => {
      // @ts-ignore
      o[k] = obj[k].constructor === Object ? sortProperties(obj[k]) : obj[k];
    });

  return o;
}
