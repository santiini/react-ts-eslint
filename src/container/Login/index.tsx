import React, {FC} from 'react';
import {NamedRouteComponentProps} from 'RouteComponent';
import {Button} from 'antd';

const Login: FC<NamedRouteComponentProps> = (props) => {
  return (
    <div>
      <h5>props.tilte: {props.title}</h5>
      <div>登录页面</div>
      <Button>111111111</Button>
    </div>
  );
};

export default Login;
