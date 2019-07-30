import React, {FC, useReducer, createContext, useContext} from 'react';
import {RootActions, RootState} from './interface';
import {rootReducer} from './rootReducer';
import {teamStateData} from './teamReducer';
import {counterStateData} from './counterReducer';
import {themeStateData} from './themeReducer';

type StateContextOptions = [RootState, React.Dispatch<RootActions>];
export const StateContext = createContext<StateContextOptions | null>(null);

const initialState = {
  team: teamStateData,
  counter: counterStateData,
  theme: themeStateData,
};

export const StateProvider: FC = (props) => {
  const stateValue = useReducer(rootReducer, initialState);

  return (
    <StateContext.Provider value={stateValue}>
      {props.children}
    </StateContext.Provider>
  );
};

export const useStateValue = (): StateContextOptions | null =>
  useContext(StateContext);
