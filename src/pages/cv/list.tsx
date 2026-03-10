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
  Button,
} from "@mui/material";

const API_URL = import.meta.env.VITE_API_URL;

export function CVList() {
  const { result, query } = useList({ resource: "cv" });
  const records = result.data ?? [];
  const isLoading = query.isLoading;

  return (
    <List resource="cv" wrapperProps={{ sx: { width: "100%" } }}>
      <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Public</TableCell>
            <TableCell>Download</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={4}>Loading...</TableCell>
            </TableRow>
          ) : (
            records.map((row: any) => (
              <TableRow key={row.id}>
                <TableCell>{row.name}</TableCell>
                <TableCell>
                  <Chip
                    label={row.isPublic ? "Public" : "Private"}
                    color={row.isPublic ? "success" : "default"}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <Button
                    size="small"
                    variant="outlined"
                    href={`${API_URL}/admin/cv/download/${row.id}`}
                    target="_blank"
                  >
                    Download PDF
                  </Button>
                </TableCell>
                <TableCell align="right">
                  <Stack direction="row" spacing={1} justifyContent="flex-end">
                    <EditButton hideText resource="cv" recordItemId={row.id} />
                    <DeleteButton hideText resource="cv" recordItemId={row.id} />
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
