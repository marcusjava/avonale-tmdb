import React from 'react';
import { render, fireEvent, cleanup, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import RouterData, { BrowserRouter } from 'react-router-dom';
import { FirebaseContext } from '../../context/firebase';
import FirebaseProvider from '../../context/firebase';
import Home from '../../pages/Home';
import nock from 'nock';

const renderWithProvider = () => {
  return render(
    <BrowserRouter>
      <FirebaseProvider>
        <Home />
      </FirebaseProvider>
    </BrowserRouter>
  );
};

describe('Home Page test', () => {
  it('should render items correctly', async () => {
    nock.recorder.rec();
    const { debug } = renderWithProvider();

    debug();
  });
});
