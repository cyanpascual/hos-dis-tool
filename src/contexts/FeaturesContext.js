import React, { createContext, useState } from 'react';
import * as hospitalData from "../data/hospitals.json";
export const FeaturesContext = createContext();

const FeaturesContextProvider = (props) => {
  const [hospitals, setHospitals] = useState(hospitalData.features);
  const [hospitalList, setHospitalList] = useState(hospitalData.features)
  const [filterSetting, setFilterSetting] = useState(null);
  const [filterLevel, setFilterLevel] = useState(null);

  const resetHospitals = (title, author) => {setHospitalList(hospitalData.features);};

  return (
    <FeaturesContext.Provider value={{ hospitals, hospitalList, setHospitalList, filterSetting, setFilterSetting, filterLevel, setFilterLevel }}>
      {props.children}
    </FeaturesContext.Provider>
  );
}
 
export default FeaturesContextProvider;