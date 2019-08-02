/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * reudcer
 */
import {Reducer} from 'react';
export const initialCountState = {
  name: 'count',
  count: 1,
};

export enum ActionType {
  Increment = 'increment',
  Decrement = 'decrement',
  Reset = 'reset',
}

interface CountAction {
  type: ActionType;
  payload?: any;
}

export const counterReducer: Reducer<typeof initialCountState, CountAction> = (
  state = initialCountState,
  action
) => {
  switch (action.type) {
    case ActionType.Increment:
      return {
        ...state,
        count: state.count + 1,
      };
    case ActionType.Decrement:
      return {
        ...state,
        count: state.count - 1,
      };
    case ActionType.Reset:
      return {
        ...state,
        count: 0,
      };
    default:
      throw new Error('Unexpected action');
  }
};
