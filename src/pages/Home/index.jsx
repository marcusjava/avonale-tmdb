import React, { useEffect, useState } from 'react';
import { Container } from './styles/home';
import { getMovies } from '../../services/api';
import { getListMovies, randomBanner } from '../../utils/movies';
import { useHistory } from 'react-router-dom';
import Category from '../../components/Category';
import Banner from '../../components/Banner';
import Spinner from '../../components/Spinner';
import Search from '../../components/Search';

function Home() {
  const [nowMovies, setNowMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [topMovies, setTopMovies] = useState([]);
  const [banner, setBanner] = useState({});
  const [loading, setLoading] = useState(true);

  const history = useHistory();

  useEffect(() => {
    let isActive = true;
    const ac = new AbortController();
    async function loadMovies() {
      if (isActive) {
        setLoading(true);
        const { nowData, popularData, topRatedData } = await getMovies();
        setNowMovies(getListMovies(15, nowData.data.results));
        setBanner(randomBanner(getListMovies(15, nowData.data.results)));
        setPopularMovies(getListMovies(5, popularData.data.results));
        setTopMovies(getListMovies(15, topRatedData.data.results));
        setLoading(false);
      }
    }
    loadMovies();
    return () => {
      isActive = false;
      ac.abort();
    };
  }, []);

  const redirectToDetailPage = (id) => {
    history.push(`/movie/${id}`);
  };

  if (loading) {
    return (
      <div data-testid="loading">
        <Spinner />
      </div>
    );
  }
  return (
    <Container>
      <Search />
      <Banner data={banner} redirectToDetailPage={redirectToDetailPage} />
      <Category title="Em cartaz" items={nowMovies} />
      <Category title="Populares" items={popularMovies} />
      <Category title="Top Filmes" items={topMovies} />
    </Container>
  );
}

export default Home;
