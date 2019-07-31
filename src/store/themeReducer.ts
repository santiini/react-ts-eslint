import {Reducer} from 'react';
import {StoreAction} from './interface';

/**
 * themeReducer
 */
export enum ThemeActionTypes {
  ChangeTheme = 'changeTheme',
}

export interface ThemeState {
  color: string;
  fontSize: number;
  name: string;
  bgColor: string;
}

export type ThemeAction = StoreAction<'theme', ThemeActionTypes>;

export const themeStateData: ThemeState = {
  color: 'rgb(0,0,0,.65)',
  fontSize: 14,
  name: 'default',
  bgColor: 'rgba(0, 0, 0, 0.025)',
};

export const themeReducer: Reducer<ThemeState, ThemeAction> = (
  state = themeStateData,
  action
) => {
  switch (action.type) {
    case ThemeActionTypes.ChangeTheme:
      return {
        ...state,
        name: action.payload ? action.payload.data : state.name,
        color: 'pink',
        bgColor: '#777474',
        fontSize: 16,
      };
    default:
      return state;
  }
};
