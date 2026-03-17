import { TableRow, TableCell, Skeleton, Box } from "@mui/material";

interface TableSkeletonProps {
  rows?: number;
  cols: number;
  /** widths for each col skeleton, e.g. ["32px", "60%", "40%", "60px", "80px"] */
  widths?: (string | number)[];
  circular?: number[]; /** col indexes that should be circular (e.g. avatar) */
}

export function TableSkeleton({ rows = 5, cols, widths = [], circular = [] }: TableSkeletonProps) {
  return (
    <>
      {[...Array(rows)].map((_, i) => (
        <TableRow key={i} sx={{ opacity: 1 - i * 0.12 }}>
          {[...Array(cols)].map((_, j) => (
            <TableCell key={j}>
              {circular.includes(j) ? (
                <Skeleton variant="circular" width={widths[j] ?? 32} height={widths[j] ?? 32} animation="wave" />
              ) : j === cols - 1 ? (
                <Box display="flex" justifyContent="flex-end" gap={1}>
                  <Skeleton variant="rounded" width={32} height={32} animation="wave" />
                  <Skeleton variant="rounded" width={32} height={32} animation="wave" />
                </Box>
              ) : (
                <Skeleton variant="text" width={widths[j] ?? "55%"} height={20} animation="wave" />
              )}
            </TableCell>
          ))}
        </TableRow>
      ))}
    </>
  );
}
