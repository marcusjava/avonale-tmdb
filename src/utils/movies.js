export const getListMovies = (size, movies) => {
  return movies.slice(0, size);
};

export const randomBanner = (movies) => {
  const idx = Math.floor(Math.random() * movies.length);
  return movies[idx];
};
