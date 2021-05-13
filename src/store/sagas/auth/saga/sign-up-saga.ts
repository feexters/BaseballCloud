import {put, takeEvery, call, StrictEffect} from 'redux-saga/effects';
import {AUTH_SIGN_UP} from '../actions/actions';
import {SignUpData} from 'lib/interfaces';
import {authSingIn} from '../actions';
import {fetchSignUp} from '../axios';

export interface SingUpWorker {
  type: string;
  payload: SignUpData;
}

function* signUpWorker({
  payload,
}: SingUpWorker): Generator<StrictEffect, void, string> {
  try {
    const response = yield call(() => fetchSignUp(payload));
    if (response === 'QueryFailedError') {
      console.log('This user already exist');
    } else {
      const {email, password} = payload;
      yield put(authSingIn({email, password}));
    }
    
  } catch (e) {
    console.error(e);
  }
}

export function* watchSignUp() {
  yield takeEvery(AUTH_SIGN_UP, signUpWorker);
}
