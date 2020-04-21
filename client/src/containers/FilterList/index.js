import React, {useContext,useState} from 'react';
import { FeaturesContext } from '../../contexts/FeaturesContext';
import { MapsContext } from '../../contexts/MapsContext';
import { makeStyles } from '@material-ui/core/styles';
import glass from '../../assets/logos/magnifying-glass-md.png';
import Typography from '@material-ui/core/Typography';
import Pagination from '@material-ui/lab/Pagination';

import alcohol_high from '../../assets/levelIndicators/alcohol_high.png'
import alcohol_med from '../../assets/levelIndicators/alcohol_mid.png'
import alcohol_low from '../../assets/levelIndicators/alcohol_low.png'
import alcohol_none from '../../assets/levelIndicators/alcohol_none.png'

// import bed_high from '../../assets/levelIndicators/bed_high.png'
// import bed_med from '../../assets/levelIndicators/bed_mid.png'
// import bed_low from '../../assets/levelIndicators/bed_low.png'
// import bed_none from '../../assets/levelIndicators/bed_none.png'

import disinfect_high from '../../assets/levelIndicators/disinfect_high.png'
import disinfect_med from '../../assets/levelIndicators/disinfect_mid.png'
import disinfect_low from '../../assets/levelIndicators/disinfect_low.png'
import disinfect_none from '../../assets/levelIndicators/disinfect_none.png'


import gloves_high from '../../assets/levelIndicators/gloves_high.png'
import gloves_med from '../../assets/levelIndicators/gloves_mid.png'
import gloves_low from '../../assets/levelIndicators/gloves_low.png'
import gloves_none from '../../assets/levelIndicators/gloves_none.png'

import goggles_high from '../../assets/levelIndicators/goggles_high.png'
import goggles_med from '../../assets/levelIndicators/goggles_mid.png'
import goggles_low from '../../assets/levelIndicators/goggles_low.png'
import goggles_none from '../../assets/levelIndicators/goggles_none.png'

import mask_high from '../../assets/levelIndicators/mask_high.png'
import mask_med from '../../assets/levelIndicators/mask_mid.png'
import mask_low from '../../assets/levelIndicators/mask_low.png'
import mask_none from '../../assets/levelIndicators/mask_none.png'

import ppe_high from '../../assets/levelIndicators/ppe_high.png'
import ppe_med from '../../assets/levelIndicators/ppe_mid.png'
import ppe_low from '../../assets/levelIndicators/ppe_low.png'
import ppe_none from '../../assets/levelIndicators/ppe_none.png'
 
// import sanitizer_high from '../../assets/levelIndicators/sanitizer_high.png'
// import sanitizer_med from '../../assets/levelIndicators/sanitizer_mid.png'
// import sanitizer_low from '../../assets/levelIndicators/sanitizer_low.png'
// import sanitizer_none from '../../assets/levelIndicators/sanitizer_none.png'

import soap_high from '../../assets/levelIndicators/soap_high.png'
import soap_med from '../../assets/levelIndicators/soap_mid.png'
import soap_low from '../../assets/levelIndicators/soap_low.png'
import soap_none from '../../assets/levelIndicators/soap_none.png'

import testkit_high from '../../assets/levelIndicators/testkit_high.png'
import testkit_med from '../../assets/levelIndicators/testkit_mid.png'
import testkit_low from '../../assets/levelIndicators/testkit_low.png'
import testkit_none from '../../assets/levelIndicators/testkit_none.png'

import tissue_high from '../../assets/levelIndicators/tissue_high.png'
import tissue_med from '../../assets/levelIndicators/tissue_mid.png'
import tissue_low from '../../assets/levelIndicators/tissue_low.png'
import tissue_none from '../../assets/levelIndicators/tissue_none.png'

// import uv_high from '../../assets/levelIndicators/uv_high.png'
// import uv_med from '../../assets/levelIndicators/uv_mid.png'
// import uv_low from '../../assets/levelIndicators/uv_low.png'
// import uv_none from '../../assets/levelIndicators/uv_none.png'

// import venti_high from '../../assets/levelIndicators/venti_high.png'
// import venti_med from '../../assets/levelIndicators/venti_mid.png'
// import venti_low from '../../assets/levelIndicators/venti_low.png'
// import venti_none from '../../assets/levelIndicators/venti_none.png'

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Box from '@material-ui/core/Box'
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';




const FilterList = () => {
    const { hospitalsShown,setHospitalsShown,hospitals, resetHospitals, hospitalList, setHospitalList, setFilterSetting, filterSetting, filterLevel, setFilterLevel } = useContext(FeaturesContext);
    const [userInput, setUserInput] = useState("")
    const { goToSelected } = useContext(MapsContext)

   
    const alcoholImageChoose = (currHospital) =>{
      if(currHospital.properties.Supply_Cap["Alcohol"]===0){
        return(<img title={'Alcohol: No data'} className="smallPicture" src={alcohol_none} alt="none"/>)
      }
        else if(currHospital.properties.Supply_Cur["Alcohol"]/currHospital.properties.Supply_Cap["Alcohol"] < 0.2){
        return(<img title={'Alcohol: Critically Low'} className="smallPicture" src={alcohol_low} alt="critically-low"/>)
      } else if((currHospital.properties.Supply_Cur[filterSetting]/currHospital.properties.Supply_Cap[filterSetting] >= 0.20) && (currHospital.properties.Supply_Cur[filterSetting]/currHospital.properties.Supply_Cap[filterSetting] <= 0.5)){
        return(<img title={'Alcohol: Low'} className="smallPicture" src={alcohol_med} alt="low"/>)
      } 
      return(<img title={'Alcohol: Well Supplied'} className="smallPicture" src={alcohol_high} alt="well-supplied"/>)
    }

    const disInfectantImageChoose = (currHospital) =>{
      if(currHospital.properties.Supply_Cap["Disinfectant (Sterilium)"]===0){
        return(<img title={'Disinfectant (Sterilium): No data'} className="smallPicture" src={disinfect_none} alt="none"/>)
      }
        else if(currHospital.properties.Supply_Cur["Disinfectant (Sterilium)"]/currHospital.properties.Supply_Cap["Disinfectant (Sterilium)"] < 0.2){
        return(<img title={'Disinfectant (Sterilium): Critically Low'} className="smallPicture" src={disinfect_low} alt="critically-low"/>)
      } else if((currHospital.properties.Supply_Cur[filterSetting]/currHospital.properties.Supply_Cap[filterSetting] >= 0.20) && (currHospital.properties.Supply_Cur[filterSetting]/currHospital.properties.Supply_Cap[filterSetting] <= 0.5)){
        return(<img title={'Disinfectant (Sterilium): Low'} className="smallPicture" src={disinfect_med} alt="low"/>)
      }
      return(<img title={'Disinfectant (Sterilium): Well Supplied'} className="smallPicture" src={disinfect_high} alt="well-supplied"/>)
    }

    const glovesImageChoose = (currHospital) =>{
      if(currHospital.properties.Supply_Cap["Gloves"]===0){
        return(<img title={'Gloves: No data'} className="smallPicture" src={gloves_none} alt="none"/>)
      }
        else if(currHospital.properties.Supply_Cur["Gloves"]/currHospital.properties.Supply_Cap["Gloves"] < 0.2){
        return(<img title={'Gloves: Critically Low'} className="smallPicture" src={gloves_low} alt="critically-low"/>)
      } else if((currHospital.properties.Supply_Cur[filterSetting]/currHospital.properties.Supply_Cap[filterSetting] >= 0.20) && (currHospital.properties.Supply_Cur[filterSetting]/currHospital.properties.Supply_Cap[filterSetting] <= 0.5)){
        return(<img title={'Gloves: Low'} className="smallPicture" src={gloves_med} alt="low"/>)
      }
      return(<img title={'Gloves: Well Supplied'} className="smallPicture" src={gloves_high} alt="well-supplied"/>)
    }

    const gogglesImageChoose = (currHospital) =>{
      if(currHospital.properties.Supply_Cap["Goggles and face shields"]===0){
        return(<img title={'Goggles and face shields: No data'} className="smallPicture" src={goggles_none} alt="none"/>)
      }
        else if(currHospital.properties.Supply_Cur["Goggles and face shields"]/currHospital.properties.Supply_Cap["Goggles and face shields"] < 0.2){
        return(<img title={'Goggles and face shields: Critically Low'} className="smallPicture" src={goggles_low} alt="critically-low"/>)
      } else if((currHospital.properties.Supply_Cur[filterSetting]/currHospital.properties.Supply_Cap[filterSetting] >= 0.20) && (currHospital.properties.Supply_Cur[filterSetting]/currHospital.properties.Supply_Cap[filterSetting] <= 0.5)){
        return(<img title={'Goggles and face shields: Low'} className="smallPicture" src={goggles_med} alt="low"/>)
      }
      return(<img title={'Goggles and face shields: Well Supplied'} className="smallPicture" src={goggles_high} alt="well-supplied"/>)
    }



    const maskImageChoose = (currHospital) =>{
      
      if(currHospital.properties.Supply_Cap["Surgical Masks"]===0){
        return(<img title={'Surgical Masks: No data'} className="smallPicture" src={mask_none} alt="none"/>)
      }
        else if(currHospital.properties.Supply_Cur["Surgical Masks"]/currHospital.properties.Supply_Cap["Surgical Masks"] < 0.2){
        return(<img title={'Surgical Masks: Critically Low'} className="smallPicture" src={mask_low} alt="critically-low"/>)
      } else if((currHospital.properties.Supply_Cur[filterSetting]/currHospital.properties.Supply_Cap[filterSetting] >= 0.20) && (currHospital.properties.Supply_Cur[filterSetting]/currHospital.properties.Supply_Cap[filterSetting] <= 0.5)){
        return(<img title={'Surgical Masks: Low'} className="smallPicture" src={mask_med} alt="low"/>)
      }
      return(<img title={'Surgical Masks: Well Supplied'} className="smallPicture" src={mask_high} alt="well-supplied"/>)
    }


    const ppeImageChoose = (currHospital) =>{
      if(currHospital.properties.Supply_Cap["PPE"]===0){
        return(<img title={'PPE: No data'} className="smallPicture" src={ppe_none} alt="none"/>)
      }
        else if(currHospital.properties.Supply_Cur["PPE"]/currHospital.properties.Supply_Cap["PPE"] < 0.2){
        return(<img title={'PPE: Critically Low'} className="smallPicture" src={ppe_low} alt="critically-low"/>)
      } else if((currHospital.properties.Supply_Cur[filterSetting]/currHospital.properties.Supply_Cap[filterSetting] >= 0.20) && (currHospital.properties.Supply_Cur[filterSetting]/currHospital.properties.Supply_Cap[filterSetting] <= 0.5)){
        return(<img title={'PPE: Low'} className="smallPicture" src={ppe_med} alt="low"/>)
      }
      return(<img title={'PPE: Well Supplied'} className="smallPicture" src={ppe_high} alt="well-supplied"/>)
    }


    const soapImageChoose = (currHospital) =>{
      if(currHospital.properties.Supply_Cap["Antibacterial Soap"]===0){
        return(<img title={'Antibacterial Soap: No data'} className="smallPicture" src={soap_none} alt="none"/>)
      }
        else if(currHospital.properties.Supply_Cur["Antibacterial Soap"]/currHospital.properties.Supply_Cap["Antibacterial Soap"] < 0.2){
        return(<img title={'Antibacterial Soap: Critically Low'} className="smallPicture" src={soap_low} alt="critically-low"/>)
      } else if((currHospital.properties.Supply_Cur[filterSetting]/currHospital.properties.Supply_Cap[filterSetting] >= 0.20) && (currHospital.properties.Supply_Cur[filterSetting]/currHospital.properties.Supply_Cap[filterSetting] <= 0.5)){
        return(<img title={'Antibacterial Soap: Low'} className="smallPicture" src={soap_med} alt="low"/>)
      }
      return(<img title={'Antibacterial Soap: Well Supplied'} className="smallPicture" src={soap_high} alt="well-supplied"/>)
    }

    const testkitImageChoose = (currHospital) =>{
      if(currHospital.properties.Supply_Cap["Testing Kits"]===0){
        return(<img title={'Testing Kits: No data'} className="smallPicture" src={testkit_none} alt="none"/>)
      }
        else if(currHospital.properties.Supply_Cur["Testing Kits"]/currHospital.properties.Supply_Cap["Testing Kits"] < 0.2){
        return(<img title={'Testing Kits: Critically Low'} className="smallPicture" src={testkit_low} alt="critically-low"/>)
      } else if((currHospital.properties.Supply_Cur[filterSetting]/currHospital.properties.Supply_Cap[filterSetting] >= 0.20) && (currHospital.properties.Supply_Cur[filterSetting]/currHospital.properties.Supply_Cap[filterSetting] <= 0.5)){
        return(<img title={'Testing Kits: Low'} className="smallPicture" src={testkit_med} alt="low"/>)
      }
      return(<img title={'Testing Kits: Well Supplied'} className="smallPicture" src={testkit_high} alt="well-supplied"/>)
    }    

    const tissueImageChoose = (currHospital) =>{
      if(currHospital.properties.Supply_Cap["Tissue"]===0){
        return(<img title={'Tissue: No data'} className="smallPicture" src={tissue_none} alt="none"/>)
      }
        else if(currHospital.properties.Supply_Cur["Tissue"]/currHospital.properties.Supply_Cap["Tissue"] < 0.2){
        return(<img title={'Tissue: Critically Low'} className="smallPicture" src={tissue_low} alt="critically-low"/>)
      } else if((currHospital.properties.Supply_Cur[filterSetting]/currHospital.properties.Supply_Cap[filterSetting] >= 0.20) && (currHospital.properties.Supply_Cur[filterSetting]/currHospital.properties.Supply_Cap[filterSetting] <= 0.5)){
        return(<img title={'Tissue: Low'} className="smallPicture" src={tissue_med} alt="low"/>)
      }
      return(<img title={'Tissue: Well Supplied'} className="smallPicture" src={tissue_high} alt="well-supplied"/>)
    }

    const [selected, setSelected] = useState([]);
    const hospitalsOnList = []
    if(hospitalsShown && hospitalList){
    const start = hospitalsShown[0]
    const end = ((hospitalsShown[1] >= hospitalList.length)? hospitalList.length-1: hospitalsShown[1])
    for (let step = start; step <= end; step++) {
      const hospital = hospitalList[step]
      console.log("hospital")
      const supplies = Object.keys(hospital.properties.Supply_Cur)
      //TODO: MOVE THIS ^
      if(hospital.properties != null){
        hospitalsOnList.push(
          <React.Fragment>
          <div style={{borderLeft: `3px solid maroon`, width:"100%", maxWidth:500, padding:"10px"}}>
            <Grid container>
            <Grid item xs={12}>
              <Typography style={{fontSize:16, fontWeight:500}} noWrap  gutterBottom>{hospital.properties.Name_of_Ho}</Typography>
            </Grid>
            <Grid item xs={10}>
              <Typography style={{fontSize:12, color:"gray"} } noWrap  gutterBottom>{"DOH Level: "}<span style={{color:"red"}}>{hospital.properties["DOH Level"]}</span></Typography>
              <Typography style={{fontSize:12, color:"gray"}} noWrap  gutterBottom>{hospital.properties.Address}</Typography>
              <div>
              {alcoholImageChoose(hospital)}
                  {disInfectantImageChoose(hospital)}
                  {glovesImageChoose(hospital)}
                  {gogglesImageChoose(hospital)}
                  {maskImageChoose(hospital)}
                  {soapImageChoose(hospital)}
                  {ppeImageChoose(hospital)}
                  {testkitImageChoose(hospital)}
                  {tissueImageChoose(hospital)}
              </div>
            </Grid>
            <Grid style={{ paddingTop:"8%"}} alignItems="baseline" item xs={2}>
              <IconButton  size="small"><ArrowForwardIosIcon/></IconButton>
            </Grid>
          
            </Grid>
          </div>
            <Divider light  component="li" />
          </React.Fragment>
        )
      }
    }}
    
    return (
      <div className="filterList" style={{backgroundColor:'#E3E2DF', minHeight:"75vh"}}>
        {hospitalList ? (
          <div>
            {hospitalsOnList} 
          </div>
        ) : (<div className="empty">No results.</div>)}
        
      </div>
    )
}

export default FilterList

