import React, {useContext, useEffect, useState} from 'react';

import Button from '@material-ui/core/Button';
import Checkbox   from '@material-ui/core/Checkbox';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box'
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import { FeaturesContext } from '../../contexts/FeaturesContext';
import FilterListIcon from '@material-ui/icons/FilterList';
import FilterInput from './FilterInput';
import Autocomplete from '@material-ui/lab/Autocomplete';

import { useRowFlexStyles } from '@mui-treasury/styles/flex/row';

export default function FilterDialog() {
  const [open, setOpen] = React.useState(false);
  const [alertOpen, setAlertOpen] = React.useState(false);

  const flexStyles = useRowFlexStyles();

  const handleClickOpen = () => {
    console.log("checkTHIS")
    console.log(citiesList)
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };



  const handleAlertClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setAlertOpen(false);
  };

  const generateCitiesList = (province) =>{
    var initialList = hospitals.filter((hospital)=>{return("city" in hospital.properties)})
    initialList = initialList.filter(hospital => hospital.properties.prov === province)
    const cities = initialList.map((hospital)=>{return(hospital.properties.city)})
    const uniqueCities = Array.from(new Set(cities))

    setCitiesList(uniqueCities) 
  }

  
  const { 
    selectedProvince,setSelectedProvince,hospitals, hospitalList, setFilterSetting,provincesList, setProvincesList,citiesList, setCitiesList,
    selectedCity,setSelectedCity, filterSetting, filterLevel, setFilterLevel, supplyList,  desktop,justTestCenters, setJustTestCenters, supplyLabels } = useContext(FeaturesContext);
    
 

 
  const supplyLevelChoices=["Well stocked","Low", "Critically Low","All"]



  
  const handleTestCenterToggle= () =>{
    setJustTestCenters(!justTestCenters)
  }
  useEffect(()=>{
    if(hospitalList){
      const initialList = hospitals.filter((hospital)=>{
        //this makes sure the website will still work even when the "Province" field is missing
        return("prov" in hospital.properties)
    })
      const provinces = initialList.map((hospital)=>{

          return(hospital.properties.prov)
      })
   
      const uniqueProvinces = Array.from(new Set(provinces))
      
      setProvincesList(uniqueProvinces)
 
    }
  }, hospitalList)

  return (
    <div style={{marginLeft:"10px",marginTop:"15px"}}>
      <Button size="small" fullWidth variant="contained" onClick={handleClickOpen} style={{height:"39px"}}   color="primary" >{"Filter"} </Button>
       
 
      
      
      <Dialog fullWidth disableBackdropClick disableEscapeKeyDown open={open} onClose={handleClose}>
        <DialogTitle >
        <Box className={flexStyles.parent}>
        <Button variant="contained" color="primary" 
          onClick={()=>{
            setFilterSetting("coverall")
            setFilterLevel('All')
            setSelectedProvince('')
            setJustTestCenters(false)

          }} 
          style={{marginLeft:"5px", marginRight:"5px"}}>Reset</Button> 
          <Box
            className={flexStyles.rightChild}
            style={{fontSize:"0.9rem"}}
            >
                Show only test centers
          <Checkbox
            checked={justTestCenters}
            onChange={handleTestCenterToggle}
            inputProps={{ 'aria-label': 'Show only text centers?' }}
            style={{marginLeft:5}}
          />
        </Box>
        </Box>
        </DialogTitle>
        <DialogContent>
          <FilterInput 
          label="Supply" 
          onChange={setFilterSetting} 
          choices={supplyList}
          value={filterSetting}
          />

          {filterSetting !== '' ?
          (<FilterInput 
            label="Supply Level" 
            onChange={setFilterLevel} 
            choices={supplyLevelChoices}
            value={filterLevel}
            />):(null)
          }



          <Autocomplete
            onInputChange={(obj,value)=>{
                setSelectedProvince(value)
                generateCitiesList(value)
                setSelectedCity('')
              }}
            options={provincesList}
            getOptionLabel={(option) => option}
            size="small"
            style={{margin:10}}
            value={selectedProvince}
            renderInput={(params) => <TextField value={selectedProvince} {...params} label="Filter by province"  />}
            />

          {selectedProvince !== '' ? 
          (<Autocomplete
            onInputChange={(obj,value)=>{
                setSelectedCity(value)
                //setHospitalList(hospitals.filter((hospital)=>{return hospital.properties.prov == value}))
            }}
            options={citiesList}
            getOptionLabel={(option) => option}
            size="small"
            style={{margin:10}}
            value={selectedCity}
            renderInput={(params) => <TextField  autoComplete='off' value={selectedCity} {...params} label="Filter by City/Municipality"  />}
            />):(null)}
          
         
        </DialogContent>
        <DialogActions>

          <Button
          onClick={handleClose} 
          color="primary">
            Ok
          </Button>
        </DialogActions>
        <Snackbar open={alertOpen} autoHideDuration={6000} onClose={handleAlertClose}>
        <Alert onClose={handleAlertClose} severity="error">
          Either both the supply level filter and supply filter are filled or neither is.
        </Alert>
      </Snackbar>
      </Dialog>

      
    </div>
  );
}
