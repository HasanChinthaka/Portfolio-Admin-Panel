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
  TrendingUp,
  ArrowForward,
  WarningAmber,
  CheckCircle,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { axiosInstance } from "../providers/axiosInstance";

const STAT_CARDS = [
  {
    resource: "projects",
    label: "Projects",
    route: "/projects",
    icon: FolderSpecial,
    gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    iconColor: "#6366F1",
  },
  {
    resource: "skills",
    label: "Skills",
    route: "/skills",
    icon: Psychology,
    gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    iconColor: "#A855F7",
  },
  {
    resource: "services",
    label: "Services",
    route: "/services",
    icon: Build,
    gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    iconColor: "#3B82F6",
  },
  {
    resource: "blogs",
    label: "Blogs",
    route: "/blogs",
    icon: Article,
    gradient: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
    iconColor: "#10B981",
  },
  {
    resource: "educations",
    label: "Education",
    route: "/educations",
    icon: School,
    gradient: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
    iconColor: "#F59E0B",
  },
  {
    resource: "work-experiences",
    label: "Work Experiences",
    route: "/work-experiences",
    icon: BusinessCenter,
    gradient: "linear-gradient(135deg, #30cfd0 0%, #330867 100%)",
    iconColor: "#0EA5E9",
  },
  {
    resource: "clients",
    label: "Clients",
    route: "/clients",
    icon: PeopleAlt,
    gradient: "linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)",
    iconColor: "#8B5CF6",
  },
  {
    resource: "testimonials",
    label: "Testimonials",
    route: "/testimonials",
    icon: FormatQuote,
    gradient: "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
    iconColor: "#F97316",
  },
  {
    resource: "cv",
    label: "CVs",
    route: "/cv",
    icon: Description,
    gradient: "linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)",
    iconColor: "#2563EB",
  },
];

const QUICK_LINKS = [
  { label: "Add Project", route: "/projects/create" },
  { label: "Add Skill", route: "/skills/create" },
  { label: "Write Blog", route: "/blogs/create" },
  { label: "Upload CV", route: "/cv/create" },
  { label: "Add Testimonial", route: "/testimonials/create" },
  { label: "System Settings", route: "/system-features" },
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
        borderColor: isMaintenance ? "warning.light" : "success.light",
        bgcolor: isMaintenance
          ? "rgba(245,158,11,0.04)"
          : "rgba(16,185,129,0.04)",
      }}
    >
      <CardContent sx={{ p: 2.5, "&:last-child": { pb: "20px !important" } }}>
        <Box display="flex" alignItems="center" justifyContent="space-between" flexWrap="wrap" gap={2}>
          <Box display="flex" alignItems="center" gap={1.5}>
            {isMaintenance ? (
              <WarningAmber sx={{ color: "warning.main", fontSize: 28 }} />
            ) : (
              <CheckCircle sx={{ color: "success.main", fontSize: 28 }} />
            )}
            <Box>
              <Box display="flex" alignItems="center" gap={1}>
                <Typography variant="subtitle1" fontWeight={700}>
                  Maintenance Mode
                </Typography>
                <Chip
                  label={isMaintenance ? "ON" : "OFF"}
                  size="small"
                  color={isMaintenance ? "warning" : "success"}
                  sx={{ fontWeight: 700, fontSize: "0.7rem" }}
                />
              </Box>
              <Typography variant="body2" color="text.secondary">
                {isMaintenance
                  ? "Site is under maintenance — public API returns 503"
                  : "Site is live and accessible to the public"}
              </Typography>
            </Box>
          </Box>
          <Box display="flex" alignItems="center" gap={1}>
            {(isLoading || isToggling) && (
              <CircularProgress size={18} thickness={4} />
            )}
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

function StatCard(props: (typeof STAT_CARDS)[number]) {
  const { resource, label, route, icon: Icon, gradient, iconColor } = props;
  const { result, query } = useList({
    resource,
    pagination: { mode: "off" },
  });
  const isLoading = query.isLoading;
  const navigate = useNavigate();

  return (
    <Card
      onClick={() => navigate(route)}
      sx={{
        cursor: "pointer",
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
        "&:hover": {
          transform: "translateY(-3px)",
          boxShadow: "0 12px 32px rgb(0 0 0 / 0.12)",
        },
      }}
    >
      <CardContent sx={{ p: 2.5, pb: "20px !important" }}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="flex-start"
        >
          <Box>
            <Typography
              variant="caption"
              color="text.secondary"
              fontWeight={600}
              textTransform="uppercase"
              letterSpacing={0.5}
            >
              {label}
            </Typography>
            <Typography variant="h3" fontWeight={700} mt={0.5}>
              {isLoading ? (
                <CircularProgress
                  size={28}
                  thickness={4}
                  sx={{ color: iconColor }}
                />
              ) : (
                result.total ?? 0
              )}
            </Typography>
          </Box>
          <Box
            sx={{
              width: 48,
              height: 48,
              borderRadius: 3,
              background: gradient,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 4px 12px rgb(0 0 0 / 0.18)",
            }}
          >
            <Icon sx={{ color: "#fff", fontSize: 24 }} />
          </Box>
        </Box>
        <Box display="flex" alignItems="center" gap={0.5} mt={1.5}>
          <TrendingUp sx={{ fontSize: 14, color: "#10B981" }} />
          <Typography variant="caption" color="#10B981" fontWeight={600}>
            Click to manage
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}

export function Dashboard() {
  const { data: user } = useGetIdentity<{ name: string }>();
  const navigate = useNavigate();

  const hour = new Date().getHours();
  const greeting =
    hour < 12
      ? "Good morning"
      : hour < 17
      ? "Good afternoon"
      : "Good evening";

  return (
    <Box>
      {/* Hero banner */}
      <Box
        sx={{
          background:
            "linear-gradient(135deg, #312E81 0%, #4C1D95 55%, #1E40AF 100%)",
          borderRadius: 3,
          p: { xs: 3, md: 4 },
          mb: 3,
          position: "relative",
          overflow: "hidden",
          "&::before": {
            content: '""',
            position: "absolute",
            top: -50,
            right: -50,
            width: 220,
            height: 220,
            borderRadius: "50%",
            bgcolor: "rgba(255,255,255,0.04)",
          },
          "&::after": {
            content: '""',
            position: "absolute",
            bottom: -60,
            right: 80,
            width: 160,
            height: 160,
            borderRadius: "50%",
            bgcolor: "rgba(255,255,255,0.04)",
          },
        }}
      >
        <Typography variant="h4" fontWeight={700} color="#fff" mb={0.5}>
          {greeting}, {user?.name?.split(" ")[0] ?? "Admin"} 👋
        </Typography>
        <Typography color="rgba(255,255,255,0.65)" variant="body1" mb={2.5}>
          Here's what's happening with your portfolio today.
        </Typography>
        <Box display="flex" gap={1} flexWrap="wrap">
          {QUICK_LINKS.map((link) => (
            <Button
              key={link.route}
              size="small"
              onClick={() => navigate(link.route)}
              endIcon={<ArrowForward sx={{ fontSize: 14 }} />}
              sx={{
                bgcolor: "rgba(255,255,255,0.12)",
                color: "#fff",
                borderRadius: 6,
                fontSize: "0.78rem",
                px: 1.8,
                py: 0.6,
                "&:hover": { bgcolor: "rgba(255,255,255,0.22)" },
                border: "1px solid rgba(255,255,255,0.2)",
              }}
            >
              {link.label}
            </Button>
          ))}
        </Box>
      </Box>

      {/* Maintenance mode */}
      <MaintenanceToggle />

      {/* Stats grid */}
      <Typography
        variant="caption"
        fontWeight={700}
        color="text.secondary"
        textTransform="uppercase"
        letterSpacing={1}
        display="block"
        mb={1.5}
      >
        Overview
      </Typography>
      <Grid container spacing={2} mb={3}>
        {STAT_CARDS.map((card) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={card.resource}>
            <StatCard {...card} />
          </Grid>
        ))}
      </Grid>

      {/* Quick actions */}
      <Card>
        <CardContent sx={{ p: 0, "&:last-child": { pb: 0 } }}>
          <Box px={2.5} py={2}>
            <Typography variant="subtitle1" fontWeight={700}>
              Quick Actions
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Common management tasks
            </Typography>
          </Box>
          <Divider />
          <Grid container>
            {[
              {
                section: "Content",
                items: [
                  {
                    label: "Manage Projects",
                    sub: "Add, edit or remove portfolio projects",
                    route: "/projects",
                  },
                  {
                    label: "Manage Blogs",
                    sub: "Write and publish blog posts",
                    route: "/blogs",
                  },
                  {
                    label: "Manage Services",
                    sub: "Update services you offer",
                    route: "/services",
                  },
                ],
              },
              {
                section: "Profile",
                items: [
                  {
                    label: "Work Experiences",
                    sub: "Update your career history",
                    route: "/work-experiences",
                  },
                  {
                    label: "Education Records",
                    sub: "Add or update education",
                    route: "/educations",
                  },
                  {
                    label: "Upload CV",
                    sub: "Manage downloadable CV files",
                    route: "/cv",
                  },
                ],
              },
            ].map(({ section, items }) => (
              <Grid item xs={12} md={6} key={section}>
                <Box px={2.5} py={1.5}>
                  <Typography
                    variant="caption"
                    fontWeight={700}
                    color="primary"
                    textTransform="uppercase"
                    letterSpacing={0.5}
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
                        transition: "background 0.15s",
                        "&:hover": { bgcolor: "rgba(99,102,241,0.04)" },
                      }}
                      onClick={() => navigate(item.route)}
                    >
                      <Box>
                        <Typography variant="body2" fontWeight={600}>
                          {item.label}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {item.sub}
                        </Typography>
                      </Box>
                      <ArrowForward
                        sx={{ fontSize: 16, color: "text.disabled" }}
                      />
                    </Box>
                    {i < items.length - 1 && (
                      <Divider sx={{ mx: 2.5 }} />
                    )}
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
