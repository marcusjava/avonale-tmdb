import React, { useState, useEffect } from 'react';
import {
  Container,
  Thumbnail,
  Title,
  Description,
  DetailContainer,
  GenresContainer,
  TitleContainer,
  FavButton,
} from './styles/detail';
import Star from 'react-star-ratings';
import Tag from '../../components/Tag';
import { BsBookmark, BsFillBookmarkStarFill } from 'react-icons/bs';
import { IconContext } from 'react-icons';
import { useFirebase } from '../../context/firebase';

// import { Container } from './styles';

function FavoriteItem({ item }) {
  const {
    currentUser,
    addFavoriteMovieToFirebase,
    removeFavoriteFromFirebase,
    favoritesMovies,
    firebaseLoading,
  } = useFirebase();
  return (
    <Container>
      <Thumbnail
        src={`https://image.tmdb.org/t/p/original${item.poster_path}`}
        alt="banner"
      />
      <DetailContainer>
        <TitleContainer>
          <Title data-testid="title">{item.title}</Title>
        </TitleContainer>
        <Star
          rating={item.vote_average}
          starRatedColor="#e7a74e"
          numberOfStars={10}
          name="rating"
          data-testid="star"
        />
        <Description data-testid="description">{item.overview}</Description>

        <GenresContainer>
          {item.genres?.map((item) => (
            <Tag key={item.id}>{item.name}</Tag>
          ))}
        </GenresContainer>
      </DetailContainer>
    </Container>
  );
}

export default FavoriteItem;
