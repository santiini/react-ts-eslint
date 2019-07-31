import React, {FC} from 'react';
import AvatarDropdown from '../components/AvatarDropdown';

interface UserSettingsProps {
  name: string;
}
const UserSettings: FC<UserSettingsProps> = (props) => {
  return (
    <>
      <AvatarDropdown menu={true} user={{name: 'sunxiaotao'}} />
    </>
  );
};

export default UserSettings;
