import { createTheme, alpha } from "@mui/material";

export function createAppTheme(mode: "light" | "dark") {
  const isDark = mode === "dark";

  const colors = {
    primary:    "#6366F1",
    primaryLt:  "#818CF8",
    primaryDk:  "#4F46E5",
    secondary:  "#8B5CF6",
    success:    "#10B981",
    warning:    "#F59E0B",
    error:      "#EF4444",
    info:       "#3B82F6",

    // surface
    bg:         isDark ? "#0B1120" : "#F1F5F9",
    paper:      isDark ? "#151F32" : "#FFFFFF",
    paperAlt:   isDark ? "#1A2540" : "#F8FAFF",

    // text
    textPrimary:   isDark ? "#E2E8F0" : "#0F172A",
    textSecondary: isDark ? "#7C8FA8" : "#64748B",
    textDisabled:  isDark ? "#3D5068" : "#CBD5E1",

    // borders / dividers
    divider:    isDark ? "#1E2D45" : "#E2E8F0",
    border:     isDark ? "#1E2D45" : "#F1F5F9",

    // table
    tableHead:  isDark ? "#111B2E" : "#F8FAFF",
    tableEven:  isDark ? "#131D30" : "#FAFBFF",
    tableHover: isDark ? alpha("#6366F1", 0.08) : alpha("#6366F1", 0.04),
  };

  return createTheme({
    palette: {
      mode,
      primary:   { main: colors.primary,   light: colors.primaryLt, dark: colors.primaryDk, contrastText: "#fff" },
      secondary: { main: colors.secondary, light: "#A78BFA",         dark: "#7C3AED" },
      success:   { main: colors.success,   light: "#34D399",         dark: "#059669" },
      warning:   { main: colors.warning,   light: "#FCD34D",         dark: "#D97706" },
      error:     { main: colors.error,     light: "#FCA5A5",         dark: "#DC2626" },
      info:      { main: colors.info,      light: "#93C5FD",         dark: "#2563EB" },
      background: { default: colors.bg, paper: colors.paper },
      text:       { primary: colors.textPrimary, secondary: colors.textSecondary, disabled: colors.textDisabled },
      divider:    colors.divider,
    },

    typography: {
      fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      h1: { fontWeight: 700 }, h2: { fontWeight: 700 }, h3: { fontWeight: 700 },
      h4: { fontWeight: 600 }, h5: { fontWeight: 600 }, h6: { fontWeight: 600 },
      body1: { lineHeight: 1.6 }, body2: { lineHeight: 1.5 },
    },

    shape: { borderRadius: 10 },

    shadows: [
      "none",
      isDark ? "0 1px 2px 0 rgb(0 0 0 / 0.3)"  : "0 1px 2px 0 rgb(0 0 0 / 0.05)",
      isDark ? "0 2px 4px 0 rgb(0 0 0 / 0.4)"  : "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
      isDark ? "0 4px 8px 0 rgb(0 0 0 / 0.5)"  : "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
      isDark ? "0 8px 16px 0 rgb(0 0 0 / 0.5)" : "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
      isDark ? "0 16px 32px 0 rgb(0 0 0 / 0.5)": "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
      ...Array(19).fill(isDark ? "0 25px 50px -12px rgb(0 0 0 / 0.6)" : "0 25px 50px -12px rgb(0 0 0 / 0.25)"),
    ] as Parameters<typeof createTheme>[0]["shadows"],

    components: {
      MuiCssBaseline: {
        styleOverrides: `
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
          * { box-sizing: border-box; }
          body { background-color: ${colors.bg}; transition: background-color 0.3s ease; }

          ::-webkit-scrollbar { width: 6px; height: 6px; }
          ::-webkit-scrollbar-track { background: transparent; }
          ::-webkit-scrollbar-thumb { background: ${isDark ? "#2A3F5C" : "#CBD5E1"}; border-radius: 3px; }
          ::-webkit-scrollbar-thumb:hover { background: ${isDark ? "#3D5A80" : "#94A3B8"}; }

          @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(14px); }
            to   { opacity: 1; transform: translateY(0); }
          }
          @keyframes fadeInLeft {
            from { opacity: 0; transform: translateX(-10px); }
            to   { opacity: 1; transform: translateX(0); }
          }
          @keyframes pulse-dot {
            0%, 100% { box-shadow: 0 0 0 0 rgba(99,102,241,0.55); }
            50%       { box-shadow: 0 0 0 6px rgba(99,102,241,0); }
          }
          @keyframes shimmer {
            0%   { background-position: -400px 0; }
            100% { background-position: 400px 0; }
          }
          @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            33%       { transform: translateY(-10px) rotate(2deg); }
            66%       { transform: translateY(6px) rotate(-1deg); }
          }
          @keyframes gradientShift {
            0%   { background-position: 0% 50%; }
            50%  { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          @keyframes scaleIn {
            from { opacity: 0; transform: scale(0.92); }
            to   { opacity: 1; transform: scale(1); }
          }
          @keyframes toggleSpin {
            from { transform: rotate(0deg) scale(1); }
            to   { transform: rotate(360deg) scale(1); }
          }
        `,
      },

      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 8, textTransform: "none", fontWeight: 600,
            fontSize: "0.875rem", padding: "8px 18px", boxShadow: "none",
            transition: "all 0.18s ease",
            "&:hover":  { boxShadow: "none", transform: "translateY(-1px)" },
            "&:active": { transform: "translateY(0px) scale(0.98)" },
          },
          contained: {
            "&:hover": { boxShadow: "0 6px 16px rgb(99 102 241 / 0.35)" },
          },
          outlined: {
            borderColor: isDark ? "#2A3F5C" : undefined,
            "&:hover": { backgroundColor: alpha("#6366F1", isDark ? 0.1 : 0.04) },
          },
        },
      },

      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 14,
            backgroundImage: "none",
            backgroundColor: colors.paper,
            boxShadow: isDark
              ? "0 1px 3px 0 rgb(0 0 0 / 0.4), 0 1px 2px -1px rgb(0 0 0 / 0.4)"
              : "0 1px 3px 0 rgb(0 0 0 / 0.07), 0 1px 2px -1px rgb(0 0 0 / 0.07)",
            border: `1px solid ${colors.border}`,
            transition: "box-shadow 0.22s ease, transform 0.22s ease, border-color 0.22s ease",
            "&:hover": { borderColor: isDark ? "#2A3F5C" : "#E0E7FF" },
          },
        },
      },

      MuiPaper: {
        styleOverrides: {
          root: { backgroundImage: "none", backgroundColor: colors.paper },
          elevation1: {
            boxShadow: isDark
              ? "0 1px 3px 0 rgb(0 0 0 / 0.4)"
              : "0 1px 3px 0 rgb(0 0 0 / 0.07), 0 1px 2px -1px rgb(0 0 0 / 0.07)",
          },
        },
      },

      MuiAppBar: {
        styleOverrides: {
          root: { backgroundImage: "none" },
        },
      },

      MuiTableHead: {
        styleOverrides: {
          root: {
            "& .MuiTableCell-head": {
              backgroundColor: colors.tableHead,
              color: colors.textSecondary,
              fontWeight: 700, fontSize: "0.7rem",
              textTransform: "uppercase", letterSpacing: "0.08em",
              borderBottom: `2px solid ${colors.divider}`,
              padding: "14px 16px", whiteSpace: "nowrap",
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
                backgroundColor: colors.tableHover,
                "& .MuiTableCell-root": { color: colors.textPrimary },
              },
              "&:nth-of-type(even)": { backgroundColor: colors.tableEven },
              "&:last-child .MuiTableCell-root": { borderBottom: "none" },
            },
          },
        },
      },

      MuiTableCell: {
        styleOverrides: {
          root: {
            padding: "16px 16px",
            borderColor: colors.divider,
            fontSize: "0.875rem",
            color: colors.textPrimary,
            transition: "color 0.15s ease",
          },
        },
      },

      MuiTableRow: {
        styleOverrides: {
          root: {
            "&.MuiTableRow-hover:hover": { backgroundColor: colors.tableHover },
          },
        },
      },

      MuiChip: {
        styleOverrides: {
          root: { borderRadius: 6, fontWeight: 600, fontSize: "0.72rem", transition: "all 0.15s ease" },
          colorSuccess: { backgroundColor: alpha("#10B981", isDark ? 0.18 : 0.1), color: isDark ? "#34D399" : "#059669" },
          colorWarning: { backgroundColor: alpha("#F59E0B", isDark ? 0.18 : 0.1), color: isDark ? "#FCD34D" : "#D97706" },
          colorError:   { backgroundColor: alpha("#EF4444", isDark ? 0.18 : 0.1), color: isDark ? "#FCA5A5" : "#DC2626" },
          colorDefault: { backgroundColor: isDark ? "#1A2845" : "#F1F5F9",        color: colors.textSecondary },
        },
      },

      MuiTextField: {
        defaultProps: { size: "small" },
        styleOverrides: {
          root: {
            "& .MuiOutlinedInput-root": {
              borderRadius: 8,
              backgroundColor: isDark ? "#111B2E" : "#FAFBFF",
              transition: "box-shadow 0.18s ease",
              "& fieldset": { borderColor: isDark ? "#1E2D45" : undefined },
              "&:hover fieldset": { borderColor: "#818CF8" },
              "&.Mui-focused": { boxShadow: `0 0 0 3px ${alpha("#6366F1", 0.18)}` },
              "&.Mui-focused fieldset": { borderColor: "#6366F1", borderWidth: 2 },
              "& input": { color: colors.textPrimary },
              "& textarea": { color: colors.textPrimary },
            },
            "& .MuiInputLabel-root": { color: colors.textSecondary },
            "& .MuiInputLabel-root.Mui-focused": { color: "#6366F1" },
          },
        },
      },

      MuiSelect: {
        styleOverrides: {
          outlined: {
            borderRadius: 8,
            backgroundColor: isDark ? "#111B2E" : "#FAFBFF",
            color: colors.textPrimary,
          },
        },
      },

      MuiMenu: {
        styleOverrides: {
          paper: { backgroundColor: colors.paper, border: `1px solid ${colors.divider}` },
        },
      },

      MuiMenuItem: {
        styleOverrides: {
          root: {
            color: colors.textPrimary,
            "&:hover": { backgroundColor: isDark ? "#1A2845" : alpha("#6366F1", 0.05) },
            "&.Mui-selected": { backgroundColor: isDark ? "#1E2D45" : alpha("#6366F1", 0.08) },
          },
        },
      },

      MuiSwitch: {
        styleOverrides: {
          root: {
            "& .MuiSwitch-track": { borderRadius: 8, transition: "background-color 0.22s ease", backgroundColor: isDark ? "#2A3F5C" : undefined },
            "& .MuiSwitch-thumb": { boxShadow: "0 2px 6px rgb(0 0 0 / 0.25)", transition: "transform 0.22s ease" },
          },
        },
      },

      MuiAvatar: {
        styleOverrides: { root: { fontWeight: 700 } },
      },

      MuiTooltip: {
        styleOverrides: {
          tooltip: {
            borderRadius: 6, fontSize: "0.75rem",
            backgroundColor: isDark ? "#0B1120" : "#1E293B",
            border: isDark ? `1px solid ${colors.divider}` : "none",
            boxShadow: "0 4px 12px rgb(0 0 0 / 0.2)",
          },
          arrow: { color: isDark ? "#0B1120" : "#1E293B" },
        },
      },

      MuiDivider: {
        styleOverrides: { root: { borderColor: colors.divider } },
      },

      MuiIconButton: {
        styleOverrides: {
          root: {
            transition: "all 0.18s ease",
            "&:hover":  { transform: "scale(1.08)" },
            "&:active": { transform: "scale(0.95)" },
          },
        },
      },

      MuiSkeleton: {
        styleOverrides: {
          root: {
            borderRadius: 6,
            backgroundColor: isDark ? alpha("#6366F1", 0.08) : alpha("#94A3B8", 0.12),
          },
          wave: {
            "&::after": {
              background: isDark
                ? "linear-gradient(90deg, transparent, rgba(99,102,241,0.08), transparent)"
                : "linear-gradient(90deg, transparent, rgba(99,102,241,0.06), transparent)",
            },
          },
        },
      },

      MuiLinearProgress: {
        styleOverrides: {
          root: { borderRadius: 4, backgroundColor: alpha("#6366F1", isDark ? 0.15 : 0.1) },
          bar:  { borderRadius: 4, background: "linear-gradient(90deg, #6366F1, #8B5CF6)" },
        },
      },

      MuiDialog: {
        styleOverrides: {
          paper: { backgroundColor: colors.paper, backgroundImage: "none", border: `1px solid ${colors.divider}` },
        },
      },
    },
  });
}

// convenience export for components that don't need dynamic theming
export const theme = createAppTheme("light");
