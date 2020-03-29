import React, { createContext, useState } from 'react';
import ReactMapGL, {LinearInterpolator, FlyToInterpolator} from 'react-map-gl';

export const MapsContext = createContext();



const MapsContextProvider = (props) => {
    const [viewport, setViewport] = useState({
        latitude: 14.65523042,
        longitude: 121.0597068,
        width: "100%",
        height: "100%",
        zoom: 10

    });

    const [selectedHospital, setSelectedHospital] = useState(null);

    const [hoveredHospital, setHoveredHospital] = useState(null);
  
    const goToSelected = (givenHospital) => {
        const newViewport = {
            ...viewport,
            latitude: givenHospital.geometry.coordinates[1],
            longitude: givenHospital.geometry.coordinates[0],
            zoom: 14,
            transitionDuration: 1,
            transitionInterpolator: new FlyToInterpolator(),

        };

        setViewport(newViewport);
    };

  return (
    <MapsContext.Provider value={{ viewport, setViewport, selectedHospital,setSelectedHospital, hoveredHospital, setHoveredHospital, goToSelected}}>
      {props.children}
    </MapsContext.Provider>
  );
}
 
export default MapsContextProvider;