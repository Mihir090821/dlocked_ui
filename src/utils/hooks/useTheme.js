import { useSelector, useDispatch } from "react-redux";
import {
  toggleTheme,
  setThemeMode,
  setPrimaryColor,
  setAccentColor,
  setFontSize,
  toggleAnimations,
  toggleHighContrast,
  resetTheme,
} from "../store/slices/themeSlice";
import {
  selectIsDarkMode,
  selectPrimaryColor,
  selectAccentColor,
  selectFontSize,
  selectAnimations,
  selectHighContrast,
  selectMUIThemeConfig,
} from "../store/selectors/themeSelectors";

export const useTheme = () => {
  const dispatch = useDispatch();

  const themeState = {
    isDarkMode: useSelector(selectIsDarkMode),
    primaryColor: useSelector(selectPrimaryColor),
    accentColor: useSelector(selectAccentColor),
    fontSize: useSelector(selectFontSize),
    animations: useSelector(selectAnimations),
    highContrast: useSelector(selectHighContrast),
    config: useSelector(selectMUIThemeConfig),
  };

  const themeActions = {
    toggleTheme: () => dispatch(toggleTheme()),
    setDarkMode: (isDark) => dispatch(setThemeMode(isDark)),
    setPrimaryColor: (color) => dispatch(setPrimaryColor(color)),
    setAccentColor: (color) => dispatch(setAccentColor(color)),
    setFontSize: (size) => dispatch(setFontSize(size)),
    toggleAnimations: () => dispatch(toggleAnimations()),
    toggleHighContrast: () => dispatch(toggleHighContrast()),
    resetTheme: () => dispatch(resetTheme()),
  };

  return {
    ...themeState,
    ...themeActions,
  };
};
