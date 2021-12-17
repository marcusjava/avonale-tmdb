import React, { useState } from 'react';
import DropdownItem from '../DropdownItem';

import {
  Container,
  Count,
  Dropdown,
  Items,
  NoItems,
  AllItems,
} from './styles/dropdown';
import { BsStar } from 'react-icons/bs';
import { IconContext } from 'react-icons';
import { useFirebase } from '../../context/firebase';
import { Link } from 'react-router-dom';

function DropdownFavorites() {
  const [open, setOpen] = useState(false);

  const { removeFavoriteFromFirebase, favoritesMovies } = useFirebase();

  return (
    <>
      <Container
        data-testid="dropdown"
        onClick={() => setOpen((prev) => !prev)}
        onMouseOver={() => setOpen(true)}
      >
        <IconContext.Provider
          value={{ style: { color: '#fff', fontSize: 60 } }}
        >
          <BsStar />
        </IconContext.Provider>
        <Count data-testid="count">{favoritesMovies.length}</Count>
      </Container>
      {open && (
        <Dropdown
          data-testid="dropdown-list"
          onMouseLeave={() => setOpen(false)}
        >
          <Items>
            {favoritesMovies.length ? (
              favoritesMovies.map((item) => (
                <DropdownItem
                  key={item.id}
                  item={item}
                  remove={() => removeFavoriteFromFirebase(item)}
                />
              ))
            ) : (
              <NoItems>Sem items</NoItems>
            )}
          </Items>
          <AllItems to="/favorites">Ver todos</AllItems>
        </Dropdown>
      )}
    </>
  );
}

export default DropdownFavorites;
