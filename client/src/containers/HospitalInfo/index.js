import React, {useContext,useState, useEffect} from 'react';
import { FeaturesContext } from '../../contexts/FeaturesContext';
import { MapsContext } from '../../contexts/MapsContext';

import simple_high from '../../assets/levelIndicators/simple_high.png'
import simple_med from '../../assets/levelIndicators/simple_mid.png'
import simple_low from '../../assets/levelIndicators/simple_low.png'
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Box from '@material-ui/core/Box'
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import CancelIcon from '@material-ui/icons/Cancel';

const HospitalInfo = () => {
    const { facilities, setFacilitiesList, facilitiesList, hospitals, hospitalList, setHospitalList, setFilterSetting, filterSetting, filterLevel, setFilterLevel } = useContext(FeaturesContext);
    const { mapReference, setMapReference, defaultMapSettings,viewport, setViewport, selectedHospital,setSelectedHospital, hoveredHospital, setHoveredHospital, goToSelected } = useContext(MapsContext)

    const [userInput, setUserInput] = useState("")

    const supplies = Object.keys(selectedHospital.properties.Supply_Cur)
    const imageChoose = (currHospital, supply) =>{
        if(currHospital.properties.Supply_Cur[supply]/currHospital.properties.Supply_Cap[supply] < 0.2){
          return(<img style={{width:20}} src={simple_low} alt="critically-low"/>)
        } else if((currHospital.properties.Supply_Cur[filterSetting]/currHospital.properties.Supply_Cap[filterSetting] >= 0.20) && (currHospital.properties.Supply_Cur[filterSetting]/currHospital.properties.Supply_Cap[filterSetting] <= 0.5)){
          return(<img style={{width:20}} src={simple_med} alt="low"/>)
        }
        return(<img style={{width:20}} src={simple_high} alt="well-supplied"/>)
      }
    const getDistanceFromLatLonInKm = (lat1,lon1,lat2,lon2) => {
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
    
    const deg2rad = (deg) => {
        return deg * (Math.PI/180)
    }
      
    useEffect(()=>{
      if(selectedHospital){
        
        const facilitiesNearby = facilities.filter((facility)=>getDistanceFromLatLonInKm(
        selectedHospital.geometry.Coordinates[1],
        selectedHospital.geometry.Coordinates[0],
        facility.geometry.coordinates[1],
        facility.geometry.coordinates[0],
        ) <= 0.6)

        setFacilitiesList(facilitiesNearby)
      }
    }, selectedHospital)

    return (
      <Box  m={1}   p={1} >
        <Box style={{ textAlign:"center"} } p={1}>
          <Box  p={0.5}>          
            <Button  
            variant="contained" 
            color="primary"
            onClick={()=>{
            if(mapReference){
              mapReference.closePopup();
              setMapReference(null)
            }
            setSelectedHospital(null)
            }} >
              Deselect
            </Button>
            <Box color="white" bgcolor="maroon" fontSize={16} p={1} mt={1} fontWeight="fontWeightBold">
              {selectedHospital.properties.Name_of_Ho}
            </Box>
          </Box>
          
          <Box p={1} m={1} bgcolor='#E3E2DF' height={{xs:200, sm:300}}  style={{overflowY:"auto"}}>  
            <Divider/>
            <Box color="black" fontWeight={500}>
              <Box>Address: {selectedHospital.properties.Address}</Box>
              <Box>Contact Person: {selectedHospital.properties.Head}</Box>
              <Box>Website: {selectedHospital.properties.Website}</Box>
              <Box>Contact Numbers: {selectedHospital.properties["Contact Numbers"]}</Box>
            </Box>
            <Divider />
            {supplies.map((supply)=>{
                if(supply === "Other Needs"){
                  return(
                    <Box fontWeight={500} m={1}> 
                          {supply} : {selectedHospital.properties.Supply_Cur[supply]}
                    </Box>
                  )
                }
                  
              return(
                  <Box  m={1} fontWeight={500}>
                      {supply}: {selectedHospital.properties.Supply_Cur[supply]}/{selectedHospital.properties.Supply_Cap[supply]}              
                  </Box>)
              })}
          </Box>
          <Box bgcolor='#E3E2DF' p={1} m={1} height={{xs:200, sm:300}}  style={{overflowY:"auto"}}> 
            <List disablePadding >
              {selectedHospital ? (
                  facilitiesList.length !== 0 ?(
                    facilities.filter((facility)=>getDistanceFromLatLonInKm(
                        selectedHospital.geometry.Coordinates[1],
                        selectedHospital.geometry.Coordinates[0],
                        facility.geometry.coordinates[1],
                        facility.geometry.coordinates[0],
                        ) <= 0.6).map((facility) => {
                        if(facility.properties != null){
                            return(
                            <ListItem>
                                

                                        <div>
                                            <div>Facility: {facility.properties.Name_of_Fa}</div>
                                            <div>Address: {facility.properties.Address}</div>
                                            <div>Contact Person: {facility.properties["Contact Person"]}</div>
                                            <div>Contact Number{facility.properties["Contact Numbers"]}</div>
                                        </div>
                      
                                      
                            </ListItem>
                        )}})): (<Box mt="50%" width={1} fontWeight={500}>No recorded facilities within walking distance of selected hospital.</Box>)
              ): (null)}
            </List>
          </Box>
        </Box>
      </Box>
    )
}

export default HospitalInfo

