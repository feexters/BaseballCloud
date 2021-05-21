import { SignInData, SignUpData } from "lib/interfaces";
import { instance } from "lib/utils/instance";

export async function fetchSignIn(user: SignInData) {
  return await (
    await instance()
  )
    .post("auth/sign_in", user)
    .then((response) => {
      return response
    })
    .catch((e) => console.log(e));
}

export async function fetchValidateToken() {
  return await (
    await instance()
  )
    .get(`auth/validate_token`)
    .then((response) => {
      return response.headers["access-token"]
    })
    .catch((e) => console.log(e));
}

export async function fetchSignUp(user: SignUpData) {
  return await (
    await instance()
  )
    .post("auth", user)
    .then((response) =>  response)
    .catch(error => error.response);
}

export async function fetchForgotPassword(email: string) {
  const data = {
    email: email,
    redirect_url: "https://baseballcloud-front.herokuapp.com/resetpassword"
  }

  return await (
    await instance()
  )
    .post("auth/password", data)
    .then((response) =>  response.status)
    .catch(error => error.response.status);
}
