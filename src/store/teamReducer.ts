/**
 * teamReducer
 */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {Reducer} from 'react';
import {StoreAction} from './interface';

export enum TeamActionTypes {
  ChangeTeam = 'changeTeam',
}

export interface TeamState {
  data: string;
  id: number;
}

export const teamStateData: TeamState = {
  data: '',
  id: 0,
};

export type TeamAction = StoreAction<'team', TeamActionTypes>;

const teamReducer: Reducer<TeamState, TeamAction> = (
  state = teamStateData,
  action
) => {
  switch (action.type) {
    case TeamActionTypes.ChangeTeam:
      return action.payload
        ? {
            data: action.payload.data,
            id: action.payload.total || state.id,
          }
        : state;
    default:
      return state;
  }
};

export default teamReducer;
