import { useList } from "@refinedev/core";
import { List, EditButton, DeleteButton } from "@refinedev/mui";
import {
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  Chip,
  Skeleton,
  Stack,
} from "@mui/material";
import { ClassOutlined, Psychology } from "@mui/icons-material";

const GRADIENT_PALETTE = [
  "linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)",
  "linear-gradient(135deg, #30cfd0 0%, #330867 100%)",
  "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
  "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
  "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
  "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
  "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
];

export function SkillCategoryList() {
  const { result, query } = useList({
    resource: "skills-category",
    pagination: { mode: "off" },
  });
  const { result: skillsResult, query: skillsQuery } = useList({
    resource: "skills",
    pagination: { mode: "off" },
  });

  const records = result.data ?? [];
  const skills = skillsResult.data ?? [];
  const isLoading = query.isLoading;
  const skillsLoading = skillsQuery.isLoading;

  const getSkillCount = (categoryId: string) =>
    skills.filter(
      (s: any) => (s.category?._id ?? s.category) === categoryId
    ).length;

  return (
    <List resource="skills-category">
      {isLoading ? (
        <Grid container spacing={2} p={1}>
          {[...Array(6)].map((_, i) => (
            <Grid item xs={12} sm={6} md={4} key={i}>
              <Skeleton variant="rounded" height={130} />
            </Grid>
          ))}
        </Grid>
      ) : records.length === 0 ? (
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          py={8}
          gap={1}
        >
          <ClassOutlined sx={{ fontSize: 48, color: "text.disabled" }} />
          <Typography variant="body1" color="text.secondary" fontWeight={500}>
            No skill categories yet
          </Typography>
          <Typography variant="body2" color="text.disabled">
            Click "Create" to add your first category
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={2} p={1}>
          {records.map((row: any, index: number) => {
            const count = getSkillCount(row.id);
            const gradient = GRADIENT_PALETTE[index % GRADIENT_PALETTE.length];
            const letter = (row.name ?? "?")[0].toUpperCase();

            return (
              <Grid item xs={12} sm={6} md={4} lg={3} key={row.id}>
                <Card
                  sx={{
                    height: "100%",
                    transition: "transform 0.2s ease, box-shadow 0.2s ease",
                    "&:hover": {
                      transform: "translateY(-2px)",
                      boxShadow: "0 8px 24px rgb(0 0 0 / 0.1)",
                    },
                  }}
                >
                  <CardContent sx={{ p: 2.5 }}>
                    <Box display="flex" alignItems="flex-start" gap={2} mb={2}>
                      <Box
                        sx={{
                          width: 44,
                          height: 44,
                          borderRadius: 2.5,
                          background: gradient,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                          boxShadow: "0 4px 10px rgb(0 0 0 / 0.15)",
                        }}
                      >
                        <Typography
                          fontWeight={700}
                          fontSize="1.1rem"
                          color="#fff"
                        >
                          {letter}
                        </Typography>
                      </Box>
                      <Box flex={1} minWidth={0}>
                        <Typography
                          variant="subtitle1"
                          fontWeight={700}
                          noWrap
                          title={row.name}
                        >
                          {row.name}
                        </Typography>
                        <Box display="flex" alignItems="center" gap={0.5} mt={0.3}>
                          <Psychology
                            sx={{ fontSize: 13, color: "text.disabled" }}
                          />
                          <Typography variant="caption" color="text.secondary">
                            {skillsLoading ? "…" : `${count} skill${count !== 1 ? "s" : ""}`}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>

                    <Box
                      display="flex"
                      alignItems="center"
                      justifyContent="space-between"
                      pt={1.5}
                      sx={{ borderTop: "1px solid", borderColor: "divider" }}
                    >
                      <Chip
                        label={count > 0 ? "In use" : "Unused"}
                        size="small"
                        color={count > 0 ? "success" : "default"}
                      />
                      <Stack direction="row" spacing={0.5}>
                        <EditButton
                          hideText
                          resource="skills-category"
                          recordItemId={row.id}
                          size="small"
                        />
                        <DeleteButton
                          hideText
                          resource="skills-category"
                          recordItemId={row.id}
                          size="small"
                        />
                      </Stack>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      )}
    </List>
  );
}
