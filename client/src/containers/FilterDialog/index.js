import React, {useContext, useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import { FeaturesContext } from '../../contexts/FeaturesContext';
import FilterListIcon from '@material-ui/icons/FilterList';
import FilterInput from './FilterInput';
import Autocomplete from '@material-ui/lab/Autocomplete';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },  
}));

export default function FilterDialog() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [alertOpen, setAlertOpen] = React.useState(false);



  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAlertOpen = () => {
    setAlertOpen(true);
  };

  const handleAlertClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setAlertOpen(false);
  };

  const generateCitiesList = (province) =>{
    var initialList = hospitals.filter((hospital)=>{return("City/Municipality" in hospital.properties)})
    initialList = initialList.filter(hospital => hospital.properties.Province === province)
    const cities = initialList.map((hospital)=>{return(hospital.properties["City/Municipality"])})
    const uniqueCities = Array.from(new Set(cities))
    setCitiesList(uniqueCities) 
  }

  
  const { 
    selectedProvince,setSelectedProvince,hospitals, hospitalList, setFilterSetting, 
    selectedCity,setSelectedCity, filterSetting, filterLevel, setFilterLevel } = useContext(FeaturesContext);
 
  const supplyChoices=["Alcohol",
                      "Disinfectant (Sterilium)",
                      "Antibacterial Soap",
                      "Surgical Gowns",
                      "Surgical Masks",
                      "N95 Masks",
                      "Gloves",
                      "Shoe covers",
                      "PPE",
                      "Goggles and face shields",
                      "Testing Kits",
                      "Tissue",
                      "Vitamins",
                      "Food (Meals)"]
 
  const supplyLevelChoices=["Well stocked","Low", "Critically Low","No Data"]


  const [provincesList, setProvincesList] = useState(null);
  const [citiesList, setCitiesList] = useState(null);

  useEffect(()=>{
    if(hospitalList){
      const initialList = hospitals.filter((hospital)=>{
        //this makes sure the website will still work even when the "Province" field is missing
        return("Province" in hospital.properties)
    })
      const provinces = initialList.map((hospital)=>{
          return(hospital.properties.Province)
      })
      const uniqueProvinces = Array.from(new Set(provinces))
      
      setProvincesList(uniqueProvinces)
 
    }
  }, hospitalList)
  

  return (
    <div>
      <Button variant="contained" onClick={handleClickOpen} startIcon={<FilterListIcon/>} color="primary" > Filter</Button>
      <Dialog fullWidth disableBackdropClick disableEscapeKeyDown open={open} onClose={handleClose}>
        <DialogTitle><Button variant="contained" color="primary" 
          onClick={()=>{
            setFilterSetting('')
            setFilterLevel('')
            setSelectedProvince('')

          }} 
          style={{marginLeft:"5px"}}>Reset</Button> </DialogTitle>
        
        <DialogContent>
          <FilterInput 
          label="Supply" 
          onChange={setFilterSetting} 
          choices={supplyChoices}
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
                //setHospitalList(hospitals.filter((hospital)=>{return hospital.properties.Province == value}))
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
