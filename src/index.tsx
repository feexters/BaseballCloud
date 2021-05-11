import React from 'react';
import ReactDOM from 'react-dom';
import { createGlobalStyle } from 'styled-components';
import App from './App';
import reportWebVitals from './reportWebVitals';

const Global = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    font-size: 10px;
    font-family: 'Lato', sans-serif;
    box-sizing: border-box;
  };
`

ReactDOM.render(
  <React.StrictMode>
    <Global />
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
