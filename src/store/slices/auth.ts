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
    role: '',
    headers: {} as Headers,
    submit: {} as Submit,
    isValid: false,
    validationLoading: true,
  },
  reducers: {
    authorized(
      state,
      action: PayloadAction<{ status: boolean; headers: Headers, role: string }>
    ) {
      const { status, headers, role } = action.payload;
      state.authorized = status;
      Auth.setHeaders(headers);
      state.headers = headers;
      state.role = role;
    },
    logout(state) {
      state.headers = {} as Headers;
      Auth.deleteHeaders();
      state.authorized = false;
      state.isValid = false
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
    startValidation(state) {
      state.validationLoading = true;
    },
    finishValidation(state) {
      state.validationLoading = false;
    },
  },
});

export const {
  authorized,
  logout,
  startAuthSubmitting,
  finishAuthSubmitting,
  setIsValidate,
  startValidation,
  finishValidation,
} = auth.actions;
