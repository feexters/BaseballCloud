import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Headers } from "lib/interfaces";
import { Auth } from "lib/utils";

interface Submit {
  status: boolean;
  result: string;
}

export const auth = createSlice({
  name: "auth",
  initialState: {
    authorized: false,
    headers: {} as Headers,
    submit: {} as Submit,
    isValid: false,
  },
  reducers: {
    authorized(
      state,
      action: PayloadAction<{ status: boolean; headers: Headers }>
    ) {
      const { status, headers } = action.payload;
      state.authorized = status;
      Auth.setHeaders(headers)
      state.headers = headers;
    },
    logout(state) {
      state.headers = {} as Headers;
      Auth.deleteHeaders()
      state.authorized = false;
    },
    setIsValidate(state, action: PayloadAction<boolean>) {
      state.isValid = action.payload;
    },
    startAuthSubmitting(state) {
      state.submit.status = true;
    },
    finishAuthSubmitting(state, action: PayloadAction<string>) {
      state.submit.status = false;
      state.submit.result = action.payload;
    },
  },
});

export const {
  authorized,
  logout,
  startAuthSubmitting,
  finishAuthSubmitting,
  setIsValidate,
} = auth.actions;
