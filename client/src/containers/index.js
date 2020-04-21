import React, {useContext, useEffect} from 'react';
import { Redirect, BrowserRouter, Route, Switch } from 'react-router-dom';
import axios from 'axios';
import { FeaturesContext } from '../contexts/FeaturesContext';
import Login from './login';
import Main from './main'

function App(){
  const { setFacilities, setFacilitiesList, hospitals,setHospitals, setHospitalList, hospitalList } = useContext(FeaturesContext);

  useEffect(()=>{
    /*
    setHospitals(hospitalData.features)
    setHospitalList(hospitalData.features)
    setFacilities(facilitiesData.features)
    setFacilitiesList(facilitiesData.features)
    */
    
    const fetchData = async () => {
      const res = await axios('https://trams-up-dge.herokuapp.com/hospitals/', );
      const res2 = await axios('https://trams-up-dge.herokuapp.com/facility/', );
      setHospitals(res.data);
      setHospitalList(res.data);
      setFacilities(res2.data);
      setFacilitiesList(res2.data);
    };

    fetchData();
  }, [])

  return(
    <BrowserRouter>
      <Switch>
        <Route path='/' component={Main} exact/>
        <Route path='/validatorUpdate' component={Login} exact/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;