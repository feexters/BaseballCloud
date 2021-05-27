import { call, put, StrictEffect, takeEvery } from "@redux-saga/core/effects";
import { finishAuthSubmitting, startAuthSubmitting } from "store/slices";
import { AUTH_FORGOT_PASSWORD } from "../actions";
import { fetchForgotPassword } from "../axios";

export interface ForgotPasswordWorker {
  type: string;
  payload: string;
}

function* forgotPasswordWorker({
  payload,
}: ForgotPasswordWorker): Generator<StrictEffect, void, number> {
    yield put(startAuthSubmitting())
    const status = yield call(fetchForgotPassword, payload)

    if (status === 404) {
        yield put(finishAuthSubmitting(`Unable to find user with email '${payload}'.`))
    } else if (status === 500) {
        yield put(finishAuthSubmitting(''))
    } else {
        yield put(finishAuthSubmitting(''))
    }
}

export function* watchForgotPassword() {
  yield takeEvery(AUTH_FORGOT_PASSWORD, forgotPasswordWorker);
}
