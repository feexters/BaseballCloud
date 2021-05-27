import { createAction } from "@reduxjs/toolkit";
import { SignInData, SignUpData } from "lib/interfaces";

export const AUTH_SIGN_IN = "auth/sign-in";
export const AUTH_SIGN_UP = "auth/sign-up";
export const AUTH_VALIDATE_TOKEN = "auth/validate-token";
export const AUTH_FORGOT_PASSWORD = "auth/forgot-password";
export const AUTH_SIGN_OUT = "auth/sign-out";

export const authSingIn = createAction<SignInData>(AUTH_SIGN_IN);

export const authSingUp = createAction<SignUpData>(AUTH_SIGN_UP);

export const authSingOut = createAction(AUTH_SIGN_OUT);

export const validateToken = createAction(AUTH_VALIDATE_TOKEN);

export const forgotPassword = createAction<string>(AUTH_FORGOT_PASSWORD);
