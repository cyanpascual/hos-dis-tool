import React, {useContext,useState} from 'react';
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
import IconButton from '@material-ui/core/IconButton';
import CancelIcon from '@material-ui/icons/Cancel';

const HospitalInfo = () => {
    const { hospitals, hospitalList, setHospitalList, setFilterSetting, filterSetting, filterLevel, setFilterLevel } = useContext(FeaturesContext);
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
  
    return (
      <Card style={{overflowY:"scroll", margin:"5px"}}>
        <CardContent >
          <IconButton onClick={()=>{
            mapReference.closePopup();
            setMapReference(null)
            setSelectedHospital(null)
            }} ><CancelIcon/>
          </IconButton>
        <Typography variant="h6">{selectedHospital.properties.Name_of_Ho}</Typography>
        <Typography color="textSecondary">Address: {selectedHospital.properties.Address}</Typography>
        <Typography variant="subtitle2">Head: {selectedHospital.properties.Head}</Typography>
        <Typography variant="subtitle2">Website: {selectedHospital.properties.Website}</Typography>
        <Typography variant="subtitle2">Contact Numbers: {selectedHospital.properties["Contact Numbers"]}</Typography>
        <Divider style={{marginTop: "5px", marginBottom:"5px"}}/>
          {supplies.map((supply)=>{
              if(supply === "Other Needs"){
                return(
                  <Typography variant="subtitle2">
                        {supply} : {selectedHospital.properties.Supply_Cur[supply]}
                   </Typography>
                )
              }
                
            return(
                <div className="supplies">
                  <Typography variant="subtitle2">
                    {imageChoose(selectedHospital, supply)} {supply}: {selectedHospital.properties.Supply_Cur[supply]}/{selectedHospital.properties.Supply_Cap[supply]}              
                    </Typography>
                </div>)
                
            
              
          })}
        </CardContent>
      </Card>
    )
}

export default HospitalInfo

