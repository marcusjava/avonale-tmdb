import React from 'react';
import { SpinnerContainer, SpinnerOverlay } from './styles/spinner';

const Spinner = () => {
  return (
    <SpinnerOverlay>
      <SpinnerContainer />
    </SpinnerOverlay>
  );
};

export default Spinner;
