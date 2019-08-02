import React, {useContext} from 'react';
import {ThemeContext, UserContext} from './context';

interface ProfilePageProps {
  user: {name: string};
  theme: {bg: string; font: string};
}
const ProfilePage: React.FC<ProfilePageProps> = (props) => {
  const {user, theme} = props;

  return (
    <div>
      <h5>Multiple Context</h5>
      <div>user: {user.name}</div>
      <div style={{backgroundColor: theme.bg, color: theme.font}}>
        theme.bg: {theme.bg}
      </div>
      <div style={{backgroundColor: theme.bg, color: theme.font}}>
        theme.font: {theme.font}
      </div>
    </div>
  );
};

/**
 * 使用形式2：使用 useContext hooks
 *   1. FC 组件中， 可以 useContext() 使用多个 context
 */
const Content: React.FC = (props) => {
  const theme = useContext(ThemeContext);
  const user = useContext(UserContext);

  if (!theme || !user) return null;

  return <ProfilePage user={user} theme={theme} />;
};

export default Content;
