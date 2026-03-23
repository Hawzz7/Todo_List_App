import { createSlice } from "@reduxjs/toolkit";

const getInitialMode = () => {
  const saved = localStorage.getItem("theme");
  return saved ? saved : "light";
};

const themeSlice = createSlice({
  name: "theme",
  initialState: {
    mode: getInitialMode(),
  },
  reducers: {
    toggleTheme: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
      localStorage.setItem("theme", state.mode);
    },
  },
});

export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
