import { FormikProps } from "formik";

/**
  Helper method to return the error message only if the field is touched
*/
export function hasFormError<V>(f: FormikProps<V>, name: keyof V): string {
  const msg = f.errors[name] && f.touched[name] ? f.errors[name] : null;
  return typeof msg === "string" ? msg : "";
}
