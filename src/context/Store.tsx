import { createContext, useReducer } from "react";
import { GitHubData } from "../api/types";
import { Action, githubReducer } from "./reducers";

export type InitialStateType = {
  repositories: GitHubData[];
  inProgress: boolean;
  statusCode?: number;
  errorMessage?: any;
};

export type MainContext = {
  state: InitialStateType;
  dispatch: React.Dispatch<Action>;
};

const initialState: InitialStateType = {
  repositories: [],
  inProgress: false,
  statusCode: undefined,
  errorMessage: undefined
};

export const defaultState = {
  state: initialState,
  dispatch: () => null
};

const mainReducer = (state: InitialStateType, action: Action) =>
  githubReducer(state, action);

export const AppContext = createContext<MainContext>(defaultState);
export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(mainReducer, initialState);
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}
