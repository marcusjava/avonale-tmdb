import React, { useEffect, useState } from 'react';
import Input from '../Input';
import Button from '../Button';
import { BsGoogle } from 'react-icons/bs';
import Loader from 'react-loader-spinner';
import { useHistory } from 'react-router-dom';
import {
  Container,
  Form,
  ButtonContainer,
  Title,
  SubTitle,
  Error,
} from './styles/signin';
import { useFirebase } from '../../context/firebase';
import { IconContext } from 'react-icons';
import { auth, signInWithGoogle } from '../../utils/firebase';
import { errorsMessagesPTBR } from '../../utils/firebaseErrors';

// import { Container } from './styles';

function SignIn() {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { currentUser } = useFirebase();

  const history = useHistory();

  useEffect(() => {
    if (currentUser) history.push('/');
  }, [currentUser, history]);

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials((state) => ({ ...state, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = credentials;
    if (!email || !password) {
      alert('Preencha todos os campos');
    }
    try {
      setLoading(true);
      await auth.signInWithEmailAndPassword(email, password);
      setLoading(false);
    } catch (error) {
      setError(errorsMessagesPTBR[error.code]);
      setLoading(false);
    }
  };

  return (
    <Container>
      <Title>Já possuo uma conta</Title>
      <SubTitle>Entre com seu Email e Senha</SubTitle>
      <Form onSubmit={handleSubmit}>
        <Input
          placeholder="Email"
          autoComplete="none"
          name="email"
          type="email"
          onChange={onInputChange}
          value={credentials.email}
          required
        />
        <Input
          placeholder="Senha"
          autoComplete="none"
          name="password"
          type="password"
          onChange={onInputChange}
          value={credentials.password}
          required
        />
        {error && <Error>{error}</Error>}
        <ButtonContainer>
          <Button type="submit" disabled={loading}>
            <Loader
              type="Oval"
              color="#00BFFF"
              height={25}
              width={25}
              visible={loading}
            />
            LOGIN
          </Button>
          <Button type="button" onClick={signInWithGoogle}>
            <IconContext.Provider value={{ style: { fontSize: 25 } }}>
              <BsGoogle />
            </IconContext.Provider>{' '}
            {'   '} LOGIN COM GOOGLE
          </Button>
        </ButtonContainer>
      </Form>
    </Container>
  );
}

export default SignIn;
