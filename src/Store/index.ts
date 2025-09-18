import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../Api/apiEntry";

// Configure the Redux store
export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

// Types for using in components
export type RootState = ReturnType<typeof store.getState>;
