import React from 'react';
import FavoriteItem from '../../components/FavoriteItem';
import Spinner from '../../components/Spinner';
import { useFirebase } from '../../context/firebase';

import { Container } from './styles/favorites';

function Favorites() {
  const { currentUser, favoritesMovies, firebaseLoading } = useFirebase();

  if (firebaseLoading) {
    return <Spinner />;
  }
  return (
    <Container>
      {currentUser && favoritesMovies.length ? (
        favoritesMovies.map((item) => (
          <FavoriteItem key={item.id} item={item} />
        ))
      ) : (
        <h1>Sem resultados</h1>
      )}
    </Container>
  );
}

export default Favorites;
