import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  *, *:before, *:after {
    box-sizing: border-box;
  }
  html, body {
    margin:0;
    height: 100%;
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: #141a29;
    color: #fff;
    font-size: 16px;
}
main{
  padding: 0 50px;
  display: flex;
  justify-content: center;

}

a{
  text-decoration: none;
  color: #fff
}
`;
