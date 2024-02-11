import type { ValidationError } from 'yup';

type ErrorType = {
  item: string;
  message: string;
}[];

export const extractSchemaErr = (err: ValidationError[]): ErrorType => {
  const errList: ErrorType = [];
  err.forEach(({ path = '', errors }) => {
    errList.push({
      item: path,
      message: errors[0],
    });
  });

  return errList;
};
