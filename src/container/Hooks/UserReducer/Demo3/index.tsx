import React, {FC} from 'react';
import {CountProvider} from './store';
import PageHeaderWrapper from '../../../../layout/PageHeaderWrapper';
import Counter from './Counter';

interface UserReducerDemp3Props {
  name?: string;
}
const UserReducerDemp3: FC<UserReducerDemp3Props> = (props) => {
  return (
    <PageHeaderWrapper title="contentApi共享Reducer">
      <CountProvider>
        <Counter />
        <Counter />
      </CountProvider>
      <CountProvider>
        <Counter />
        <Counter />
      </CountProvider>
    </PageHeaderWrapper>
  );
};

export default UserReducerDemp3;
