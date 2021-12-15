import React from 'react';
import {
  fireEvent,
  render,
  screen,
  waitForElementToBeRemoved,
  act,
} from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter, Route } from 'react-router-dom';
import SignInAndSignUp from '../../pages/SignInAndSignUp';
import { FirebaseContext } from '../../context/firebase';

const renderWithFirebaseProvider = (
  ui,
  id,
  user = null,
  favorites = [],
  movie
) => {
  return render(
    <FirebaseContext.Provider
      value={{
        currentUser: user,
      }}
    >
      {ui}
    </FirebaseContext.Provider>
  );
};

describe('SignInAndSignUp tests', () => {
  it('should render signin items correctly', () => {
    renderWithFirebaseProvider(<SignInAndSignUp />);
    expect(screen.getByText(/já possuo uma conta/i)).toBeInTheDocument();
    expect(
      screen.getByText(/entre com seu Email e Senha/i)
    ).toBeInTheDocument();
    expect(screen.getByTestId('signin_email')).toBeInTheDocument();
    expect(screen.getByTestId('signin_password')).toBeInTheDocument();
    expect(screen.getByTestId('signin_button')).toBeInTheDocument();
    expect(screen.getByTestId('signin_google_button')).toBeInTheDocument();
  });
  it('should render signup items correctly', () => {
    const { debug } = renderWithFirebaseProvider(<SignInAndSignUp />);
    expect(screen.getByText(/não possuo uma conta/i)).toBeInTheDocument();
    expect(screen.getByText(/Cadastre seu Email e Senha/i)).toBeInTheDocument();
    expect(screen.getByTestId('signup_email')).toBeInTheDocument();
    expect(screen.getByTestId('signup_password')).toBeInTheDocument();
    expect(screen.getByTestId('signup_password_confirm')).toBeInTheDocument();
    expect(screen.getByTestId('signup_button')).toBeInTheDocument();
  });
});
