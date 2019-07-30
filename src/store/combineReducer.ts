/**
 * combineReducer
 */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {Reducer} from 'react';
import {RootState, RootActions} from './interface';

export function combineReducer(
  reducers: Record<RootActions['key'], any>
): Reducer<RootState, RootActions> {
  return (state, action): RootState => {
    if (!!reducers[action.key]) {
      return {
        ...state,
        [action.key]: reducers[action.key](state[action.key], action),
      };
    }

    return state;
  };
}
