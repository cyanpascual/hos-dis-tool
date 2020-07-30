import React from 'react';
import ReactDOM from 'react-dom';
//import GoogleSheetsProvider from 'react-db-google-sheets';
import './assets/index.css'
import App from './containers'
import * as serviceWorker from './serviceWorker';
import FeaturesContextProvider from './contexts/FeaturesContext';
import MapsContextProvider from './contexts/MapsContext';
import LoginContextProvider from './contexts/LoginContext';
import OrganizerContextProvider from './contexts/OrganizerContext';
import ReactPWAInstallProvider from "react-pwa-install";

ReactDOM.render(
  <React.StrictMode>
    <ReactPWAInstallProvider enableLogging>
    <MapsContextProvider>
      <FeaturesContextProvider> 
        <LoginContextProvider>
          <OrganizerContextProvider>
           <App />
          </OrganizerContextProvider>
        </LoginContextProvider>
      </FeaturesContextProvider>
    </MapsContextProvider>
    </ReactPWAInstallProvider>  
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
