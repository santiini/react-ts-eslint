/**
 * contextApi 和 useReducer
 */
import React, {useReducer, FC, useContext} from 'react';
import {
  CounterStateType,
  counterReducer,
  initialCountState,
  CountAction,
} from './reducer';

type StateContextOptions = [CounterStateType, React.Dispatch<CountAction>];
const CountContext = React.createContext<StateContextOptions | null>(null);

export const CountProvider: FC = ({children}) => {
  const contextValue = useReducer(counterReducer, initialCountState);
  return (
    <CountContext.Provider value={contextValue}>
      {children}
    </CountContext.Provider>
  );
};

export const useCount = (): null | StateContextOptions =>
  useContext(CountContext);
