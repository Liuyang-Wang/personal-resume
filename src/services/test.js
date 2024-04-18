import request from './plugins/request';

export const test = (params = {}, method = 'get') => request({ url: '/test', params, method });

export const testPost = (data = {}, method = 'post') => request({ url: '/test', data, method });

export const testPut = (id, data = {}, method = 'put') => request({ url: `/test/${id}`, data, method });

export const testDelete = (id, data = {}, method = 'delete') => request({ url: `/test/${id}`, data, method });
