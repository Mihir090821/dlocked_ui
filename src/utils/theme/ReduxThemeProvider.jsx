import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { ThemeProvider as MUIThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { selectMUIThemeConfig } from '../store/selectors/themeSelectors';
import { createDynamicTheme } from './theme';

export const ReduxThemeProvider = ({ children }) => {
  const themeConfig = useSelector(selectMUIThemeConfig);
  const theme = createDynamicTheme(themeConfig);

  // Sync Redux theme state with HTML data-theme attribute
  useEffect(() => {
    const htmlElement = document.documentElement;
    if (themeConfig.isDarkMode) {
      htmlElement.setAttribute('data-theme', 'dark');
    } else {
      htmlElement.setAttribute('data-theme', 'light');
    }
  }, [themeConfig.isDarkMode]);

  return (
    <MUIThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MUIThemeProvider>
  );
};
