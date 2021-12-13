import styled from 'styled-components/macro';

export const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
  gap: 5px;
`;

export const Input = styled.input`
  font-size: 40px;
  border-radius: 30px;
  border: none;
  padding: 15px 30px;
  width: 80%;
`;

export const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 35px;
  align-items: center;
  height: 46px;
  border-radius: 30px;
  background-color: #14c5b7;
  color: #fff;
  cursor: pointer;
  &:hover {
    background-color: #032541;
  }
`;
