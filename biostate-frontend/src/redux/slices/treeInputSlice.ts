import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TreeInputState {
  input: string;
}

const initialState: TreeInputState = {
  input: "",
};

const treeInputSlice = createSlice({
  name: "treeInput",
  initialState,
  reducers: {
    setTreeInput: (state, action: PayloadAction<any>) => {
      state.input = action.payload;
    },
    clearTreeInput: (state) => {
      state.input = "";
    },
  },
});

export const { setTreeInput, clearTreeInput } = treeInputSlice.actions;
export default treeInputSlice.reducer;
