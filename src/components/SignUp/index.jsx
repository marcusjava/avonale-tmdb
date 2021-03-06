import React, { useEffect, useState } from 'react';
import Input from '../Input';
import Button from '../Button';
import { useFirebase } from '../../context/firebase';
import { useHistory } from 'react-router-dom';
import Loader from 'react-loader-spinner';

import {
  Container,
  Form,
  Title,
  SubTitle,
  ErrorMessage,
} from './styles/signup';
import { signUp } from '../../utils/firebase';
import { errorsMessagesPTBR } from '../../utils/firebaseErrors';

function SignUp() {
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { currentUser } = useFirebase();

  const history = useHistory();

  useEffect(() => {
    if (currentUser) history.push('/');
  }, [currentUser, history]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password || !displayName || !confirmPassword) {
      setError('Preencha todos os campos');
      return;
    }

    if (password !== confirmPassword) {
      setError('Senhas não conferem ');
      return;
    }
    try {
      setLoading(true);
      await signUp(email, password, displayName);
      setLoading(false);
    } catch (error) {
      setError(errorsMessagesPTBR[error.code]);
      setLoading(false);
    }
  };

  return (
    <Container>
      <Title>Não possuo uma conta</Title>
      <SubTitle>Cadastre seu Email e Senha</SubTitle>
      <Form onSubmit={handleSubmit} autoComplete="off">
        <Input
          placeholder="Nome"
          onChange={(e) => setDisplayName(e.target.value)}
          value={displayName}
          data-testid="signup_name"
          required
        />
        <Input
          placeholder="Email"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          data-testid="signup_email"
          required
        />
        <Input
          placeholder="Senha"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          data-testid="signup_password"
          required
        />
        <Input
          placeholder="Confirme a senha"
          type="password"
          onChange={(e) => setConfirmPassword(e.target.value)}
          value={confirmPassword}
          data-testid="signup_password_confirm"
          required
        />
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <Button disabled={loading} data-testid="signup_button">
          <Loader
            type="Oval"
            color="#00BFFF"
            height={25}
            width={25}
            visible={loading}
          />
          REGISTRAR
        </Button>
      </Form>
    </Container>
  );
}

export default SignUp;
