import { createAction } from "@reduxjs/toolkit";

export const USER_UPLOAD_AVATAR = "user/upload-avatar";

export const userUploadAvatar = createAction<File>(USER_UPLOAD_AVATAR);
