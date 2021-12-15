import { Container, Title, ItemContainer } from './styles/category';
import Movie from '../Movie';
import PropTypes from 'prop-types';

const Category = ({ title, items }) => {
  return (
    <Container>
      <Title>{title}</Title>
      <ItemContainer numberOfItems={items.length}>
        {items.map((item) => (
          <Movie key={item.id} data={item} />
        ))}
      </ItemContainer>
    </Container>
  );
};

Category.propTypes = {
  title: PropTypes.string.isRequired,
  items: PropTypes.array.isRequired,
};

export default Category;
