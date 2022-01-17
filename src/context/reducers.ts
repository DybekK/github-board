import { GitHubData } from "../api/types";
import { InitialStateType } from "./Store";

type RepositoriesError = {
  reason: any;
  statusCode: number;
};

export type Action =
  | {
      type: "FETCH_REPOSITORIES";
    }
  | {
      type: "FETCH_REPOSITORIES_SUCCESS";
      payload: GitHubData[];
    }
  | {
      type: "FETCH_REPOSITORIES_ERROR";
      payload: RepositoriesError;
    };

export function githubReducer(
  state: InitialStateType,
  action: Action
): InitialStateType {
  switch (action.type) {
    case "FETCH_REPOSITORIES":
      return {
        ...state,
        inProgress: true
      };
    case "FETCH_REPOSITORIES_SUCCESS":
      return {
        ...state,
        repositories: action.payload,
        inProgress: false,
        statusCode: 200
      };
    case "FETCH_REPOSITORIES_ERROR":
      return {
        ...state,
        inProgress: false,
        statusCode: action.payload.statusCode,
        errorMessage: action.payload.reason
      };
    default:
      return state;
  }
}
