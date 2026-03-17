/* eslint-disable @typescript-eslint/no-explicit-any */
import { useList } from "@refinedev/core";
import { List, EditButton, DeleteButton } from "@refinedev/mui";
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Stack, Chip, Avatar, Box, Typography, Link,
} from "@mui/material";
import { PeopleAlt, OpenInNew } from "@mui/icons-material";
import { keyframes } from "@emotion/react";
import { TableSkeleton } from "../../components/TableSkeleton";

const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to   { opacity: 1; transform: translateY(0); }
`;

export function ClientList() {
  const { result, query } = useList({ resource: "clients" });
  const records = result.data ?? [];
  const isLoading = query.isLoading;

  return (
    <List resource="clients" wrapperProps={{ sx: { width: "100%" } }}>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Logo</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Website</TableCell>
              <TableCell>Visibility</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading ? (
              <TableSkeleton cols={5} circular={[0]} widths={[40, "40%", "40%", 60]} />
            ) : records.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5}>
                  <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" py={7} gap={1}>
                    <PeopleAlt sx={{ fontSize: 52, color: "text.disabled" }} />
                    <Typography variant="body1" color="text.secondary" fontWeight={600}>No clients yet</Typography>
                    <Typography variant="caption" color="text.disabled">Click "Create" to add your first client</Typography>
                  </Box>
                </TableCell>
              </TableRow>
            ) : (
              records.map((row: any, index: number) => (
                <TableRow key={row.id} sx={{ animation: `${fadeInUp} 0.3s ease ${index * 0.04}s both` }}>
                  <TableCell>
                    <Avatar
                      src={row.logo}
                      variant="rounded"
                      sx={{
                        width: 42, height: 42,
                        border: "2px solid #F1F5F9",
                        boxShadow: "0 2px 8px rgb(0 0 0 / 0.08)",
                        bgcolor: "rgba(139,92,246,0.08)",
                        fontSize: "0.75rem", fontWeight: 700, color: "#7C3AED",
                      }}
                    >
                      {row.name?.[0]}
                    </Avatar>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" fontWeight={600} color="text.primary">{row.name}</Typography>
                  </TableCell>
                  <TableCell>
                    {row.website ? (
                      <Link
                        href={row.website}
                        target="_blank"
                        rel="noreferrer"
                        underline="none"
                        sx={{
                          display: "inline-flex", alignItems: "center", gap: 0.5,
                          color: "primary.main", fontWeight: 500, fontSize: "0.82rem",
                          "&:hover": { color: "primary.dark" },
                        }}
                      >
                        {(() => { try { return new URL(row.website).hostname.replace("www.", ""); } catch { return row.website; } })()}
                        <OpenInNew sx={{ fontSize: 12 }} />
                      </Link>
                    ) : (
                      <Typography variant="body2" color="text.disabled">—</Typography>
                    )}
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
                      <EditButton hideText resource="clients" recordItemId={row.id} size="small" />
                      <DeleteButton hideText resource="clients" recordItemId={row.id} size="small" />
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
