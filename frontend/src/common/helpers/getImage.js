export const getImage = (image) =>
  new URL(`src/assets/img/${image}`, new URL(import.meta.url).origin).href;
