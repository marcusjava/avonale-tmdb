import React from 'react';
import PropTypes from 'prop-types';

import { Container, Text } from './styles/tag';

function Tag({ children }) {
  return (
    <Container>
      <Text>{children}</Text>
    </Container>
  );
}

Tag.propTypes = {
  children: PropTypes.element.isRequired,
};

export default Tag;
