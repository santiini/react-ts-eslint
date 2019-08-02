import React, {FC, useContext} from 'react';
import {TeamContext} from './teamContext';
import {UserContext} from './userContext';
import {MRow} from '../../../styledComponents/Antd';

interface ContextProps {
  name?: string;
}
const Context: FC<ContextProps> = (props) => {
  const user = useContext(UserContext)!;
  const team = useContext(TeamContext)!;

  return (
    <div>
      <MRow>
        user: {user.name}
        books: {user.books.join(',')}
      </MRow>
      <MRow>
        team: {team.name}
        users: {team.users.join(',')}
      </MRow>
    </div>
  );
};

export default Context;
