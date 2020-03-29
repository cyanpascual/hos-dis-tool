import React, {useContext, useEffect} from 'react';
import '../assets/index.css';
import ReactMap from './reactMap'
import FilterList from './FilterList'
import { FeaturesContext } from '../contexts/FeaturesContext';
import axios from 'axios';
import Feedback from './popUpFeedback';
import Donate from './popUpDonate';


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
