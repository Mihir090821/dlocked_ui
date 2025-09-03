import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isDarkMode: false, // Default to dark based on your Figma designs
  primaryColor: "#6C5CE7",
  accentColor: "#00CEC9",
  fontSize: "medium", // small, medium, large
  animations: true,
  highContrast: false,
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.isDarkMode = !state.isDarkMode;
    },
    setThemeMode: (state, action) => {
      state.isDarkMode = action.payload;
    },
    setPrimaryColor: (state, action) => {
      state.primaryColor = action.payload;
    },
    setAccentColor: (state, action) => {
      state.accentColor = action.payload;
    },
    setFontSize: (state, action) => {
      state.fontSize = action.payload;
    },
    toggleAnimations: (state) => {
      state.animations = !state.animations;
    },
    toggleHighContrast: (state) => {
      state.highContrast = !state.highContrast;
    },
    resetTheme: () => initialState,
  },
});

export const {
  toggleTheme,
  setThemeMode,
  setPrimaryColor,
  setAccentColor,
  setFontSize,
  toggleAnimations,
  toggleHighContrast,
  resetTheme,
} = themeSlice.actions;

export default themeSlice.reducer;
