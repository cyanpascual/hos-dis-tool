import React, {useContext} from 'react';
import { FeaturesContext } from '../../contexts/FeaturesContext';
import { MapsContext } from '../../contexts/MapsContext';

import { 
  Typography,
  Box,
  Divider,
  Grid,
  IconButton,
  Chip,
  Card
} from '@material-ui/core/'

import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  chipContainer:{
    display: 'flex',
    justifyContent: 'left',
    flexWrap: 'wrap',
    overflow:'auto',
    height:"60px"
  },
  chip:{
    margin: "3px",
    color: 'white',
    backgroundColor: "#9b2b2b"
  },
  title:{
    width: "100%",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis"
  },
  root:{
    overflow: "auto",
    height:"86vh",
    maxwidth:"190px",
    paddingRight:"15px",
  },
  rootMobile:{
    overflow: "auto",
    height:"39vh",
    maxwidth:"190px",
    paddingRight:"15px",
  },
  listItem:{
    padding:"15px 0px  15px 40px"
  }

}

const FilterList = (props) => {
    const {classes } = props;
    const {hospitalList, filterSetting, filterLevel,selectedProvince, selectedCity,supplyList,desktop,justTestCenters } = useContext(FeaturesContext);
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
      if(currHospital.properties.supply_status[supply]==='No Data'){
        return(<Chip  className={classes.chip} style={{opacity:0.2, fontWeight:200}} size="small" label={supplyLabelMap[supply]}/>)

      }
        else if(currHospital.properties.supply_status[supply]==="Critically Low"){
          return(<Chip  className={classes.chip} style={{opacity:1,fontWeight:500}} size="small" label={supplyLabelMap[supply]} />)
      } else if(currHospital.properties.supply_status[supply]==="Low"){
        return(<Chip className={classes.chip} style={{opacity:0.6, fontWeight:200 }} size="small" label={supplyLabelMap[supply]} />)
      } 
      return(<Chip  className={classes.chip} style={{opacity:0.2, fontWeight:200}} size="small" label={supplyLabelMap[supply]} />)
    }
    return (
      <div >
        {hospitalList ? (
          <div className={`${desktop ? (classes.root):(classes.rootMobile)} `}>
            {
        hospitalList
        .filter((hospital)=>{
          if(justTestCenters){
              return(hospital.test_center === true)
          }
          else{
              return(hospital)
          }
      })
        .filter((hospital)=> {
          if (filterLevel=== 'All'){
            return(hospital.properties.prov.includes(selectedProvince) && hospital.properties.city.includes(selectedCity))
          } else{
            return(hospital.properties.supply_status[filterSetting] === filterLevel && hospital.properties.prov.includes(selectedProvince) && hospital.properties.city.includes(selectedCity))
          }
        })
        .map((hospital)=>{
          return(<Card style={{margin: "10px 0"}}>
            <Grid container className={classes.listItem}>

            <Grid item xs={9}>
              {/* HOSPiTAL NAME */}
              
                <Box         
                  component="div"
                  fontWeight={500} 
                  fontSize={16}    
                  gutterBottom
                  className={classes.title}>
                    {hospital.properties.cfname}
                  
                  </Box>
           
            </Grid>
            <Grid alignItems="baseline" item xs={2} style={{textAlign:"right"}}>
              <IconButton onClick={(e)=>{
                            setSelectedHospital(hospital);
                            goToSelected(hospital);
                        }}  size="small"><ArrowForwardIosIcon/></IconButton>
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

          
            </Grid>
        
            <Divider light />
          </Card>)
          
        }
          
        )
      } 
          </div>
        ) : (<div className="empty" style={{textAlign:"center"}}>No results.</div>)}
        
      </div>
    )
}


export default withStyles(styles)(FilterList);

