import React, {useContext} from 'react';
import { FeaturesContext } from '../../contexts/FeaturesContext';
import { MapsContext } from '../../contexts/MapsContext';

import { 
  Typography,
  Box,
  Divider,
  Grid,
  IconButton,
  Chip
} from '@material-ui/core/'

import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  chipContainer:{
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap'
  },
  chip:{
    margin: "3px"
  }

}

const FilterList = (props) => {
    const {classes } = props;
    const {hospitalList, filterSetting, filterLevel,selectedProvince, selectedCity,supplyList } = useContext(FeaturesContext);
    const { setSelectedHospital,goToSelected } = useContext(MapsContext)
    const supplyLabelMap = {
      "alcohol": 'Alcohol',
      "disinfectant": "Disinfectant",
      "soap": "Soap",
      "gown": "Gown",
      "surgmask": "Surgical mask",
      "n95mask": "N95 mask",
      "gloves": "Glover",
      "shoe_cover": "Shoe cover",
      "coverall": "Coverall",
      "goggles": "Goggles",
      "face_shield": "Face shield",
      "head_cover": "Head cover",
      "tissue": "Tissue",
      "vitamins": "Vitamins"
    }
    

   
    const imageChooser = (currHospital,supply) =>{
      if(currHospital.properties.supply_status==='No Data'){
        return(<Chip className={classes.chip} size="small" label={supplyLabelMap[supply]} />)
      }
        else if(currHospital.properties.supply_status==="Critically Low"){
          return(<Chip className={classes.chip} size="small" label={supplyLabelMap[supply]}/>)
      } else if(currHospital.properties.supply_status==="Low"){
        return(<Chip className={classes.chip} size="small" label={supplyLabelMap[supply]}/>)
      } 
      return(<Chip className={classes.chip} size="small" label={supplyLabelMap[supply]}/>)
    }
    
    return (
      <div className="filterList" style={{backgroundColor:'#E3E2DF', minHeight:"75vh"}}>
        {hospitalList ? (
          <div>
            {
        hospitalList
        .filter((hospital)=> {
          if (filterSetting === '' || filterLevel=== ''){
            return(hospital.properties.prov.includes(selectedProvince) && hospital.properties.city.includes(selectedCity))
          } else{
            return(hospital.properties.supply_status[filterSetting] === filterLevel && hospital.properties.prov.includes(selectedProvince) && hospital.properties.city.includes(selectedCity))
          }
           
        })
        .map((hospital)=>{
          return(<React.Fragment>
          <div style={{width:"100%", maxWidth:500, padding:"15px", whiteSpace: 'nowrap'}}>
            <Grid container>
            <Grid item xs={12}>
              {/* HOSPiTAL NAME */}
              <Typography>
                <Box         
                  component="div"
                  my={0}
                  textOverflow="ellipsis"
                  overflow="hidden"
                  fontWeight={600} 
                  fontSize={20}   
                  gutterBottom>{hospital.properties.cfname}
                  </Box>
              </Typography>
            </Grid>
            <Grid item xs={10}>
              {/* DOH level, Address & Last Update */}
              <Typography style={{fontSize:12, color:"gray"} } noWrap  gutterBottom>{"DOH Level: "}<span style={{color:"red"}}>{hospital.properties.doh_level}</span></Typography>
              <Typography style={{fontSize:12, color:"gray"}} noWrap  gutterBottom>{hospital.properties.address}</Typography>
              <Typography style={{fontSize:12, color:"gray"}} noWrap  gutterBottom>Last Update: {hospital.properties.reportdate.slice(-22)}</Typography>
              {
                filterSetting === '' ? (<React.Fragment>
                <div className={classes.chipContainer}> 
                  {supplyList.map((supply)=>imageChooser(hospital,supply))}
                </div>
                </React.Fragment>):(
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


export default withStyles(styles)(FilterList);

