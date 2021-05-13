import { Headers } from "lib/interfaces";

class Auth {
  TOKEN = "token";
  CLIENT = "client";
  UID = "uid";

  constructor() {
    if (!localStorage.getItem(this.TOKEN)) {
      localStorage.setItem(this.TOKEN, "");
    }

    if (!localStorage.getItem(this.CLIENT)) {
      localStorage.setItem(this.CLIENT, "");
    }

    if (!localStorage.getItem(this.UID)) {
      localStorage.setItem(this.UID, "");
    }
  }

  getHeaders(): Headers {
    return {
      "access-token": localStorage.getItem(this.TOKEN)!,
      client: localStorage.getItem(this.CLIENT)!,
      uid: localStorage.getItem(this.UID)!,
    };
  }

  deleteHeaders() {
    localStorage.getItem(this.TOKEN)!;
    localStorage.getItem(this.CLIENT)!;
    localStorage.getItem(this.UID)!;
  }

  setHeaders(headers: Headers) {
    localStorage.setItem(this.TOKEN, headers["access-token"]);
    localStorage.setItem(this.CLIENT, headers.client);
    localStorage.setItem(this.UID, headers.uid);
  }
}

export default new Auth();
