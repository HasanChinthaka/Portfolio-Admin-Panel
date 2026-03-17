/* eslint-disable @typescript-eslint/no-explicit-any */
import { useList } from "@refinedev/core";
import { List, EditButton, DeleteButton } from "@refinedev/mui";
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Stack, Chip, Avatar, Box, Typography,
} from "@mui/material";
import { Article } from "@mui/icons-material";
import { keyframes } from "@emotion/react";
import { TableSkeleton } from "../../components/TableSkeleton";

const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to   { opacity: 1; transform: translateY(0); }
`;

export function BlogList() {
  const { result, query } = useList({ resource: "blogs" });
  const records = result.data ?? [];
  const isLoading = query.isLoading;

  return (
    <List resource="blogs" wrapperProps={{ sx: { width: "100%" } }}>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Image</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Author</TableCell>
              <TableCell>Tags</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading ? (
              <TableSkeleton cols={6} circular={[0]} widths={[40, "55%", "30%", "40%", 70]} />
            ) : records.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6}>
                  <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" py={7} gap={1}>
                    <Article sx={{ fontSize: 52, color: "text.disabled" }} />
                    <Typography variant="body1" color="text.secondary" fontWeight={600}>No blogs yet</Typography>
                    <Typography variant="caption" color="text.disabled">Click "Create" to write your first blog</Typography>
                  </Box>
                </TableCell>
              </TableRow>
            ) : (
              records.map((row: any, index: number) => (
                <TableRow key={row.id} sx={{ animation: `${fadeInUp} 0.3s ease ${index * 0.04}s both` }}>
                  <TableCell>
                    <Avatar
                      src={row.image}
                      variant="rounded"
                      sx={{
                        width: 42, height: 42,
                        border: "2px solid #F1F5F9",
                        boxShadow: "0 2px 8px rgb(0 0 0 / 0.08)",
                        bgcolor: "rgba(16,185,129,0.08)",
                        fontSize: "0.75rem", fontWeight: 700, color: "#059669",
                      }}
                    >
                      {row.title?.[0]}
                    </Avatar>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" fontWeight={600} color="text.primary" sx={{ maxWidth: 220 }} noWrap>
                      {row.title}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" color="text.secondary">{row.author}</Typography>
                  </TableCell>
                  <TableCell>
                    <Box display="flex" flexWrap="wrap" gap={0.5}>
                      {(row.tags ?? []).slice(0, 3).map((t: string) => (
                        <Chip key={t} label={t} size="small"
                          sx={{ bgcolor: "rgba(16,185,129,0.08)", color: "#059669", border: "1px solid rgba(16,185,129,0.15)", fontWeight: 600 }}
                        />
                      ))}
                      {(row.tags ?? []).length > 3 && (
                        <Chip label={`+${(row.tags ?? []).length - 3}`} size="small" sx={{ bgcolor: "#F1F5F9", color: "text.secondary" }} />
                      )}
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
                      <EditButton hideText resource="blogs" recordItemId={row.id} size="small" />
                      <DeleteButton hideText resource="blogs" recordItemId={row.id} size="small" />
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
