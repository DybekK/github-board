import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { ColumnType } from "./RepositoryColumn";

interface RowProps {
  columns: readonly ColumnType[];
  name: string;
  id: number;
}

export interface RowType extends RowProps {}

export function RepositoryRow(props: RowProps) {
  const { columns } = props;
  return (
    <TableRow hover role="checkbox" tabIndex={-1} key={props.id}>
      {columns.map((column) => {
        const value = (props as any)[column.id];
        return <TableCell key={column.id}>{value}</TableCell>;
      })}
    </TableRow>
  );
}
