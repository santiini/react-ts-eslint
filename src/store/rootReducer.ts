/**
 * rootReducer
 */
import {combineReducer} from './combineReducer';
import teamReducer from './teamReducer';
import counterReducer from './counterReducer';
import {RootState, RootActions} from './interface';
import {themeReducer} from './themeReducer';

export const rootReducer = combineReducer<RootState, RootActions>({
  team: teamReducer,
  counter: counterReducer,
  theme: themeReducer,
});
