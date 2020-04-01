import React, { createContext, useState } from 'react';


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

    const [mapReference, setMapReference] = useState(null);
    
    const goToSelected = (givenHospital) => {
        const newViewport = {
            ...viewport,
            lat: givenHospital.geometry.coordinates[1],
            lng: givenHospital.geometry.coordinates[0],
            zoom: 14

        };

        setViewport(newViewport);
    };

  return (
    <MapsContext.Provider value={{ mapReference, setMapReference ,defaultMapSettings, clickedFacility, setClickedFacility ,viewport, setViewport, selectedHospital,setSelectedHospital, hoveredHospital, setHoveredHospital, goToSelected}}>
      {props.children}
    </MapsContext.Provider>
  );
}
 
export default MapsContextProvider;