import axios from "axios";
import { instance } from "lib/utils";

export async function fetchSignedUrl(file: File, signedUrl: string) {
  axios
    .put(signedUrl, file)
    .then((response) => response)
    .catch((error) => error.response);
}

export async function fetchUploadAvatar(file: File) {
  const formData = new FormData();
  formData.append(file.name, file);

  return await (
    await instance()
  )
    .post("s3/signed_url", { name: file.name })
    .then((response) => response)
    .catch((error) => error.response);
}
