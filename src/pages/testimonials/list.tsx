/* eslint-disable @typescript-eslint/no-explicit-any */
import { useList } from "@refinedev/core";
import { List, EditButton, DeleteButton } from "@refinedev/mui";
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Stack, Chip, Avatar, Box, Typography,
} from "@mui/material";
import { FormatQuote } from "@mui/icons-material";
import { keyframes } from "@emotion/react";
import { TableSkeleton } from "../../components/TableSkeleton";

const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to   { opacity: 1; transform: translateY(0); }
`;

export function TestimonialList() {
  const { result, query } = useList({ resource: "testimonials" });
  const records = result.data ?? [];
  const isLoading = query.isLoading;

  return (
    <List resource="testimonials" wrapperProps={{ sx: { width: "100%" } }}>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Avatar</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Client</TableCell>
              <TableCell>Review</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading ? (
              <TableSkeleton cols={6} circular={[0]} widths={[32, "35%", "25%", "50%", 70]} />
            ) : records.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6}>
                  <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" py={7} gap={1}>
                    <FormatQuote sx={{ fontSize: 52, color: "text.disabled" }} />
                    <Typography variant="body1" color="text.secondary" fontWeight={600}>No testimonials yet</Typography>
                    <Typography variant="caption" color="text.disabled">Click "Create" to add your first testimonial</Typography>
                  </Box>
                </TableCell>
              </TableRow>
            ) : (
              records.map((row: any, index: number) => (
                <TableRow key={row.id} sx={{ animation: `${fadeInUp} 0.3s ease ${index * 0.04}s both` }}>
                  <TableCell>
                    <Avatar
                      src={row.avatar}
                      sx={{
                        width: 38, height: 38,
                        border: "2px solid #F1F5F9",
                        boxShadow: "0 2px 8px rgb(0 0 0 / 0.08)",
                        bgcolor: "rgba(139,92,246,0.1)",
                        fontSize: "0.8rem", fontWeight: 700, color: "#7C3AED",
                      }}
                    >
                      {row.name?.[0]}
                    </Avatar>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" fontWeight={600} color="text.primary">{row.name}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" color="text.secondary">{row.client?.name ?? "—"}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ maxWidth: 240, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}
                    >
                      {row.review}
                    </Typography>
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
                      <EditButton hideText resource="testimonials" recordItemId={row.id} size="small" />
                      <DeleteButton hideText resource="testimonials" recordItemId={row.id} size="small" />
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
