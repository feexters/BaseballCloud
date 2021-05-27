import { put, takeEvery, call, StrictEffect } from "redux-saga/effects";
import { uploadAvatar } from "store/slices";
import { USER_UPLOAD_AVATAR } from "../actions";
import { fetchSignedUrl, fetchUploadAvatar } from "../axios";

export interface SingInWorker {
  type: string;
  payload: File;
}

interface ResponseData {
  data: {
    fileKey: string,
    fileName: string,
    signedUrl: string,
  }
}

function* uploadAvatarWorker({
  payload,
}: SingInWorker): Generator<StrictEffect, void, ResponseData> {
  try {
    const { data } = yield call(fetchUploadAvatar, payload);
    yield call(fetchSignedUrl, payload, data.signedUrl)
    yield put(uploadAvatar(data.fileKey))
  } catch (e) {
    console.error(e);
  }
}

export function* watchUploadAvatar() {
  yield takeEvery(USER_UPLOAD_AVATAR, uploadAvatarWorker);
}
