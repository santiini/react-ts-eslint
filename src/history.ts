/**
 * 自定的 history, 传入 Router 组件，可以用来实现跳转
 *   eg: 在 js 中，通过 history 跳转
 */
/* eslint-disable no-console */
import {createBrowserHistory} from 'history';

/**
 * createBrowserHistory 接受 options 参数
 */
export const customHistory = createBrowserHistory({
  basename: '/koladmin',
});

/* 返回值是 removeListener */
const removeListener = customHistory.listen((location, action) => {
  console.log(
    `The current URL is ${location.pathname}${location.search}${location.hash}`
  );
  console.log(`The last navigation action was ${action}`);
});

if (Date.now() < 100000) {
  removeListener();
}

export default customHistory;
