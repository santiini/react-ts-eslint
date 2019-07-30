/**
 * teamReducer
 */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {Reducer} from 'react';

export interface RootState {
  team: string;
  counter: number;
}

export interface RootActions<T, Type = string, P = any> {
  key: T;
  type: Type;
  payload?: P;
}

export enum TeamActionTypes {
  ChangeTeam = 'changeTeam',
}

export interface TeamState {
  team: string;
}

export interface TeamActions {
  key: 'team';
  type: TeamActionTypes;
  payload?: {
    team: string;
  };
}

const teamReducer: Reducer<
  RootState,
  RootActions<'team', TeamActionTypes, {team: string}>
> = (state, action) => {
  switch (action.type) {
    case TeamActionTypes.ChangeTeam:
      return {
        ...state,
        team: action.payload ? action.payload.team : state.team,
      };
    default:
      return state;
  }
};

export default teamReducer;
