import React, { useState } from 'react';
import { Container, Input, Button } from './styles/search';
import { BsSearch } from 'react-icons/bs';
import { IconContext } from 'react-icons/lib';
import { useHistory } from 'react-router';

function Search() {
  const [search, setSearch] = useState('');

  const history = useHistory();

  const handleClick = (e) => {
    e.preventDefault();
    if (!search) return;
    history.push(`/search/${search}`);
  };
  return (
    <Container>
      <Input
        onChange={(e) => setSearch(e.target.value)}
        value={search}
        aria-label="search-input"
      />
      <Button onClick={handleClick} aria-label="search-btn" disabled={!search}>
        <IconContext.Provider value={{ style: { fontSize: 50 } }}>
          <BsSearch />
        </IconContext.Provider>
      </Button>
    </Container>
  );
}

export default Search;
