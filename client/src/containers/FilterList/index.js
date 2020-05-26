import React, {useContext} from 'react';
import { FeaturesContext } from '../../contexts/FeaturesContext';
import { MapsContext } from '../../contexts/MapsContext';

import Typography from '@material-ui/core/Typography';


import alcohol_high from '../../assets/levelIndicators/alcohol-green.png'
import alcohol_med from '../../assets/levelIndicators/alcohol-yellow.png'
import alcohol_low from '../../assets/levelIndicators/alcohol-red.png'
import alcohol_none from '../../assets/levelIndicators/alcohol-gray.png'

// import bed_high from '../../assets/levelIndicators/bed-green.png'
// import bed_med from '../../assets/levelIndicators/bed-yellow.png'
// import bed_low from '../../assets/levelIndicators/bed-red.png'
// import bed_none from '../../assets/levelIndicators/bed-gray.png'

import disinfect_high from '../../assets/levelIndicators/disinfectant-green.png'
import disinfect_med from '../../assets/levelIndicators/disinfectant-yellow.png'
import disinfect_low from '../../assets/levelIndicators/disinfectant-red.png'
import disinfect_none from '../../assets/levelIndicators/disinfectant-gray.png'

import food_high from '../../assets/levelIndicators/food-green.png'
import food_med from '../../assets/levelIndicators/food-yellow.png'
import food_low from '../../assets/levelIndicators/food-red.png'
import food_none from '../../assets/levelIndicators/food-gray.png'

import gloves_high from '../../assets/levelIndicators/gloves-green.png'
import gloves_med from '../../assets/levelIndicators/gloves-yellow.png'
import gloves_low from '../../assets/levelIndicators/gloves-red.png'
import gloves_none from '../../assets/levelIndicators/gloves-gray.png'

import goggles_high from '../../assets/levelIndicators/goggles-green.png'
import goggles_med from '../../assets/levelIndicators/goggles-yellow.png'
import goggles_low from '../../assets/levelIndicators/goggles-red.png'
import goggles_none from '../../assets/levelIndicators/goggles-gray.png'

import gown_high from '../../assets/levelIndicators/gown-green.png'
import gown_med from '../../assets/levelIndicators/gown-yellow.png'
import gown_low from '../../assets/levelIndicators/gown-red.png'
import gown_none from '../../assets/levelIndicators/gown-gray.png'

import mask_high from '../../assets/levelIndicators/surgicalmask-green.png'
import mask_med from '../../assets/levelIndicators/surgicalmask-yellow.png'
import mask_low from '../../assets/levelIndicators/surgicalmask-red.png'
import mask_none from '../../assets/levelIndicators/surgicalmask-gray.png'

import n95_high from '../../assets/levelIndicators/n95-green.png'
import n95_med from '../../assets/levelIndicators/n95-yellow.png'
import n95_low from '../../assets/levelIndicators/n95-red.png'
import n95_none from '../../assets/levelIndicators/n95-gray.png'

import ppe_high from '../../assets/levelIndicators/ppe-green.png'
import ppe_med from '../../assets/levelIndicators/ppe-yellow.png'
import ppe_low from '../../assets/levelIndicators/ppe-red.png'
import ppe_none from '../../assets/levelIndicators/ppe-gray.png'


 
// import sanitizer_high from '../../assets/levelIndicators/sanitizer-green.png'
// import sanitizer_med from '../../assets/levelIndicators/sanitizer-yellow.png'
// import sanitizer_low from '../../assets/levelIndicators/sanitizer-red.png'
// import sanitizer_none from '../../assets/levelIndicators/sanitizer-gray.png'

import shoecover_high from '../../assets/levelIndicators/shoecover-green.png'
import shoecover_med from '../../assets/levelIndicators/shoecover-yellow.png'
import shoecover_low from '../../assets/levelIndicators/shoecover-red.png'
import shoecover_none from '../../assets/levelIndicators/shoecover-gray.png'

import soap_high from '../../assets/levelIndicators/soap-green.png'
import soap_med from '../../assets/levelIndicators/soap-yellow.png'
import soap_low from '../../assets/levelIndicators/soap-red.png'
import soap_none from '../../assets/levelIndicators/soap-gray.png'

import testkit_high from '../../assets/levelIndicators/test-kit-green.png'
import testkit_med from '../../assets/levelIndicators/test-kit-yellow.png'
import testkit_low from '../../assets/levelIndicators/test-kit-red.png'
import testkit_none from '../../assets/levelIndicators/test-kit-gray.png'

import tissue_high from '../../assets/levelIndicators/tissue-green.png'
import tissue_med from '../../assets/levelIndicators/tissue-yellow.png'
import tissue_low from '../../assets/levelIndicators/tissue-red.png'
import tissue_none from '../../assets/levelIndicators/tissue-gray.png'

import vitamins_high from '../../assets/levelIndicators/vitamins-green.png'
import vitamins_med from '../../assets/levelIndicators/vitamins-yellow.png'
import vitamins_low from '../../assets/levelIndicators/vitamins-red.png'
import vitamins_none from '../../assets/levelIndicators/vitamins-gray.png'

// import uv_high from '../../assets/levelIndicators/uv-green.png'
// import uv_med from '../../assets/levelIndicators/uv-yellow.png'
// import uv_low from '../../assets/levelIndicators/uv-red.png'
// import uv_none from '../../assets/levelIndicators/uv-gray.png'

// import venti_high from '../../assets/levelIndicators/venti-green.png'
// import venti_med from '../../assets/levelIndicators/venti-yellow.png'
// import venti_low from '../../assets/levelIndicators/venti-red.png'
// import venti_none from '../../assets/levelIndicators/venti-gray.png'

import Box from '@material-ui/core/Box'
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';



const FilterList = () => {
    const {hospitalList, filterSetting, filterLevel,selectedProvince, selectedCity } = useContext(FeaturesContext);
    const { setSelectedHospital,goToSelected } = useContext(MapsContext)

    

    const iconList ={
      "Alcohol_high": alcohol_high,
      "Alcohol_med": alcohol_med,
      "Alcohol_low": alcohol_low,
      "Alcohol_none": alcohol_none,
      "Disinfectant (Sterilium)_high":disinfect_high,
      "Disinfectant (Sterilium)_med":disinfect_med,
      "Disinfectant (Sterilium)_low":disinfect_low,
      "Disinfectant (Sterilium)_none":disinfect_none,
      "Antibacterial Soap_high":soap_high,
      "Antibacterial Soap_med":soap_med,
      "Antibacterial Soap_low":soap_low,
      "Antibacterial Soap_none":soap_none,
      "Surgical Gowns_high":gown_high,
      "Surgical Gowns_med":gown_med,
      "Surgical Gowns_low":gown_low,
      "Surgical Gowns_none":gown_none,
      "Surgical Masks_high": mask_high,
      "Surgical Masks_med": mask_med,
      "Surgical Masks_low": mask_low,
      "Surgical Masks_none": mask_none,
      "N95 Masks_high": n95_high,
      "N95 Masks_med": n95_med,
      "N95 Masks_low": n95_low,
      "N95 Masks_none": n95_none,
      "Gloves_high": gloves_high,
      "Gloves_med": gloves_med,
      "Gloves_low": gloves_low,
      "Gloves_none": gloves_none,
      "Shoe covers_high": shoecover_high,
      "Shoe covers_med": shoecover_med,
      "Shoe covers_low": shoecover_low,
      "Shoe covers_none": shoecover_none,
      "PPE_high": ppe_high,
      "PPE_med": ppe_med,
      "PPE_low": ppe_low,
      "PPE_none": ppe_none,
      "Goggles and face shields_high": goggles_high,
      "Goggles and face shields_med": goggles_med,
      "Goggles and face shields_low": goggles_low,
      "Goggles and face shields_none": goggles_none,
      "Testing Kits_high": testkit_high,
      "Testing Kits_med": testkit_med,
      "Testing Kits_low": testkit_low,
      "Testing Kits_none": testkit_none,
      "Tissue_high": tissue_high,
      "Tissue_med": tissue_med,
      "Tissue_low": tissue_low,
      "Tissue_none": tissue_none,
      "Vitamins_high": vitamins_high,
      "Vitamins_med": vitamins_med,
      "Vitamins_low": vitamins_low,
      "Vitamins_none": vitamins_none,
      "Food (Meals)_high": food_high,
      "Food (Meals)_med": food_med,
      "Food (Meals)_low": food_low,
      "Food (Meals)_none": food_none
    }
   
    const imageChooser = (currHospital,supply) =>{
     
      
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
    
    return (
      <div className="filterList" style={{backgroundColor:'#E3E2DF', minHeight:"75vh"}}>
        {hospitalList ? (
          <div>
            {
        hospitalList
        .filter((hospital)=> {
          if (filterSetting === '' || filterLevel=== ''){
            return(hospital.properties.Province.includes(selectedProvince) && hospital.properties['City/Municipality'].includes(selectedCity))
          } else{
            return(hospital.properties.SupplyStatus[filterSetting] === filterLevel && hospital.properties.Province.includes(selectedProvince) && hospital.properties['City/Municipality'].includes(selectedCity))
          }
           
        })
        .map((hospital)=>{
          return(<React.Fragment>
          <div style={{width:"100%", maxWidth:500, padding:"15px", whiteSpace: 'nowrap'}}>
            <Grid container>
            <Grid item xs={12}>
              <Typography>
                <Box         
                  component="div"
                  my={0}
                  textOverflow="ellipsis"
                  overflow="hidden"
                  fontWeight={600} 
                  fontSize={20}   
                  gutterBottom>{hospital.properties.Name_of_Ho}</Box>
              </Typography>
            </Grid>
            <Grid item xs={10}>
              <Typography style={{fontSize:12, color:"gray"} } noWrap  gutterBottom>{"DOH Level: "}<span style={{color:"red"}}>{hospital.properties["DOH Level"]}</span></Typography>
              <Typography style={{fontSize:12, color:"gray"}} noWrap  gutterBottom>{hospital.properties.Address}</Typography>
              <Typography style={{fontSize:12, color:"gray"}} noWrap  gutterBottom>Last Update: {hospital.properties["Last Update"]}</Typography>
              {
                filterSetting === '' ? (<React.Fragment>
                  <div>
                  {imageChooser(hospital,"Alcohol")}
                  {imageChooser(hospital,"Disinfectant (Sterilium)")}
                  {imageChooser(hospital,"Antibacterial Soap")}
                  {imageChooser(hospital,"Surgical Gowns")} 
                  {imageChooser(hospital,"Surgical Masks")} 
                  {imageChooser(hospital,"N95 Masks")} 
                  {imageChooser(hospital,"Gloves")} 
                </div>
                <div>
                  {imageChooser(hospital,"Shoe covers")} 
                  {imageChooser(hospital,"PPE")} 
                  {imageChooser(hospital,"Goggles and face shields")} 
                  {imageChooser(hospital,"Testing Kits")}
                  {imageChooser(hospital,"Tissue")}
                  {imageChooser(hospital,"Vitamins")}
                  {imageChooser(hospital,"Food (Meals)")}
                </div></React.Fragment>):(
                  <Grid container width>
                    <Grid item xs={6}>{imageChooser(hospital,filterSetting)}</Grid>

                  </Grid>
                  
                  )
              }
              
              
            </Grid>
            <Grid style={{ paddingTop:"8%"}} alignItems="baseline" item xs={2}>
              <IconButton onClick={(e)=>{
                            setSelectedHospital(hospital);
                            goToSelected(hospital);
                        }}  size="small"><ArrowForwardIosIcon/></IconButton>
            </Grid>
          
            </Grid>
          </div>
            <Divider light  component="li" />
          </React.Fragment>)
          
        }
          
        )
      } 
          </div>
        ) : (<div className="empty" style={{textAlign:"center"}}>No results.</div>)}
        
      </div>
    )
}

export default FilterList

