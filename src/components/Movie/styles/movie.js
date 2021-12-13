import styled from 'styled-components';

export const Container = styled.div`
  width: 260px;
`;

export const Thumbnail = styled.img`
  width: 100%;
  height: 350px;
  border-radius: 15px;
`;

export const ImageContainer = styled.div`
  position: relative;
`;

export const TitleContainer = styled.div`
  max-width: 200px;
`;
export const Title = styled.h3``;

export const RatingContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const Rate = styled.p`
  font-size: 1.5rem;
  margin-left: 5px;
`;

export const Bookmark = styled.button`
  border: none;
  padding: 10px;
  border-radius: 50%;
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  background-color: #b7b7a4;
  opacity: 0.5;
  &:hover {
    background-color: #04bbf9;
    color: #fff;
  }
`;
