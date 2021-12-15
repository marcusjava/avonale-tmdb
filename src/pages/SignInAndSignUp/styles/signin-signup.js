import styled from 'styled-components/macro';

export const Container = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  padding-top: 30px;
`;

export const SignContainer = styled.div`
  display: flex;
  width: 100%;
  gap: 60px;
  justify-content: space-evenly;
  margin: 60px 0;
  @media (max-width: 1190px) {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;
