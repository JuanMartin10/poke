import * as yup from "yup";

export const createSchema = (fields: Record<string, yup.Schema>) => {
  return yup.object(fields);
};
