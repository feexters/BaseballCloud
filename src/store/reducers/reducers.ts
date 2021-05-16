import {combineReducers} from 'redux';
import { auth, user } from 'store/slices';

export const reducer = combineReducers({
  auth: auth.reducer,
  user: user.reducer,
});