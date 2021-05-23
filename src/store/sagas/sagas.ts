import { all } from "@redux-saga/core/effects";
import {
  watchSignIn,
  watchSignUp,
  watchValidateToken,
  watchForgotPassword,
} from "./auth";
import { watchSignOut } from "./auth/saga";
import { watchUploadAvatar } from "./user";

export default function* rootSaga() {
  yield all([
    watchSignUp(),
    watchSignIn(),
    watchValidateToken(),
    watchForgotPassword(),
    watchSignOut(),
    watchUploadAvatar()
  ]);
}
