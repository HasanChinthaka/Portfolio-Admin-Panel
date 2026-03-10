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
  Box,
} from "@mui/material";

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
            <TableCell>Published</TableCell>
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
                <TableCell>{row.title}</TableCell>
                <TableCell>
                  {row.color && (
                    <Box display="flex" alignItems="center" gap={1}>
                      <Box
                        sx={{
                          width: 16,
                          height: 16,
                          borderRadius: "50%",
                          bgcolor: row.color,
                          border: "1px solid #ddd",
                        }}
                      />
                      {row.color}
                    </Box>
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
                  <Stack direction="row" spacing={1} justifyContent="flex-end">
                    <EditButton hideText resource="services" recordItemId={row.id} />
                    <DeleteButton hideText resource="services" recordItemId={row.id} />
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
