import React, {useContext,useState, useEffect} from 'react';
import { FeaturesContext } from '../../contexts/FeaturesContext';
import { MapsContext } from '../../contexts/MapsContext';

// import simple_high from '../../assets/levelIndicators/simple_high.png'
// import simple_med from '../../assets/levelIndicators/simple_mid.png'
// import simple_low from '../../assets/levelIndicators/simple_low.png'
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Box from '@material-ui/core/Box'
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import CancelIcon from '@material-ui/icons/Cancel';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import RoomIcon from '@material-ui/icons/Room';
import PhoneIcon from '@material-ui/icons/Phone';
import LanguageIcon from '@material-ui/icons/Language';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { CircularProgressbar, buildStyles, CircularProgressbarWithChildren, } from 'react-circular-progressbar';

//alcohol
import alcoholND from './assets/levelIndicators/alcohol-gray.png'
import alcoholCL from './assets/levelIndicators/alcohol-red.png'
import alcoholLow from './assets/levelIndicators/alcohol-yellow.png'
import alcoholWS from './assets/levelIndicators/alcohol-green.png'
 
//disinfectant
import disinfectantND from './assets/levelIndicators/disinfectant-gray.png'
import disinfectantCL from './assets/levelIndicators/disinfectant-red.png'
import disinfectantLow from './assets/levelIndicators/disinfectant-yellow.png'
import disinfectantWS from './assets/levelIndicators/disinfectant-green.png'

//soap
import soapND from './assets/levelIndicators/soap-gray.png'
import soapCL from './assets/levelIndicators/soap-red.png'
import soapLow from './assets/levelIndicators/soap-yellow.png'
import soapWS from './assets/levelIndicators/soap-green.png'

//gown
import gownND from './assets/levelIndicators/gown-gray.png'
import gownCL from './assets/levelIndicators/gown-red.png'
import gownLow from './assets/levelIndicators/gown-yellow.png'
import gownWS from './assets/levelIndicators/gown-green.png'

//surgmask
import surgmaskND from './assets/levelIndicators/surgicalmask-gray.png'
import surgmaskCL from './assets/levelIndicators/surgicalmask-red.png'
import surgmaskLow from './assets/levelIndicators/surgicalmask-yellow.png'
import surgmaskWS from './assets/levelIndicators/surgicalmask-green.png'

//n95mask
import n955maskND from './assets/levelIndicators/n95-gray.png'
import n955maskCL from './assets/levelIndicators/n95-red.png'
import n955maskLow from './assets/levelIndicators/n95-yellow.png'
import n955maskWS from './assets/levelIndicators/n95-green.png'

//gloves
import glovesND from './assets/levelIndicators/gloves-gray.png'
import glovesCL from './assets/levelIndicators/gloves-red.png'
import glovesLow from './assets/levelIndicators/gloves-yellow.png'
import glovesWS from './assets/levelIndicators/gloves-green.png'

//shoe cover
import alcoholND from './assets/levelIndicators/shoe_cover-gray.png'
import alcoholCL from './assets/levelIndicators/shoe_cover-red.png'
import alcoholLow from './assets/levelIndicators/shoe_cover-yellow.png'
import alcoholWS from './assets/levelIndicators/shoe_cover-green.png'

//coverall
import alcoholND from './assets/levelIndicators/coverall-gray.png'
import alcoholCL from './assets/levelIndicators/coverall-red.png'
import alcoholLow from './assets/levelIndicators/coveralll-yellow.png'
import alcoholWS from './assets/levelIndicators/coverall-green.png'

//goggles
import alcoholND from './assets/levelIndicators/alcohol-gray.png'
import alcoholCL from './assets/levelIndicators/alcohol-red.png'
import alcoholLow from './assets/levelIndicators/alcohol-yellow.png'
import alcoholWS from './assets/levelIndicators/alcohol-green.png'

//face shield
import alcoholND from './assets/levelIndicators/alcohol-gray.png'
import alcoholCL from './assets/levelIndicators/alcohol-red.png'
import alcoholLow from './assets/levelIndicators/alcohol-yellow.png'
import alcoholWS from './assets/levelIndicators/alcohol-green.png'

//head cover
import alcoholND from './assets/levelIndicators/alcohol-gray.png'
import alcoholCL from './assets/levelIndicators/alcohol-red.png'
import alcoholLow from './assets/levelIndicators/alcohol-yellow.png'
import alcoholWS from './assets/levelIndicators/alcohol-green.png'

//tissue
import alcoholND from './assets/levelIndicators/alcohol-gray.png'
import alcoholCL from './assets/levelIndicators/alcohol-red.png'
import alcoholLow from './assets/levelIndicators/alcohol-yellow.png'
import alcoholWS from './assets/levelIndicators/alcohol-green.png'

//vitamins
import alcoholND from './assets/levelIndicators/alcohol-gray.png'
import alcoholCL from './assets/levelIndicators/alcohol-red.png'
import alcoholLow from './assets/levelIndicators/alcohol-yellow.png'
import alcoholWS from './assets/levelIndicators/alcohol-green.png'


// "alcohol": 100,
// "disinfectant": 100,
// "soap": 100,
// "gown": 150,
// "surgmask": 350,
// "n95mask": 15,
// "gloves": 350,
// "shoe_cover": 350,
// "coverall": 150,
// "goggles": 150,
// "face_shield": 0,
// "head_cover": 0,
// "tissue": 100,
// "vitamins": 150


const HospitalInfo = () => {
    const { facilities, setFacilitiesList, facilitiesList, hospitals, hospitalList, setFilterSetting, filterSetting, filterLevel, setFilterLevel } = useContext(FeaturesContext);
    const { closePopups, mapReference, setMapReference, defaultMapSettings,viewport, setViewport, selectedHospital,setSelectedHospital, hoveredHospital, setHoveredHospital, goToSelected } = useContext(MapsContext)

    const [userInput, setUserInput] = useState("")

    const supplies = Object.keys(selectedHospital.properties.Supply_Cap)


    const imageChooser = (currHospital,supply) =>{
      //different from  the one sa filter  list
      if(currHospital.properties.Supply_Cap[supply]===0){
        return(<img  title={supply + ': No data'} className="smallPicture" src={iconList[supply+"_none"]} alt="none"/>)
      }
        else if(currHospital.properties.Supply_Cur[supply]/currHospital.properties.Supply_Cap[supply] < 0.2){
        return(<img title={supply + ': Critically Low'} className="smallPicture" src={iconList[supply+"_low"]} alt="critically-low"/>)
      } else if((currHospital.properties.Supply_Cur[supply]/currHospital.properties.Supply_Cap[supply] >= 0.20) && (currHospital.properties.Supply_Cur[supply]/currHospital.properties.Supply_Cap[supply] <= 0.5)){
        return(<img title={supply + ': Low'} className="smallPicture" src={iconList[supply+"_med"]} alt="low"/>)
      } 
      return(<img title={supply + ': Well Supplied'} className="smallPicture" src={iconList[supply+"_high"]} alt="well-supplied"/>)
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
      <List component="nav">
        <ListItem>
          <IconButton  
            variant="contained" 
            color="primary"
            onClick={()=>{
            closePopups()
            setViewport(defaultMapSettings)
            setSelectedHospital(null)
            }} >
              <ArrowBackIosIcon/>
            </IconButton>
        </ListItem>
        <ListItem>
          <Typography variant="h5" gutterBottom>{selectedHospital.properties.Name_of_Ho}</Typography>  
        </ListItem>
        <ListItem>
          <Typography variant="subtitle1" color='textSecondary' gutterBottom>
            DOH Level: <span style={{color:"red"}}>{selectedHospital.properties["DOH Level"]}</span>
          </Typography>
        </ListItem>
        <ListItem>
          <Typography variant="subtitle1" color='textSecondary' gutterBottom>
            Last Updated: <span style={{color:"red"}}>{selectedHospital.properties["Last Update"]}</span>
          </Typography>
        </ListItem>
        {/* <ListItem>
          <Typography variant="subtitle1" gutterBottom>
            Donate through:
          </Typography>
          <List>
            <ListItem><a href="#">Donation Drive 1</a></ListItem>
            <ListItem><a href="#">Donation Drive 2</a></ListItem>
            <ListItem><a href="#">Donation Drive 3</a></ListItem>
          </List>
        </ListItem> */}
        
        <Divider light style={{marginBottom:5}}/>
        <Typography variant='body1'>
          <ListItem>
            <ListItemIcon><RoomIcon/></ListItemIcon>
            Address: {selectedHospital.properties.Address}</ListItem>
          <ListItem>
          <ListItemIcon><PhoneIcon/></ListItemIcon>
            Contact Numbers: {selectedHospital.properties["Contact Numbers"]}</ListItem>
          <ListItem>
          <ListItemIcon><LanguageIcon/></ListItemIcon>
            Website: {selectedHospital.properties.Website}</ListItem>
            </Typography>
          <ListItem>
        
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Item</TableCell>
                <TableCell>Current Supply vs Weekly Supply</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
                {supplies.map((supply)=>{
                  return(
                    <TableRow>
                      <TableCell>{supply}</TableCell>
                      <TableCell style={{ width: 150,height: 150}}>
                      <CircularProgressbarWithChildren
                          value={(selectedHospital.properties.Supply_Cur[supply]/selectedHospital.properties.Supply_Cap[supply])*100}
    
                          styles={buildStyles({
                            // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                            strokeLinecap: 'butt',
                        
                            // Text size
                        
                            textAlign:"center",
                        
                            // Colors
                            pathColor: `rgba(128, 0, 0, ${selectedHospital.properties.Supply_Cur[supply]/selectedHospital.properties.Supply_Cap[supply]})`,
                            textColor: '#000',
                            trailColor: '#d6d6d6',
                            backgroundColor: '#3e98c7',
                          })}
                        >
                        {`${(selectedHospital.properties.Supply_Cur[supply])}/${selectedHospital.properties.Supply_Cap[supply]}`} 
                        </CircularProgressbarWithChildren>
                      </TableCell>
         
                    </TableRow>
                  )
                })}
            </TableBody>
          </Table>
        </ListItem>

   
      </List>
    )
}

export default HospitalInfo

