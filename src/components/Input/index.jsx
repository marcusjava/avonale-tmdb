import React from 'react';
import { Label, Input } from './styles/input';

// import { Container } from './styles';

function CustomInput({ label = false, ...props }) {
  return (
    <>
      {label && <Label>Email</Label>}
      <Input {...props} />
    </>
  );
}

export default CustomInput;
