import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";

export function RepositoryGenericRow({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <TableRow>
      <TableCell colSpan={5}>{children}</TableCell>
    </TableRow>
  );
}
