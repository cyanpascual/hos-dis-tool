import React from 'react';
import ReactDOM from 'react-dom';
import './assets/index.css'
import App from './containers'
import * as serviceWorker from './serviceWorker';
import FeaturesContextProvider from './contexts/FeaturesContext';
import MapsContextProvider from './contexts/MapsContext';
import LoginContextProvider from './contexts/LoginContext';
import { Auth0Provider } from "./react-auth0-spa";
import config from "./auth_config.json";
import history from "./utils/history";

const onRedirectCallback = appState => {
  history.push(
    appState && appState.targetUrl
      ? appState.targetUrl
      : window.location.pathname
  );
};

ReactDOM.render(
  <React.StrictMode>
    <Auth0Provider
      domain={config.domain}
      client_id={config.clientId}
      redirect_uri={window.location.origin}
      onRedirectCallback={onRedirectCallback}>
        
      <MapsContextProvider>
        <FeaturesContextProvider>
          <LoginContextProvider>
            <App />
          </LoginContextProvider>
        </FeaturesContextProvider>
      </MapsContextProvider>
    </Auth0Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
