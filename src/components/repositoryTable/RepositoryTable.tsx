import { useContext, useState } from "react";
import { AppContext } from "../../context/Store";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { ColumnType, RepositoryColumn } from "./RepositoryColumn";
import { RepositoryBody } from "./RepositoryBody";
import VisibilityIcon from "@mui/icons-material/Visibility";
import GitHubIcon from "@mui/icons-material/GitHub";
import StarIcon from "@mui/icons-material/Star";
import CommitIcon from "@mui/icons-material/Commit";

const columns: readonly ColumnType[] = [
  { id: "name", label: "Name", minWidth: 170, Icon: GitHubIcon },
  { id: "watchers", label: "Watchers", minWidth: 170, Icon: VisibilityIcon },
  { id: "stars", label: "Stars", minWidth: 170, Icon: StarIcon },
  { id: "pushedAt", label: "Last updated", minWidth: 170, Icon: CommitIcon }
];

export function RepositoryTable() {
  const {
    state: { repositories, inProgress, statusCode }
  } = useContext(AppContext);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {columns.map(({ id, label, minWidth, Icon }) => (
                <RepositoryColumn
                  key={id}
                  id={id}
                  Icon={Icon}
                  label={label}
                  minWidth={minWidth}
                />
              ))}
            </TableRow>
          </TableHead>
          <RepositoryBody
            page={page}
            rowsPerPage={rowsPerPage}
            inProgress={inProgress}
            repositories={repositories}
            columns={columns}
            statusCode={statusCode}
          />
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={repositories.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
