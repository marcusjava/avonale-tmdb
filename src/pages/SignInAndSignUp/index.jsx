import React from 'react';
import SignIn from '../../components/SignIn';
import SignUp from '../../components/SignUp';
import { SiThemoviedatabase } from 'react-icons/si';
import { IconContext } from 'react-icons';
import { Container, SignContainer } from './styles/signin-signup';

function SignInAndSignUp() {
  return (
    <Container>
      <IconContext.Provider value={{ style: { fontSize: 90 } }}>
        <SiThemoviedatabase />
      </IconContext.Provider>
      <SignContainer>
        <SignIn />
        <SignUp />
      </SignContainer>
    </Container>
  );
}

export default SignInAndSignUp;
