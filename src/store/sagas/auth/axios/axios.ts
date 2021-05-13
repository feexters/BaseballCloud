import { SignInData, SignUpData } from "lib/interfaces";
import { instance } from "lib/utils/instance";

export async function fetchSignIn(user: SignInData) {
  return await (
    await instance()
  )
    .post("auth/sign_in", user)
    .then((response) => {
      return response.headers
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
    .post("auth/sign_up", user)
    .then((response) => {
      return response.data.name;
    })
    .catch((e) => console.log(e));
}
