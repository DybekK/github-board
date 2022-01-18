import { useFormik } from "formik";
import debounce from "lodash/debounce";
import { useEffect, useMemo, useContext } from "react";
import * as Yup from "yup";
import { fetchRepository } from "../../api/fetchRepository";
import { AppContext } from "../../context/Store";
import { catchError } from "../../api/catchError";
import TextField from "@mui/material/TextField";

type RepositoryFinderValues = {
  name: string;
};

const initialValues: RepositoryFinderValues = {
  name: ""
};

export function RepositoryFinder() {
  const { dispatch } = useContext(AppContext);

  const _fetchRepository = async (
    name: string | undefined
  ): Promise<boolean> => {
    if (!name) {
      return false;
    }

    dispatch({ type: "FETCH_REPOSITORIES" });
    try {
      const repositories = await fetchRepository(name);
      dispatch({ type: "FETCH_REPOSITORIES_SUCCESS", payload: repositories });
    } catch (error) {
      catchError({
        error: error,
        resolve: (reason, statusCode) =>
          dispatch({
            type: "FETCH_REPOSITORIES_ERROR",
            payload: { reason, statusCode }
          })
      });
    }
    return true;
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().test(
      "name",
      "",
      async (name, values) => await _fetchRepository(name)
    )
  });

  const formik = useFormik({
    initialValues,
    validateOnMount: true,
    validationSchema: validationSchema,
    validateOnChange: false,
    onSubmit: async (values, actions) => {}
  });

  const debouncedValidate = useMemo(() => debounce(formik.validateForm, 400), [
    formik.validateForm
  ]);

  useEffect(() => {
    debouncedValidate(formik.values);
  }, [formik.values, debouncedValidate]);

  return (
    <form onSubmit={formik.handleSubmit}>
      <TextField
        style={{ width: 300 }}
        variant="filled"
        label="Organisation name or username"
        name="name"
        onChange={formik.handleChange}
        value={formik.values.name}
      />
    </form>
  );
}
