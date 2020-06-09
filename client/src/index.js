import React from 'react';
import ReactDOM from 'react-dom';
import './assets/index.css'
import App from './containers'
import * as serviceWorker from './serviceWorker';
import FeaturesContextProvider from './contexts/FeaturesContext';
import MapsContextProvider from './contexts/MapsContext';
import LoginContextProvider from './contexts/LoginContext';

ReactDOM.render(
  <React.StrictMode>  
      <MapsContextProvider>
        <FeaturesContextProvider>
          <LoginContextProvider>
            <App />
          </LoginContextProvider>
        </FeaturesContextProvider>
      </MapsContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
