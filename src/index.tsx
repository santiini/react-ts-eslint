import React, {Suspense} from 'react';
import ReactDOM from 'react-dom';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import {LocaleProvider} from 'antd';
import {Router, Switch, Redirect} from 'react-router-dom';
import App from './App';
import Login from './container/Login';
import {StateProvider} from './store';
import {NamedRoute} from './lib/Route';
import customHistory from './history';
import './index.css';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <StateProvider>
    <LocaleProvider locale={zhCN}>
      <Router history={customHistory}>
        <Suspense fallback={<div>loading...</div>}>
          <Switch>
            <NamedRoute path="/login" title="登录" component={Login} />
            <NamedRoute path="/app" title="Kol Admin" component={App} />
            <Redirect from="*" to="/app" />
          </Switch>
        </Suspense>
      </Router>
    </LocaleProvider>
  </StateProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
