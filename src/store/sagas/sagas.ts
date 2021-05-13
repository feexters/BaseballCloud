import {all} from '@redux-saga/core/effects';
import {watchSignIn, watchSignUp} from './auth';
import { watchValidateToken } from './auth/saga/validate-token';

export default function* rootSaga() {
  yield all([
    watchSignUp(),
    watchSignIn(),
    watchValidateToken(),
  ]);
}