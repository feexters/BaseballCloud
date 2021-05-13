import {all} from '@redux-saga/core/effects';
import {watchSignIn, watchSignUp, watchValidateToken, watchForgotPassword} from './auth';

export default function* rootSaga() {
  yield all([
    watchSignUp(),
    watchSignIn(),
    watchValidateToken(),
    watchForgotPassword(),
  ]);
}