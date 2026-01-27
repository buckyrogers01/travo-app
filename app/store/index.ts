import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import guideReducer from "./slices/guideSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    guide: guideReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
