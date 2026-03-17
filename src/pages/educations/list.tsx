/* eslint-disable @typescript-eslint/no-explicit-any */
import { useList } from "@refinedev/core";
import { List, EditButton, DeleteButton } from "@refinedev/mui";
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Stack, Chip, Avatar, Box, Typography,
} from "@mui/material";
import { School } from "@mui/icons-material";
import { keyframes } from "@emotion/react";
import { TableSkeleton } from "../../components/TableSkeleton";

const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to   { opacity: 1; transform: translateY(0); }
`;

export function EducationList() {
  const { result, query } = useList({ resource: "educations" });
  const records = result.data ?? [];
  const isLoading = query.isLoading;

  return (
    <List resource="educations" wrapperProps={{ sx: { width: "100%" } }}>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Logo</TableCell>
              <TableCell>Institute</TableCell>
              <TableCell>Degree</TableCell>
              <TableCell>Period</TableCell>
              <TableCell>Visibility</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading ? (
              <TableSkeleton cols={6} circular={[0]} widths={[32, "45%", "35%", "25%", 60]} />
            ) : records.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6}>
                  <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" py={7} gap={1}>
                    <School sx={{ fontSize: 52, color: "text.disabled" }} />
                    <Typography variant="body1" color="text.secondary" fontWeight={600}>No education records yet</Typography>
                    <Typography variant="caption" color="text.disabled">Click "Create" to add your first education entry</Typography>
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
                        bgcolor: "rgba(245,158,11,0.08)",
                        fontSize: "0.75rem", fontWeight: 700, color: "#D97706",
                      }}
                    >
                      {row.institute?.[0]}
                    </Avatar>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" fontWeight={600} color="text.primary">{row.institute}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" color="text.secondary">{row.degree}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" color="text.secondary" fontFamily="monospace" fontSize="0.8rem">
                      {row.startDate?.substring(0, 7)} – {row.endDate?.substring(0, 7) ?? "Present"}
                    </Typography>
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
                      <EditButton hideText resource="educations" recordItemId={row.id} size="small" />
                      <DeleteButton hideText resource="educations" recordItemId={row.id} size="small" />
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
