// src/redux/store.ts
import { configureStore } from "@reduxjs/toolkit";
import treeInputReducer from "./slices/treeInputSlice";

const store = configureStore({
  reducer: {
    treeInput: treeInputReducer,
    // Add other reducers here if needed
  },
});

export default store;

// Optional: Export RootState and AppDispatch types for TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
