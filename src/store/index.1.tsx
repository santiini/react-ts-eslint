import React, {Reducer, FC, useReducer, createContext, useContext} from 'react';

export enum ActionType {
  Increment = 'increment',
  Decrement = 'decrement',
}

interface StoreState {
  count: number;
}

interface StoreAction {
  type: ActionType;
  payload?: {
    count: number;
  };
}

const initialState: StoreState = {
  count: 0,
};

const reducer: Reducer<StoreState, StoreAction> = (state, action) => {
  switch (action.type) {
    case ActionType.Increment:
      return {
        count: state.count + (action.payload ? action.payload.count : 0),
      };
    case ActionType.Decrement:
      return {
        count: state.count - (action.payload ? action.payload.count : 0),
      };
    default:
      return state;
  }
};

type StateContextOptions = [StoreState, React.Dispatch<StoreAction>];
export const StateContext = createContext<StateContextOptions | null>(null);

export const StateProvider: FC = (props) => {
  const stateValue = useReducer(reducer, initialState);
  return (
    <StateContext.Provider value={stateValue}>
      {props.children}
    </StateContext.Provider>
  );
};

export const useStateValue = (): StateContextOptions | null =>
  useContext(StateContext);
