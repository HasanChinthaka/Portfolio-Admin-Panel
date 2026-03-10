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
            <TableCell>Public</TableCell>
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
                  <Avatar
                    src={row.logo}
                    variant="rounded"
                    sx={{ width: 40, height: 40 }}
                  />
                </TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>
                  {row.website && (
                    <a href={row.website} target="_blank" rel="noreferrer">
                      {row.website}
                    </a>
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
                  <Stack direction="row" spacing={1} justifyContent="flex-end">
                    <EditButton hideText resource="clients" recordItemId={row.id} />
                    <DeleteButton hideText resource="clients" recordItemId={row.id} />
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
