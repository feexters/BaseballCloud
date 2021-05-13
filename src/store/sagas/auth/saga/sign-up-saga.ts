import {put, takeEvery, call, StrictEffect} from 'redux-saga/effects';
import {AUTH_SIGN_UP} from '../actions/actions';
import {SignUpData, Headers} from 'lib/interfaces';
import {fetchSignUp} from '../axios';
import { authorized, finishAuthSubmitting, startAuthSubmitting } from 'store/slices';

export interface SingUpWorker {
  type: string;
  payload: SignUpData;
}

interface Response {
  headers: Headers;
  status: number;
}

function* signUpWorker({
  payload,
}: SingUpWorker): Generator<StrictEffect, void, Response> {
  try {
    yield put(startAuthSubmitting());
    
    const response = yield call(() => fetchSignUp(payload));

    if (response.status === 422) {
      yield put(finishAuthSubmitting('Email has already been taken'));
    } else if (response.status === 200 ) {
      yield put(authorized({ status: true, headers: response.headers}));
      yield put(finishAuthSubmitting(''));
    } else {
      yield put(finishAuthSubmitting(''));
    }
    
  } catch (e) {
    console.error(e);
  }
}

export function* watchSignUp() {
  yield takeEvery(AUTH_SIGN_UP, signUpWorker);
}
