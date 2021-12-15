import styled from 'styled-components/macro';

export const Button = styled.button`
  border: 4px solid #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  border-radius: 5px;
  padding: 10px 20px;
  background-color: transparent;
  color: #fff;
  font-size: 18px;
  cursor: pointer;
  margin: 15px 0;
  &:hover {
    background-color: #fff;
    color: #141a29;
  }
`;
