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
                  {row.imageUrl && (
                    <Avatar
                      src={row.imageUrl}
                      variant="rounded"
                      sx={{ width: 40, height: 40 }}
                    />
                  )}
                </TableCell>
                <TableCell>{row.title}</TableCell>
                <TableCell>
                  {(row.category ?? []).map((c: any) => (
                    <Chip key={c._id} label={c.name} size="small" sx={{ mr: 0.5 }} />
                  ))}
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
                    <EditButton hideText resource="projects" recordItemId={row.id} />
                    <DeleteButton hideText resource="projects" recordItemId={row.id} />
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
