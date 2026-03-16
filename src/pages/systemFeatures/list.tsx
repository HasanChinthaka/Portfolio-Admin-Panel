import { useList } from "@refinedev/core";
import { List, EditButton, DeleteButton } from "@refinedev/mui";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Stack,
  Chip,
  Avatar,
} from "@mui/material";

export function SystemFeatureList() {
  const { result, query } = useList({ resource: "system-features" });
  const records = result.data ?? [];
  const isLoading = query.isLoading;

  return (
    <List resource="system-features" wrapperProps={{ sx: { width: "100%" } }}>
      <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Logo</TableCell>
            <TableCell>Site Name</TableCell>
            <TableCell>Maintenance</TableCell>
            <TableCell>Active</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={5}>Loading...</TableCell>
            </TableRow>
          ) : (
            records.map((row: any) => (
              <TableRow key={row.id}>
                <TableCell>
                  {row.logo && (
                    <Avatar src={row.logo} sx={{ width: 32, height: 32 }} />
                  )}
                </TableCell>
                <TableCell>{row.siteName ?? "-"}</TableCell>
                <TableCell>
                  <Chip
                    label={row.isMaintenance ? "ON" : "OFF"}
                    color={row.isMaintenance ? "warning" : "default"}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <Chip
                    label={row.isActive ? "Active" : "Inactive"}
                    color={row.isActive ? "success" : "default"}
                    size="small"
                  />
                </TableCell>
                <TableCell align="right">
                  <Stack direction="row" spacing={1} justifyContent="flex-end">
                    <EditButton hideText resource="system-features" recordItemId={row.id} />
                    <DeleteButton hideText resource="system-features" recordItemId={row.id} />
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
