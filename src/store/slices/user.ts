import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const user = createSlice({
  name: "user",
  initialState: {
    uploadAvatar: ''
  },
  reducers: {
    uploadAvatar(state, action: PayloadAction<string>) {
      state.uploadAvatar = 'https://baseballcloud-staging-assets.s3.us-east-2.amazonaws.com/' + action.payload
    },
    removeUploadAvatar(state) {
      state.uploadAvatar = ''
    }
  },
});

export const { uploadAvatar, removeUploadAvatar } =
  user.actions;
