import { Card } from "./utils/Card";
import { FlexContainer } from "./utils/FlexContainer";
import { RepositoryCard } from "./components/RepositoryCard";
import "./styles.css";
export default function App() {
  return (
    <FlexContainer>
      <Card>
        <RepositoryCard />
      </Card>
    </FlexContainer>
  );
}
