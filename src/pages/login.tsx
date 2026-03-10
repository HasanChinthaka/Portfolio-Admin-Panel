import { useLogin } from "@refinedev/core";
import { useForm } from "react-hook-form";
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  TextField,
  Typography,
  Alert,
  InputAdornment,
  IconButton,
} from "@mui/material";
import {
  Dashboard,
  EmailOutlined,
  LockOutlined,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import { useState } from "react";

export function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const { mutate: login, isLoading, error } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ email: string; password: string }>();

  const onSubmit = handleSubmit((values) => {
    login({ email: values.email, password: values.password });
  });

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        background: "linear-gradient(135deg, #312E81 0%, #4C1D95 55%, #1E40AF 100%)",
        position: "relative",
        overflow: "hidden",
        "&::before": {
          content: '""',
          position: "absolute",
          top: -100,
          right: -100,
          width: 400,
          height: 400,
          borderRadius: "50%",
          bgcolor: "rgba(255,255,255,0.04)",
        },
        "&::after": {
          content: '""',
          position: "absolute",
          bottom: -150,
          left: -100,
          width: 500,
          height: 500,
          borderRadius: "50%",
          bgcolor: "rgba(255,255,255,0.03)",
        },
      }}
    >
      {/* Left panel - branding */}
      <Box
        sx={{
          display: { xs: "none", md: "flex" },
          flex: 1,
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          p: 6,
          position: "relative",
          zIndex: 1,
        }}
      >
        <Box
          sx={{
            width: 64,
            height: 64,
            borderRadius: 3,
            background: "rgba(255,255,255,0.15)",
            backdropFilter: "blur(10px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mb: 3,
            border: "1px solid rgba(255,255,255,0.2)",
          }}
        >
          <Dashboard sx={{ fontSize: 32, color: "#fff" }} />
        </Box>
        <Typography variant="h3" fontWeight={700} color="#fff" mb={1} textAlign="center">
          Portfolio Admin
        </Typography>
        <Typography
          variant="body1"
          color="rgba(255,255,255,0.6)"
          textAlign="center"
          maxWidth={320}
          lineHeight={1.8}
        >
          Manage your portfolio content, projects, skills, and more from one
          central dashboard.
        </Typography>

        <Box mt={6} display="flex" gap={2} flexWrap="wrap" justifyContent="center">
          {["Projects", "Skills", "Blogs", "Services", "CV", "Clients"].map((t) => (
            <Box
              key={t}
              sx={{
                px: 2,
                py: 0.8,
                borderRadius: 6,
                bgcolor: "rgba(255,255,255,0.1)",
                border: "1px solid rgba(255,255,255,0.15)",
                backdropFilter: "blur(8px)",
              }}
            >
              <Typography variant="caption" color="rgba(255,255,255,0.75)" fontWeight={600}>
                {t}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>

      {/* Right panel - form */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flex: { xs: 1, md: "0 0 480px" },
          p: 3,
          position: "relative",
          zIndex: 1,
        }}
      >
        <Card
          sx={{
            width: "100%",
            maxWidth: 420,
            borderRadius: 4,
            boxShadow: "0 32px 64px rgb(0 0 0 / 0.3)",
            border: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          <CardContent sx={{ p: { xs: 3, sm: 4 } }}>
            {/* Mobile logo */}
            <Box
              display={{ xs: "flex", md: "none" }}
              alignItems="center"
              gap={1.5}
              mb={3}
            >
              <Box
                sx={{
                  width: 36,
                  height: 36,
                  borderRadius: 2,
                  background: "linear-gradient(135deg, #6366F1, #8B5CF6)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Dashboard sx={{ fontSize: 20, color: "#fff" }} />
              </Box>
              <Typography variant="h6" fontWeight={700}>
                Portfolio Admin
              </Typography>
            </Box>

            <Typography variant="h5" fontWeight={700} mb={0.5}>
              Welcome back
            </Typography>
            <Typography variant="body2" color="text.secondary" mb={3}>
              Sign in to your admin account to continue.
            </Typography>

            {error && (
              <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}>
                {(error as any)?.message ?? "Invalid credentials"}
              </Alert>
            )}

            <Box component="form" onSubmit={onSubmit} noValidate>
              <TextField
                {...register("email", {
                  required: "Email is required",
                  pattern: { value: /\S+@\S+\.\S+/, message: "Invalid email" },
                })}
                label="Email address"
                type="email"
                fullWidth
                error={!!errors.email}
                helperText={errors.email?.message as string}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailOutlined sx={{ fontSize: 18, color: "text.disabled" }} />
                    </InputAdornment>
                  ),
                }}
                sx={{ mb: 2 }}
              />

              <TextField
                {...register("password", { required: "Password is required" })}
                label="Password"
                type={showPassword ? "text" : "password"}
                fullWidth
                error={!!errors.password}
                helperText={errors.password?.message as string}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockOutlined sx={{ fontSize: 18, color: "text.disabled" }} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        size="small"
                        onClick={() => setShowPassword((p) => !p)}
                        edge="end"
                      >
                        {showPassword ? (
                          <VisibilityOff sx={{ fontSize: 18 }} />
                        ) : (
                          <Visibility sx={{ fontSize: 18 }} />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{ mb: 3 }}
              />

              <Button
                type="submit"
                variant="contained"
                fullWidth
                size="large"
                disabled={isLoading}
                sx={{
                  py: 1.4,
                  fontSize: "0.95rem",
                  background: "linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)",
                  boxShadow: "0 4px 16px rgb(99 102 241 / 0.4)",
                  "&:hover": {
                    boxShadow: "0 6px 20px rgb(99 102 241 / 0.5)",
                  },
                }}
              >
                {isLoading ? "Signing in…" : "Sign in"}
              </Button>
            </Box>

            <Divider sx={{ my: 3 }} />
            <Typography variant="caption" color="text.disabled" display="block" textAlign="center">
              Only admin accounts can sign in. Contact your administrator for access.
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}
