/**
 * store interface
 */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {TeamState, TeamAction} from './teamReducer';
import {CounterState, CounterAction} from './counterReducer';

export interface ActionPayload<T = any> {
  data: T;
  total?: number;
}

export interface StoreAction<K, T, P = ActionPayload> {
  key: K;
  type: T;
  payload?: P;
}

export interface RootState {
  team: TeamState;
  counter: CounterState;
}

export type RootActions = TeamAction | CounterAction;
