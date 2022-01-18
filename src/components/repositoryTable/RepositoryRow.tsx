import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { ColumnType } from "./RepositoryColumn";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import IconButton from "@mui/material/IconButton";

interface RowProps {
  columns: readonly ColumnType[];
  name: string;
  id: number;
  watchers: number;
  stars: number;
  pushedAt: string;
  htmlUrl: string;
}

export interface RowType extends RowProps {}

const redirectToRepository = (url: string) => {
  window.open(url, "_blank")?.focus();
};

export function RepositoryRow(props: RowProps) {
  const { columns, htmlUrl } = props;
  return (
    <TableRow hover role="checkbox" tabIndex={-1} key={props.id}>
      <TableCell onClick={() => redirectToRepository(htmlUrl)}>
        <IconButton>
          <OpenInNewIcon fontSize="inherit" />
        </IconButton>
      </TableCell>
      {columns
        .filter((column) => !!column.Icon)
        .map((column) => {
          const value = (props as any)[column.id];
          return <TableCell key={column.id}>{value}</TableCell>;
        })}
    </TableRow>
  );
}
