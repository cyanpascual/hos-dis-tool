import React, {useState, useContext} from 'react';
import ReactMapGL, {Marker, Popup} from 'react-map-gl';
import { FeaturesContext } from '../../contexts/FeaturesContext';
import { MapsContext } from '../../contexts/MapsContext';

export default function App() {

    function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
        var R = 6371; // Radius of the earth in km
        var dLat = deg2rad(lat2-lat1);  // deg2rad below
        var dLon = deg2rad(lon2-lon1); 
        var a = 
          Math.sin(dLat/2) * Math.sin(dLat/2) +
          Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
          Math.sin(dLon/2) * Math.sin(dLon/2)
          ; 
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
        var d = R * c; // Distance in km
        return d;
      }
      
      function deg2rad(deg) {
        return deg * (Math.PI/180)
      }

    const {facilities, hospitalList } = useContext(FeaturesContext);
    const { clickedFacility, setClickedFacility ,viewport, setViewport, selectedHospital,setSelectedHospital, hoveredHospital, setHoveredHospital, goToSelected } = useContext(MapsContext)
    
    return (
        <ReactMapGL 
            {...viewport} mapboxApiAccessToken={"pk.eyJ1IjoiY2JwYXNjdWFsIiwiYSI6ImNrODNlbnlubDA1MWQzb281b2tvaGM1M2EifQ.lcGIG62j6rN1qyXEgFR3jw"}
            onViewportChange={viewport =>{
                setViewport(viewport);
            }}
        >
            
            
            {hospitalList? (hospitalList.map((hospital) => {
                if(hospital.properties != null){return(
                        <Marker 
                        key={hospital._id} 
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

{selectedHospital ? (
                facilities.filter((facility)=>getDistanceFromLatLonInKm(
                    selectedHospital.geometry.coordinates[1],
                    selectedHospital.geometry.coordinates[0],
                    facility.geometry.coordinates[1],
                    facility.geometry.coordinates[0],
                    ) <= 0.6).map((facility) => {
                    if(facility.properties != null){
                        return(
                        <Marker 
                            key={facility._id} 
                            latitude={facility.geometry.coordinates[1]}
                            longitude={facility.geometry.coordinates[0]}
                        >
                            <button 
                            class="marker-btn" 
                            onClick={(e)=>{
                                e.preventDefault();
                                setClickedFacility(facility)
                            }}
                            >
                                <img src="facilities.png" alt = "facility pin" />
                            </button>
                        </Marker>
                    )}})
            ): null}
            
            
            {/* {selectedHospital ?(
                <Popup
                    latitude={selectedHospital.geometry.coordinates[1]}
                    longitude={selectedHospital.geometry.coordinates[0]}
                    onClose={()=>{
                        setSelectedHospital(null)
                        setClickedFacility(null)
                    }}
                >
                    <div>
                        {selectedHospital.properties.Name_of_Ho}
                    </div>
                </Popup>
            ): null} */}
            {hoveredHospital ?(
                <Popup
                    latitude={hoveredHospital.geometry.coordinates[1]}
                    longitude={hoveredHospital.geometry.coordinates[0]} 
                    onClose={()=>{setHoveredHospital(null)}}
                >
                    <div>
                        {hoveredHospital.properties.Name_of_Ho}
                    </div>
                </Popup>
            ): null}

            {clickedFacility ?(
                <Popup
                    latitude={clickedFacility.geometry.coordinates[1]}
                    longitude={clickedFacility.geometry.coordinates[0]}
                    onClose={()=>{setClickedFacility(null)}}
                >
                    <div>Facility: {clickedFacility.properties.Name_of_Fa}</div>
                    <div>Address: {clickedFacility.properties.Address}</div>
                    <div>Contact Person: {clickedFacility.properties["Contact Person"]}</div>
                    <div>Contact Number{clickedFacility.properties["Contact Numbers"]}</div>
                </Popup>
            ): null}
            
        </ReactMapGL>
    );
}
