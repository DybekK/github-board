import { GitHubData } from "../../api/types";
import TableBody from "@mui/material/TableBody";
import { RepositoryGenericRow } from "./RepositoryGenericRow";
import { Progress } from "../../utils/Progress";
import { RepositoryRow } from "./RepositoryRow";
import { ColumnType } from "./RepositoryColumn";
import { Alert } from "@mui/material";
import { Fragment } from "react";
import { format } from "date-fns";

type BodyProps = {
  inProgress: boolean;
  statusCode?: number;
  page: number;
  rowsPerPage: number;
  repositories: GitHubData[];
  columns: readonly ColumnType[];
};

function createData({
  id,
  name,
  watchers_count,
  stargazers_count,
  pushed_at,
  html_url
}: GitHubData) {
  return {
    id,
    name,
    watchers: watchers_count,
    stars: stargazers_count,
    pushedAt: format(new Date(pushed_at), "dd-MM-yyyy HH:mm"),
    htmlUrl: html_url
  };
}

function MainRepositoriesBody({
  inProgress,
  statusCode,
  page,
  rowsPerPage,
  repositories,
  columns
}: BodyProps) {
  if (inProgress) {
    return (
      <RepositoryGenericRow>
        <Progress />
      </RepositoryGenericRow>
    );
  }

  if (statusCode === undefined) {
    return (
      <RepositoryGenericRow>
        <Alert severity="info">
          Type the organisation or username and list all repositories!
        </Alert>
      </RepositoryGenericRow>
    );
  }

  if (statusCode === 404) {
    return (
      <RepositoryGenericRow>
        <Alert severity="warning">
          That organisation name doesn't exist, try again!
        </Alert>
      </RepositoryGenericRow>
    );
  }

  if (statusCode === 500) {
    return (
      <RepositoryGenericRow>
        <Alert severity="error">Internal server error has been occured!</Alert>
      </RepositoryGenericRow>
    );
  }

  if (repositories.length === 0) {
    return (
      <RepositoryGenericRow>
        <Alert severity="warning">
          No repositories found, please try again!
        </Alert>
      </RepositoryGenericRow>
    );
  }

  return (
    <Fragment>
      {repositories
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .map(createData)
        .map((repository) => {
          return (
            <RepositoryRow
              {...repository}
              key={repository.id}
              columns={columns}
            />
          );
        })}
    </Fragment>
  );
}

export function RepositoryBody(props: BodyProps) {
  return (
    <TableBody>
      <MainRepositoriesBody {...props} />
    </TableBody>
  );
}
