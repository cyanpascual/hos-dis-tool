import React, { createContext, useState } from 'react';
import * as hospitalData from "../data/hospitals.json";

export const FeaturesContext = createContext();


const FeaturesContextProvider = (props) => {
  const [hospitals, setHospitals] = useState();
  const [hospitalList, setHospitalList] = useState()
  const [filterSetting, setFilterSetting] = useState(null);
  const [filterLevel, setFilterLevel] = useState(null);
  const [facilities, setFacilities] = useState();
  const [facilitiesList, setFacilitiesList] = useState();
  const [hospitalsShown,setHospitalsShown] = useState([0,4]);
  const [currentPage,setCurrentPage] = useState(1);
  
  const resetHospitals = () => {
      setHospitalList(hospitals)
      setFilterLevel(null);
      setFilterSetting(null);
  } 


  

  return (
    <FeaturesContext.Provider value={{ currentPage,setCurrentPage,hospitalsShown,setHospitalsShown,facilities, setFacilities, facilitiesList, setFacilitiesList, hospitals, setHospitals, hospitalList, setHospitalList, filterSetting, setFilterSetting, filterLevel, setFilterLevel, resetHospitals }}>
      {props.children}
    </FeaturesContext.Provider>
  );
}
 
export default FeaturesContextProvider;