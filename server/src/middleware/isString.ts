export const isString = (body: any, fields: string[]) => {
  return fields.every((field) => {
    return typeof body?.[field] === "string";
  });
};
