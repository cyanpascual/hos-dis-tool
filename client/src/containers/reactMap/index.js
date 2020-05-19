import React, {useState, useContext, useEffect, useRef} from 'react';
//import ReactMapGL, {Marker, Popup} from 'react-map-gl';
import { Map, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import { FeaturesContext } from '../../contexts/FeaturesContext';
import { MapsContext } from '../../contexts/MapsContext';
import MarkerClusterGroup from 'react-leaflet-markercluster';
import 'react-leaflet-markercluster/dist/styles.min.css';
import L from 'leaflet'
import Chip from '@material-ui/core/Chip';
import FaceIcon from '@material-ui/icons/Search';



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

    var facilityIcon = L.icon({
          iconUrl: require("../../assets/markers/green.png"),
          iconSize:[44,44],
          iconAnchor:[22,44],
          popupAnchor: [0,-40]  
      })

 

    
      useEffect(() => {
        //const L = require("leaflet");
        
        delete L.Icon.Default.prototype._getIconUrl;
        
        //for some reason, you need to do this too load the icons
        L.Icon.Default.mergeOptions({
          iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
          iconUrl: require("../../assets/markers/red.png"),
          iconSize:[44,44],
          iconAnchor:[22,44],
         
        });
      }, []);


    const {facilities, hospitalList,filterLevel, filterSetting,selectedProvince,selectedCity} = useContext(FeaturesContext);
    const { closePopups,mapReference, clickedFacility, setClickedFacility ,viewport,  selectedHospital,setSelectedHospital, hoveredHospital, setHoveredHospital, goToSelected } = useContext(MapsContext)

    const position = [viewport.lat, viewport.lng]


    return (
 
        <Map className='map' center={position} zoom={viewport.zoom} ref={mapReference} onDragend={closePopups}>
        
            <TileLayer
                attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url='https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiY2JwYXNjdWFsIiwiYSI6ImNrODNlbnlubDA1MWQzb281b2tvaGM1M2EifQ.lcGIG62j6rN1qyXEgFR3jw'
                id='mapbox.light'
            />
            <MarkerClusterGroup
                spiderLegPolylineOptions={{
                    weight: 0,
                    opacity: 0,
                  }}
                removeOutsideVisibleBounds={true}
                disableClusteringAtZoom={14}
            >

       
            
             {hospitalList? (hospitalList
             .filter((hospital)=> {
                if (filterSetting === '' || filterLevel=== ''){
                  return(hospital.properties.Province.includes(selectedProvince) && hospital.properties['City/Municipality'].includes(selectedCity))
                } 
                return(hospital.properties.SupplyStatus[filterSetting] === filterLevel && hospital.properties.Province.includes(selectedProvince) && hospital.properties['City/Municipality'].includes(selectedCity))
              })
             .map((hospital) => {
                if(hospital.properties != null){return(
                    <Marker 
                        position={[hospital.geometry.Coordinates[1],hospital.geometry.Coordinates[0]]}
                        onClick={(e)=>{
                            setSelectedHospital(hospital);
                            goToSelected(hospital);
                        }}
                    >
                    <Popup
                    >
                        {selectedHospital ? (
                            <div>
                                {selectedHospital.properties.Name_of_Ho}
                            </div>
                        ):null}
                        
                    </Popup>
   
                    </Marker>
                )}})) : null
            } 
            </MarkerClusterGroup>
             {selectedHospital ? (
                facilities.filter((facility)=>getDistanceFromLatLonInKm(
                    selectedHospital.geometry.Coordinates[1],
                    selectedHospital.geometry.Coordinates[0],
                    facility.geometry.coordinates[1],
                    facility.geometry.coordinates[0],
                    ) <= 0.6).map((facility) => {
                    if(facility.properties != null){
                        return(
                        <Marker 
                            position={[facility.geometry.coordinates[1],facility.geometry.coordinates[0]]}
                            onClick={(e)=>{
                                setClickedFacility(facility)
                            }}
                            icon={facilityIcon}
                        >
                            
                            <Popup>
                                {clickedFacility ? (
                                    <div>
                                        <div>Facility: {clickedFacility.properties.Name_of_Fa}</div>
                                        <div>Address: {clickedFacility.properties.Address}</div>
                                        <div>Contact Person: {clickedFacility.properties["Contact Person"]}</div>
                                        <div>Contact Number{clickedFacility.properties["Contact Numbers"]}</div>
                                    </div>
                                ): null}
                            
                        </Popup>
                            
                        </Marker>
                    )
                
                }
                return(null)
            })
            ): null} 
        {selectedHospital ? (
        <Circle center={[selectedHospital.geometry.Coordinates[1],selectedHospital.geometry.Coordinates[0]]} radius={600}>
            <Popup>
                <div>
                    Walkable Distance
                </div>
            </Popup>
        </Circle>

        ):null}
    </Map>
    );
}


