import React, {useContext, useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { FeaturesContext } from '../../contexts/FeaturesContext';
import FilterListIcon from '@material-ui/icons/FilterList';
import IconButton from '@material-ui/core/IconButton';
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
  const [age, setAge] = React.useState('');

  const handleFilterChange = (event) => {
    setAge(Number(event.target.value) || '');
  };

  const handleChange = (event) => {
    setAge(Number(event.target.value) || '');
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  
  const { selectedProvince,setSelectedProvince, setCurrentPage,hospitalsShown,setHospitalsShown,hospitals, resetHospitals, hospitalList, setHospitalList, setFilterSetting, filterSetting, filterLevel, setFilterLevel } = useContext(FeaturesContext);
 
  const supplyChoices=["Alcohol","Strerilium/Disinfectant","Antibacterial Soap","Sanitizing agents","Masks/respirators","Hepa filter and UV light radiation","Gloves (disposable)/ Foot socks","Bedside patient equipments","Testing Kits","Ventilators","Tissue"]
 
  const supplyLevelChoices=["Well stocked","Low", "Critically Low"]


  const [provincesList, setProvincesList] = useState(null);

  useEffect(()=>{
    if(hospitalList){
      const provinces = hospitalList.map((hospital)=>{return(hospital.properties.Province)})
      const uniqueProvinces = Array.from(new Set(provinces)) 
      setProvincesList(uniqueProvinces)
    }
  }, hospitalList)
  
  return (
    <div>
      <Button variant="contained" onClick={handleClickOpen} startIcon={<FilterListIcon/>} color="primary" > Filter</Button>
      <Dialog disableBackdropClick disableEscapeKeyDown open={open} onClose={handleClose}>
        <DialogTitle><Button variant="contained" color="primary" onClick={resetHospitals} style={{marginLeft:"5px"}}>Reset</Button> </DialogTitle>
        
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
                setHospitalList(hospitalList.filter((hospital)=>{return hospital.properties.Province == value}))
            }}
            options={provincesList}
            getOptionLabel={(option) => option}
            size="small"
            style={{margin:10}}
            value={selectedProvince}
            renderInput={(params) => <TextField {...params} label="Filter by province"  />}
            />
         
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={(e)=>{
            switch(filterLevel){
              case "Critically Low":
                  setHospitalList(hospitals.filter((hospital) => hospital.properties.Supply_Cur[filterSetting]/hospital.properties.Supply_Cap[filterSetting] < 0.2));
                  break
              case "Low":
                  setHospitalList(hospitals.filter((hospital)=> ((hospital.properties.Supply_Cur[filterSetting]/hospital.properties.Supply_Cap[filterSetting] >= 0.20) && (hospital.properties.Supply_Cur[filterSetting]/hospital.properties.Supply_Cap[filterSetting] <= 0.5))))
                  break
                  
              case "Well stocked":
                  setHospitalList(hospitals.filter((hospital)=> hospital.properties.Supply_Cur[filterSetting]/hospital.properties.Supply_Cap[filterSetting] > 0.5));
          }handleClose()
          }
          
          } color="primary">
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
