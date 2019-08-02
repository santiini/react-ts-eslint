import React, {FC, useState} from 'react';
import {TeamContext, TeamContextProps} from './teamContext';
import {UserContextProps, UserContext} from './userContext';
import Context from './Context';

interface ContextProviderProps {
  name?: string;
}
const ContextProvider: FC<ContextProviderProps> = (props) => {
  const [user] = useState<UserContextProps>({
    name: 'santiiny',
    books: ['JS基础概论', 'JAVA基础', 'NodeJS的进阶'],
  });
  const [team] = useState<TeamContextProps>({
    name: 'team3',
    users: ['小涛', '白白', '志伟'],
  });

  return (
    <UserContext.Provider value={user}>
      <TeamContext.Provider value={team}>
        <Context />
      </TeamContext.Provider>
    </UserContext.Provider>
  );
};

export default ContextProvider;
