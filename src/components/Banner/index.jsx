import React from 'react';
import { Container, Thumbnail } from './styles/banner';
import PropTypes from 'prop-types';

// import { Container } from './styles';

function Banner({ data, redirectToDetailPage }) {
  return (
    <Container>
      <Thumbnail
        src={`https://image.tmdb.org/t/p/original${data.poster_path}`}
        alt="banner"
        onClick={() => redirectToDetailPage(data.id)}
      />
    </Container>
  );
}

Banner.propTypes = {
  data: PropTypes.object.isRequired,
  redirectToDetailPage: PropTypes.func.isRequired,
};

export default Banner;
