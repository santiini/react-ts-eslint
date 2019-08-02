import React from 'react';
import TodolistCousumer from './consumer';
import TodolistCousumer1 from './consumer1';

const Lear4Demo: React.FC = (props) => {
  return (
    <div>
      <h4>Lear4Demo---ContextApi</h4>
      <TodolistCousumer />
      <h4>Learn4--demo2</h4>
      <TodolistCousumer1 />
    </div>
  );
};

export default Lear4Demo;
