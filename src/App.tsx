import React from 'react';
import './App.css';
import {StateProvider} from './store';
import Home from './Home';

const App: React.FC = () => {
  return (
    <div className="App">
      <StateProvider>
        <Home />
      </StateProvider>
    </div>
  );
};

export default App;
