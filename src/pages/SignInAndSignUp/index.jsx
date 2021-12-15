import React, { useEffect } from 'react';
import SignIn from '../../components/SignIn';
import SignUp from '../../components/SignUp';
import { SiThemoviedatabase } from 'react-icons/si';
import { IconContext } from 'react-icons';
import { Container, SignContainer } from './styles/signin-signup';
import { useFirebase } from '../../context/firebase';
import { useHistory } from 'react-router-dom';

function SignInAndSignUp() {
  const { currentUser } = useFirebase();
  const history = useHistory();

  useEffect(() => {
    if (currentUser) history.push('/');
  }, [currentUser, history]);

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
