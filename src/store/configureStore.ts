import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import rootReducer, { RootState } from "../reducers";

const store = configureStore({
  reducer: rootReducer,
  middleware: [...getDefaultMiddleware<RootState>()]
});

export default store;
export type AppDispatch = typeof store.dispatch;
