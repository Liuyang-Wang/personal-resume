import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import * as filters from './filters';
import '@/style/index.scss';
import '@/icons';
// import TaiShan from 'taishan';
Vue.config.productionTip = false;

// 全局应用filter
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key]);
});

function queryString(params) {
  const dataType = params.constructor;
  if (dataType === Object) {
    return Object.keys(params)
      .map(key => `${key}=${params[key]}`)
      .join('&');
  }
  return '';
}

function jsonp({ url, params = {}, jsonpCallback = 'callback', jsonp = '', callback = () => {} }) {
  return new Promise(resolve => {
    const callbackName = jsonp || `TaiShan_callback_${parseInt(Math.random() * 9999999999)}_${Date.now()}`;
    window[callbackName] = res => {
      callback(res);
      resolve(res);
    };
    params[jsonpCallback] = callbackName;
    // 创建 script 标签
    const script = window.document.createElement('script');
    script.src = `${url}?${queryString(params)}`;
    script.defer = 'defer';
    function scriptOnload() {
      // 执行完成后删除script标签以及全局标签
      window.document.body.removeChild(script);
      if (Object.hasOwnProperty.call(window, callbackName)) {
        if (Reflect && Reflect.deleteProperty) {
          // Reflect.deleteProperty()
          // 允许用于删除对象上的属性,并且返回一个 Boolean 值表示该属性是否被成功删除。
          Reflect.deleteProperty(window, callbackName);
        } else {
          delete window[callbackName];
        }
      }
    }
    if (script.readyState) {
      // ie8及以下版本
      script.onreadystatechange = function() {
        if (script.readyState === 'complete' || script.readyState === 'loaded') {
          scriptOnload();
        }
      };
    } else {
      script.onload = scriptOnload;
    }
    window.document.body.appendChild(script);
  });
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');

jsonp({
  url: 'https://whois.pconline.com.cn/ipJson.jsp'
}).then(res => {
  console.log(res);
});
