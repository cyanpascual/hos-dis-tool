import React, {useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import {IconButton} from '@material-ui/core';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { FeaturesContext } from '../../contexts/FeaturesContext';
import SortIcon from '@material-ui/icons/Sort';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';


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

export default function SortDialog() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const {sortOrder, setSortOrder,sortSetting, setSortSetting,compareValues,desktop, setCurrentPage,hospitalsShown,setHospitalsShown,hospitals, resetHospitals, hospitalList, setHospitalList, setFilterSetting, filterSetting, filterLevel, setFilterLevel } = useContext(FeaturesContext);
  
  const handleSortOrderChange = (event) => {
    setSortOrder(event.target.value);
  };

  const handleSortSettingChange = (event) => {
    setSortSetting(event.target.value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  
  
  return (
    <div>
     
      {desktop ? (<Button variant="outlined" fullWidth  onClick={handleClickOpen}  startIcon={<SortIcon/>} color="secondary" style={{height:"39px", opacity:0.6, fontSize:"0.9rem"}}>{"Filter"} </Button>):(
        <IconButton variant="outlined" onClick={handleClickOpen}><SortIcon/></IconButton>
      )}
      
      <Dialog disableBackdropClick disableEscapeKeyDown open={open} onClose={handleClose}>
        <DialogContent>
          <FormControl component="fieldset">
            <FormLabel component="legend">Sort by...</FormLabel>
            <RadioGroup aria-label="Sort hospitals by " name="sortSetting"  value={sortSetting} onChange={handleSortSettingChange}>
              <FormControlLabel value="cfname" control={<Radio color="primary"/>} label="Alphabetical" />
              <FormControlLabel value="Capacity" control={<Radio color="primary"/>} label="Capacity" />
              <FormControlLabel value="DOH Level" control={<Radio color="primary"/>} label="Level" />
            </RadioGroup>
          </FormControl>
          <FormControl component="fieldset">
            <FormLabel component="legend">Sort Order...</FormLabel>
            <RadioGroup aria-label="Sort Order"  value={sortOrder} onChange={handleSortOrderChange}>
              <FormControlLabel value="Ascending" control={<Radio color="primary"/>} label="Ascending" />
              <FormControlLabel value="Descending" control={<Radio color="primary"/>} label="Descending"/>
            </RadioGroup>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={(e)=>{
            const newArray = Array.from(hospitalList.sort(compareValues(sortSetting,sortOrder)),x=>x)
            //this is done because of how react hooks works. It won't update if its the same object array but rearranged.
            setHospitalList(newArray);
            handleClose()
          }
          
          } color="primary">
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
