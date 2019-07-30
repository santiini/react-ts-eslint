/**
 * combineReducer
 */
/* eslint-disable */
export function createReducer<S, A extends {type: string}>(
  initialState: S,
  handlers: {
    [P in A['type']]?: A extends {type: P} ? (state: S, action: A) => S : never;
  }
): (state: S, action: A) => S {
  return (state: S = initialState, action: A): S => {
    if (handlers.hasOwnProperty(action.type)) {
      return (handlers as any)[action.type](state, action);
    } else {
      return state;
    }
  };
}

export interface RootState {
  team: string;
  counter: number;
}

export interface RootActions<T, Type = string, P = any> {
  key: T;
  type: Type;
  payload?: P;
}

type StateReducer<S> = (state: S, action: RootActions<keyof S>) => S;

export function combineReducer<S = RootState>(
  reducers: Record<keyof S, StateReducer<S>>
): StateReducer<S> {
  return (state, action) => {
    if (!!reducers[action.key]) {
      return reducers[action.key](state, action);
    }
    return state;
  };
}
export function combineReducer1<S = RootState>(
  reducers: Record<keyof S, StateReducer<S>>
): StateReducer<S> {
  return (state, action) => {
    if (!!reducers[action.key]) {
      return reducers[action.key](state, action);
    }
    return state;
  };
}
