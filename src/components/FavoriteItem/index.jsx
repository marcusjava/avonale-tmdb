import React from 'react';
import { Link } from 'react-router-dom';

import {
  Container,
  Thumbnail,
  Description,
  DescriptionContainer,
  Button,
  ButtonContainer,
} from './styles/favorite-item';

function FavoriteItem({ item: { poster_path, id, title }, remove }) {
  return (
    <Container>
      <Thumbnail
        src={`https://image.tmdb.org/t/p/original${poster_path}`}
        alt="banner"
      />
      <DescriptionContainer>
        <Description>{title}</Description>
        <ButtonContainer>
          <Button danger onClick={() => remove()}>
            Remover
          </Button>
          <Link to={`/movie/${id}`}>
            <Button>Ver</Button>
          </Link>
        </ButtonContainer>
      </DescriptionContainer>
    </Container>
  );
}

export default FavoriteItem;
