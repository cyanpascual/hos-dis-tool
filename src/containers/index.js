import React, {useContext, useEffect} from 'react';
import '../assets/index.css';
import ReactMap from './reactMap'
import FilterList from './FilterList'
import { FeaturesContext } from '../contexts/FeaturesContext';
import axios from 'axios';
import Feedback from './popUpFeedback';
import Donate from './popUpDonate';
import uplogo from '../assets/logos/up.png'
import dgelogo from '../assets/logos/dge.png'
import engglogo from '../assets/logos/engineering.png'
import geoplogo from '../assets/logos/geop_light.png'
import { MapsContext } from '../contexts/MapsContext';


function App() {

  const { hospitals,setHospitals, setHospitalList, hospitalList } = useContext(FeaturesContext);


    useEffect(()=>{
      axios.get('http://localhost:5000/hospitals/')
      .then(response =>{
          console.log('$$ data downloaded and set')
          console.log(response.data)
          setHospitals(response.data)
          setHospitalList(response.data)
          console.log(hospitalList)

      })
      .catch((err)=>{
          console.log(err);
          window.alert("Failed to communicate with server")
      });
    }, [])
  
  
  return (
    
      <div className="wrapper">
        <div className="one">
          <div className="logos">
            <img src={uplogo} className="App-logo" alt="logo" />
            <img src={engglogo} className="App-logo" alt="logo" />
            <img src={dgelogo} className="App-logo" alt="logo" />
            <img src={geoplogo} className="App-logo" alt="logo" />
          </div>
          <div>
            <Feedback/>
            <Donate/>
          </div>
        </div>
          <div className="three">
            <FilterList/>
          </div>
          <div className="two">
            <ReactMap/>
          </div>

      </div>
    
  );
}

export default App;
