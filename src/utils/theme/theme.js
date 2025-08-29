import { createTheme } from "@mui/material/styles";

export const createDynamicTheme = (themeConfig) => {
  const { isDarkMode, colors, typography, animations, highContrast } =
    themeConfig;

  return createTheme({
    palette: {
      mode: isDarkMode ? "dark" : "light",
      primary: {
        main: colors.primary,
        light: isDarkMode ? "#A29BFE" : "#8B7EF7",
        dark: isDarkMode ? "#5A4FCF" : "#4A3FB8",
      },
      secondary: {
        main: colors.secondary,
        light: isDarkMode ? "#55E6E1" : "#4DD9D4",
        dark: isDarkMode ? "#00A69C" : "#008B87",
      },
      background: {
        default: isDarkMode ? "#0D0D1A" : "#F8FAFC",
        paper: isDarkMode ? "#1A1A2E" : "#FFFFFF",
        elevated: isDarkMode ? "#16213E" : "#F1F5F9",
      },
      text: {
        primary: isDarkMode ? "#FFFFFF" : "#1E293B",
        secondary: isDarkMode ? "#B8BCC8" : "#475569",
      },
    },
    typography: {
      fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
      fontSize:
        typography.base === "1rem"
          ? 14
          : typography.base === "0.875rem"
          ? 12
          : 16,
      h1: {
        fontSize: typography.h1,
        fontWeight: 700,
      },
      h2: {
        fontSize: typography.h2,
        fontWeight: 600,
      },
      body1: {
        fontSize: typography.base,
      },
    },
    transitions: {
      duration: {
        shortest: animations ? 150 : 0,
        shorter: animations ? 200 : 0,
        short: animations ? 250 : 0,
        standard: animations ? 300 : 0,
      },
    },
    components: {
      MuiCard: {
        styleOverrides: {
          root: {
            background: isDarkMode
              ? "linear-gradient(145deg, #1e1e2e 0%, #2d2d44 100%)"
              : "#FFFFFF",
            border: isDarkMode
              ? "1px solid rgba(255, 255, 255, 0.1)"
              : "1px solid #E2E8F0",
            borderRadius: "16px",
            backdropFilter: isDarkMode ? "blur(10px)" : "none",
            ...(highContrast && {
              border: isDarkMode ? "2px solid #FFFFFF" : "2px solid #000000",
            }),
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: "12px",
            textTransform: "none",
            fontWeight: 600,
            transition: animations ? "all 0.3s ease" : "none",
            "&:hover": animations
              ? {
                  transform: "translateY(-2px)",
                  boxShadow: `0 8px 25px ${colors.primary}30`,
                }
              : {},
          },
          contained: {
            background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
            "&:hover": {
              background: `linear-gradient(135deg, ${colors.secondary} 0%, ${colors.primary} 100%)`,
            },
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            "& .MuiOutlinedInput-root": {
              borderRadius: "12px",
              backgroundColor: isDarkMode
                ? "rgba(255, 255, 255, 0.05)"
                : "#F8FAFC",
              "& fieldset": {
                borderColor: isDarkMode
                  ? "rgba(255, 255, 255, 0.2)"
                  : "#E2E8F0",
              },
              "&:hover fieldset": {
                borderColor: colors.primary,
              },
            },
          },
        },
      },
    },
  });
};
