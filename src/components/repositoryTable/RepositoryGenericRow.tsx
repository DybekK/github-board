import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";

export function RepositoryGenericRow({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <TableRow>
      <TableCell colSpan={3}>{children}</TableCell>
    </TableRow>
  );
}
