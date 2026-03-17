/* eslint-disable @typescript-eslint/no-explicit-any */
import { useList } from "@refinedev/core";
import { List, EditButton, DeleteButton } from "@refinedev/mui";
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Stack, Chip, Avatar, Box, Typography,
} from "@mui/material";
import { Psychology } from "@mui/icons-material";
import { keyframes } from "@emotion/react";
import { TableSkeleton } from "../../components/TableSkeleton";

const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const LEVEL_COLORS: Record<string, { bg: string; color: string }> = {
  Beginner:     { bg: "rgba(59,130,246,0.08)",  color: "#2563EB" },
  Intermediate: { bg: "rgba(245,158,11,0.08)",  color: "#D97706" },
  Advanced:     { bg: "rgba(16,185,129,0.08)",  color: "#059669" },
  Expert:       { bg: "rgba(139,92,246,0.08)",  color: "#7C3AED" },
};

export function SkillList() {
  const { result, query } = useList({ resource: "skills" });
  const records = result.data ?? [];
  const isLoading = query.isLoading;

  return (
    <List resource="skills" wrapperProps={{ sx: { width: "100%" } }}>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Logo</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Level</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Visibility</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading ? (
              <TableSkeleton cols={6} circular={[0]} widths={[32, "50%", 80, "40%", 60]} />
            ) : records.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6}>
                  <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" py={7} gap={1}>
                    <Psychology sx={{ fontSize: 52, color: "text.disabled" }} />
                    <Typography variant="body1" color="text.secondary" fontWeight={600}>No skills yet</Typography>
                    <Typography variant="caption" color="text.disabled">Click "Create" to add your first skill</Typography>
                  </Box>
                </TableCell>
              </TableRow>
            ) : (
              records.map((row: any, index: number) => {
                const level = row.level as string;
                const levelStyle = LEVEL_COLORS[level] ?? { bg: "#F1F5F9", color: "#64748B" };
                return (
                  <TableRow key={row.id} sx={{ animation: `${fadeInUp} 0.3s ease ${index * 0.04}s both` }}>
                    <TableCell>
                      <Avatar
                        src={row.logo}
                        sx={{
                          width: 36, height: 36,
                          border: "2px solid #F1F5F9",
                          boxShadow: "0 2px 8px rgb(0 0 0 / 0.08)",
                          bgcolor: "rgba(99,102,241,0.08)",
                          fontSize: "0.75rem", fontWeight: 700, color: "primary.main",
                        }}
                      >
                        {row.name?.[0]}
                      </Avatar>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" fontWeight={600} color="text.primary">{row.name}</Typography>
                    </TableCell>
                    <TableCell>
                      {level && (
                        <Chip
                          label={level}
                          size="small"
                          sx={{ bgcolor: levelStyle.bg, color: levelStyle.color, border: `1px solid ${levelStyle.color}22`, fontWeight: 600 }}
                        />
                      )}
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" color="text.secondary">{row.category?.name ?? "—"}</Typography>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={row.isPublic ? "Public" : "Private"}
                        color={row.isPublic ? "success" : "default"}
                        size="small"
                      />
                    </TableCell>
                    <TableCell align="right">
                      <Stack direction="row" spacing={0.5} justifyContent="flex-end">
                        <EditButton hideText resource="skills" recordItemId={row.id} size="small" />
                        <DeleteButton hideText resource="skills" recordItemId={row.id} size="small" />
                      </Stack>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </List>
  );
}
