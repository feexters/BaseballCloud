import { put, takeEvery, call } from "redux-saga/effects";
import { logout } from "store/slices";
import { AUTH_SIGN_OUT } from "../actions";
import { fetchSignOut } from "../axios";

function* signOutWorker() {
  try {
    yield call(fetchSignOut);
    yield put(logout());
  } catch (e) {
    console.error(e);
  }
}

export function* watchSignOut() {
  yield takeEvery(AUTH_SIGN_OUT, signOutWorker);
}
