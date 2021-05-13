import {applyMiddleware, createStore} from '@reduxjs/toolkit';
import {reducer} from './reducers';
import createSagaMiddleware from 'redux-saga';
import {rootSaga} from './sagas';

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(reducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;