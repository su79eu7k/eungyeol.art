import React from 'react';
import ReactDOM from 'react-dom';
import { createGlobalStyle } from "styled-components";
import App from './App';
import reportWebVitals from './reportWebVitals';

const GlobalStyle = createGlobalStyle`
  @font-face {
      font-family: 'WandohopeR';
      src: local('WandohopeR'), url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_20-10@1.0/WandohopeR.woff') format('woff');
      font-weight: normal;
      font-style: normal;
  }
  @font-face {
      font-family: 'WandohopeB';
      src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_20-10@1.0/WandohopeB.woff') format('woff');
      font-weight: normal;
      font-style: normal;
  }
  @font-face {
      font-family: 'Cafe24Oneprettynight';
      src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_twelve@1.1/Cafe24Oneprettynight.woff') format('woff');
      font-weight: normal;
      font-style: normal;
  }

  html, body, #root {
    margin: 0px;
    padding: 0px;
    min-height: 100vh;

    // /* Hide scrollbar for Chrome, Safari and Opera */
    // ::-webkit-scrollbar {
    //   display: none;
    // }
    // -ms-overflow-style: none;  /* IE and Edge */
    // scrollbar-width: none;  /* Firefox */
  }
`

ReactDOM.render(
  <>
    <App />
    <GlobalStyle />
  </>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
