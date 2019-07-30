import React, {FC} from 'react';
import {NamedRouteComponentProps} from 'RouteComponent';

const Login: FC<NamedRouteComponentProps> = (props) => {
  return (
    <div>
      <h5>props.tilte: {props.title}</h5>
      <div>登录页面</div>
    </div>
  );
};

export default Login;
