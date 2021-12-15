import styled from 'styled-components/macro';

export const Container = styled.div`
  width: 60px;
  height: 60px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

export const Icon = styled.img`
  width: 24px;
  height: 24px;
`;

export const Count = styled.span`
  position: absolute;
  font-size: 18px;
  font-weight: bold;
  bottom: 15px;
`;

export const Dropdown = styled.div`
  position: absolute;
  width: 500px;

  display: flex;
  flex-direction: column;
  padding: 20px;
  border: 1px solid black;
  background-color: white;
  top: 90px;
  right: 40px;

  z-index: 5;
`;

export const Items = styled.div`
  height: 600px;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  gap: 15px;
`;

export const NoItems = styled.p`
  margin: auto;
  color: #b7b7a4;
  font-weight: bold;
  font-size: 20px;
`;
