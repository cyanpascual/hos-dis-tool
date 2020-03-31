import React, {useContext, useEffect} from 'react';
import '../assets/index.css';
import ReactMap from './reactMap'
import FilterList from './FilterList'
import HospitalInfo from './HospitalInfo'
import { FeaturesContext } from '../contexts/FeaturesContext';
import axios from 'axios';
import Feedback from './popUpFeedback';
import Donate from './popUpDonate';
import Welcome from './popUpWelcome';
import uplogo from '../assets/logos/up.png'
import dgelogo from '../assets/logos/dge.png'
import engglogo from '../assets/logos/engineering.png'
import geoplogo from '../assets/logos/geop_light.png'
import { MapsContext } from '../contexts/MapsContext';
import * as hospitalData from '../data/hospitals.json'
import * as facilitiesData from '../data/facilities.json'



function App() {

  const { setFacilities, setFacilitiesList, hospitals,setHospitals, setHospitalList, hospitalList } = useContext(FeaturesContext);
  const { viewport, setViewport, selectedHospital,setSelectedHospital, hoveredHospital, setHoveredHospital, goToSelected } = useContext(MapsContext)


    useEffect(()=>{
      // axios.get('http://trams-up-dge.herokuapp.com/hospitals/')
      // .then(response =>{
      //     setHospitals(response.data)
      //     setHospitalList(response.data)

      // })
      // .catch((err)=>{
      //     console.log(err);
      //     window.alert("Failed to communicate with server")
      // });
      // axios.get('http://trams-up-dge.herokuapp.com/facility/')
      // .then(response =>{
      //     setFacilities(response.data)
      //     setFacilitiesList(response.data)

      // })
      // .catch((err)=>{
      //     console.log(err);
      //     window.alert("Failed to communicate with server")
      // });
      setHospitals(hospitalData.features)
      setHospitalList(hospitalData.features)
      setFacilities(facilitiesData.features)
      setFacilitiesList(facilitiesData.features)
      
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
            <Welcome/>
            <Feedback/>
            <Donate/>
          </div>
        </div>
          <div className="three">
            {selectedHospital ? <HospitalInfo/> : <FilterList/>}
          </div>
          <div className="two">
            <ReactMap/>
          </div>

      </div>
    
  );
}

export default App;