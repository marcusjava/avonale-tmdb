import React, { useEffect, useState, useContext } from 'react';
import {
  auth,
  createUserProfileDocument,
  addCollectionDocs,
  removeCollectionDocs,
  getMoviesDocs,
} from '../utils/firebase';

export const FirebaseContext = React.createContext({ currentUser: null });

export const useFirebase = () => useContext(FirebaseContext);

export const FirebaseProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [favoritesMovies, setFavoritesMovies] = useState([]);
  const [firebaseLoading, setFirebaseLoading] = useState(false);
  const [error, setError] = useState('');

  let unsubscribeFromAuth = null;

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    unsubscribeFromAuth = auth.onAuthStateChanged(async (user) => {
      setFirebaseLoading(true);
      if (user) {
        const userRef = await createUserProfileDocument(user);
        userRef.onSnapshot(async (snapshot) => {
          setCurrentUser({ id: snapshot.id, ...snapshot.data() });
          const movies = await getMoviesDocs(snapshot.id);
          setFavoritesMovies(movies);
        });
        setFirebaseLoading(false);
        return;
      }
      setCurrentUser(null);
      setFavoritesMovies([]);
      setFirebaseLoading(false);
      return () => {
        unsubscribeFromAuth();
      };
    });
  }, []);

  const addFavoriteMovieToFirebase = async (movie) => {
    const { id } = currentUser;
    try {
      setFirebaseLoading(true);
      const movieAdded = await addCollectionDocs('movies', {
        ...movie,
        userId: id,
      });
      setFavoritesMovies([...favoritesMovies, movieAdded]);
      setFirebaseLoading(false);
    } catch (error) {
      setError(error.message);
      console.log(error.message);
      setFirebaseLoading(false);
    }
  };

  const removeFavoriteFromFirebase = async (movie) => {
    const { id } = movie;
    try {
      setFirebaseLoading(true);
      await removeCollectionDocs('movies', id);
      setFavoritesMovies((favorites) =>
        favorites.filter((item) => item.id !== id)
      );
      setFirebaseLoading(false);
    } catch (error) {
      setError(error.message);
      console.log(error);
      setFirebaseLoading(false);
    }
  };

  return (
    <FirebaseContext.Provider
      value={{
        currentUser,
        favoritesMovies,
        setCurrentUser,
        addFavoriteMovieToFirebase,
        removeFavoriteFromFirebase,
        firebaseLoading,
        error,
      }}
    >
      {children}
    </FirebaseContext.Provider>
  );
};

export default FirebaseProvider;
