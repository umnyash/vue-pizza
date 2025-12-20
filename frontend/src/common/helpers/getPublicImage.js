export const getPublicImage = (path) => {
  const separator = path.startsWith("/") ? "" : "/";
  return `/api${separator}${path}`;
};
