import React, {useContext, useEffect} from 'react';
//import ReactMapGL, {Marker, Popup} from 'react-map-gl';
import { Map, TileLayer, Marker, Popup, Circle,Pane } from 'react-leaflet';
import { FeaturesContext } from '../../contexts/FeaturesContext';
import { MapsContext } from '../../contexts/MapsContext';
import MarkerClusterGroup from 'react-leaflet-markercluster';
import 'react-leaflet-markercluster/dist/styles.min.css';
import L from 'leaflet'





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
 

    var blueIcon = L.icon({
        iconUrl:'https://drive.google.com/uc?id=1EffpdBTqDJcDZz2gphQ0os_SuuGmbYrr',
        iconRetinaUrl:'https://drive.google.com/uc?id=1EffpdBTqDJcDZz2gphQ0os_SuuGmbYrr',
        iconSize:[50,50],
        iconAnchor:[25,50],
        popupAnchor: [0,-40]
    })
    var redIcon = L.icon({
          iconUrl:'https://drive.google.com/uc?id=1jJQqQ0moEb7JeqwMjFyHeO0GlT4cfXr7',
          iconRetinaUrl:'https://drive.google.com/uc?id=1jJQqQ0moEb7JeqwMjFyHeO0GlT4cfXr7',
          iconSize:[50,50],
          iconAnchor:[25,50],
          popupAnchor: [0,-40]
      })

      var yellowIcon = L.icon({
        iconUrl:'https://drive.google.com/uc?id=1epJ3DRUFK0tdUAcK7h0tzffAthAI-Djd',
        iconRetinaUrl:'https://drive.google.com/uc?id=1epJ3DRUFK0tdUAcK7h0tzffAthAI-Djd',
        iconSize:[50,50],
        iconAnchor:[25,50],
        popupAnchor: [0,-40]
    })

    var greenIcon = L.icon({
        iconUrl:'https://drive.google.com/uc?id=1GsXWLN1d5aX7UjaG4wfjUHThNQz5DYkp',
        iconRetinaUrl:'https://drive.google.com/uc?id=1GsXWLN1d5aX7UjaG4wfjUHThNQz5DYkp',
        iconSize:[50,50],
        iconAnchor:[25,50],
        popupAnchor: [0,-40]
    })

    var grayIcon = L.icon({
        iconUrl:'https://drive.google.com/uc?id=1LWRcCHnKWDkpJBX3lvK1WX_EY65_UxVR',
        iconRetinaUrl:'https://drive.google.com/uc?id=1LWRcCHnKWDkpJBX3lvK1WX_EY65_UxVR',
        iconSize:[50,50],
        iconAnchor:[25,50],
        popupAnchor: [0,-40]
    })



    
      useEffect(() => {
        //const L = require("leaflet");
        
        delete L.Icon.Default.prototype._getIconUrl;
    
        L.Icon.Default.mergeOptions({
          iconUrl: require("../../assets/markers/red50.png"),
          iconSize:[50,50],
          iconAnchor:[25,50],
          popupAnchor: [0,-40]
        });
      }, []);


    const {facilities, hospitalList,filterLevel, filterSetting,selectedProvince,selectedCity,justTestCenters,filterHospitalBySupply} = useContext(FeaturesContext);
    const { closePopups,mapReference, clickedFacility, setClickedFacility ,viewport, selectedHospital,setSelectedHospital, goToSelected } = useContext(MapsContext)
    const position = [viewport.lat, viewport.lng]
    
    const redHospitals = hospitalList ? hospitalList.filter((hospital)=>{return(hospital.properties.supply_status[filterSetting] ==="Critically Low")}):[]
    const yellowHospitals =  hospitalList ? filterHospitalBySupply(filterSetting,"Low"):[]
    const greenHospitals = hospitalList ? filterHospitalBySupply(filterSetting,"Well stocked"):[]
    const grayHospitals =  hospitalList ? filterHospitalBySupply(filterSetting,"No Data"):[]
    return (
 
        <Map className='map' center={position} zoom={viewport.zoom} ref={mapReference} onDragend={closePopups}>
           
            <TileLayer
                attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url='https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiY2JwYXNjdWFsIiwiYSI6ImNrODNlbnlubDA1MWQzb281b2tvaGM1M2EifQ.lcGIG62j6rN1qyXEgFR3jw'
                id='mapbox.light'
            />


       

            {(hospitalList  && (filterLevel==="Well stocked" || filterLevel==="All"))? (
                greenHospitals
             .filter((hospital)=>{
                 if(justTestCenters){
                     return(hospital.test_center === true)
                 }
                 else{
                     return(hospital)
                 }
             })
             .filter((hospital)=> {
                return(hospital.properties.prov.includes(selectedProvince) && hospital.properties.city.includes(selectedCity))
            })
             .map((hospital) => {
                if(hospital.properties != null){return(
                    <Marker 
                        position={[hospital.geometry.coordinates[1],hospital.geometry.coordinates[0]]}
                        onClick={(e)=>{
                            setSelectedHospital(hospital);
                            goToSelected(hospital);
                        }}
                        icon={greenIcon}
                        zIndexOffset={300}
                    >
                    <Popup className="request-popup">
                        {selectedHospital ? (
                            <div>
                                {selectedHospital.properties.cfname}
                            </div>
                        ):null}
                        
                    </Popup>
   
                    </Marker>
                )}})) : null
            } 

            
        {(hospitalList  && (filterLevel==="No Data" || filterLevel==="All"))? (
                grayHospitals
             .filter((hospital)=>{
                 if(justTestCenters){
                     return(hospital.test_center === true)
                 }
                 else{
                     return(hospital)
                 }
             })
             .filter((hospital)=> {
                return(hospital.properties.prov.includes(selectedProvince) && hospital.properties.city.includes(selectedCity))
            })
             .map((hospital) => {
                if(hospital.properties != null){return(
                    <Marker 
                        position={[hospital.geometry.coordinates[1],hospital.geometry.coordinates[0]]}
                        onClick={(e)=>{
                            setSelectedHospital(hospital);
                            goToSelected(hospital);
                        }}
                        icon={grayIcon}
                        zIndexOffset={400}

                    >
                    <Popup className="request-popup">
                        {selectedHospital ? (
                            <div>
                                {selectedHospital.properties.cfname}
                            </div>
                        ):null}
                        
                    </Popup>
   
                    </Marker>
                )}})) : null
            } 
            
            {(hospitalList  && (filterLevel==="Low" || filterLevel==="All"))?(
            yellowHospitals
             .filter((hospital)=>{
                 if(justTestCenters){
                     return(hospital.test_center === true)
                 }
                 else{
                     return(hospital)
                 }
             })
             .filter((hospital)=> {
                return(hospital.properties.prov.includes(selectedProvince) && hospital.properties.city.includes(selectedCity))
            })
             .map((hospital) => {
                if(hospital.properties != null){return(
                    <Marker 
                        position={[hospital.geometry.coordinates[1],hospital.geometry.coordinates[0]]}
                        onClick={(e)=>{
                            setSelectedHospital(hospital);
                            goToSelected(hospital);
                        }}
                        icon={yellowIcon}
                        zIndexOffset={500}
                    >
                    <Popup className="request-popup">
                        {selectedHospital ? (
                            <div>
                                {selectedHospital.properties.cfname}
                            </div>
                        ):null}
                        
                    </Popup>
   
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
                            position={[facility.geometry.coordinates[1],facility.geometry.coordinates[0]]}
                            onClick={(e)=>{
                                setClickedFacility(facility)
                            }}
                            icon={blueIcon}
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
                    )}})
            ): null} 
        {selectedHospital ? (
        <Circle center={[selectedHospital.geometry.coordinates[1],selectedHospital.geometry.coordinates[0]]} radius={600}>
            <Popup>
                <div>
                    Walkable Distance
                </div>
            </Popup>
        </Circle>

        ):null}

                    {/*for critically low markers*/}
                    {(hospitalList && (filterLevel==="Critically Low" || filterLevel==="All"))? (
            redHospitals
             .filter((hospital)=>{
                 if(justTestCenters){
                     return(hospital.test_center === true)
                 }
                 else{
                     return(hospital)
                 }
             })
             .filter((hospital)=> {
                  return(hospital.properties.prov.includes(selectedProvince) && hospital.properties.city.includes(selectedCity))
              })
             .map((hospital) => {
                if(hospital.properties != null){return(
                    <Marker 
                        position={[hospital.geometry.coordinates[1],hospital.geometry.coordinates[0]]}
                        onClick={(e)=>{
                            setSelectedHospital(hospital);
                            goToSelected(hospital);
                        }}
                        icon={redIcon}
                        zIndexOffset={604}
                    >
                    <Popup className="request-popup">
                        {selectedHospital ? (
                            <div>
                                {selectedHospital.properties.cfname}
                            </div>
                        ):null}
                        
                    </Popup>
   
                    </Marker>
                )}})) : null
            } 
    </Map>
    );
}


