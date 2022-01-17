import { AxiosError } from "axios";

type CatchError = {
  error: Error | any;
  resolve: (reason: any, statusCode: number) => void;
};

export function catchError({ error, resolve }: CatchError) {
  if (error as AxiosError) {
    const { response } = error as AxiosError;
    if (response) {
      resolve(response.data, response.status);
    }
  }
}
