import React from 'react';
import {
  render,
  fireEvent,
  cleanup,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import '@testing-library/jest-dom';
import RouterData, { BrowserRouter } from 'react-router-dom';
import { FirebaseContext } from '../../context/firebase';
import FirebaseProvider from '../../context/firebase';
import Home from '../../pages/Home';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import nock from 'nock';
import { getMovies } from '../../services/movies';
import nowPlayingMovies from '../../fixtures/now_playing_movies.json';
import popularMovies from '../../fixtures/popular_movies.json';
import topRatedMovies from '../../fixtures/top_rated_movies.json';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

//jest.mock('../../services/movies');

//jest.mock('axios');

var mock = new MockAdapter(axios);

mock
  .onGet('/movie/now_playing')
  .reply(200, { data: { results: nowPlayingMovies } });

mock.onGet('/movie/popular').reply(200, { data: { results: popularMovies } });

mock.onGet('/movie/top_rated').reply(200, { data: { results: popularMovies } });

const renderWithProvider = (ui, { providerProps, ...renderOptions }) => {
  return render(
    <BrowserRouter>
      <FirebaseContext.Provider value={providerProps}>
        {ui}
      </FirebaseContext.Provider>
    </BrowserRouter>
  );
};

describe('Home Page test', () => {
  it('should render items correctly', async () => {
    const providerProps = {
      currentUser: null,
      favoritesMovies: [
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
      ],
    };

    const { debug } = renderWithProvider(<Home />, {
      providerProps,
    });
    //19

    await screen.findByTestId('loading');

    await waitForElementToBeRemoved(() => screen.queryByTestId('loading'));

    expect(screen.getByTestId('search-input')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByAltText('banner')).toBeInTheDocument();
    expect(screen.getByText(/Em cartaz/i)).toBeInTheDocument();
    const movies = screen.getAllByTestId('movie');

    console.log(movies[0].innerHTML);
  });
});
