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


  
  const { setHospitals, compareValues, sortOrder, setSortOrder,sortSetting, setSortSetting,selectedProvince,setSelectedProvince, setCurrentPage,hospitalsShown,setHospitalsShown,hospitals, resetHospitals, hospitalList, setHospitalList, setFilterSetting, filterSetting, filterLevel, setFilterLevel } = useContext(FeaturesContext);
 
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
      <Dialog disableBackdropClick disableEscapeKeyDown open={open} onClose={handleClose}>
        <DialogTitle><Button variant="contained" color="primary" 
          onClick={()=>{
          resetHospitals()

          }} 
          style={{marginLeft:"5px"}}>Reset</Button> </DialogTitle>
        
        <DialogContent>
          <FilterInput 
          label="Supply" 
          onChange={setFilterSetting} 
          choices={supplyChoices}
          value={filterSetting}
          />

          <FilterInput 
          label="Supply Level" 
          onChange={setFilterLevel} 
          choices={supplyLevelChoices}
          value={filterLevel}
          />

          <Autocomplete
            onInputChange={(obj,value)=>{
                setSelectedProvince(value)
                //setHospitalList(hospitals.filter((hospital)=>{return hospital.properties.Province == value}))
            }}
            options={provincesList}
            getOptionLabel={(option) => option}
            size="small"
            style={{margin:10}}
            value={selectedProvince}
            renderInput={(params) => <TextField value={selectedProvince} {...params} label="Filter by province"  />}
            />
         
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>{
            handleClose() 
            }} color="primary">
            Cancel
          </Button>
          <Button onClick={(e)=>{
            var tempHospitalList = Array.from(hospitals);
            if((filterLevel === '' && filterSetting !== '') || (filterLevel !== '' && filterSetting === '')){
              setAlertOpen(true)
            }
            else{
              
  

              switch(filterLevel){
                case "No Data":
                    tempHospitalList = (hospitals.filter((hospital) => hospital.properties.Supply_Cap[filterSetting] === 0));
                    break
                case "Critically Low":
                    tempHospitalList = (hospitals.filter((hospital) => hospital.properties.Supply_Cur[filterSetting]/hospital.properties.Supply_Cap[filterSetting] < 0.2));
                    break
                case "Low":
                    tempHospitalList = (hospitals.filter((hospital)=> ((hospital.properties.Supply_Cur[filterSetting]/hospital.properties.Supply_Cap[filterSetting] >= 0.20) && (hospital.properties.Supply_Cur[filterSetting]/hospital.properties.Supply_Cap[filterSetting] <= 0.5))))
                    break
                    
                case "Well stocked":
                    tempHospitalList = (hospitals.filter((hospital)=> hospital.properties.Supply_Cur[filterSetting]/hospital.properties.Supply_Cap[filterSetting] > 0.5));
            }
            if(selectedProvince!==''){
                tempHospitalList = (tempHospitalList.filter((hospital)=>{return hospital.properties.Province == selectedProvince}))
            }
              setHospitalList(tempHospitalList)
              handleClose()
            }

          }
          
          } color="primary">
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
