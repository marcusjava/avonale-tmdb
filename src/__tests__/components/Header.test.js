import React from 'react';
import {
  render,
  cleanup,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import Header from '../../components/Header';
import { FirebaseContext } from '../../context/firebase';
import { BrowserRouter, Route, Switch, Router } from 'react-router-dom';
import { Firebase, auth } from '../../utils/firebase';
import { createMemoryHistory } from 'history';

jest.mock('../../utils/firebase');

const Home = () => <h1>Home page</h1>;
const Search = () => <h1>Search page</h1>;

const favorites = [
  {
    adult: false,
    backdrop_path: '/lNyLSOKMMeUPr1RsL4KcRuIXwHt.jpg',
    genre_ids: [878, 28],
    id: 580489,
    original_language: 'en',
    original_title: 'Venom: Let There Be Carnage',
    overview:
      'O relacionamento entre Eddie e Venom (Tom Hardy) está evoluindo. Buscando a melhor forma de lidar com a inevitável simbiose, esse dois lados descobrem como viver juntos e, de alguma forma, se tornarem melhores juntos do que separados.',
    popularity: 7933.523,
    poster_path: '/1BdFUd1FAgo0tLHejVQb5oeqevz.jpg',
    release_date: '2021-09-30',
    title: 'Venom: Tempo de Carnificina',
    video: false,
    vote_average: 7,
    vote_count: 1106,
  },
];

const renderWithFirebaseProvider = (
  user,
  favorites = [],
  path = '/',
  component = Home
) => {
  return render(
    <FirebaseContext.Provider
      value={{
        currentUser: user,
        favoritesMovies: favorites,
      }}
    >
      <BrowserRouter>
        <Header />
        <Switch>
          <Route path={path} exact component={component} />
        </Switch>
      </BrowserRouter>
    </FirebaseContext.Provider>
  );
};

describe('Testing Header component', () => {
  it('show login when user is not logged in', () => {
    const { debug } = renderWithFirebaseProvider(null);

    expect(screen.getByText(/Login/i).textContent).not.toBeNull();
    expect(screen.getByTestId('count').textContent).toBe('0');
  });

  it('show welcome when user is logged and button for loggoff', () => {
    const { debug } = renderWithFirebaseProvider(
      {
        displayName: 'Marcus Vinicius',
      },
      favorites
    );

    expect(
      screen.getByText(/Seja bem vindo Marcus Vinicius/i)
    ).toBeInTheDocument();
    expect(screen.getByTestId('logout')).toBeInTheDocument();
    expect(screen.queryByText(/Login/i)).not.toBeInTheDocument();
    expect(screen.getByTestId('count').textContent).toBe('1');
  });

  it('click on logout button', async () => {
    auth.signOut = jest.fn();
    const { debug } = renderWithFirebaseProvider({
      displayName: 'Marcus Vinicius',
    });
    expect(screen.getByText(/Seja bem vindo/i)).toBeInTheDocument();
    expect(screen.getByTestId('logout')).toBeInTheDocument();
    expect(screen.queryByText(/Login/i)).not.toBeInTheDocument();
    const logoutButton = screen.getByTestId('logout');
    userEvent.click(logoutButton);
  });
});
