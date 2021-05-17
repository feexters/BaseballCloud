import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserData } from "lib/interfaces";

interface Submit {
  status: boolean;
  result: string;
}

export const user = createSlice({
  name: "user",
  initialState: {
    data: {} as UserData,
    submit: {} as Submit,
  },
  reducers: {
    setUserData(state, action: PayloadAction<UserData>) {
      state.data = action.payload;
    },
    startUserSubmitting(state) {
      state.submit.status = true;
    },
    finishUserSubmitting(state, action: PayloadAction<string>) {
      state.submit.status = false;
      state.submit.result = action.payload;
    },
  },
});

export const { startUserSubmitting, finishUserSubmitting, setUserData } =
  user.actions;
