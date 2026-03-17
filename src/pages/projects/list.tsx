/* eslint-disable @typescript-eslint/no-explicit-any */
import { useList } from "@refinedev/core";
import { List, EditButton, DeleteButton } from "@refinedev/mui";
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Stack, Chip, Avatar, Box, Typography,
} from "@mui/material";
import { FolderSpecial } from "@mui/icons-material";
import { keyframes } from "@emotion/react";
import { TableSkeleton } from "../../components/TableSkeleton";

const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to   { opacity: 1; transform: translateY(0); }
`;

export function ProjectList() {
  const { result, query } = useList({ resource: "projects" });
  const records = result.data ?? [];
  const isLoading = query.isLoading;

  return (
    <List resource="projects" wrapperProps={{ sx: { width: "100%" } }}>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Image</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading ? (
              <TableSkeleton cols={5} circular={[0]} widths={[40, "55%", "40%", 70]} />
            ) : records.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5}>
                  <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" py={7} gap={1}>
                    <FolderSpecial sx={{ fontSize: 52, color: "text.disabled" }} />
                    <Typography variant="body1" color="text.secondary" fontWeight={600}>No projects yet</Typography>
                    <Typography variant="caption" color="text.disabled">Click "Create" to add your first project</Typography>
                  </Box>
                </TableCell>
              </TableRow>
            ) : (
              records.map((row: any, index: number) => (
                <TableRow key={row.id} sx={{ animation: `${fadeInUp} 0.3s ease ${index * 0.04}s both` }}>
                  <TableCell>
                    <Avatar
                      src={row.imageUrl}
                      variant="rounded"
                      sx={{
                        width: 42, height: 42,
                        border: "2px solid #F1F5F9",
                        boxShadow: "0 2px 8px rgb(0 0 0 / 0.08)",
                        bgcolor: "rgba(99,102,241,0.08)",
                        fontSize: "0.75rem",
                        fontWeight: 700,
                        color: "primary.main",
                      }}
                    >
                      {row.title?.[0]}
                    </Avatar>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" fontWeight={600} color="text.primary">{row.title}</Typography>
                  </TableCell>
                  <TableCell>
                    <Box display="flex" flexWrap="wrap" gap={0.5}>
                      {(row.category ?? []).map((c: any) => (
                        <Chip key={c._id ?? c} label={c.name ?? c} size="small"
                          sx={{ bgcolor: "rgba(99,102,241,0.08)", color: "primary.dark", border: "1px solid rgba(99,102,241,0.15)", fontWeight: 600 }}
                        />
                      ))}
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={row.isPublished ? "Published" : "Draft"}
                      color={row.isPublished ? "success" : "default"}
                      size="small"
                    />
                  </TableCell>
                  <TableCell align="right">
                    <Stack direction="row" spacing={0.5} justifyContent="flex-end">
                      <EditButton hideText resource="projects" recordItemId={row.id} size="small" />
                      <DeleteButton hideText resource="projects" recordItemId={row.id} size="small" />
                    </Stack>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </List>
  );
}
