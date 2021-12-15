import React from 'react';
import PropTypes from 'prop-types';

import { Container, Text } from './styles/tag';

function Tag({ children }) {
  return (
    <Container data-testid="tag">
      <Text>{children}</Text>
    </Container>
  );
}

export default Tag;
