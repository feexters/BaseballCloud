import axios from "axios";
import Auth from "./auth-services";

export const instance = async () => {
  const authHeaders = Auth.getHeaders()

  let headers = {};
  if (authHeaders["access-token"]) {
    headers = {
      ...authHeaders,
      "Content-Type": "application/json",
    };
  }
  
  const axiosCreate = axios.create({
    headers,
    baseURL: "https://baseballcloud-back.herokuapp.com/api/v1/",
  });

  return axiosCreate;
};
