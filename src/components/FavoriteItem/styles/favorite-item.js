import styled from 'styled-components/macro';

export const Container = styled.div`
  display: flex;
  width: 100%;
  height: 15%;
  padding: 50px 0;
  border: 1px solid #fff;
  border-radius: 10px;
  padding: 20px;
  gap: 50px;
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
  }
`;

export const DetailContainer = styled.div`
  padding: 25px 0;
  width: 70%;
`;

export const Thumbnail = styled.img`
  border-radius: 10px;
  width: 30%;
  height: 500px;
`;

export const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 25px;
`;

export const FavButton = styled.button`
  margin: 0;
  padding: 0;
  background-color: transparent;
  border: none;
  cursor: pointer;
`;

export const Title = styled.h1`
  font-size: 50px;
`;

export const SubTitle = styled.h3``;

export const Description = styled.h2`
  margin: 30px 0;
`;

export const GenresContainer = styled.div`
  display: flex;
`;
