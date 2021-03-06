import { put, takeEvery, call, StrictEffect } from "redux-saga/effects";
import {
  authorized,
  finishAuthSubmitting,
  startAuthSubmitting,
} from "store/slices";
import { AUTH_SIGN_IN } from "../actions";
import { Headers, SignInData } from "lib/interfaces";
import { fetchSignIn } from "../axios";

export interface SingInWorker {
  type: string;
  payload: SignInData;
}

interface ResponseData {
  data: {
    data: {
      role: string;
      email: string;
    };
  };
  headers: Headers;
}

function* signInWorker({
  payload,
}: SingInWorker): Generator<StrictEffect, void, ResponseData> {
  try {
    yield put(startAuthSubmitting());
    const response = yield call(fetchSignIn, payload);

    if (response.headers) {
      yield put(
        authorized({
          status: true,
          headers: response.headers,
          role: response.data.data.role,
          email: response.data.data.email,
        })
      );
      yield put(finishAuthSubmitting(""));
    } else {
      yield put(
        finishAuthSubmitting("Invalid login credentials. Please try again.")
      );
    }
  } catch (e) {
    yield put(
      finishAuthSubmitting("Invalid login credentials. Please try again.")
    );
    console.error(e);
  }
}

export function* watchSignIn() {
  yield takeEvery(AUTH_SIGN_IN, signInWorker);
}
