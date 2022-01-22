import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {
  HashRouter as Router,
} from 'react-router-dom';
import App from 'App';
import * as serviceWorker from 'serviceWorker';
import { setOptions } from 'ui/utilities/request';

const SERVER_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000';
// TODO: Maybe create a configuration module that will hold some
// of the constants of the app or maybe create a configuration service.
window.config = {};
window.config.serverUrl = SERVER_URL;

setOptions({
  apiUrl: SERVER_URL,
});

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
