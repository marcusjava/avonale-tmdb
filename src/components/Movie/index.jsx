import {
  Container,
  Thumbnail,
  Title,
  RatingContainer,
  Rate,
  TitleContainer,
} from './styles/movie';
import { IconContext } from 'react-icons';
import { AiFillStar } from 'react-icons/ai';
import NoImage from '../../assets/no-image.png';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

const Movie = ({ data }) => {
  const { id, title, poster_path, vote_average } = data;

  return (
    <Container>
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
    poster_path: PropTypes.string.isRequired,
    vote_average: PropTypes.number.isRequired,
  }),
};

export default Movie;
