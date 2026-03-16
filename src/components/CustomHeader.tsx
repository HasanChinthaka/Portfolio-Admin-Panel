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
} from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";
import { useLocation } from "react-router-dom";

const ROUTE_LABELS: Record<string, string> = {
  "/": "Dashboard",
  "/projects": "Projects",
  "/project-categories": "Project Categories",
  "/skills": "Skills",
  "/skill-categories": "Skill Categories",
  "/services": "Services",
  "/blogs": "Blogs",
  "/educations": "Education",
  "/work-experiences": "Work Experiences",
  "/clients": "Clients",
  "/testimonials": "Testimonials",
  "/contact-info": "Contact Info",
  "/social-accounts": "Social Accounts",
  "/system-features": "System Features",
  "/cv": "CV Management",
};

function getLabel(pathname: string): string {
  const base = "/" + pathname.split("/")[1];
  if (pathname.includes("/create")) return `${ROUTE_LABELS[base] ?? "Create"} › Create`;
  if (pathname.includes("/edit")) return `${ROUTE_LABELS[base] ?? "Edit"} › Edit`;
  return ROUTE_LABELS[base] ?? "Dashboard";
}

export function CustomHeader() {
  const { siderCollapsed, setSiderCollapsed } = useThemedLayoutContext();
  const { data: user } = useGetIdentity<{ name: string; email: string }>();
  const location = useLocation();
  const label = getLabel(location.pathname);

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        left: siderCollapsed ? 68 : 256,
        width: `calc(100% - ${siderCollapsed ? 68 : 256}px)`,
        transition: "left 0.25s ease, width 0.25s ease",
        bgcolor: "rgba(255,255,255,0.92)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid #E2E8F0",
        color: "text.primary",
      }}
    >
      <Toolbar sx={{ minHeight: "64px !important", px: { xs: 2, sm: 3 } }}>
        <IconButton
          size="small"
          onClick={() => setSiderCollapsed(!siderCollapsed)}
          sx={{ mr: 2, color: "text.secondary" }}
        >
          <MenuIcon />
        </IconButton>

        <Box flex={1}>
          <Typography variant="h6" fontWeight={700} lineHeight={1.2} fontSize="1rem">
            {label}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {today}
          </Typography>
        </Box>

        <Box display="flex" alignItems="center" gap={1.5}>
          <Chip
            label="Admin"
            size="small"
            sx={{
              bgcolor: "rgba(99,102,241,0.1)",
              color: "#6366F1",
              fontWeight: 700,
              fontSize: "0.7rem",
            }}
          />
          <Box display="flex" alignItems="center" gap={1}>
            <Avatar
              sx={{
                width: 34,
                height: 34,
                bgcolor: "#6366F1",
                fontSize: "0.85rem",
                fontWeight: 700,
              }}
            >
              {user?.name?.[0]?.toUpperCase() ?? "A"}
            </Avatar>
            <Box display={{ xs: "none", sm: "block" }}>
              <Typography variant="body2" fontWeight={600} lineHeight={1.2}>
                {user?.name ?? "Admin"}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {user?.email ?? ""}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
