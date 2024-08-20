import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import { setupListeners } from '@reduxjs/toolkit/query';
import { fractionalApi } from "../api/api";

export const store = configureStore({
    reducer: {
        [fractionalApi.reducerPath]: fractionalApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(fractionalApi.middleware),
});

setupListeners(store.dispatch);

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
