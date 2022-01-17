import { SvgIcon } from "@mui/material";
import TableCell from "@mui/material/TableCell";
import styled from "styled-components";

interface ColumnProps {
  id: "name" | "watchers" | "stars" | "pushedAt";
  Icon: typeof SvgIcon;
  label: string;
  minWidth: number;
}

export interface ColumnType extends ColumnProps {}

const Container = styled.div({
  display: "flex",
  justifyContent: "flexStart",
  alignItems: "center"
});

export function RepositoryColumn({ id, minWidth, label, Icon }: ColumnProps) {
  return (
    <TableCell key={id} style={{ minWidth: minWidth }}>
      <Container>
        <Icon fontSize="small" style={{ marginRight: 10 }} /> {label}
      </Container>
    </TableCell>
  );
}
