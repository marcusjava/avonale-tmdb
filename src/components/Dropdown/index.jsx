import React, { useState } from 'react';
import FavoriteItem from '../FavoriteItem';

import { Container, Count, Dropdown, Items, NoItems } from './styles/dropdown';
import { BsStar } from 'react-icons/bs';
import { IconContext } from 'react-icons';
import { useFirebase } from '../../context/firebase';

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
                <FavoriteItem
                  key={item.id}
                  item={item}
                  remove={() => removeFavoriteFromFirebase(item)}
                />
              ))
            ) : (
              <NoItems>Sem items</NoItems>
            )}
          </Items>
        </Dropdown>
      )}
    </>
  );
}

export default DropdownFavorites;
