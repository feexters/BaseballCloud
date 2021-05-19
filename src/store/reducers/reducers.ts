import {combineReducers} from 'redux';
import { auth, user } from 'store/slices';
import {reducer as toastrReducer} from 'react-redux-toastr';

export const reducer = combineReducers({
  auth: auth.reducer,
  user: user.reducer,
  toastr: toastrReducer
});