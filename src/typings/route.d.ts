/**
 * react-router 相关
 */
declare module 'RouteComponent' {
  import {RouteComponentProps} from 'react-router';

  export interface CommonRouteProps {
    teamId: string;
  }

  export interface NamedRouteComponentProps<
    P extends {[K in keyof P]?: string} = {}
  > extends RouteComponentProps<P> {
    title?: string;
  }
}
