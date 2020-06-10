import React, { createContext, useState } from 'react';


export const FeaturesContext = createContext();


const FeaturesContextProvider = (props) => {
  const [hospitals, setHospitals] = useState();
  const [hospitalList, setHospitalList] = useState()
  const [filterSetting, setFilterSetting] = useState('');
  const [filterLevel, setFilterLevel] = useState('');
  const [facilities, setFacilities] = useState();
  const [facilitiesList, setFacilitiesList] = useState();
  const [hospitalsShown,setHospitalsShown] = useState([0,9]);
  const [currentPage,setCurrentPage] = useState(1);
  const [selectedProvince,setSelectedProvince] = useState('')
  const [selectedCity,setSelectedCity] = useState('')
  const [sortSetting, setSortSetting] = useState('cfname');
  const [sortOrder, setSortOrder] = useState('Ascending');
  const [highlightedHospitals, setHightlightedHospitals] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [supplyList, setSupplyList] = useState([]);
  const [desktop, setDesktop] = useState(true);
  const [justTestCenters, setJustTestCenters] = useState(false);
  function compareValues(key, order = 'Ascending') {
    return function innerSort(a, b) {
      if (!a.properties.hasOwnProperty(key) || !b.properties.hasOwnProperty(key)) {
        // property doesn't exist on either object
        return 0;
      }
  
      const varA = (typeof a.properties[key] === 'string')
        ? a.properties[key].toUpperCase() : a.properties[key];
      const varB = (typeof b.properties[key] === 'string')
        ? b.properties[key].toUpperCase() : b.properties[key];
  
      let comparison = 0;
      if (varA > varB) {
        comparison = 1;
      } else if (varA < varB) {
        comparison = -1;
      }
      return (
        (order === 'Descending') ? (comparison * -1) : comparison
      );
    };
  }

  
  const resetHospitals = () => {
      setHospitalList(hospitals)
      setFilterLevel('');
      setFilterSetting('');
      setSelectedProvince('');
      
  } 


  

  return (
    <FeaturesContext.Provider value={{
      sortSetting, setSortSetting, 
      sortOrder, setSortOrder,
      compareValues,
      selectedProvince,setSelectedProvince,
      currentPage,setCurrentPage,
      hospitalsShown,setHospitalsShown,
      facilities, setFacilities, 
      facilitiesList, setFacilitiesList, 
      hospitals, setHospitals, 
      hospitalList, setHospitalList, 
      filterSetting, setFilterSetting, 
      filterLevel, setFilterLevel, 
      highlightedHospitals, setHightlightedHospitals,
      selectedCity,setSelectedCity,
      resetHospitals, searchTerm,
      supplyList, setSupplyList,
      desktop, setDesktop,
      justTestCenters, setJustTestCenters,
      setSearchTerm}}>
      {props.children}
    </FeaturesContext.Provider>
  );
}
 
export default FeaturesContextProvider;