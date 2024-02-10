export const extractSchemaErr = (err) => {
  return err.inner.reduce((acc, err) => {
    return { ...acc, [err.path]: err.message };
  }, {});
};

export const cleanErr = (modelErr, field) => {
  if (modelErr[field].length > 0) {
    modelErr[field] = '';
  }

  return modelErr;
};
