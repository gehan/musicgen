import { configureStore } from "@reduxjs/toolkit";

import gameReducer from "./gameSlice";

export const makeStore = () =>
  configureStore({
    reducer: {
      game: gameReducer,
    },
  });

export const store = makeStore();

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
