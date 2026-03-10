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

const ICONS: Record<string, React.ReactNode> = {
  projects: <FolderSpecial sx={{ fontSize: 20 }} />,
  "projects-category": <Category sx={{ fontSize: 20 }} />,
  skills: <Psychology sx={{ fontSize: 20 }} />,
  "skills-category": <ClassOutlined sx={{ fontSize: 20 }} />,
  services: <Build sx={{ fontSize: 20 }} />,
  blogs: <Article sx={{ fontSize: 20 }} />,
  educations: <School sx={{ fontSize: 20 }} />,
  "work-experiences": <BusinessCenter sx={{ fontSize: 20 }} />,
  clients: <PeopleAlt sx={{ fontSize: 20 }} />,
  testimonials: <FormatQuote sx={{ fontSize: 20 }} />,
  "contact-info": <ContactPhone sx={{ fontSize: 20 }} />,
  "social-account": <Share sx={{ fontSize: 20 }} />,
  "system-features": <Settings sx={{ fontSize: 20 }} />,
  cv: <Description sx={{ fontSize: 20 }} />,
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
        background: "linear-gradient(180deg, #312E81 0%, #4C1D95 50%, #3730A3 100%)",
        display: "flex",
        flexDirection: "column",
        transition: "width 0.25s ease, min-width 0.25s ease",
        zIndex: 1200,
        overflowX: "hidden",
        boxShadow: "4px 0 24px rgb(0 0 0 / 0.15)",
      }}
    >
      {/* Brand */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: collapsed ? "center" : "space-between",
          px: collapsed ? 1 : 2,
          py: 2,
          minHeight: 64,
          borderBottom: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        {!collapsed && (
          <Box display="flex" alignItems="center" gap={1.2}>
            <Box
              sx={{
                width: 34,
                height: 34,
                borderRadius: 2,
                background: "linear-gradient(135deg, #818CF8, #C4B5FD)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <Dashboard sx={{ fontSize: 18, color: "#fff" }} />
            </Box>
            <Box>
              <Typography
                variant="body2"
                fontWeight={700}
                color="#fff"
                lineHeight={1.2}
              >
                Portfolio
              </Typography>
              <Typography variant="caption" color="rgba(255,255,255,0.5)">
                Admin Panel
              </Typography>
            </Box>
          </Box>
        )}
        {collapsed && (
          <Box
            sx={{
              width: 34,
              height: 34,
              borderRadius: 2,
              background: "linear-gradient(135deg, #818CF8, #C4B5FD)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Dashboard sx={{ fontSize: 18, color: "#fff" }} />
          </Box>
        )}
      </Box>

      {/* Nav items */}
      <Box sx={{ flex: 1, overflowY: "auto", overflowX: "hidden", py: 1 }}>
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
                  py: 1,
                  mb: 0.5,
                  borderRadius: 2,
                  cursor: "pointer",
                  color: isActive ? "#fff" : "rgba(255,255,255,0.65)",
                  bgcolor: isActive ? "rgba(255,255,255,0.15)" : "transparent",
                  borderLeft: isActive ? "3px solid #A5B4FC" : "3px solid transparent",
                  transition: "all 0.15s ease",
                  "&:hover": {
                    bgcolor: "rgba(255,255,255,0.1)",
                    color: "#fff",
                  },
                  justifyContent: collapsed ? "center" : "flex-start",
                }}
              >
                <Dashboard sx={{ fontSize: 20, flexShrink: 0 }} />
                {!collapsed && (
                  <Typography variant="body2" fontWeight={isActive ? 700 : 500} noWrap>
                    Dashboard
                  </Typography>
                )}
              </Box>
            </Tooltip>
          )}
        </NavLink>

        <Divider sx={{ borderColor: "rgba(255,255,255,0.08)", mx: 1, my: 0.5 }} />

        {menuItems.map((item) => {
          const itemRoute = item.route ?? "___";
          const isSelected =
            selectedKey === item.key ||
            selectedKey === itemRoute ||
            (selectedKey !== "/" &&
              selectedKey !== undefined &&
              selectedKey.startsWith(itemRoute + "/"));
          const icon = ICONS[item.name] ?? <FolderSpecial sx={{ fontSize: 20 }} />;

          return (
            <Tooltip
              key={item.key}
              title={collapsed ? item.label : ""}
              placement="right"
            >
              <NavLink
                to={item.route ?? "/"}
                style={{ textDecoration: "none" }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1.5,
                    mx: 1,
                    px: 1.5,
                    py: 0.9,
                    borderRadius: 2,
                    cursor: "pointer",
                    color: isSelected ? "#fff" : "rgba(255,255,255,0.65)",
                    bgcolor: isSelected
                      ? "rgba(255,255,255,0.15)"
                      : "transparent",
                    borderLeft: isSelected
                      ? "3px solid #A5B4FC"
                      : "3px solid transparent",
                    transition: "all 0.15s ease",
                    "&:hover": {
                      bgcolor: "rgba(255,255,255,0.1)",
                      color: "#fff",
                    },
                    justifyContent: collapsed ? "center" : "flex-start",
                  }}
                >
                  <Box sx={{ flexShrink: 0 }}>{icon}</Box>
                  {!collapsed && (
                    <Typography
                      variant="body2"
                      fontWeight={isSelected ? 700 : 500}
                      noWrap
                    >
                      {item.label}
                    </Typography>
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
          borderTop: "1px solid rgba(255,255,255,0.08)",
          p: 1.5,
          display: "flex",
          alignItems: "center",
          gap: 1.5,
          justifyContent: collapsed ? "center" : "space-between",
        }}
      >
        {!collapsed && (
          <Box display="flex" alignItems="center" gap={1.2} minWidth={0}>
            <Avatar
              sx={{
                width: 32,
                height: 32,
                bgcolor: "#818CF8",
                fontSize: "0.8rem",
                flexShrink: 0,
              }}
            >
              {user?.name?.[0]?.toUpperCase() ?? "A"}
            </Avatar>
            <Box minWidth={0}>
              <Typography
                variant="body2"
                fontWeight={600}
                color="#fff"
                noWrap
                lineHeight={1.2}
              >
                {user?.name ?? "Admin"}
              </Typography>
              <Typography variant="caption" color="rgba(255,255,255,0.45)" noWrap>
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
              color: "rgba(255,255,255,0.5)",
              flexShrink: 0,
              "&:hover": { color: "#FCA5A5", bgcolor: "rgba(239,68,68,0.1)" },
            }}
          >
            <LogoutOutlined sx={{ fontSize: 18 }} />
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  );
}
