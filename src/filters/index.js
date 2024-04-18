export const dateFormat = (date = new Date(), fmt = 'YYYY-MM-DD HH:mm:ss') => {
  date = new Date(date);
  let ret = '';
  const opt = {
    'Y+': date.getFullYear().toString(), // 年
    'M+': (date.getMonth() + 1).toString(), // 月
    'D+': date.getDate().toString(), // 日
    'H+': date.getHours().toString(), // 时
    'm+': date.getMinutes().toString(), // 分
    's+': date.getSeconds().toString() // 秒
    // 有其他格式化字符需求可以继续添加，必须转化成字符串
  };
  Object.keys(opt).forEach(k => {
    if (Object.prototype.hasOwnProperty.call(opt, k)) {
      ret = new RegExp(`(${k})`).exec(fmt);
      if (ret) {
        fmt = fmt.replace(ret[1], ret[1].length === 1 ? opt[k] : opt[k].padStart(ret[1].length, '0'));
      }
    }
  });
  return fmt;
};

// 去除空格 type 1-所有空格 2-前后空格 3-前空格 4-后空格
export const trim = (value, type = 1) => {
  switch (type) {
    case 1:
      return value.replace(/\s+/g, '');
    case 2:
      return value.replace(/(^\s*)|(\s*$)/g, '');
    case 3:
      return value.replace(/(^\s*)/g, '');
    case 4:
      return value.replace(/(\s*$)/g, '');
    default:
      return value;
  }
};
