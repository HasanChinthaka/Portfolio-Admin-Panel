import { useGetIdentity } from "@refinedev/core";
import { useThemedLayoutContext } from "@refinedev/mui";
import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  Avatar,
  Chip,
  IconButton,
  Tooltip,
  Badge,
} from "@mui/material";
import { Menu as MenuIcon, NotificationsOutlined, LightModeOutlined, DarkModeOutlined } from "@mui/icons-material";
import { useLocation } from "react-router-dom";
import { keyframes } from "@emotion/react";
import { useThemeMode } from "../contexts/ThemeContext";

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(-4px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const ROUTE_LABELS: Record<string, { label: string; emoji: string }> = {
  "/":                  { label: "Dashboard",         emoji: "🏠" },
  "/projects":          { label: "Projects",           emoji: "💼" },
  "/project-categories":{ label: "Project Categories", emoji: "🗂️" },
  "/skills":            { label: "Skills",             emoji: "⚡" },
  "/skill-categories":  { label: "Skill Categories",   emoji: "📚" },
  "/services":          { label: "Services",           emoji: "🔧" },
  "/blogs":             { label: "Blogs",              emoji: "✍️" },
  "/educations":        { label: "Education",          emoji: "🎓" },
  "/work-experiences":  { label: "Work Experiences",   emoji: "🏢" },
  "/clients":           { label: "Clients",            emoji: "👥" },
  "/testimonials":      { label: "Testimonials",       emoji: "💬" },
  "/contact-info":      { label: "Contact Info",       emoji: "📞" },
  "/social-accounts":   { label: "Social Accounts",    emoji: "🔗" },
  "/system-features":   { label: "System Features",    emoji: "⚙️" },
  "/cv":                { label: "CV Management",      emoji: "📄" },
};

function getPageInfo(pathname: string) {
  const base = "/" + pathname.split("/")[1];
  const info = ROUTE_LABELS[base] ?? { label: "Dashboard", emoji: "🏠" };
  if (pathname.includes("/create")) return { label: `${info.label} · Create`, emoji: "➕" };
  if (pathname.includes("/edit"))   return { label: `${info.label} · Edit`,   emoji: "✏️" };
  return info;
}

export function CustomHeader() {
  const { siderCollapsed, setSiderCollapsed } = useThemedLayoutContext();
  const { data: user } = useGetIdentity<{ name: string; email: string }>();
  const { mode, toggleMode } = useThemeMode();
  const location = useLocation();
  const { label, emoji } = getPageInfo(location.pathname);

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        left: siderCollapsed ? 68 : 256,
        width: `calc(100% - ${siderCollapsed ? 68 : 256}px)`,
        transition: "left 0.28s cubic-bezier(0.4,0,0.2,1), width 0.28s cubic-bezier(0.4,0,0.2,1)",
        bgcolor: mode === "dark" ? "rgba(21,31,50,0.92)" : "rgba(255,255,255,0.94)",
        backdropFilter: "blur(16px)",
        borderBottom: "1px solid",
        borderColor: "divider",
        color: "text.primary",
        boxShadow: mode === "dark"
          ? "0 1px 0 0 rgba(30,45,69,0.8), 0 2px 12px rgba(0,0,0,0.2)"
          : "0 1px 0 0 #E8EEFE, 0 2px 12px rgba(99,102,241,0.04)",
      }}
    >
      <Toolbar sx={{ minHeight: "64px !important", px: { xs: 2, sm: 3 }, gap: 2 }}>
        {/* Toggle */}
        <IconButton
          size="small"
          onClick={() => setSiderCollapsed(!siderCollapsed)}
          sx={{
            color: "text.secondary",
            border: "1px solid #E2E8F0",
            borderRadius: 2,
            p: 0.75,
            "&:hover": {
              bgcolor: "rgba(99,102,241,0.06)",
              borderColor: "#818CF8",
              color: "primary.main",
            },
          }}
        >
          <MenuIcon sx={{ fontSize: 18 }} />
        </IconButton>

        {/* Page title */}
        <Box
          flex={1}
          sx={{ animation: `${fadeIn} 0.25s ease both` }}
          key={label}
        >
          <Box display="flex" alignItems="center" gap={0.8}>
            <Typography fontSize="0.9rem" lineHeight={1}>
              {emoji}
            </Typography>
            <Typography variant="h6" fontWeight={700} lineHeight={1.2} fontSize="0.95rem" color="text.primary">
              {label}
            </Typography>
          </Box>
          <Typography variant="caption" color="text.secondary" fontSize="0.72rem">
            {today}
          </Typography>
        </Box>

        {/* Right side */}
        <Box display="flex" alignItems="center" gap={1}>
          {/* Status dot */}
          <Tooltip title="System Online" arrow>
            <Box display="flex" alignItems="center" gap={0.5}
              sx={{
                px: 1.2, py: 0.5,
                borderRadius: 5,
                bgcolor: "rgba(16,185,129,0.08)",
                border: "1px solid rgba(16,185,129,0.2)",
                cursor: "default",
              }}
            >
              <Box sx={{
                width: 7, height: 7,
                borderRadius: "50%",
                bgcolor: "#10B981",
                animation: "pulse-dot 2.5s ease infinite",
              }} />
              <Typography variant="caption" color="#059669" fontWeight={600} fontSize="0.7rem">
                Online
              </Typography>
            </Box>
          </Tooltip>

          {/* Notifications */}
          <Tooltip title="Notifications" arrow>
            <IconButton
              size="small"
              sx={{
                color: "text.secondary",
                border: "1px solid",
                borderColor: "divider",
                borderRadius: 2,
                p: 0.75,
                "&:hover": { bgcolor: "rgba(99,102,241,0.06)", borderColor: "#818CF8", color: "primary.main" },
              }}
            >
              <Badge badgeContent={0} color="error">
                <NotificationsOutlined sx={{ fontSize: 18 }} />
              </Badge>
            </IconButton>
          </Tooltip>

          {/* Dark / Light toggle */}
          <Tooltip title={mode === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"} arrow>
            <IconButton
              size="small"
              onClick={toggleMode}
              sx={{
                color: mode === "dark" ? "#FCD34D" : "text.secondary",
                border: "1px solid",
                borderColor: mode === "dark" ? "rgba(252,211,77,0.3)" : "divider",
                borderRadius: 2,
                p: 0.75,
                bgcolor: mode === "dark" ? "rgba(252,211,77,0.06)" : "transparent",
                transition: "all 0.25s ease",
                "&:hover": {
                  bgcolor: mode === "dark" ? "rgba(252,211,77,0.12)" : "rgba(99,102,241,0.06)",
                  borderColor: mode === "dark" ? "rgba(252,211,77,0.5)" : "#818CF8",
                  color: mode === "dark" ? "#FCD34D" : "primary.main",
                  "& svg": { animation: "toggleSpin 0.4s ease" },
                },
              }}
            >
              {mode === "dark"
                ? <LightModeOutlined sx={{ fontSize: 18 }} />
                : <DarkModeOutlined  sx={{ fontSize: 18 }} />
              }
            </IconButton>
          </Tooltip>

          {/* Divider */}
          <Box sx={{ width: 1, height: 32, bgcolor: "divider" }} />

          {/* Admin chip */}
          <Chip
            label="Admin"
            size="small"
            sx={{
              bgcolor: "rgba(99,102,241,0.08)",
              color: "#6366F1",
              fontWeight: 700,
              fontSize: "0.68rem",
              border: "1px solid rgba(99,102,241,0.15)",
            }}
          />

          {/* User */}
          <Box display="flex" alignItems="center" gap={1}>
            <Box sx={{ position: "relative" }}>
              <Avatar
                sx={{
                  width: 34,
                  height: 34,
                  bgcolor: "#6366F1",
                  fontSize: "0.85rem",
                  fontWeight: 700,
                  boxShadow: "0 0 0 2px rgba(99,102,241,0.2)",
                  transition: "box-shadow 0.18s ease",
                  "&:hover": { boxShadow: "0 0 0 3px rgba(99,102,241,0.35)" },
                }}
              >
                {user?.name?.[0]?.toUpperCase() ?? "A"}
              </Avatar>
              <Box sx={{
                position: "absolute",
                bottom: 0,
                right: 0,
                width: 9,
                height: 9,
                borderRadius: "50%",
                bgcolor: "#10B981",
                border: "2px solid white",
              }} />
            </Box>
            <Box display={{ xs: "none", md: "block" }}>
              <Typography variant="body2" fontWeight={600} lineHeight={1.2} fontSize="0.83rem">
                {user?.name ?? "Admin"}
              </Typography>
              <Typography variant="caption" color="text.secondary" fontSize="0.7rem">
                {user?.email ?? ""}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
