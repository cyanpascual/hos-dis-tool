import React, {useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { FeaturesContext } from '../../../contexts/FeaturesContext';
import FilterListIcon from '@material-ui/icons/FilterList';
import IconButton from '@material-ui/core/IconButton';
import FilterInput from './filterInput';
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
  
  const { setCurrentPage,hospitalsShown,setHospitalsShown,hospitals, resetHospitals, hospitalList, setHospitalList, setFilterSetting, filterSetting, filterLevel, setFilterLevel } = useContext(FeaturesContext);
 
  const supplyChoices=["Alcohol","Strerilium/Disinfectant","Antibacterial Soap","Sanitizing agents","Masks/respirators","Hepa filter and UV light radiation","Gloves (disposable)/ Foot socks","Bedside patient equipments","Testing Kits","Ventilators","Tissue"]
 
  const supplyLevelChoices=["Well stocked","Low", "Critically Low"]

  
  return (
    <Grid container direction="column" justify="center" alignItems="center" spacing={1}>
      <Grid container item direction="row" justify="center" alignItems="center" spacing={1}>
        <Grid item xs={6}>
          <FilterInput label="Supply" onChange={setFilterSetting} choices={supplyChoices} value={filterSetting}/>
        </Grid>
        <Grid item xs={6}>
          <FilterInput label="Supply Level" onChange={setFilterLevel} choices={supplyLevelChoices} value={filterLevel}/>
        </Grid>
      </Grid>
      <Grid container item direction="row" justify="center" alignItems="center" spacing={1}>
        <Grid item xs={4}>
          <Button onClick={(e)=>{switch(filterLevel){
            case "Critically Low":
              setHospitalList(hospitals.filter((hospital) => hospital.properties.Supply_Cur[filterSetting]/hospital.properties.Supply_Cap[filterSetting] < 0.2));
              break
            case "Low":
              setHospitalList(hospitals.filter((hospital)=> ((hospital.properties.Supply_Cur[filterSetting]/hospital.properties.Supply_Cap[filterSetting] >= 0.20) && (hospital.properties.Supply_Cur[filterSetting]/hospital.properties.Supply_Cap[filterSetting] <= 0.5))))
              break      
            case "Well stocked":
              setHospitalList(hospitals.filter((hospital)=> hospital.properties.Supply_Cur[filterSetting]/hospital.properties.Supply_Cap[filterSetting] > 0.5));
          }}} color="secondary">Set</Button>
        </Grid>
        <Grid item xs={4}>
          <Button onClick={resetHospitals} color="primary">Reset</Button>
        </Grid>
      </Grid>
    </Grid>
  );
}
