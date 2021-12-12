import axios from 'axios';

export const api = axios.create({ baseURL: 'https://api.themoviedb.org/3' });

const key = process.env.REACT_APP_MOVIEDB_API_KEY;

export const searchMovies = async (term) => {
  try {
    const response = await api.get('/search/movie', {
      params: {
        api_key: key,
        query: term,
        language: 'pt-BR',
        page: 1,
      },
    });

    return response.data.results;
  } catch (error) {
    console.log(error.message);
  }
};

export const getMovieById = async (id) => {
  try {
    const response = await api.get(`/movie/${id}`, {
      params: {
        api_key: key,
        language: 'pt-BR',
      },
    });
    return response.data;
  } catch (error) {
    console.log(error.mesage);
  }
};

export const getMovies = async () => {
  const [nowData, popularData, topRatedData] = await Promise.all([
    api.get(`/movie/now_playing?api_key=${key}&language=pt-BR&page=1`),
    api.get(`/movie/popular?api_key=${key}&language=pt-BR&page=1`),
    api.get(`/movie/top_rated?api_key=${key}&language=pt-BR&page=1`),
  ]);

  return { nowData, popularData, topRatedData };
};
