import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  content: "",
};

const mscSlice = createSlice({
  name: "msc",
  initialState,
  reducers: {
    changeSectionContent: (state, action) => {
      state.content = action.payload;
    },
  },
});

export default mscSlice.reducer;
export const { changeSectionContent } = mscSlice.actions;
