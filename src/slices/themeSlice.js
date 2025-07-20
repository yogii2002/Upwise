import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    theme:  localStorage.getItem("upwise-theme") || "coffee"
};

const themeSlice = createSlice({
  name: "theme",
  initialState: initialState,
  reducers: {
    setTheme(state, value) {
        state.theme = value.payload;
        localStorage.setItem('upwise-theme',state.theme);
    },
  },
});

export const { setTheme } = themeSlice.actions;

export default themeSlice.reducer;
