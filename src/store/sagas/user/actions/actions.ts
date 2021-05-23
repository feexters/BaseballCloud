export const USER_UPLOAD_AVATAR = 'user/upload-avatar';

export const userUploadAvatar = (payload: File) => {
  return {type: USER_UPLOAD_AVATAR, payload};
};