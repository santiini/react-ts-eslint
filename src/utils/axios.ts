/**
 * axios extend
 */
// tslint:disable no-console
import axios, {AxiosInstance} from 'axios';
import isArray from 'lodash/isArray';
import {config as configs} from '../config';
// import {get} from './localStorage';

const {apiRoot, kolRoot} = configs;

const createAxios = (baseURL: string): AxiosInstance => {
  const service = axios.create({
    baseURL,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      // 'x-auth-type': baseURL === apiRoot ? 'sm' : 'kol',
      'x-auth-type': 'sm',
    },
    timeout: 1000000,
  });

  const sessionUrl = '/session';

  service.interceptors.request.use(
    (config) => {
      const {method} = config;
      if (!(config.url === sessionUrl && method === 'post')) {
        config.headers['x-auth-token'] =
          'cf9c522dc0d09dc9f5a77c3aef5614d6f2636163';
        // config.headers['x-auth-token'] = get('access_token');
      }
      return config;
    },
    (error) => {
      if (console && console.error) {
        console.error(error);
      }
      return Promise.reject(error);
    }
  );

  service.interceptors.response.use(
    (response) => response,
    (error) => {
      const {config, response} = error;
      let res = error;
      if (response && response.data && response.data.message) {
        // res = response.data.message;
        res = isArray(response.data.message)
          ? response.data.message[0].message
          : response.data.message;
      }
      if (!response) {
        const errMesg = {
          description: `请求数据失败，可能出现了网络错误，请重试或联系管理员: ${res}`,
        };
        return Promise.reject(errMesg);
      }
      const {status = 408} = response;
      // 处理获取session
      if (
        config.url === sessionUrl &&
        config.method === 'get' &&
        status > 200
      ) {
        const errMesg = {
          description: `登录信息错误，请刷新页面或联系管理员: ${res}`,
        };
        return Promise.reject(errMesg);
      }

      let resError;
      switch (true) {
        case status === 401:
          resError = {
            description: `认证失败，请尝试重新登录。原因: ${res}`,
          };
          break;
        case status === 403:
          resError = {
            description: `没有权限进行此操作，请联系管理员。原因: ${res}`,
          };
          break;
        case status === 404:
          resError = {
            description: `请求的地址未找到，请确认。原因: ${res}`,
          };
          break;
        case status === 408:
          resError = {
            description: `无法请求到资源，请检查本地网络。原因: ${res}`,
          };
          break;
        case status === 422:
          resError = {
            description: `请求的格式不正确，请检查参数。原因: ${res}`,
          };
          break;
        case status === 429:
          resError = {
            duration: 5,
            description: '操作过于频繁，请稍后再试。',
          };
          break;
        case status >= 500:
          resError = {
            description: `服务器内部错误，请重试或联系管理员。原因: ${res}`,
          };
          break;
        default:
          resError = {description: `请求接口出错: ${res}`};
      }

      if (console && console.error) {
        console.error(error);
      }
      return Promise.reject(resError);
    }
  );

  return service;
};

// kol 接口
export const kol = createAxios(kolRoot);
// 魔方接口
export default createAxios(apiRoot);
