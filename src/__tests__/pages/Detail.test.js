import React from 'react';
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter, Route } from 'react-router-dom';
import { FirebaseContext } from '../../context/firebase';

import Detail from '../../pages/Detail';

//jest.mock('../../context/firebase');

const favoriteMovies = [
  {
    adult: false,
    backdrop_path: '/70nxSw3mFBsGmtkvcs91PbjerwD.jpg',
    genre_ids: [878, 28, 12],
    id: 580489,
    original_language: 'en',
    original_title: 'Venom: Let There Be Carnage',
    overview:
      'Em busca de seu próximo furo de reportagem, o jornalista Eddie Brock consegue uma entrevista exclusiva com Cletus Kasady, um assassino no corredor da morte, que descobre o segredo de Eddie e se torna o hospedeiro de Carnificina, um simbionte aterrorizante e ameaçador. Eddie e Venom precisam superar sua relação atribulada e trabalhar em conjunto para derrotar Carnificina.',
    popularity: 8633.976,
    poster_path: '/h5UzYZquMwO9FVn15R2eK2itmHu.jpg',
    release_date: '2021-09-30',
    title: 'Venom: Tempo de Carnificina',
    video: false,
    vote_average: 7.2,
    vote_count: 4398,
  },
  {
    adult: false,
    backdrop_path: '/dK12GIdhGP6NPGFssK2Fh265jyr.jpg',
    genre_ids: [28, 35, 80, 53],
    id: 512195,
    original_language: 'en',
    original_title: 'Red Notice',
    overview:
      'No mundo do crime internacional, a INTERPOL lança um Alerta Vermelho, o que inicia uma caçada para capturar a mais notória ladra de artes do globo.',
    popularity: 4825.133,
    poster_path: '/pe17f8VDfzbvbHSAKAlcORtBHmW.jpg',
    release_date: '2021-11-04',
    title: 'Alerta Vermelho',
    video: false,
    vote_average: 6.8,
    vote_count: 1970,
  },
];

const renderWithFirebaseProvider = (ui, id, user, favorites = [], movie) => {
  return render(
    <FirebaseContext.Provider
      value={{
        currentUser: user,
        favoritesMovies: favorites,
        removeFavoriteFromFirebase: jest
          .fn()
          .mockImplementation(() =>
            favorites.filter((fav) => fav.id !== movie.id)
          ),
        addFavoriteMovieToFirebase: jest
          .fn()
          .mockImplementation(() => favorites.push(movie)),
      }}
    >
      <MemoryRouter initialEntries={[`/movie/${id}`]}>
        <Route path="/movie/:id">{ui}</Route>
      </MemoryRouter>
    </FirebaseContext.Provider>
  );
};

describe('Detail tests', () => {
  it('should render intems properly passing correct id', async () => {
    const { debug } = renderWithFirebaseProvider(<Detail />, 580489, {}, []);

    await screen.findByTestId('loading');

    await waitForElementToBeRemoved(() => screen.queryByTestId('loading'));
    expect(screen.getByAltText('banner')).toBeInTheDocument();
    expect(screen.getByTestId('title')).toBeInTheDocument();
    expect(screen.getByTestId('description')).toBeInTheDocument();
    const tags = screen.getAllByTestId('tag');
    expect(tags.length).toBeGreaterThan(0);
  });
  it('should show favorite button', async () => {
    renderWithFirebaseProvider(
      <Detail />,
      580489,
      {
        displayName: 'Marcus Vinicius',
      },
      favoriteMovies
    );

    await screen.findByTestId('loading');

    await waitForElementToBeRemoved(() => screen.queryByTestId('loading'));
    expect(screen.getByAltText('banner')).toBeInTheDocument();
    expect(screen.getByTestId('title')).toBeInTheDocument();
    expect(screen.getByTestId('description')).toBeInTheDocument();
    const tags = screen.getAllByTestId('tag');
    expect(tags.length).toBeGreaterThan(0);
    expect(screen.getByTestId('favorite-button')).toBeInTheDocument();
  });
  it('should not show favorite button', async () => {
    renderWithFirebaseProvider(
      <Detail />,
      580489,
      {
        displayName: 'Marcus Vinicius',
      },
      [
        {
          adult: false,
          backdrop_path: '/dK12GIdhGP6NPGFssK2Fh265jyr.jpg',
          genre_ids: [28, 35, 80, 53],
          id: 512195,
          original_language: 'en',
          original_title: 'Red Notice',
          overview:
            'No mundo do crime internacional, a INTERPOL lança um Alerta Vermelho, o que inicia uma caçada para capturar a mais notória ladra de artes do globo.',
          popularity: 4825.133,
          poster_path: '/pe17f8VDfzbvbHSAKAlcORtBHmW.jpg',
          release_date: '2021-11-04',
          title: 'Alerta Vermelho',
          video: false,
          vote_average: 6.8,
          vote_count: 1970,
        },
      ]
    );

    await screen.findByTestId('loading');

    await waitForElementToBeRemoved(() => screen.queryByTestId('loading'));
    expect(screen.getByAltText('banner')).toBeInTheDocument();
    expect(screen.getByTestId('title')).toBeInTheDocument();
    expect(screen.getByTestId('description')).toBeInTheDocument();
    const tags = screen.getAllByTestId('tag');
    expect(tags.length).toBeGreaterThan(0);
    expect(screen.getByTestId('not-favorite-icon')).toBeInTheDocument();
  });
});
