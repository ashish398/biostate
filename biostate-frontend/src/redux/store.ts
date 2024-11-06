import { configureStore } from "@reduxjs/toolkit";
import treeInputReducer from "./slices/treeInputSlice";
import themeReducer from "./slices/themeSlice";

const store = configureStore({
  reducer: {
    treeInput: treeInputReducer,
    theme: themeReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
