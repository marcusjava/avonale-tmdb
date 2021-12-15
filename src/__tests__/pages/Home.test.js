import React from 'react';
import {
  render,
  fireEvent,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter, Router } from 'react-router-dom';
import { FirebaseContext } from '../../context/firebase';
import Home from '../../pages/Home';

import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';

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

    renderWithProvider(<Home />, {
      providerProps,
    });
    //19

    await screen.findByTestId('loading');

    await waitForElementToBeRemoved(() => screen.queryByTestId('loading'));

    expect(screen.getByTestId('search-input')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeDisabled();
    expect(screen.getByAltText('banner')).toBeInTheDocument();
    expect(screen.getByText(/Em cartaz/i)).toBeInTheDocument();
    expect(screen.getByText(/populares/i)).toBeInTheDocument();
    expect(screen.getByText(/top filmes/i)).toBeInTheDocument();
    const movies = screen.getAllByTestId('movie');

    expect(movies.length).not.toBe(0);
  });

  it('should redirect to search page /search/x-men', async () => {
    const history = createMemoryHistory();
    const searchTerm = 'x-men';

    render(
      <Router history={history}>
        <Home />
      </Router>
    );

    await screen.findByTestId('loading');

    await waitForElementToBeRemoved(() => screen.queryByTestId('loading'));

    const input = screen.getByTestId('search-input');
    const button = screen.getByRole('button');

    userEvent.type(input, searchTerm);
    fireEvent.click(button);

    expect(history.location.pathname).toBe(`/search/${searchTerm}`);
  });
});
