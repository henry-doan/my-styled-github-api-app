import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import 'semantic-ui-css/semantic.min.css';
import { ThemeProvider, injectGlobal } from 'styled-components';

injectGlobal`
  @font-face {
    font-family: 'Bellefair', serif;
    src: url('https://fonts.googleapis.com/css?family=Bellefair');
  }

  html * {
    font-family: 'Bellefair' !important;
  }
`

const theme = {
  fg: 'white',
  bg: 'black',
}

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>, 
  document.getElementById('root')
);
registerServiceWorker();
