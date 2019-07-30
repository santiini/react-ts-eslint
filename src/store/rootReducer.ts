/**
 * rootReducer
 */
import {combineReducer} from './combineReducer';
import teamReducer from './teamReducer';
import counterReducer from './counterReducer';

export const rootReducer = combineReducer({
  team: teamReducer,
  counter: counterReducer,
});
