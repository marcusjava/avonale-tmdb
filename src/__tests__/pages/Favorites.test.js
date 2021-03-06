import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import { FirebaseContext } from '../../context/firebase';
import Favorites from '../../pages/Favorites';

//jest.mock('../../context/firebase');

const renderWithProvider = (ui, { providerProps, ...renderOptions }) => {
  return render(
    <BrowserRouter>
      <FirebaseContext.Provider value={providerProps}>
        {ui}
      </FirebaseContext.Provider>
    </BrowserRouter>
  );
};

describe('Favorites page tests', () => {
  it('should renders items correctly', async () => {
    const providerProps = {
      currentUser: {
        displayName: 'Marcus Vinicius',
      },
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
      ],
    };

    renderWithProvider(<Favorites />, {
      providerProps,
    });

    const items = screen.getAllByTestId('favorite-item');

    expect(items.length).toEqual(2);

    expect(screen.getByText('Venom: Tempo de Carnificina')).toBeInTheDocument();
    expect(screen.getByText('Alerta Vermelho')).toBeInTheDocument();
  });
  it('should call removeFavoriteFromFirebase function correctly', async () => {
    const providerProps = {
      currentUser: {
        displayName: 'Marcus Vinicius',
      },
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
      removeFavoriteFromFirebase: jest.fn(),
    };

    renderWithProvider(<Favorites />, {
      providerProps,
    });

    const removeButton = screen.getByText('Remover');

    fireEvent.click(removeButton);

    expect(providerProps.removeFavoriteFromFirebase).toHaveBeenCalledWith(
      providerProps.favoritesMovies[0]
    );
  });
  it('should renders no items', async () => {
    const providerProps = {
      currentUser: {
        displayName: 'Marcus Vinicius',
      },
      favoritesMovies: [],
    };

    renderWithProvider(<Favorites />, {
      providerProps,
    });

    const items = screen.queryAllByTestId('favorite-item');

    expect(items.length).toEqual(0);

    expect(screen.getByText('Sem resultados')).toBeInTheDocument();
  });
});
