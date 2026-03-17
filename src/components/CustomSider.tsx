import { useMenu, useLogout, useGetIdentity } from "@refinedev/core";
import { useThemedLayoutContext } from "@refinedev/mui";
import { NavLink } from "react-router-dom";
import {
  Box,
  Typography,
  IconButton,
  Tooltip,
  Avatar,
  Divider,
} from "@mui/material";
import { keyframes } from "@emotion/react";
import {
  FolderSpecial,
  Category,
  Psychology,
  ClassOutlined,
  Build,
  Article,
  School,
  BusinessCenter,
  PeopleAlt,
  FormatQuote,
  ContactPhone,
  Share,
  Settings,
  Description,
  Dashboard,
  LogoutOutlined,
} from "@mui/icons-material";

const slideIn = keyframes`
  from { opacity: 0; transform: translateX(-12px); }
  to   { opacity: 1; transform: translateX(0); }
`;

const ICONS: Record<string, React.ReactNode> = {
  projects: <FolderSpecial sx={{ fontSize: 19 }} />,
  "projects-category": <Category sx={{ fontSize: 19 }} />,
  skills: <Psychology sx={{ fontSize: 19 }} />,
  "skills-category": <ClassOutlined sx={{ fontSize: 19 }} />,
  services: <Build sx={{ fontSize: 19 }} />,
  blogs: <Article sx={{ fontSize: 19 }} />,
  educations: <School sx={{ fontSize: 19 }} />,
  "work-experiences": <BusinessCenter sx={{ fontSize: 19 }} />,
  clients: <PeopleAlt sx={{ fontSize: 19 }} />,
  testimonials: <FormatQuote sx={{ fontSize: 19 }} />,
  "contact-info": <ContactPhone sx={{ fontSize: 19 }} />,
  "social-account": <Share sx={{ fontSize: 19 }} />,
  "system-features": <Settings sx={{ fontSize: 19 }} />,
  cv: <Description sx={{ fontSize: 19 }} />,
};

export function CustomSider() {
  const { siderCollapsed } = useThemedLayoutContext();
  const { menuItems, selectedKey } = useMenu();
  const { mutate: logout } = useLogout();
  const { data: user } = useGetIdentity<{ name: string; email: string }>();

  const collapsed = siderCollapsed ?? false;

  return (
    <Box
      sx={{
        width: collapsed ? 68 : 256,
        minWidth: collapsed ? 68 : 256,
        height: "100vh",
        position: "fixed",
        left: 0,
        top: 0,
        bottom: 0,
        background: "linear-gradient(180deg, #1E1B4B 0%, #312E81 40%, #3730A3 75%, #1E1B4B 100%)",
        display: "flex",
        flexDirection: "column",
        transition: "width 0.28s cubic-bezier(0.4,0,0.2,1), min-width 0.28s cubic-bezier(0.4,0,0.2,1)",
        zIndex: 1200,
        overflowX: "hidden",
        boxShadow: "4px 0 32px rgb(0 0 0 / 0.2), inset -1px 0 0 rgba(255,255,255,0.05)",
      }}
    >
      {/* Brand */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: collapsed ? "center" : "flex-start",
          px: collapsed ? 0 : 2,
          py: 2,
          minHeight: 64,
          borderBottom: "1px solid rgba(255,255,255,0.07)",
          gap: 1.5,
        }}
      >
        <Box
          sx={{
            width: 36,
            height: 36,
            borderRadius: 2.5,
            background: "linear-gradient(135deg, #818CF8 0%, #C4B5FD 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            boxShadow: "0 4px 12px rgba(99,102,241,0.5)",
          }}
        >
          <Dashboard sx={{ fontSize: 18, color: "#fff" }} />
        </Box>
        {!collapsed && (
          <Box sx={{ animation: `${slideIn} 0.22s ease both` }}>
            <Typography variant="body2" fontWeight={700} color="#fff" lineHeight={1.2}>
              Portfolio
            </Typography>
            <Typography variant="caption" color="rgba(255,255,255,0.45)" lineHeight={1}>
              Admin Panel
            </Typography>
          </Box>
        )}
      </Box>

      {/* Nav items */}
      <Box sx={{ flex: 1, overflowY: "auto", overflowX: "hidden", py: 1.5,
        "&::-webkit-scrollbar": { width: 4 },
        "&::-webkit-scrollbar-thumb": { background: "rgba(255,255,255,0.12)", borderRadius: 2 },
      }}>
        {/* Dashboard link */}
        <NavLink to="/" style={{ textDecoration: "none" }}>
          {({ isActive }) => (
            <Tooltip title={collapsed ? "Dashboard" : ""} placement="right">
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1.5,
                  mx: 1,
                  px: 1.5,
                  py: 0.85,
                  mb: 0.5,
                  borderRadius: 2,
                  cursor: "pointer",
                  color: isActive ? "#fff" : "rgba(255,255,255,0.6)",
                  bgcolor: isActive ? "rgba(165,180,252,0.18)" : "transparent",
                  boxShadow: isActive ? "inset 0 0 0 1px rgba(165,180,252,0.2)" : "none",
                  borderLeft: isActive ? "3px solid #A5B4FC" : "3px solid transparent",
                  transition: "all 0.18s ease",
                  "&:hover": {
                    bgcolor: "rgba(255,255,255,0.08)",
                    color: "#fff",
                    "& .nav-icon": { transform: "scale(1.15)" },
                  },
                  justifyContent: collapsed ? "center" : "flex-start",
                }}
              >
                <Box className="nav-icon" sx={{ flexShrink: 0, transition: "transform 0.18s ease", display: "flex" }}>
                  <Dashboard sx={{ fontSize: 19 }} />
                </Box>
                {!collapsed && (
                  <Typography variant="body2" fontWeight={isActive ? 700 : 500} noWrap fontSize="0.83rem">
                    Dashboard
                  </Typography>
                )}
                {isActive && !collapsed && (
                  <Box sx={{
                    ml: "auto",
                    width: 6, height: 6,
                    borderRadius: "50%",
                    bgcolor: "#A5B4FC",
                    animation: "pulse-dot 2s ease infinite",
                  }} />
                )}
              </Box>
            </Tooltip>
          )}
        </NavLink>

        <Divider sx={{ borderColor: "rgba(255,255,255,0.07)", mx: 1.5, my: 0.75 }} />

        {menuItems.map((item, index) => {
          const itemRoute = item.route ?? "___";
          const isSelected =
            selectedKey === item.key ||
            selectedKey === itemRoute ||
            (selectedKey !== "/" &&
              selectedKey !== undefined &&
              selectedKey.startsWith(itemRoute + "/"));
          const icon = ICONS[item.name] ?? <FolderSpecial sx={{ fontSize: 19 }} />;

          return (
            <Tooltip key={item.key} title={collapsed ? item.label : ""} placement="right">
              <NavLink to={item.route ?? "/"} style={{ textDecoration: "none" }}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1.5,
                    mx: 1,
                    px: 1.5,
                    py: 0.75,
                    borderRadius: 2,
                    cursor: "pointer",
                    color: isSelected ? "#fff" : "rgba(255,255,255,0.58)",
                    bgcolor: isSelected ? "rgba(165,180,252,0.18)" : "transparent",
                    boxShadow: isSelected ? "inset 0 0 0 1px rgba(165,180,252,0.2)" : "none",
                    borderLeft: isSelected ? "3px solid #A5B4FC" : "3px solid transparent",
                    transition: "all 0.18s ease",
                    animation: `${slideIn} 0.25s ease ${index * 0.025}s both`,
                    "&:hover": {
                      bgcolor: "rgba(255,255,255,0.08)",
                      color: "#fff",
                      "& .nav-icon": { transform: "scale(1.15)" },
                    },
                    justifyContent: collapsed ? "center" : "flex-start",
                  }}
                >
                  <Box className="nav-icon" sx={{ flexShrink: 0, transition: "transform 0.18s ease", display: "flex" }}>
                    {icon}
                  </Box>
                  {!collapsed && (
                    <Typography variant="body2" fontWeight={isSelected ? 700 : 500} noWrap fontSize="0.83rem">
                      {item.label}
                    </Typography>
                  )}
                  {isSelected && !collapsed && (
                    <Box sx={{
                      ml: "auto",
                      width: 6, height: 6,
                      borderRadius: "50%",
                      bgcolor: "#A5B4FC",
                      animation: "pulse-dot 2s ease infinite",
                    }} />
                  )}
                </Box>
              </NavLink>
            </Tooltip>
          );
        })}
      </Box>

      {/* User + logout */}
      <Box
        sx={{
          borderTop: "1px solid rgba(255,255,255,0.07)",
          p: 1.5,
          display: "flex",
          alignItems: "center",
          gap: 1.2,
          justifyContent: collapsed ? "center" : "space-between",
          background: "rgba(0,0,0,0.15)",
        }}
      >
        {!collapsed && (
          <Box display="flex" alignItems="center" gap={1.2} minWidth={0}>
            <Box sx={{ position: "relative", flexShrink: 0 }}>
              <Avatar
                sx={{
                  width: 32,
                  height: 32,
                  bgcolor: "#6366F1",
                  fontSize: "0.8rem",
                  boxShadow: "0 0 0 2px rgba(165,180,252,0.4)",
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
                border: "2px solid #1E1B4B",
              }} />
            </Box>
            <Box minWidth={0}>
              <Typography variant="body2" fontWeight={600} color="#fff" noWrap lineHeight={1.2} fontSize="0.82rem">
                {user?.name ?? "Admin"}
              </Typography>
              <Typography variant="caption" color="rgba(255,255,255,0.4)" noWrap fontSize="0.7rem">
                {user?.email ?? ""}
              </Typography>
            </Box>
          </Box>
        )}
        <Tooltip title="Logout" placement="right">
          <IconButton
            size="small"
            onClick={() => logout()}
            sx={{
              color: "rgba(255,255,255,0.45)",
              flexShrink: 0,
              "&:hover": {
                color: "#FCA5A5",
                bgcolor: "rgba(239,68,68,0.15)",
                transform: "scale(1.1)",
              },
            }}
          >
            <LogoutOutlined sx={{ fontSize: 17 }} />
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  );
}
