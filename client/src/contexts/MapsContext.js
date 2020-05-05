import React, { createContext, useState, useRef } from 'react';


export const MapsContext = createContext();



const MapsContextProvider = (props) => {

    const defaultMapSettings = {
      lat: 14.65523042,
      lng: 121.0597068,
      zoom: 10
    }
    const [viewport, setViewport] = useState(defaultMapSettings);
    
    const [selectedHospital, setSelectedHospital] = useState(null);

    const [hoveredHospital, setHoveredHospital] = useState(null);
  
    const [clickedFacility, setClickedFacility] = useState(null)

    const [mapReference, setMapReference] = useState(useRef(null));
    


    const goToSelected = (givenHospital) => {
      if(givenHospital){        const newViewport = {
        ...viewport,
        lat: givenHospital.geometry.Coordinates[1],
        lng: givenHospital.geometry.Coordinates[0],
        zoom: 15

    };

    setViewport(newViewport);}

    };

    const closePopups = () => {
      mapReference.current.leafletElement.closePopup();
  };

  return (
    <MapsContext.Provider value={{ closePopups, mapReference, setMapReference ,defaultMapSettings, clickedFacility, setClickedFacility ,viewport, setViewport, selectedHospital,setSelectedHospital, hoveredHospital, setHoveredHospital, goToSelected}}>
      {props.children}
    </MapsContext.Provider>
  );
}
 
export default MapsContextProvider;