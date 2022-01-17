import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";

export function RepositoryGenericRow({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <TableRow>
      <TableCell colSpan={4}>{children}</TableCell>
    </TableRow>
  );
}
