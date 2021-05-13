import { put, takeEvery, call, StrictEffect } from "redux-saga/effects";
import { authorized, finishAuthSumbmiting, startSubmitting } from "store/slices";
import { AUTH_SIGN_IN } from "../actions";
import { Headers, SignInData } from "lib/interfaces";
import { fetchSignIn } from "../axios";

export interface SingInWorker {
  type: string;
  payload: SignInData;
}

function* signInWorker({
  payload,
}: SingInWorker): Generator<StrictEffect, void, Headers> {
  try {
    yield put(startSubmitting())
    const headers = yield call(() => fetchSignIn(payload));

    
    if (headers) {
      yield put(authorized({ status: true, headers: headers}));
      yield put(finishAuthSumbmiting(''))
    } else {
      yield put(finishAuthSumbmiting('Invalid login credentials. Please try again.'));
    }
  } catch (e) {
    console.error(e);
  }
}

export function* watchSignIn() {
  yield takeEvery(AUTH_SIGN_IN, signInWorker);
}
