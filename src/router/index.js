import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);

// eager 异步加载 返回promise对象
const files = require.context('@/views', true, /\.vue$/, 'eager');
const jsonFiles = require.context('@/views', true, /\.json$/);

/**
 * 通过views下面的.vue文件动态生成路由
 */
const views = files.keys().map(key => {
  const metaURL = key.replace('vue', 'json');

  let meta = {
    title: '',
    isChildren: false
  };
  try {
    meta = jsonFiles(metaURL);
  } catch (error) {
    meta.title = metaURL;
  }
  // ./AboutUs/_id/_t/index.vue => AboutUs/_id/_t/
  let [, path] = key.match(/.\/(.*?)index.vue/); // let path = key.replace('./', '').replace('index.vue', '');

  // AboutUs/_id/_t/ => AboutUs/_id/_t
  const slash = path.lastIndexOf('/');
  if (slash >= 0) {
    path = path.substr(0, slash);
  }

  const pathName = path;
  // AboutUs/_id/_t => [AboutUs,_id,_t]
  const pathArray = path.split('/');

  // AboutUs/_id/_t => AboutUs-_id-_t
  const name = pathArray.join('-');

  // Layout/Home => / or Layout/About/_id => layout/about
  path = path
    .replace('Layout', '')
    .replace('Home', '')
    .toLocaleLowerCase();

  // layout/about => /layout/about
  if (path.indexOf('/') !== 0) {
    path = '/' + path;
  }

  // 处理_下划线
  let params = [];
  if (path.includes('_')) {
    // aboutUs/_id/_t => ['id','t']
    params = path
      .split('/')
      .filter(e => e.includes('_'))
      .map(e => e.replace(/_/g, ''));

    // aboutUs/_id/_t => aboutUs/id/:id/t/:t
    path = path
      .replace(/_/g, ':')
      .split('/')
      .map(e => {
        const colon = e.indexOf(':');
        if (colon >= 0) {
          const param = e.substr(0 + 1);
          e = param + '/' + e;
        }
        return e;
      })
      .join('/');
  }

  // [Layout] => layout
  let parentPath = pathArray[0].toLocaleLowerCase();
  // 处理有子路由的情况
  if (parentPath === pathName.toLocaleLowerCase() || !meta.isChildren) {
    parentPath = '';
  }

  // 配置404页面
  if (pathName === 'NotFound') {
    path = '/:catchAll(.*)';
  }

  let route = {};
  route = {
    path,
    name,
    component: () => files(key),
    meta,
    pathName,
    parentPath
  };

  // 处理props
  if (params.length) {
    const props = {};
    route.props = route => {
      for (const e of params) {
        props[e] = route.params[e];
      }
      return props;
    };
  }

  return route;
});

/**
 * 配置路由嵌套
 * @param {*} data
 * @returns
 */
function setRoutes(data) {
  const routes = [];
  const hash = {};
  for (const item of data) {
    hash[item.pathName.toLocaleLowerCase()] = item;
  }
  for (const item of data) {
    const parent = hash[item.parentPath];
    if (parent) {
      parent.children = parent.children || [];
      parent.children.push(item);
      if (item.path === parent.path) {
        parent.name = '';
      }
    } else {
      routes.push(item);
    }
  }
  return routes;
}

const routes = setRoutes(views);
console.log(routes);

// const routes = [
// {
//   path: '/',
//   redirect: '/',
//   component: () => import('@/views/Layout'),
//   // component: () => {
//   //   return new Promise(resolve => {
//   //     resolve(require('@/views/Layout').default);
//   //   });
//   // },
//   children: [
//     {
//       path: '/',
//       name: 'Home',
//       component: () => import('@/views/Home'),
//       meta: { title: '首页' }
//     },
//     {
//       path: '/about',
//       name: 'About',
//       component: () => import('@/views/about')
//     },
//     {
//       path: '/error',
//       name: 'Error',
//       component: () => import('@/views/Error.vue')
//     }
//   ]
// }
// ];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  window.document.title = to.meta.title;
  next();
});

export default router;
