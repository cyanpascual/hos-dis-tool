import React from 'react';
import logo from '../logo.svg';
import '../assets/index.css';
<<<<<<< Updated upstream

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
=======
import ReactMap from './reactMap'
import FilterList from './FilterList'
import FeaturesContextProvider from '../contexts/FeaturesContext';
import Feedback from './popUpFeedback';
import Donate from './popUpDonate';

function App() {
  return (
    
      <div className="wrapper">
        <div className="one">
          <div>
            <Feedback/>
            <Donate/>
          </div>
        </div>
        <FeaturesContextProvider>
          <div className="three">
            <FilterList/>
          </div>
          <div className="two">
            <ReactMap/>
          </div>
        </FeaturesContextProvider>
      </div>
    
>>>>>>> Stashed changes
  );
}

export default App;
