import React, {useEffect} from 'react';
import {NamedRouteComponentProps} from 'RouteComponent';
import Home from './container/Home';
import Helmet from 'react-helmet';
import {Switch} from 'react-router-dom';
import {NamedRoute} from './lib/Route';

const App: React.FC<NamedRouteComponentProps> = (props) => {
  useEffect(() => {
    props.history.push(`${props.match.url}/teams/3`);
  }, []);

  return (
    <div className="app">
      <Helmet title={props.title} />
      <Switch>
        <NamedRoute
          path={`${props.match.path}/teams/:teamId`}
          component={Home}
        />
      </Switch>
    </div>
  );
};

export default App;
