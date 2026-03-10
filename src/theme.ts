import { createTheme, alpha } from "@mui/material";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#6366F1",
      light: "#818CF8",
      dark: "#4F46E5",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#8B5CF6",
      light: "#A78BFA",
      dark: "#7C3AED",
    },
    success: { main: "#10B981", light: "#34D399", dark: "#059669" },
    warning: { main: "#F59E0B", light: "#FCD34D", dark: "#D97706" },
    error: { main: "#EF4444", light: "#FCA5A5", dark: "#DC2626" },
    info: { main: "#3B82F6", light: "#93C5FD", dark: "#2563EB" },
    background: {
      default: "#F1F5F9",
      paper: "#FFFFFF",
    },
    text: {
      primary: "#0F172A",
      secondary: "#64748B",
    },
    divider: "#E2E8F0",
  },

  typography: {
    fontFamily:
      '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    h1: { fontWeight: 700 },
    h2: { fontWeight: 700 },
    h3: { fontWeight: 700 },
    h4: { fontWeight: 600 },
    h5: { fontWeight: 600 },
    h6: { fontWeight: 600 },
    body1: { lineHeight: 1.6 },
    body2: { lineHeight: 1.5 },
  },

  shape: { borderRadius: 10 },

  shadows: [
    "none",
    "0 1px 2px 0 rgb(0 0 0 / 0.05)",
    "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
    "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
    "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
    "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
    "0 25px 50px -12px rgb(0 0 0 / 0.25)",
    "0 25px 50px -12px rgb(0 0 0 / 0.25)",
    "0 25px 50px -12px rgb(0 0 0 / 0.25)",
    "0 25px 50px -12px rgb(0 0 0 / 0.25)",
    "0 25px 50px -12px rgb(0 0 0 / 0.25)",
    "0 25px 50px -12px rgb(0 0 0 / 0.25)",
    "0 25px 50px -12px rgb(0 0 0 / 0.25)",
    "0 25px 50px -12px rgb(0 0 0 / 0.25)",
    "0 25px 50px -12px rgb(0 0 0 / 0.25)",
    "0 25px 50px -12px rgb(0 0 0 / 0.25)",
    "0 25px 50px -12px rgb(0 0 0 / 0.25)",
    "0 25px 50px -12px rgb(0 0 0 / 0.25)",
    "0 25px 50px -12px rgb(0 0 0 / 0.25)",
    "0 25px 50px -12px rgb(0 0 0 / 0.25)",
    "0 25px 50px -12px rgb(0 0 0 / 0.25)",
    "0 25px 50px -12px rgb(0 0 0 / 0.25)",
    "0 25px 50px -12px rgb(0 0 0 / 0.25)",
    "0 25px 50px -12px rgb(0 0 0 / 0.25)",
    "0 25px 50px -12px rgb(0 0 0 / 0.25)",
  ],

  components: {
    MuiCssBaseline: {
      styleOverrides: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
        * { box-sizing: border-box; }
        body { background-color: #F1F5F9; }
        ::-webkit-scrollbar { width: 6px; height: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #CBD5E1; border-radius: 3px; }
        ::-webkit-scrollbar-thumb:hover { background: #94A3B8; }
      `,
    },

    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: "none",
          fontWeight: 600,
          fontSize: "0.875rem",
          padding: "8px 18px",
          boxShadow: "none",
          "&:hover": { boxShadow: "none" },
        },
        contained: {
          "&:hover": {
            boxShadow: "0 4px 12px rgb(99 102 241 / 0.3)",
          },
        },
      },
    },

    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 14,
          boxShadow:
            "0 1px 3px 0 rgb(0 0 0 / 0.07), 0 1px 2px -1px rgb(0 0 0 / 0.07)",
          border: "1px solid #F1F5F9",
        },
      },
    },

    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
        },
        elevation1: {
          boxShadow:
            "0 1px 3px 0 rgb(0 0 0 / 0.07), 0 1px 2px -1px rgb(0 0 0 / 0.07)",
        },
      },
    },

    MuiTableHead: {
      styleOverrides: {
        root: {
          "& .MuiTableCell-head": {
            backgroundColor: "#F8FAFF",
            color: "#475569",
            fontWeight: 700,
            fontSize: "0.7rem",
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            borderBottom: "2px solid #E2E8F0",
            padding: "14px 16px",
            whiteSpace: "nowrap",
          },
        },
      },
    },

    MuiTableBody: {
      styleOverrides: {
        root: {
          "& .MuiTableRow-root": {
            transition: "background-color 0.15s ease",
            "&:hover": {
              backgroundColor: alpha("#6366F1", 0.04),
            },
            "&:nth-of-type(even)": {
              backgroundColor: "#FAFBFF",
            },
            "&:last-child .MuiTableCell-root": {
              borderBottom: "none",
            },
          },
        },
      },
    },

    MuiTableCell: {
      styleOverrides: {
        root: {
          padding: "20px 16px",
          borderColor: "#F1F5F9",
          fontSize: "0.9rem",
          color: "#334155",
        },
      },
    },

    MuiTableRow: {
      styleOverrides: {
        root: {
          "&.MuiTableRow-hover:hover": {
            backgroundColor: alpha("#6366F1", 0.04),
          },
        },
      },
    },

    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 6,
          fontWeight: 600,
          fontSize: "0.72rem",
        },
        colorSuccess: {
          backgroundColor: alpha("#10B981", 0.1),
          color: "#059669",
        },
        colorWarning: {
          backgroundColor: alpha("#F59E0B", 0.1),
          color: "#D97706",
        },
        colorDefault: {
          backgroundColor: "#F1F5F9",
          color: "#64748B",
        },
      },
    },

    MuiTextField: {
      defaultProps: { size: "small" },
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: 8,
            backgroundColor: "#FAFBFF",
            "&:hover fieldset": { borderColor: "#818CF8" },
            "&.Mui-focused fieldset": {
              borderColor: "#6366F1",
              borderWidth: 2,
            },
          },
          "& .MuiInputLabel-root.Mui-focused": {
            color: "#6366F1",
          },
        },
      },
    },

    MuiSelect: {
      styleOverrides: {
        outlined: {
          borderRadius: 8,
          backgroundColor: "#FAFBFF",
        },
      },
    },

    MuiSwitch: {
      styleOverrides: {
        root: {
          "& .MuiSwitch-track": {
            borderRadius: 8,
          },
          "& .MuiSwitch-thumb": {
            boxShadow: "0 2px 4px rgb(0 0 0 / 0.2)",
          },
        },
      },
    },

    MuiAvatar: {
      styleOverrides: {
        root: {
          fontWeight: 600,
        },
      },
    },

    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          borderRadius: 6,
          fontSize: "0.75rem",
          backgroundColor: "#1E293B",
        },
      },
    },

    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: "#E2E8F0",
        },
      },
    },
  },
});
