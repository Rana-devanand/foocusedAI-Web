import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import themeReducer from "./slices/themeSlice";
import uiReducer from "./slices/uiSlice";
import { smartExpiryApi } from "./api/smartExpiryApi";
import { neuroTrackApi } from "./api/neuroTrackApi";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    theme: themeReducer,
    ui: uiReducer,
    [smartExpiryApi.reducerPath]: smartExpiryApi.reducer,
    [neuroTrackApi.reducerPath]: neuroTrackApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(smartExpiryApi.middleware, neuroTrackApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
