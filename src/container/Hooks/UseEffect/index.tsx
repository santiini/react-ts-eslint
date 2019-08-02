import React, {FC, useState} from 'react';
import PageHeaderWrapper from '../../../layout/PageHeaderWrapper';
import {MButton, MRow} from '../../styledComponents/Antd';
import Demo22 from './Demo1';

export interface Parent {
  name: string;
  age: number;
}

interface Demo2Props {
  name?: string;
}
const Demo2: FC<Demo2Props> = (props) => {
  const [name, setName] = useState<Parent>({
    name: 'Parent',
    age: 11,
  });

  const handleChangeName = (): void => {
    setName({name: `Parent-${new Date().getMilliseconds()}`, age: 11});
  };
  const handleChange = (): void => {
    setName({name: 'Parent', age: 11});
  };
  return (
    <PageHeaderWrapper title="useEffect">
      <MRow>
        <div>Parent Name: {`${name.name}--${name.age}`}</div>
      </MRow>
      <MButton onClick={handleChangeName}>change ParentName</MButton>
      <MButton onClick={handleChange}>not change ParentName value</MButton>
      <Demo22 parentName={name} />
    </PageHeaderWrapper>
  );
};

export default Demo2;
