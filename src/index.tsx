import { render } from "react-dom";
import App from "./App";
import { AppProvider } from "./context/Store";

const rootElement = document.getElementById("root");
render(
  <AppProvider>
    <App />
  </AppProvider>,
  rootElement
);
