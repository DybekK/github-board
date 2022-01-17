import { RepositoryFinder } from "./repositoryFinder/RepositoryFinder";
import { RepositoryTable } from "./repositoryTable/RepositoryTable";
import { Box } from "@mui/material";

export function RepositoryCard() {
  return (
    <>
      <RepositoryFinder />
      <Box sx={{ m: 2 }} />
      <RepositoryTable />
    </>
  );
}
