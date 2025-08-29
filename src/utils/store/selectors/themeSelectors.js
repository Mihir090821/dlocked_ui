import { createSelector } from "@reduxjs/toolkit";

// Basic selectors
export const selectTheme = (state) => state.theme;
export const selectIsDarkMode = (state) => state.theme.isDarkMode;
export const selectPrimaryColor = (state) => state.theme.primaryColor;
export const selectAccentColor = (state) => state.theme.accentColor;
export const selectFontSize = (state) => state.theme.fontSize;
export const selectAnimations = (state) => state.theme.animations;
export const selectHighContrast = (state) => state.theme.highContrast;

// Memoized selector for Material-UI theme config
export const selectMUIThemeConfig = createSelector([selectTheme], (theme) => {
  const fontSizes = {
    small: { base: "0.875rem", h1: "2rem", h2: "1.5rem" },
    medium: { base: "1rem", h1: "2.5rem", h2: "2rem" },
    large: { base: "1.125rem", h1: "3rem", h2: "2.25rem" },
  };

  return {
    isDarkMode: theme.isDarkMode,
    colors: {
      primary: theme.primaryColor,
      secondary: theme.accentColor,
    },
    typography: fontSizes[theme.fontSize],
    animations: theme.animations,
    highContrast: theme.highContrast,
  };
});
