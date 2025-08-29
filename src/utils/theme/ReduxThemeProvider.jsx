import React from 'react';
import { useSelector } from 'react-redux';
import { ThemeProvider as MUIThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { selectMUIThemeConfig } from '../store/selectors/themeSelectors';
import { createDynamicTheme } from './theme';

export const ReduxThemeProvider = ({ children }) => {
  const themeConfig = useSelector(selectMUIThemeConfig);
  const theme = createDynamicTheme(themeConfig);

  return (
    <MUIThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MUIThemeProvider>
  );
};
