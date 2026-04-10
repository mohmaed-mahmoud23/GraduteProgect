// src/store/store.ts
import { configureStore } from "@reduxjs/toolkit";
import { ApiSlice } from "../redux/slices/ApiSlice";

export const store = configureStore({
  reducer: {
    


        [ApiSlice.reducerPath]: ApiSlice.reducer,

  },

  middleware: (getDefaultMiddleware) =>

    getDefaultMiddleware({
      serializableCheck :false
    }).concat([ApiSlice.middleware])
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
