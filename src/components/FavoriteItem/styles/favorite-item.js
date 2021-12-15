import styled from 'styled-components/macro';
import { Link } from 'react-router-dom';

export const Container = styled.div`
  display: flex;
  width: 100%;
  height: 200px;
  color: #141a29;
  gap: 10px;
`;

export const Thumbnail = styled.img`
  width: 30%;
  height: 100%;
`;

export const DescriptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 70%;
`;

export const Description = styled.p`
  font-weight: bold;
  margin-top: 40px;
  font-size: 20px;
`;

export const ButtonContainer = styled.div`
  display: flex;
  align-items: center;

  gap: 20px;
`;
export const Button = styled.button`
  text-align: center;
  background-color: ${({ danger }) => (danger ? '#E72749' : '#141A29')};
  color: #fff;
  padding: 0.8em;
  border-radius: 20px;
  border: none;
  cursor: pointer;
`;
