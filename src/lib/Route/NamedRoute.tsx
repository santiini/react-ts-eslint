/**
 * Route 的功能增强，可以传递 name 等参数给组件
 */
import React, {FC} from 'react';
import {Route, RouteComponentProps, RouteProps} from 'react-router-dom';

interface ConfigProps {
  title?: string;
}
interface NamedRouteProps<P extends ConfigProps = ConfigProps>
  extends RouteProps,
    ConfigProps {
  component?: React.ComponentType<RouteComponentProps & P>;
  path: string | string[];
}
const NamedRoute: FC<NamedRouteProps & ConfigProps> = (props) => {
  const {component: Component, title, ...rest} = props;
  return (
    <Route
      {...rest}
      render={(routeProps): React.ReactNode =>
        Component && <Component title={title} {...routeProps} />
      }
    />
  );
};

export default NamedRoute;
