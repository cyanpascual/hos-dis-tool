import React, {useState, useContext} from 'react';
import ReactMapGL, {Marker, Popup} from 'react-map-gl';
import { FeaturesContext } from '../../contexts/FeaturesContext';
import { MapsContext } from '../../contexts/MapsContext';

export default function App() {


    const { hospitalList } = useContext(FeaturesContext);
    const { viewport, setViewport, selectedHospital,setSelectedHospital, hoveredHospital, setHoveredHospital, goToSelected } = useContext(MapsContext)
    
    return (
        <ReactMapGL 
            {...viewport} mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
            onViewportChange={viewport =>{
                setViewport(viewport);
            }}
        >
            {hospitalList? (hospitalList.map((hospital) => {
                if(hospital.properties != null){return(
                        <Marker 
                        key={hospital.properties.Google_Plu.substring(7)} 
                        latitude={hospital.geometry.coordinates[1]}
                        longitude={hospital.geometry.coordinates[0]}
                    >
                        <button 
                        class="marker-btn" 
                        onClick={(e)=>{
                            e.preventDefault();
                            setSelectedHospital(hospital);
                            goToSelected(hospital);
                        }}
                        onMouseOver={(e)=>{
                            e.preventDefault();
                            setHoveredHospital(hospital)
                        }}
                        onMouseOut={(e)=>{
                            e.preventDefault();
                            setHoveredHospital(null)
                        }}
                        >
                            <img src="blackPin.svg" alt = "hospital pin" />
                        </button>
                    </Marker>
                )}})) : null
            }
            {selectedHospital ?(
                <Popup
                    latitude={selectedHospital.geometry.coordinates[1]}
                    longitude={selectedHospital.geometry.coordinates[0]}
                    onClose={()=>{setSelectedHospital(null)}}
                >
                    <div>
                        {selectedHospital.properties.Name_of_Ho}
                    </div>
                </Popup>
            ): null}
            {hoveredHospital && !selectedHospital ?(
                <Popup
                    latitude={hoveredHospital.geometry.coordinates[1]}
                    longitude={hoveredHospital.geometry.coordinates[0]}
                    onClose={()=>{setHoveredHospital(null)}}
                >
                    <div>
                        {'hovered'}
                    </div>
                </Popup>
            ): null}
            
        </ReactMapGL>
    );
}
