import { useList, useGetIdentity, useInvalidate } from "@refinedev/core";
import {
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  CircularProgress,
  Button,
  Divider,
  Switch,
  Chip,
  useTheme,
  alpha,
} from "@mui/material";
import {
  FolderSpecial,
  Psychology,
  Build,
  Article,
  School,
  BusinessCenter,
  PeopleAlt,
  FormatQuote,
  Description,
  ArrowForward,
  WarningAmber,
  CheckCircle,
  TrendingUp,
  Bolt,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { keyframes } from "@emotion/react";
import { axiosInstance } from "../providers/axiosInstance";

const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(18px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const float1 = keyframes`
  0%, 100% { transform: translate(0, 0) scale(1); }
  50%       { transform: translate(12px, -18px) scale(1.05); }
`;
const float2 = keyframes`
  0%, 100% { transform: translate(0, 0) scale(1); }
  50%       { transform: translate(-10px, 12px) scale(0.95); }
`;
const float3 = keyframes`
  0%, 100% { transform: translate(0, 0) rotate(0deg); }
  50%       { transform: translate(8px, 8px) rotate(15deg); }
`;

const gradientMove = keyframes`
  0%   { background-position: 0% 50%; }
  50%  { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const shimmerSweep = keyframes`
  0%   { transform: translateX(-100%) skewX(-15deg); }
  100% { transform: translateX(250%) skewX(-15deg); }
`;

const countUp = keyframes`
  from { opacity: 0; transform: translateY(8px) scale(0.9); }
  to   { opacity: 1; transform: translateY(0)   scale(1);   }
`;

const STAT_CARDS = [
  { resource: "projects",         label: "Projects",         route: "/projects",          icon: FolderSpecial, gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",  bar: "#667eea" },
  { resource: "skills",           label: "Skills",           route: "/skills",            icon: Psychology,    gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",  bar: "#f093fb" },
  { resource: "services",         label: "Services",         route: "/services",          icon: Build,         gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",  bar: "#4facfe" },
  { resource: "blogs",            label: "Blogs",            route: "/blogs",             icon: Article,       gradient: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",  bar: "#43e97b" },
  { resource: "educations",       label: "Education",        route: "/educations",        icon: School,        gradient: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",  bar: "#fa709a" },
  { resource: "work-experiences", label: "Work Experiences", route: "/work-experiences",  icon: BusinessCenter,gradient: "linear-gradient(135deg, #30cfd0 0%, #330867 100%)",  bar: "#30cfd0" },
  { resource: "clients",          label: "Clients",          route: "/clients",           icon: PeopleAlt,     gradient: "linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)",  bar: "#a18cd1" },
  { resource: "testimonials",     label: "Testimonials",     route: "/testimonials",      icon: FormatQuote,   gradient: "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",  bar: "#fcb69f" },
  { resource: "cv",               label: "CVs",              route: "/cv",                icon: Description,   gradient: "linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)",  bar: "#a1c4fd" },
];

const QUICK_LINKS = [
  { label: "Add Project",      route: "/projects/create",      emoji: "💼" },
  { label: "Add Skill",        route: "/skills/create",         emoji: "⚡" },
  { label: "Write Blog",       route: "/blogs/create",          emoji: "✍️" },
  { label: "Upload CV",        route: "/cv/create",             emoji: "📄" },
  { label: "Add Testimonial",  route: "/testimonials/create",   emoji: "💬" },
  { label: "System Settings",  route: "/system-features",       emoji: "⚙️" },
];

const API_ADMIN = `${import.meta.env.VITE_API_URL}/admin`;

function MaintenanceToggle() {
  const [isToggling, setIsToggling] = useState(false);
  const invalidate = useInvalidate();

  const { result, query } = useList({
    resource: "system-features",
    pagination: { mode: "off" },
  });
  const isLoading = query.isLoading;
  const record = result.data?.[0] as any;
  const isMaintenance: boolean = record?.isMaintenance ?? false;

  const toggle = async () => {
    if (!record || isToggling) return;
    setIsToggling(true);
    try {
      const fd = new FormData();
      fd.append("isMaintenance", isMaintenance ? "false" : "true");
      await axiosInstance.put(`${API_ADMIN}/system-features/${record.id}`, fd);
      await invalidate({ resource: "system-features", invalidates: ["list"] });
    } finally {
      setIsToggling(false);
    }
  };

  return (
    <Card
      sx={{
        mb: 3,
        border: "1px solid",
        borderColor: isMaintenance ? "rgba(245,158,11,0.3)" : "rgba(16,185,129,0.3)",
        bgcolor: isMaintenance ? "rgba(245,158,11,0.04)" : "rgba(16,185,129,0.04)",
        transition: "all 0.3s ease",
        animation: `${fadeInUp} 0.4s ease 0.1s both`,
      }}
    >
      <CardContent sx={{ p: 2.5, "&:last-child": { pb: "20px !important" } }}>
        <Box display="flex" alignItems="center" justifyContent="space-between" flexWrap="wrap" gap={2}>
          <Box display="flex" alignItems="center" gap={1.5}>
            <Box sx={{
              width: 44, height: 44,
              borderRadius: 2.5,
              bgcolor: isMaintenance ? "rgba(245,158,11,0.12)" : "rgba(16,185,129,0.12)",
              display: "flex", alignItems: "center", justifyContent: "center",
              transition: "background-color 0.3s ease",
            }}>
              {isMaintenance
                ? <WarningAmber sx={{ color: "warning.main", fontSize: 24 }} />
                : <CheckCircle  sx={{ color: "success.main", fontSize: 24 }} />
              }
            </Box>
            <Box>
              <Box display="flex" alignItems="center" gap={1} mb={0.3}>
                <Typography variant="subtitle1" fontWeight={700}>
                  Maintenance Mode
                </Typography>
                <Chip
                  label={isMaintenance ? "ON" : "OFF"}
                  size="small"
                  color={isMaintenance ? "warning" : "success"}
                  sx={{ fontWeight: 700, fontSize: "0.68rem" }}
                />
              </Box>
              <Typography variant="body2" color="text.secondary" fontSize="0.82rem">
                {isMaintenance
                  ? "Site is under maintenance — public API returns 503"
                  : "Site is live and accessible to the public"}
              </Typography>
            </Box>
          </Box>
          <Box display="flex" alignItems="center" gap={1.5}>
            {(isLoading || isToggling) && <CircularProgress size={16} thickness={4} />}
            <Switch
              checked={isMaintenance}
              onChange={toggle}
              disabled={isLoading || isToggling || !record}
              color="warning"
            />
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}

function StatCard({ resource, label, route, icon: Icon, gradient, bar, index }: (typeof STAT_CARDS)[number] & { index: number }) {
  const { result, query } = useList({ resource, pagination: { mode: "off" } });
  const isLoading = query.isLoading;
  const count = result.total ?? 0;
  const navigate = useNavigate();
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  // Extract first colour from the gradient for the 3D depth edge
  const edgeColor = bar;

  return (
    <Box
      onClick={() => navigate(route)}
      sx={{
        cursor: "pointer",
        animation: `${fadeInUp} 0.45s cubic-bezier(0.22,1,0.36,1) ${0.08 + index * 0.055}s both`,
        perspective: "900px",
        // outer wrapper handles the 3D lift on hover
        "&:hover .card-face": {
          transform: "translateY(-6px) rotateX(4deg)",
          boxShadow: `
            0 2px 0 1px ${edgeColor}cc,
            0 4px 0 1px ${edgeColor}99,
            0 6px 0 1px ${edgeColor}66,
            0 8px 0 1px ${edgeColor}33,
            0 24px 48px -8px ${edgeColor}55,
            0 8px 20px rgb(0 0 0 / 0.14)
          `,
        },
        "&:hover .shimmer-sweep": {
          animation: `${shimmerSweep} 0.65s ease forwards`,
        },
        "&:hover .card-icon-box": {
          transform: "translateY(-3px) scale(1.08) rotate(-6deg)",
          boxShadow: `0 12px 28px ${edgeColor}66`,
        },
        "&:hover .card-arrow": {
          opacity: 1,
          transform: "translateX(0)",
        },
      }}
    >
      {/* 3D face */}
      <Box
        className="card-face"
        sx={{
          borderRadius: "16px",
          background: theme.palette.background.paper,
          border: `1px solid ${theme.palette.divider}`,
          overflow: "hidden",
          position: "relative",
          transformOrigin: "center bottom",
          transition: "transform 0.3s cubic-bezier(0.22,1,0.36,1), box-shadow 0.3s ease",
          // resting 3D depth — stacked shadow layers
          boxShadow: `
            0 1px 0 1px ${edgeColor}88,
            0 2px 0 1px ${edgeColor}55,
            0 3px 0 1px ${edgeColor}33,
            0 6px 16px rgb(0 0 0 / ${isDark ? "0.35" : "0.09"})
          `,
        }}
      >
        {/* Shimmer sweep overlay */}
        <Box
          className="shimmer-sweep"
          sx={{
            position: "absolute", inset: 0, zIndex: 2, pointerEvents: "none",
            overflow: "hidden", borderRadius: "16px",
            "&::after": {
              content: '""',
              position: "absolute",
              top: 0, bottom: 0,
              width: "45%",
              background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.35), transparent)",
              transform: "translateX(-100%) skewX(-15deg)",
            },
          }}
        />

        {/* Gradient top strip */}
        <Box sx={{
          height: 5,
          background: gradient,
          backgroundSize: "200% 100%",
          animation: `${gradientMove} 4s ease infinite`,
        }} />

        {/* Soft gradient tint behind content */}
        <Box sx={{
          position: "absolute",
          top: 5, left: 0, right: 0,
          height: 90,
          background: `linear-gradient(180deg, ${edgeColor}0d 0%, transparent 100%)`,
          pointerEvents: "none",
        }} />

        <Box sx={{ p: 2.5, position: "relative", zIndex: 1 }}>
          {/* Top row: label + icon */}
          <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
            <Box>
              <Typography
                variant="caption"
                fontWeight={700}
                textTransform="uppercase"
                letterSpacing={0.8}
                fontSize="0.65rem"
                sx={{ color: edgeColor, opacity: 0.75 }}
              >
                {label}
              </Typography>
              <Typography
                variant="h3"
                fontWeight={800}
                fontSize="2.2rem"
                lineHeight={1}
                mt={0.4}
                sx={{
                  color: theme.palette.text.primary,
                  animation: isLoading ? "none" : `${countUp} 0.4s ease ${0.2 + index * 0.055}s both`,
                  opacity: isLoading ? 1 : undefined,
                }}
              >
                {isLoading
                  ? <CircularProgress size={26} thickness={4} sx={{ color: edgeColor, display: "block", mt: 0.5 }} />
                  : count
                }
              </Typography>
            </Box>

            {/* 3D icon box */}
            <Box
              className="card-icon-box"
              sx={{
                width: 54,
                height: 54,
                borderRadius: "14px",
                background: gradient,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                transition: "transform 0.3s cubic-bezier(0.22,1,0.36,1), box-shadow 0.3s ease",
                boxShadow: `
                  0 1px 0 0 rgba(255,255,255,0.3) inset,
                  0 -1px 0 0 rgba(0,0,0,0.15) inset,
                  0 6px 18px ${edgeColor}50
                `,
                // inner highlight creates 3D top-light effect
                position: "relative",
                "&::before": {
                  content: '""',
                  position: "absolute",
                  top: 0, left: 0, right: 0,
                  height: "45%",
                  borderRadius: "14px 14px 50% 50%",
                  background: "rgba(255,255,255,0.18)",
                },
              }}
            >
              <Icon sx={{ color: "#fff", fontSize: 26, position: "relative", zIndex: 1, filter: "drop-shadow(0 2px 3px rgba(0,0,0,0.25))" }} />
            </Box>
          </Box>

          {/* Gradient progress bar */}
          <Box sx={{ mb: 1.8, position: "relative" }}>
            <Box sx={{
              height: 4,
              borderRadius: 2,
              bgcolor: `${edgeColor}18`,
              overflow: "hidden",
            }}>
              <Box sx={{
                height: "100%",
                width: isLoading ? "0%" : `${Math.min((count / 20) * 100, 100)}%`,
                borderRadius: 2,
                background: gradient,
                transition: "width 1s cubic-bezier(0.22,1,0.36,1)",
                boxShadow: `0 0 8px ${edgeColor}80`,
              }} />
            </Box>
          </Box>

          {/* Footer */}
          <Box display="flex" alignItems="center" justifyContent="space-between">
            <Box display="flex" alignItems="center" gap={0.6}>
              <Box sx={{
                width: 18, height: 18,
                borderRadius: "50%",
                bgcolor: alpha("#10B981", isDark ? 0.18 : 0.1),
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <TrendingUp sx={{ fontSize: 11, color: isDark ? "#34D399" : "#059669" }} />
              </Box>
              <Typography variant="caption" color="#059669" fontWeight={700} fontSize="0.7rem">
                {count} total
              </Typography>
            </Box>
            <Box
              className="card-arrow"
              sx={{
                display: "flex", alignItems: "center", gap: 0.4,
                opacity: 0,
                transform: "translateX(-6px)",
                transition: "all 0.22s ease",
              }}
            >
              <Typography variant="caption" fontWeight={700} fontSize="0.7rem" sx={{ color: edgeColor }}>
                Manage
              </Typography>
              <Box sx={{
                width: 18, height: 18,
                borderRadius: "50%",
                bgcolor: `${edgeColor}18`,
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <ArrowForward sx={{ fontSize: 10, color: edgeColor }} />
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export function Dashboard() {
  const { data: user } = useGetIdentity<{ name: string }>();
  const navigate = useNavigate();

  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Good morning" :
    hour < 17 ? "Good afternoon" :
    "Good evening";
  const greetingEmoji =
    hour < 12 ? "🌤️" : hour < 17 ? "☀️" : "🌙";

  return (
    <Box>
      {/* Hero banner */}
      <Box
        sx={{
          background: "linear-gradient(135deg, #1E1B4B 0%, #312E81 35%, #4C1D95 65%, #1E40AF 100%)",
          backgroundSize: "300% 300%",
          animation: `${gradientMove} 8s ease infinite`,
          borderRadius: 3.5,
          p: { xs: 3, md: 4 },
          mb: 3,
          position: "relative",
          overflow: "hidden",
          boxShadow: "0 8px 40px rgba(49,46,129,0.4)",
        }}
      >
        {/* Floating decorative orbs */}
        <Box sx={{ position: "absolute", top: -40, right: 60, width: 180, height: 180, borderRadius: "50%", bgcolor: "rgba(165,180,252,0.08)", animation: `${float1} 6s ease-in-out infinite`, pointerEvents: "none" }} />
        <Box sx={{ position: "absolute", bottom: -50, right: -30, width: 220, height: 220, borderRadius: "50%", bgcolor: "rgba(196,181,253,0.06)", animation: `${float2} 8s ease-in-out infinite`, pointerEvents: "none" }} />
        <Box sx={{ position: "absolute", top: 20, right: "35%", width: 60, height: 60, borderRadius: 3, bgcolor: "rgba(255,255,255,0.04)", animation: `${float3} 5s ease-in-out infinite`, pointerEvents: "none" }} />

        <Box sx={{ position: "relative", zIndex: 1 }}>
          <Box display="flex" alignItems="center" gap={1.2} mb={0.5}>
            <Typography fontSize="1.6rem" lineHeight={1}>{greetingEmoji}</Typography>
            <Typography variant="h4" fontWeight={800} color="#fff" fontSize={{ xs: "1.4rem", md: "1.7rem" }}>
              {greeting}, {user?.name?.split(" ")[0] ?? "Admin"}!
            </Typography>
          </Box>
          <Typography color="rgba(255,255,255,0.6)" variant="body2" mb={2.5} fontSize="0.9rem">
            Here's what's happening with your portfolio today.
          </Typography>
          <Box display="flex" gap={1} flexWrap="wrap">
            {QUICK_LINKS.map((link) => (
              <Button
                key={link.route}
                size="small"
                onClick={() => navigate(link.route)}
                startIcon={<Typography fontSize="0.85rem" lineHeight={1} component="span">{link.emoji}</Typography>}
                endIcon={<ArrowForward sx={{ fontSize: 13 }} />}
                sx={{
                  bgcolor: "rgba(255,255,255,0.1)",
                  color: "rgba(255,255,255,0.9)",
                  borderRadius: 6,
                  fontSize: "0.78rem",
                  fontWeight: 600,
                  px: 1.8,
                  py: 0.55,
                  backdropFilter: "blur(4px)",
                  border: "1px solid rgba(255,255,255,0.15)",
                  transition: "all 0.18s ease",
                  "&:hover": {
                    bgcolor: "rgba(255,255,255,0.2)",
                    borderColor: "rgba(255,255,255,0.3)",
                    transform: "translateY(-1px)",
                  },
                }}
              >
                {link.label}
              </Button>
            ))}
          </Box>
        </Box>
      </Box>

      {/* Maintenance mode */}
      <MaintenanceToggle />

      {/* Stats grid */}
      <Box display="flex" alignItems="center" gap={1} mb={2}>
        <Box sx={{ width: 3, height: 18, borderRadius: 2, background: "linear-gradient(135deg, #6366F1, #8B5CF6)" }} />
        <Typography variant="caption" fontWeight={700} color="text.secondary" textTransform="uppercase" letterSpacing={1}>
          Overview
        </Typography>
        <Box flex={1} />
        <Chip
          icon={<Bolt sx={{ fontSize: "14px !important" }} />}
          label={`${STAT_CARDS.length} resources`}
          size="small"
          sx={{ bgcolor: "rgba(99,102,241,0.08)", color: "primary.main", border: "1px solid rgba(99,102,241,0.15)", fontWeight: 600, fontSize: "0.68rem" }}
        />
      </Box>

      <Grid container spacing={2.5} mb={3}>
        {STAT_CARDS.map((card, index) => (
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={card.resource}>
            <StatCard {...card} index={index} />
          </Grid>
        ))}
      </Grid>

      {/* Quick actions */}
      <Card sx={{ animation: `${fadeInUp} 0.4s ease 0.6s both` }}>
        <CardContent sx={{ p: 0, "&:last-child": { pb: 0 } }}>
          <Box px={2.5} py={2} display="flex" alignItems="center" gap={1.5}>
            <Box sx={{ width: 3, height: 18, borderRadius: 2, background: "linear-gradient(135deg, #6366F1, #8B5CF6)" }} />
            <Box>
              <Typography variant="subtitle1" fontWeight={700} lineHeight={1.2}>
                Quick Actions
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Common management tasks
              </Typography>
            </Box>
          </Box>
          <Divider />
          <Grid container>
            {[
              {
                section: "Content",
                emoji: "📝",
                items: [
                  { label: "Manage Projects",  sub: "Add, edit or remove portfolio projects", route: "/projects" },
                  { label: "Manage Blogs",      sub: "Write and publish blog posts",           route: "/blogs" },
                  { label: "Manage Services",   sub: "Update services you offer",              route: "/services" },
                ],
              },
              {
                section: "Profile",
                emoji: "👤",
                items: [
                  { label: "Work Experiences",  sub: "Update your career history",          route: "/work-experiences" },
                  { label: "Education Records", sub: "Add or update education",             route: "/educations" },
                  { label: "Upload CV",          sub: "Manage downloadable CV files",        route: "/cv" },
                ],
              },
            ].map(({ section, emoji, items }) => (
              <Grid size={{ xs: 12, md: 6 }} key={section}>
                <Box px={2.5} py={1.5} display="flex" alignItems="center" gap={0.8}>
                  <Typography fontSize="0.85rem">{emoji}</Typography>
                  <Typography
                    variant="caption"
                    fontWeight={700}
                    color="primary"
                    textTransform="uppercase"
                    letterSpacing={0.6}
                  >
                    {section}
                  </Typography>
                </Box>
                {items.map((item, i) => (
                  <Box key={i}>
                    <Box
                      display="flex"
                      alignItems="center"
                      justifyContent="space-between"
                      px={2.5}
                      py={1.5}
                      sx={{
                        cursor: "pointer",
                        transition: "background 0.15s ease",
                        "&:hover": {
                          bgcolor: "rgba(99,102,241,0.04)",
                          "& .quick-arrow": { opacity: 1, transform: "translateX(0)" },
                        },
                      }}
                      onClick={() => navigate(item.route)}
                    >
                      <Box>
                        <Typography variant="body2" fontWeight={600} fontSize="0.85rem">
                          {item.label}
                        </Typography>
                        <Typography variant="caption" color="text.secondary" fontSize="0.75rem">
                          {item.sub}
                        </Typography>
                      </Box>
                      <Box
                        className="quick-arrow"
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          width: 28,
                          height: 28,
                          borderRadius: 1.5,
                          bgcolor: "rgba(99,102,241,0.08)",
                          opacity: 0,
                          transform: "translateX(-4px)",
                          transition: "all 0.18s ease",
                          flexShrink: 0,
                        }}
                      >
                        <ArrowForward sx={{ fontSize: 14, color: "primary.main" }} />
                      </Box>
                    </Box>
                    {i < items.length - 1 && <Divider sx={{ mx: 2.5 }} />}
                  </Box>
                ))}
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
}
