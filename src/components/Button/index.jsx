import React from 'react';
import { Button } from './styles/button';

function CustomButton({ children, ...props }) {
  return <Button {...props}>{children}</Button>;
}

export default CustomButton;
