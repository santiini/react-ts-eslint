import React from 'react';
import Layout from './Layout';
import Layout1 from './Layout1';

export const ThemeContext = React.createContext('light');

export const UserContext = React.createContext({
  name: 'Guest',
});

class Learn8 extends React.Component {
  public state = {
    theme: 'light',
    name: 'admin',
  };

  public render(): React.ReactElement {
    // const {theme, signedInUser} = this.props;

    return (
      <ThemeContext.Provider value={this.state.theme}>
        <UserContext.Provider value={{name: this.state.name}}>
          <Layout />
          <Layout1 />
        </UserContext.Provider>
      </ThemeContext.Provider>
    );
  }
}

export default Learn8;
