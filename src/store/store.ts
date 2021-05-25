import { applyMiddleware, createStore } from "@reduxjs/toolkit";
import { reducer } from "./reducers";
import createSagaMiddleware from "redux-saga";
import { rootSaga } from "./sagas";
import { composeWithDevTools } from "redux-devtools-extension";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import persistStore from "redux-persist/es/persistStore";

const persistConfig = {
  key: "root",
  storage: storage,
  blacklist: ["user", "auth"],
};

const pReducer = persistReducer(persistConfig, reducer);

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(
  pReducer,
  composeWithDevTools(applyMiddleware(sagaMiddleware))
);
export const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
