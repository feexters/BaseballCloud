import {combineReducers} from 'redux';
import { auth } from 'store/slices';

export const reducer = combineReducers({
  auth: auth.reducer,
});