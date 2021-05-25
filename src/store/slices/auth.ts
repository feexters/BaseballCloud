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
    auth_info: {
      role: "",
      email: "",
    },
    headers: {} as Headers,
    submit: {} as Submit,
    isValid: false,
    validationLoading: true,
  },
  reducers: {
    authorized(
      state,
      action: PayloadAction<{
        status: boolean;
        headers: Headers;
        role: string;
        email: string;
      }>
    ) {
      const { status, headers, role, email } = action.payload;
      state.authorized = status;
      Auth.setHeaders(headers);
      state.headers = headers;
      state.auth_info = {
        role: role,
        email: email,
      };
    },
    logout(state) {
      state.headers = {} as Headers;
      Auth.deleteHeaders();
      state.authorized = false;
      state.isValid = false;
      state.auth_info.role = "";
      state.auth_info.email = "";
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
