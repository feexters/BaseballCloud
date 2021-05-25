import { combineReducers } from "redux";
import { auth, user } from "store/slices";
import { reducer as toastrReducer } from "react-redux-toastr";
import storage from "redux-persist/lib/storage";
import persistReducer from "redux-persist/es/persistReducer";

const authPersistConfig = {
  key: "auth",
  storage: storage,
  blacklist: ["isValid"],
};

export const reducer = combineReducers({
  auth: persistReducer(authPersistConfig, auth.reducer),
  user: user.reducer,
  toastr: toastrReducer,
});
