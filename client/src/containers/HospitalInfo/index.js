import React, {useContext,useState, useEffect} from 'react';
import { FeaturesContext } from '../../contexts/FeaturesContext';
import { MapsContext } from '../../contexts/MapsContext';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import RoomIcon from '@material-ui/icons/Room';
import PhoneIcon from '@material-ui/icons/Phone';
import LanguageIcon from '@material-ui/icons/Language';
import SupplyCard from './supplyCard'
import DonationDialog from '../DonationDialog'


const HospitalInfo = () => {
    const { supplyIconGetter,facilities, setFacilitiesList, facilitiesList, hospitals, hospitalList, setFilterSetting, filterSetting, filterLevel, setFilterLevel,supplyList } = useContext(FeaturesContext);
    const { closePopups, mapReference, setMapReference, defaultMapSettings,viewport, setViewport, selectedHospital,setSelectedHospital, hoveredHospital, setHoveredHospital, goToSelected } = useContext(MapsContext)

    const [userInput, setUserInput] = useState("")

    const supplies = supplyList

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
        selectedHospital.geometry.coordinates[1],
        selectedHospital.geometry.coordinates[0],
        facility.geometry.coordinates[1],
        facility.geometry.coordinates[0],
        ) <= 0.6)

        setFacilitiesList(facilitiesNearby)
      }
    }, selectedHospital)

    return (
      <List component="nav">
        <ListItem>
          
        </ListItem>
        <ListItem>
          <IconButton 
            small 
            style={{width: '30px', height: '30px', padding: '7.5px'}}
            variant="contained" 
            color="primary"
            onClick={()=>{
            closePopups()
            setViewport(defaultMapSettings)
            setSelectedHospital(null)
            }} >
              <ArrowBackIosIcon style={{width: '30px', height: '30px', padding: '7.5px'}}/>
            </IconButton>
        </ListItem>
        <ListItem>
          <Typography style={{fontWeight:500}} variant="h5" gutterBottom>{selectedHospital.properties.cfname}</Typography>  
        </ListItem>
        <ListItem>
          <Typography variant="subtitle1" color='textSecondary' gutterBottom>
            DOH Level: <span >{selectedHospital.properties.doh_level}</span>
          </Typography>
        </ListItem>
        <ListItem>
          <Typography variant="subtitle1" color='textSecondary' gutterBottom>
            Last Updated: <span style={{color:"red"}}>{selectedHospital.properties.reportdate.slice(-22)}</span>
          </Typography>
        </ListItem>
        {/* <ListItem>
            <DonationDialog name={selectedHospital.properties.cfname}/>
        </ListItem>  */}
        
        <Divider light style={{marginBottom:5}}/>
        <Typography variant='body1'>
          <ListItem>
            <ListItemIcon><RoomIcon/></ListItemIcon>
            {selectedHospital.properties.address}</ListItem>
          <ListItem>
          <ListItemIcon><PhoneIcon/></ListItemIcon>
            {selectedHospital.properties.cont_num}</ListItem>
          
          {selectedHospital.properties.website.toLowerCase() !="none"? 
            <ListItem>
              <ListItemIcon><LanguageIcon/></ListItemIcon>
              <a href={selectedHospital.properties.website}>{selectedHospital.properties.website}</a>
            </ListItem>:
            null}
            </Typography>
          <ListItem>
            <List>
                {supplies.map((supply)=>{
                  return(
                    <ListItem>
                    <SupplyCard name={supply} current={selectedHospital.properties.supply_cur[supply]} cap={selectedHospital.properties.supply_need[supply]} level={selectedHospital.properties.supply_status}/>
                    </ListItem>
                )})}
          </List>
        </ListItem>

   
      </List>
    )
}

export default HospitalInfo

