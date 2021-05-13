import {SignInData, SignUpData} from 'lib/interfaces';

export const AUTH_SIGN_IN = 'auth/sign-in';
export const AUTH_SIGN_UP = 'auth/sign-up';
export const AUTH_VALIDATE_TOKEN = 'auth/validate-token';

export const authSingIn = (payload: SignInData) => {
  return {type: AUTH_SIGN_IN, payload};
};

export const authSingUp = (payload: SignUpData) => {
  return {type: AUTH_SIGN_UP, payload};
};

export const validateToken = () => {
  return {type: AUTH_VALIDATE_TOKEN};
};

