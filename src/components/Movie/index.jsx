import {
  Container,
  Thumbnail,
  Title,
  RatingContainer,
  Rate,
  TitleContainer,
  PosterContainer,
  FavButton,
} from './styles/movie';
import { IconContext } from 'react-icons';
import { AiFillStar } from 'react-icons/ai';
import NoImage from '../../assets/no-image.png';
import PropTypes from 'prop-types';
import { BsBookmark, BsFillBookmarkStarFill } from 'react-icons/bs';

import { Link } from 'react-router-dom';
import { useFirebase } from '../../context/firebase';
import { useEffect, useState } from 'react';

const Movie = ({ data }) => {
  const [favorite, setFavorite] = useState(false);

  const { id, title, poster_path, vote_average } = data;

  const {
    currentUser,
    addFavoriteMovieToFirebase,
    removeFavoriteFromFirebase,
    favoritesMovies,
    firebaseLoading,
  } = useFirebase();

  useEffect(() => {
    if (currentUser) {
      setFavorite(favoritesMovies.some((item) => item.id === id));
    }
  }, [currentUser, id, favoritesMovies]);

  return (
    <Container data-testid="movie">
      <Link to={`/movie/${id}`}>
        <Thumbnail
          src={
            poster_path
              ? `https://image.tmdb.org/t/p/original${poster_path}`
              : NoImage
          }
          alt="movie image"
        />
      </Link>

      <TitleContainer>
        <Link to={`/movie/${id}`}>
          <Title>{title}</Title>
        </Link>
        {currentUser && (
          <FavButton
            onClick={() =>
              favorite
                ? removeFavoriteFromFirebase(data)
                : addFavoriteMovieToFirebase(data)
            }
          >
            <IconContext.Provider
              value={{ style: { color: '#FFF', fontSize: 25 } }}
            >
              {favorite ? (
                <BsFillBookmarkStarFill data-testid="favorite-icon" />
              ) : (
                <BsBookmark data-testid="not-favorite-icon" />
              )}
            </IconContext.Provider>
          </FavButton>
        )}
      </TitleContainer>
      <RatingContainer>
        <IconContext.Provider
          value={{ style: { color: '#E7A74E', fontSize: 30 } }}
        >
          <AiFillStar />
        </IconContext.Provider>
        <Rate>{vote_average}/10</Rate>
      </RatingContainer>
    </Container>
  );
};

Movie.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    poster_path: PropTypes.string,
    vote_average: PropTypes.number.isRequired,
  }),
};

export default Movie;
