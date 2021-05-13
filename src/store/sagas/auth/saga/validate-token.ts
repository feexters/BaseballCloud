import { put, takeEvery, call, StrictEffect } from "redux-saga/effects";
import { setIsValidate } from "store/slices";
import { AUTH_VALIDATE_TOKEN } from "../actions";
import { fetchValidateToken } from "../axios";

export interface ValidateTokenWorker {
  type: string;
  payload: string;
}

function* validateTokenWorker({
  payload,
}: ValidateTokenWorker): Generator<StrictEffect, void, string> {
  try {
    const token = yield call(() => fetchValidateToken());

    if (token) {
      yield put(setIsValidate(true));
    } else {
      yield put(setIsValidate(false));
    }
  } catch (e) {
    console.error(e);
  }
}

export function* watchValidateToken() {
  yield takeEvery(AUTH_VALIDATE_TOKEN, validateTokenWorker);
}
