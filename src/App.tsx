import React, {useEffect} from 'react';
import {NamedRouteComponentProps} from 'RouteComponent';
import Helmet from 'react-helmet';
import {Switch} from 'react-router-dom';
import {ThemeProvider} from 'emotion-theming';
import {NamedRoute} from './lib/Route';
import Home from './container/Home';
import {useStateValue} from './store';
import {ThemeState} from './store/themeReducer';

const App: React.FC<NamedRouteComponentProps> = (props) => {
  const [storeState] = useStateValue()!;
  useEffect(() => {
    props.history.push(`${props.match.url}/teams/3`);
  }, []);

  return (
    <ThemeProvider<ThemeState> theme={storeState.theme}>
      <div className="app">
        <Helmet title={props.title} />
        <Switch>
          <NamedRoute
            path={`${props.match.path}/teams/:teamId`}
            component={Home}
          />
        </Switch>
      </div>
    </ThemeProvider>
  );
};

export default App;
