import React from 'react';
import {ThemeContext, UserContext} from './index';

interface ProfilePageProps {
  user: {
    name: string;
  };
  theme: string;
}
const ProfilePage: React.FC<ProfilePageProps> = (props) => {
  const {user, theme} = props;

  return (
    <div>
      <h5>Multiple Context</h5>
      <div>user: {user.name}</div>
      <div>theme: {theme}</div>
    </div>
  );
};

/* 使用形式1：旧的 ContextApi -- 使用 Context.Consumer 来传递 context */
const Content: React.FC = (props) => (
  <ThemeContext.Consumer>
    {(theme): React.ReactElement => (
      <UserContext.Consumer>
        {(user): React.ReactElement => (
          <ProfilePage user={user} theme={theme} />
        )}
      </UserContext.Consumer>
    )}
  </ThemeContext.Consumer>
);

const Layout: React.FC = () => (
  <div>
    <Content />
  </div>
);

export default Layout;
