import { put, takeEvery, call, StrictEffect } from "redux-saga/effects";
import { finishValidation, setIsValidate, startValidation } from "store/slices";
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
    yield put(startValidation())

    const token = yield call(() => fetchValidateToken());

    if (token) {
      yield put(setIsValidate(true));
    } else {
      yield put(setIsValidate(false));
    }

    yield put(finishValidation())
  } catch (e) {
    yield put(finishValidation())
    console.error(e);
  }
}

export function* watchValidateToken() {
  yield takeEvery(AUTH_VALIDATE_TOKEN, validateTokenWorker);
}
