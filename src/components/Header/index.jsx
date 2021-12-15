import React from 'react';
import { Container, ItemLink, ItemsContainer, ItemText } from './styles/header';
import { SiThemoviedatabase } from 'react-icons/si';
import { BsDoorClosedFill } from 'react-icons/bs';
import { IconContext } from 'react-icons';
import { Link } from 'react-router-dom';
import DropdownFavorites from '../../components/Dropdown';
import { useFirebase } from '../../context/firebase';
import { auth } from '../../utils/firebase';

function Header() {
  const { currentUser } = useFirebase();

  const signOut = async (e) => {
    e.preventDefault();
    try {
      await auth.signOut();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Container>
      <Link to="/" data-testid="home-link">
        <IconContext.Provider
          value={{ style: { color: '#fff', fontSize: 60 } }}
        >
          <SiThemoviedatabase />
        </IconContext.Provider>
      </Link>
      <ItemsContainer>
        {currentUser ? (
          <ItemText>
            Seja bem vindo(a) {currentUser.displayName}{' '}
            <IconContext.Provider value={{ style: { fontSize: 25 } }}>
              <BsDoorClosedFill onClick={signOut} data-testid="logout" />
            </IconContext.Provider>{' '}
          </ItemText>
        ) : (
          <ItemLink to="/signin">Login</ItemLink>
        )}

        <DropdownFavorites />
      </ItemsContainer>
    </Container>
  );
}

export default Header;
