import React, {useContext, useEffect, useState} from 'react';
//import ReactMapGL, {Marker, Popup} from 'react-map-gl';
import { Map, TileLayer, Marker, Popup, Circle,GeoJSON, Pane, Rectangle } from 'react-leaflet';
import { FeaturesContext } from '../../contexts/FeaturesContext';
import { MapsContext } from '../../contexts/MapsContext';
import MarkerClusterGroup from 'react-leaflet-markercluster';
import 'react-leaflet-markercluster/dist/styles.min.css';
import L, { Polygon, FeatureGroup} from 'leaflet'
import 'leaflet/dist/leaflet.css';

import icon from "../../assets/markers/red50.png";
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

export default function App() {
    const outer = [
        [50.505, -29.09],
        [52.505, 29.09],
      ]
      const inner = [
        [49.505, -2.09],
        [53.505, 2.09],
      ]
      
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

    function normalize(property, min=0, max=100) {
        return (90-((property-min)/(max-min)*80))/100.0
    }

    function hslToRgb(h,s,l){
//     Converts an HSL color value to RGB. Conversion formula
//  * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
//  * Assumes h, s, and l are contained in the set [0, 1] and
//  * returns r, g, and b in the set [0, 255].
        var r, g, b;
        var color;

        if(s == 0){
            r = g = b = l; // achromatic
        }else{
            var hue2rgb = function hue2rgb(p, q, t){
                if(t < 0) t += 1;
                if(t > 1) t -= 1;
                if(t < 1/6) return p + (q - p) * 6 * t;
                if(t < 1/2) return q;
                if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
                return p;
            }

            var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
            var p = 2 * l - q;
            r = hue2rgb(p, q, h + 1/3);
            g = hue2rgb(p, q, h);
            b = hue2rgb(p, q, h - 1/3);
        }
        color= "rgb("+Math.round(r * 255)+" ,"+Math.round(g * 255)+","+ Math.round(b * 255)+")";
        return color;
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


    const {facilities, hospitalList,filterLevel, filterSetting,selectedProvince,selectedCity,justTestCenters,filterHospitalBySupply} = useContext(FeaturesContext);
    const { closePopups,mapReference, clickedFacility, setClickedFacility ,viewport, selectedHospital,setSelectedHospital, goToSelected,provinces,regions,cities } = useContext(MapsContext)
    const position = [viewport.lat, viewport.lng]
    
    const [mapBounds,setMapBounds] = useState([])

    useEffect(() => {
    //const L = require("leaflet");
    
    let DefaultIcon = L.icon({
        iconUrl: icon,
        iconSize:[50,50],
        iconAnchor:[25,50],
        popupAnchor: [0,-40]
    }); 
    L.Marker.prototype.options.icon = DefaultIcon;

    if(mapReference){

        setMapBounds(
            [
            mapReference.current.leafletElement.getBounds()._northEast.lat,
            mapReference.current.leafletElement.getBounds()._northEast.lng,
            mapReference.current.leafletElement.getBounds()._southWest.lat,
            mapReference.current.leafletElement.getBounds()._southWest.lng
            ]
        )
    }
    }, []);


    
    if(hospitalList){
        console.log(hospitalList)
    }
    
    const redHospitals = hospitalList ? hospitalList.filter((hospital)=>{
        if(hospital.properties.supply_status[filterSetting]){return(hospital.properties.supply_status[filterSetting] ==="Critically Low")}
    }):[]    
    const yellowHospitals =  hospitalList ? filterHospitalBySupply(filterSetting,"Low"):[]
    const greenHospitals = hospitalList ? filterHospitalBySupply(filterSetting,"Well stocked"):[]
    const grayHospitals =  hospitalList ? filterHospitalBySupply(filterSetting,"No Data"):[]

    console.log(regions)

    return (
 
        <Map className='map' center={position} useFlyTo={true} animate={true} zoom={viewport.zoom} ref={mapReference} onDragend={()=>{
            closePopups()
            if(mapReference){
                setMapBounds(
                    [
                    mapReference.current.leafletElement.getBounds()._northEast.lat,
                    mapReference.current.leafletElement.getBounds()._northEast.lng,
                    mapReference.current.leafletElement.getBounds()._southWest.lat,
                    mapReference.current.leafletElement.getBounds()._southWest.lng
                    ]
                )
            }
        }}
        onZoomend={()=>{
            console.log('Zoom')
            console.log(viewport.zoom)
            if(mapReference){
                setMapBounds(
                    [
                    mapReference.current.leafletElement.getBounds()._northEast.lat,
                    mapReference.current.leafletElement.getBounds()._northEast.lng,
                    mapReference.current.leafletElement.getBounds()._southWest.lat,
                    mapReference.current.leafletElement.getBounds()._southWest.lng
                    ]
                )
            }
        }}
        >
           
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
             .filter((hospital)=>{
                 return(hospital.geometry.coordinates[1] < mapBounds[0] && hospital.geometry.coordinates[1] > mapBounds[2] && hospital.geometry.coordinates[0] < mapBounds[1] && hospital.geometry.coordinates[0] > mapBounds[3])
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
            .filter((hospital)=>{
                return(hospital.geometry.coordinates[1] < mapBounds[0] && hospital.geometry.coordinates[1] > mapBounds[2] && hospital.geometry.coordinates[0] < mapBounds[1] && hospital.geometry.coordinates[0] > mapBounds[3])
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
             .filter((hospital)=>{
                return(hospital.geometry.coordinates[1] < mapBounds[0] && hospital.geometry.coordinates[1] > mapBounds[2] && hospital.geometry.coordinates[0] < mapBounds[1] && hospital.geometry.coordinates[0] > mapBounds[3])
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
                           .filter((hospital)=>{
                 return(hospital.geometry.coordinates[1] < mapBounds[0] && hospital.geometry.coordinates[1] > mapBounds[2] && hospital.geometry.coordinates[0] < mapBounds[1] && hospital.geometry.coordinates[0] > mapBounds[3])
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
