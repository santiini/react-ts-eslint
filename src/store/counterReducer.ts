/**
 * counterReducer
 */
import {Reducer} from 'react';
import {StoreAction} from './interface';

export enum CounterActionTypes {
  Increment = 'increment',
  Decrement = 'decrement',
}

export interface CounterState {
  count: number;
}

export type CounterAction = StoreAction<'counter', CounterActionTypes>;

export const counterStateData = {
  count: 100,
};

const counterReducer: Reducer<CounterState, CounterAction> = (
  state = counterStateData,
  action
) => {
  switch (action.type) {
    case CounterActionTypes.Increment:
      return {
        count: state.count + (action.payload ? action.payload.data : 0),
      };
    case CounterActionTypes.Decrement:
      return {
        count: state.count - (action.payload ? action.payload.data : 0),
      };
    default:
      return state;
  }
};

export default counterReducer;
