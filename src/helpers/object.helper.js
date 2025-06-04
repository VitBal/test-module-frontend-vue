export const objectHelper = {
  getDescendantProp: (obj, path) =>
    path.split(".").reduce((acc, part) => acc && acc[part], obj),
};
