import React, {useContext} from 'react';
import '../assets/index.css';
import ReactMap from './reactMap'
import FilterList from './FilterList'
import FeaturesContextProvider from '../contexts/FeaturesContext';

function App() {
  return (
    
      <div className="wrapper">
        <FeaturesContextProvider>
          <div className="one">
            <div>
              Contact us
            </div>
          </div>
          <div className="three">
            <FilterList/>
          </div>
          <div className="two">
            <ReactMap/>
          </div>
        </FeaturesContextProvider>
      </div>
    
  );
}

export default App;
