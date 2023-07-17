import { createSlice } from "@reduxjs/toolkit";

const initialTheme = localStorage.getItem("theme") || "light";

const initialState = {
  theme: initialTheme,
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setTheme: (state, action) => {
      localStorage.setItem("theme", action.payload);
      state.theme = action.payload;
    },
  },
});

export default themeSlice.reducer;
export const {setTheme} = themeSlice.actions;
