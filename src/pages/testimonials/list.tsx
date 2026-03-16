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
            <TableCell>Published</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={6}>Loading...</TableCell>
            </TableRow>
          ) : (
            records.map((row: any) => (
              <TableRow key={row.id}>
                <TableCell>
                  {row.avatar && (
                    <Avatar src={row.avatar} sx={{ width: 32, height: 32 }} />
                  )}
                </TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.client?.name ?? "-"}</TableCell>
                <TableCell sx={{ maxWidth: 200, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {row.review}
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
                    <EditButton hideText resource="testimonials" recordItemId={row.id} />
                    <DeleteButton hideText resource="testimonials" recordItemId={row.id} />
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
