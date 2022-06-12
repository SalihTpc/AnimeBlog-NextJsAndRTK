import {
  Action,
  PayloadAction,
  configureStore,
  ThunkAction,
} from "@reduxjs/toolkit";
import blogReducer from "./blog/blogSlice";
import counterReducer from "./counter/counterSlice";

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

let store;

export default function getStore(incomingPreloadState?: RootState) {
  store = configureStore({
    reducer: {
      blog: blogReducer,
      counter: counterReducer,
    },
    preloadedState: incomingPreloadState,
  });
  return store;
}
