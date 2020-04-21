import React, {useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { FeaturesContext } from '../../contexts/FeaturesContext';
import SortIcon from '@material-ui/icons/Sort';


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
  return (
    <div>
      <Button variant="contained" onClick={handleClickOpen} startIcon={<SortIcon/>} color="primary" > Sort</Button>
      <Dialog disableBackdropClick disableEscapeKeyDown open={open} onClose={handleClose}>
        <DialogTitle>Fill the form <Button variant="contained" color="primary" onClick={resetHospitals} style={{marginLeft:"5px"}}>Reset</Button> </DialogTitle>
        
        <DialogContent>
          <form className={classes.container}>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="demo-dialog-native">Supply</InputLabel>
              <Select
                native
                value={filterSetting}
                onChange={(e)=>{setFilterSetting(e.target.value)}}
                input={<Input id="demo-dialog-native" />}
              >
                <option aria-label="None" value="" />
                <option value={"Alcohol"}>Alcohol</option>
                <option value={"Strerilium/Disinfectant"}>Strerilium/Disinfectant</option>
                <option value={"Antibacterial Soap"}>Antibacterial Soap</option>
                <option value={"Sanitizing agents"}>Sanitizing agents</option>
                <option value={"Masks/respirators"}>Masks/respirators</option>
                <option value={"Hepa filter and UV light radiation"}>Hepa filter and UV light radiation</option>
                <option value={"Gloves (disposable)/ Foot socks"}>Gloves (disposable)/ Foot socks</option>
                <option value={"Bedside patient equipments"}>Bedside patient equipments</option>
                <option value={"Testing Kits"}>Testing Kits</option>
                <option value={"Ventilators"}>Ventilators</option>
                <option value={"Tissue"}>Tissue</option>
              </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
              <InputLabel id="demo-dialog-select-label">Supply Level</InputLabel>
              <Select
                labelId="demo-dialog-select-label"
                id="demo-dialog-select"
                value={filterLevel}
                onChange={(e)=>{setFilterLevel(e.target.value)}}
                input={<Input />}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={"Well stocked"}>Well stocked</MenuItem>
                <MenuItem value={"Low"}>Low</MenuItem>
                <MenuItem value={"Critically Low"}>Critically Low</MenuItem>
              </Select>
            </FormControl>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={(e)=>{
            setCurrentPage(1)
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
