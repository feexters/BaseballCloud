import { Headers } from "lib/interfaces";
import getCookie from "./get-cookie";

class Auth {
  TOKEN = "token";
  CLIENT = "client";
  UID = "uid";

  getHeaders(): Headers {
    return {
      "access-token": getCookie(this.TOKEN),
      client:         getCookie(this.CLIENT)!,
      uid:            getCookie(this.UID)!,
    };
  }

  deleteHeaders() {
    document.cookie = `${this.TOKEN}=; max-age=0}`
    document.cookie = `${this.CLIENT}=; max-age=0}`
    document.cookie = `${this.UID}=; max-age=0}`
  }

  setHeaders(headers: Headers) {
    document.cookie = `${this.TOKEN}=${headers["access-token"]}; secure`
    document.cookie = `${this.CLIENT}=${headers.client}; secure`
    document.cookie = `${this.UID}=${headers.uid}; secure`
  }
}

export default new Auth();
