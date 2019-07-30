/**
 * combineReducer
 */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {Reducer} from 'react';
import {RootState, RootActions} from './interface';

export function combineReducer1(
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

export function combineReducer<S, A extends {key: keyof S}>(
  reducers: Record<A['key'], any>
): Reducer<S, A> {
  return (state, action): S => {
    if (!!reducers[action.key]) {
      return {
        ...state,
        [action.key]: reducers[action.key](state[action.key], action),
      };
    }

    return state;
  };
}
