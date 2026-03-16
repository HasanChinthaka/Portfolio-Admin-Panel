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

export function WorkExperienceList() {
  const { result, query } = useList({ resource: "work-experiences" });
  const records = result.data ?? [];
  const isLoading = query.isLoading;

  return (
    <List resource="work-experiences" wrapperProps={{ sx: { width: "100%" } }}>
      <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Logo</TableCell>
            <TableCell>Title</TableCell>
            <TableCell>Company</TableCell>
            <TableCell>Period</TableCell>
            <TableCell>Public</TableCell>
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
                  {row.logo && (
                    <Avatar src={row.logo} sx={{ width: 32, height: 32 }} />
                  )}
                </TableCell>
                <TableCell>{row.title}</TableCell>
                <TableCell>{row.company}</TableCell>
                <TableCell>
                  {row.startDate?.substring(0, 7)} –{" "}
                  {row.endDate ? row.endDate.substring(0, 7) : "Present"}
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
                    <EditButton hideText resource="work-experiences" recordItemId={row.id} />
                    <DeleteButton hideText resource="work-experiences" recordItemId={row.id} />
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
