
import React, { createContext, useState } from 'react';

import alcohol_high from '../assets/levelIndicators/alcohol-green.png'
import alcohol_med from '../assets/levelIndicators/alcohol-yellow.png'
import alcohol_low from '../assets/levelIndicators/alcohol-red.png'
import alcohol_none from '../assets/levelIndicators/alcohol-gray.png'


import disinfectant_high from '../assets/levelIndicators/disinfectant-green.png'
import disinfectant_med from '../assets/levelIndicators/disinfectant-yellow.png'
import disinfectant_low from '../assets/levelIndicators/disinfectant-red.png'
import disinfectant_none from '../assets/levelIndicators/disinfectant-gray.png'

import face_shield_high from '../assets/levelIndicators/face_shield-green.png'
import face_shield_med from '../assets/levelIndicators/face_shield-yellow.png'
import face_shield_low from '../assets/levelIndicators/face_shield-red.png'
import face_shield_none from '../assets/levelIndicators/face_shield-gray.png'

import gloves_high from '../assets/levelIndicators/gloves-green.png'
import gloves_med from '../assets/levelIndicators/gloves-yellow.png'
import gloves_low from '../assets/levelIndicators/gloves-red.png'
import gloves_none from '../assets/levelIndicators/gloves-gray.png'

import goggles_high from '../assets/levelIndicators/goggles-green.png'
import goggles_med from '../assets/levelIndicators/goggles-yellow.png'
import goggles_low from '../assets/levelIndicators/goggles-red.png'
import goggles_none from '../assets/levelIndicators/goggles-gray.png'

import gown_high from '../assets/levelIndicators/gown-green.png'
import gown_med from '../assets/levelIndicators/gown-yellow.png'
import gown_low from '../assets/levelIndicators/gown-red.png'
import gown_none from '../assets/levelIndicators/gown-gray.png'

import surgmask_high from '../assets/levelIndicators/surgicalmask-green.png'
import surgmask_med from '../assets/levelIndicators/surgicalmask-yellow.png'
import surgmask_low from '../assets/levelIndicators/surgicalmask-red.png'
import surgmask_none from '../assets/levelIndicators/surgicalmask-gray.png'

import n95mask_high from '../assets/levelIndicators/n95-green.png'
import n95mask_med from '../assets/levelIndicators/n95-yellow.png'
import n95mask_low from '../assets/levelIndicators/n95-red.png'
import n95mask_none from '../assets/levelIndicators/n95-gray.png'

import coverall_high from '../assets/levelIndicators/ppe-green.png'
import coverall_med from '../assets/levelIndicators/ppe-yellow.png'
import coverall_low from '../assets/levelIndicators/ppe-red.png'
import coverall_none from '../assets/levelIndicators/ppe-gray.png'


import shoe_cover_high from '../assets/levelIndicators/shoecover-green.png'
import shoe_cover_med from '../assets/levelIndicators/shoecover-yellow.png'
import shoe_cover_low from '../assets/levelIndicators/shoecover-red.png'
import shoe_cover_none from '../assets/levelIndicators/shoecover-gray.png'

import soap_high from '../assets/levelIndicators/soap-green.png'
import soap_med from '../assets/levelIndicators/soap-yellow.png'
import soap_low from '../assets/levelIndicators/soap-red.png'
import soap_none from '../assets/levelIndicators/soap-gray.png'

import head_cover_high from '../assets/levelIndicators/head_cover-green.png'
import head_cover_med from '../assets/levelIndicators/head_cover-yellow.png'
import head_cover_low from '../assets/levelIndicators/head_cover-red.png'
import head_cover_none from '../assets/levelIndicators/head_cover-gray.png'

import tissue_high from '../assets/levelIndicators/tissue-green.png'
import tissue_med from '../assets/levelIndicators/tissue-yellow.png'
import tissue_low from '../assets/levelIndicators/tissue-red.png'
import tissue_none from '../assets/levelIndicators/tissue-gray.png'

import vitamins_high from '../assets/levelIndicators/vitamins-green.png'
import vitamins_med from '../assets/levelIndicators/vitamins-yellow.png'
import vitamins_low from '../assets/levelIndicators/vitamins-red.png'
import vitamins_none from '../assets/levelIndicators/vitamins-gray.png'

export const FeaturesContext = createContext();

const supplyIcons = {
  "alcohol":{
    "Well stocked":alcohol_high,
    "Low":alcohol_med,
    "Critically Low":alcohol_low,
    "No Data":alcohol_none
  },  "disinfectant":{
    "Well stocked":disinfectant_high,
    "Low":disinfectant_med,
    "Critically Low":disinfectant_low,
    "No Data":disinfectant_none
  },  "soap":{
    "Well stocked":soap_high,
    "Low":soap_med,
    "Critically Low":soap_low,
    "No Data":soap_none
  },  "gown":{
    "Well stocked":gown_high,
    "Low":gown_med,
    "Critically Low":gown_low,
    "No Data":gown_none
  },  "surgmask":{
    "Well stocked":surgmask_high,
    "Low":surgmask_med,
    "Critically Low":surgmask_low,
    "No Data":surgmask_none
  },  "n95mask":{
    "Well stocked":n95mask_high,
    "Low":n95mask_med,
    "Critically Low":n95mask_low,
    "No Data":n95mask_none
  },  "gloves":{
    "Well stocked":gloves_high,
    "Low":gloves_med,
    "Critically Low":gloves_low,
    "No Data":gloves_none
  },  "shoe_cover":{
    "Well stocked":shoe_cover_high,
    "Low":shoe_cover_med,
    "Critically Low":shoe_cover_low,
    "No Data":shoe_cover_none
  },  "coverall":{
    "Well stocked":coverall_high,
    "Low":coverall_med,
    "Critically Low":coverall_low,
    "No Data":coverall_none
  },  "goggles":{
    "Well stocked":goggles_high,
    "Low":goggles_med,
    "Critically Low":goggles_low,
    "No Data":goggles_none
  },  "face_shield":{
    "Well stocked":face_shield_high,
    "Low":face_shield_med,
    "Critically Low":face_shield_low,
    "No Data":face_shield_none
  },  "head_cover":{
    "Well stocked":head_cover_high,
    "Low":head_cover_med,
    "Critically Low":head_cover_low,
    "No Data":head_cover_none
  },  "tissue":{
    "Well stocked":tissue_high,
    "Low":tissue_med,
    "Critically Low":tissue_low,
    "No Data":tissue_none
  },  "vitamins":{
    "Well stocked":vitamins_high,
    "Low":vitamins_med,
    "Critically Low":vitamins_low,
    "No Data":vitamins_none
  }
}





const FeaturesContextProvider = (props) => {
  const [hospitals, setHospitals] = useState();
  const [hospitalList, setHospitalList] = useState()
  const [filterSetting, setFilterSetting] = useState("coverall");
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
  const [provincesList, setProvincesList] = useState(null);
  const [citiesList, setCitiesList] = useState(null);
  const supplyLabels={
    "alcohol": "Alcohol",
    "disinfectant": "Disenfectant",
    "soap": "Soap",
    "gown": "Gown",
    "surgmask": "Surgical Mask",
    "n95mask": "N95 Mask",
    "gloves": "Gloves",
    "shoe_cover": "Shoe covers",
    "coverall": "Coverall",
    "goggles": "Goggles",
    "face_shield": "Face Shield",
    "head_cover": "Head Cover",
    "tissue": "Tissue",
    "vitamins": "Vitamins"
    }
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



  const supplyIconGetter = (supply, level) =>{
    return(supplyIcons[supply][level])
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
      provincesList, setProvincesList,
      citiesList, setCitiesList,
      setSearchTerm,
      supplyLabels,
      supplyIconGetter}}>
      {props.children}
    </FeaturesContext.Provider>
  );
}
 
export default FeaturesContextProvider;