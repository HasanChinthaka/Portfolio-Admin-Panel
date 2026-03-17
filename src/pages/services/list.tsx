/* eslint-disable @typescript-eslint/no-explicit-any */
import { useList } from "@refinedev/core";
import { List, EditButton, DeleteButton } from "@refinedev/mui";
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Stack, Chip, Avatar, Box, Typography,
} from "@mui/material";
import { Build } from "@mui/icons-material";
import { keyframes } from "@emotion/react";
import { TableSkeleton } from "../../components/TableSkeleton";

const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to   { opacity: 1; transform: translateY(0); }
`;

export function ServiceList() {
  const { result, query } = useList({ resource: "services" });
  const records = result.data ?? [];
  const isLoading = query.isLoading;

  return (
    <List resource="services" wrapperProps={{ sx: { width: "100%" } }}>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Logo</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Color</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading ? (
              <TableSkeleton cols={5} circular={[0]} widths={[32, "50%", 80, 70]} />
            ) : records.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5}>
                  <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" py={7} gap={1}>
                    <Build sx={{ fontSize: 52, color: "text.disabled" }} />
                    <Typography variant="body1" color="text.secondary" fontWeight={600}>No services yet</Typography>
                    <Typography variant="caption" color="text.disabled">Click "Create" to add your first service</Typography>
                  </Box>
                </TableCell>
              </TableRow>
            ) : (
              records.map((row: any, index: number) => (
                <TableRow key={row.id} sx={{ animation: `${fadeInUp} 0.3s ease ${index * 0.04}s both` }}>
                  <TableCell>
                    <Avatar
                      src={row.logo}
                      sx={{
                        width: 36, height: 36,
                        border: "2px solid #F1F5F9",
                        boxShadow: "0 2px 8px rgb(0 0 0 / 0.08)",
                        bgcolor: row.color ? `${row.color}18` : "rgba(59,130,246,0.08)",
                        fontSize: "0.75rem", fontWeight: 700,
                        color: row.color ?? "#2563EB",
                      }}
                    >
                      {row.title?.[0]}
                    </Avatar>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" fontWeight={600} color="text.primary">{row.title}</Typography>
                  </TableCell>
                  <TableCell>
                    {row.color ? (
                      <Box display="flex" alignItems="center" gap={1}>
                        <Box sx={{
                          width: 20, height: 20,
                          borderRadius: 1,
                          bgcolor: row.color,
                          border: "1px solid rgba(0,0,0,0.1)",
                          boxShadow: `0 2px 6px ${row.color}55`,
                          flexShrink: 0,
                        }} />
                        <Typography variant="caption" color="text.secondary" fontFamily="monospace">
                          {row.color}
                        </Typography>
                      </Box>
                    ) : (
                      <Typography variant="body2" color="text.disabled">—</Typography>
                    )}
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
                      <EditButton hideText resource="services" recordItemId={row.id} size="small" />
                      <DeleteButton hideText resource="services" recordItemId={row.id} size="small" />
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
