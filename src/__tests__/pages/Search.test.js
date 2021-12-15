import React from 'react';
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter, Route } from 'react-router-dom';

import Search from '../../pages/Search';

const renderWithRouter = (ui, term, id) => {
  return render(
    <MemoryRouter initialEntries={[`/search/${term}`]}>
      <Route path="/search/:term">{ui}</Route>
    </MemoryRouter>
  );
};

describe('Search page tests', () => {
  it('should renders items correctly', async () => {
    const term = 'x-men';

    renderWithRouter(<Search />, term);

    const loading = await screen.findByTestId('loading');

    expect(loading).toBeInTheDocument();

    //queryBy returns null!!!!

    await waitForElementToBeRemoved(() => screen.queryByTestId('loading'));

    expect(
      screen.getByText(/resultado da pesquisa - x-men/i)
    ).toBeInTheDocument();
  });

  it('should renders no results', async () => {
    const term = 'zepeixe';

    renderWithRouter(<Search />, term);

    const loading = await screen.findByTestId('loading');

    expect(loading).toBeInTheDocument();

    //queryBy returns null!!!!

    await waitForElementToBeRemoved(() => screen.queryByTestId('loading'));

    expect(screen.getByText(/sem resultados/i)).toBeInTheDocument();
  });
});
