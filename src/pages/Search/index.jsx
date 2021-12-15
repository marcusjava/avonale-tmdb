import React, { useEffect, useState } from 'react';
import { Container, NoItems } from './styles/search';
import { searchMovies } from '../../services/movies';
import { useParams } from 'react-router-dom';
import Category from '../../components/Category';
import Spinner from '../../components/Spinner';

// import { Container } from './styles';

function Search() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  const { term } = useParams();

  useEffect(() => {
    let isActive = true;
    async function loadMovies() {
      const data = await searchMovies(term);

      if (isActive) {
        setMovies(data);
        setLoading(false);
      }
    }
    loadMovies();
    return () => {
      isActive = false;
    };
  }, [term]);

  if (loading) {
    return (
      <div data-testid="loading">
        <Spinner />
      </div>
    );
  }
  return (
    <Container>
      {movies.length ? (
        <Category title={`Resultado da pesquisa - ${term}`} items={movies} />
      ) : (
        <NoItems>Sem resultados</NoItems>
      )}
    </Container>
  );
}

export default Search;
