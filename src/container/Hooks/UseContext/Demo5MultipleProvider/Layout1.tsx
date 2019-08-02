import React, {useContext} from 'react';
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

/* 使用形式2：使用 useContext hooks  */
const Content: React.FC = (props) => {
  const theme = useContext(ThemeContext);
  const user = useContext(UserContext);
  return <ProfilePage user={user} theme={theme} />;
};

const Layout1: React.FC = () => (
  <div>
    <Content />
  </div>
);

export default Layout1;
