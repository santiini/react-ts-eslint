/**
 * counterReducer
 */
import {Reducer} from 'react';

export enum CounterActionTypes {
  Increment = 'increment',
  Decrement = 'decrement',
}

export interface CounterState {
  count: number;
}

export interface CounterAction {
  key: 'couter';
  type: CounterActionTypes;
  payload?: {
    count: number;
  };
}

export const counterState = {
  count: 0,
};

const counterReducer: Reducer<CounterState, CounterAction> = (
  state = counterState,
  action
) => {
  switch (action.type) {
    case CounterActionTypes.Increment:
      return {
        count: state.count + (action.payload ? action.payload.count : 0),
      };
    case CounterActionTypes.Decrement:
      return {
        count: state.count - (action.payload ? action.payload.count : 0),
      };
    default:
      return state;
  }
};

export default counterReducer;
