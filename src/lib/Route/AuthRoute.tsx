/**
 * Route 中添加 auth 验证，失效后的重定向以及 from 保存 location 信息
 */
import React, {FC} from 'react';
import {RouteProps, Route, Redirect} from 'react-router';

const AuthRoute: FC<RouteProps> = (props) => {
  const {component: Component, ...rest} = props;
  if (!Component) return null;

  const isExpired = window.localStorage.getItem('isExpired');
  return (
    <Route
      {...rest}
      render={(routeProps): React.ReactNode =>
        !isExpired ? (
          <Redirect to={{pathname: '/login', state: {from: props.location}}} />
        ) : (
          <Component {...routeProps} />
        )
      }
    />
  );
};

export default AuthRoute;
