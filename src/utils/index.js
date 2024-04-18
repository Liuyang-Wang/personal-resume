// 文件流转blob对象下载
export const downloadFile = (data, fileName) => {
  const blob = data;
  // 获取heads中的filename文件名
  const downloadElement = document.createElement('a');
  // 创建下载的链接
  const href = window.URL.createObjectURL(blob);
  downloadElement.href = href;
  // 下载后文件名
  downloadElement.download = fileName;
  document.body.appendChild(downloadElement);
  // 点击下载
  downloadElement.click();
  // 下载完成移除元素
  document.body.removeChild(downloadElement);
  // 释放掉blob对象
  window.URL.revokeObjectURL(href);
};

const _deepCopy = target => {
  const map = new WeakMap();
  function isObject(target) {
    return (typeof target === 'object' && target) || typeof target === 'function';
  }
  function clone(data) {
    if (!isObject(data)) {
      return data;
    }
    if ([Date, RegExp].includes(data.constructor)) {
      return new data.constructor(data);
    }
    if (typeof data === 'function') {
      return new Function('return ' + data.toString())();
    }
    const exist = map.get(data);
    if (exist) {
      return exist;
    }
    if (data instanceof Map) {
      const result = new Map();
      map.set(data, result);
      data.forEach((val, key) => {
        if (isObject(val)) {
          result.set(key, clone(val));
        } else {
          result.set(key, val);
        }
      });
      return result;
    }
    if (data instanceof Set) {
      const result = new Set();
      map.set(data, result);
      data.forEach(val => {
        if (isObject(val)) {
          result.add(clone(val));
        } else {
          result.add(val);
        }
      });
      return result;
    }
    const keys = Reflect.ownKeys(data);
    const allDesc = Object.getOwnPropertyDescriptors(data);
    const result = Object.create(Object.getPrototypeOf(data), allDesc);
    map.set(data, result);
    keys.forEach(key => {
      const val = data[key];
      if (isObject(val)) {
        result[key] = clone(val);
      } else {
        result[key] = val;
      }
    });
    return result;
  }
  return clone(target);
};

export const deepCopy = (object, isEasy = true) => {
  if (isEasy) {
    return JSON.parse(JSON.stringify(object));
  } else {
    return _deepCopy(object);
  }
};

export const randomString = (e = 32) => {
  const t = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
  const a = t.length;
  let n = '';
  for (let i = 0; i < e; i++) n += t.charAt(Math.floor(Math.random() * a));
  return n;
};

export const getCookie = () => {
  const cookieStr = window.document.cookie;
  if (!cookieStr) {
    return {};
  }
  const cookieArr = cookieStr.split(';');
  const obj = {};
  for (const item of cookieArr) {
    const arr = item.split('=');
    obj[arr[0].trim()] = arr[1].trim();
  }
  return obj;
};

export const setCookie = (name, value, exDays = 1) => {
  const d = new Date();
  d.setTime(d.getTime() + exDays * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value}; expires=${d.toGMTString()}`;
};

export const delCookie = name => {
  const d = new Date();
  d.setTime(d.getTime() - 10000);
  document.cookie = `${name}=''; expires=${d.toGMTString()}`;
};

export const getTypeOf = name => {
  const i = Object.prototype.toString.call(name);
  return i
    .substr(1)
    .substring(0, i.length - 2)
    .split(' ')
    .pop()
    .toLowerCase();
};
