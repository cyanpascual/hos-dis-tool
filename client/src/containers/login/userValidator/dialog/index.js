import React, {useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { FeaturesContext } from '../../../../contexts/FeaturesContext';
import FilterListIcon from '@material-ui/icons/FilterList';
import IconButton from '@material-ui/core/IconButton';
import FilterInput from './filterInput';
import * as Regions from './regions/regions.json'

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
  const [region, setRegion] = React.useState('');
  const [province, setProvince] = React.useState('');

  const { hospitals, resetHospitals, hospitalList, setHospitalList, setSearchTerm } = useContext(FeaturesContext);

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
  
  const resetSettings = () =>{
    setHospitalList(hospitals)
    setRegion('')
    setProvince('')
    setSearchTerm('');
  }

  const liveFilterRegion = (region) => {
    setRegion(region)
    setHospitalList( region ?
      hospitals.filter(hospital =>
        hospital.properties.Region.toLowerCase().indexOf(region.toLowerCase()) > -1,
      ): hospitals
    )
  }

  const liveFilterProvince = (province) => {
    setProvince(province)
    if (region === "NCR"){
      setHospitalList( province ?
        hospitals.filter(hospital =>
        hospital.properties["City/Municipality"].toLowerCase().indexOf(province.toLowerCase()) > -1,
        ) : hospitals
      )
    } else {
      setHospitalList( province ?
        hospitals.filter(hospital =>
        hospital.properties.Province.toLowerCase().indexOf(province.toLowerCase()) > -1,
        ) : hospitals
      )
    }
  }
  const filterRegion = () => {
    if (province){
      if (region === "NCR"){
        setHospitalList(hospitals.filter(hospital =>
          hospital.properties["City/Municipality"].toLowerCase().indexOf(province.toLowerCase()) > -1,
          )
        )
      } else {
        setHospitalList(hospitals.filter(hospital =>
          hospital.properties.Province.toLowerCase().indexOf(province.toLowerCase()) > -1,
          )
        )
      }
    } else {
      setHospitalList(hospitals.filter(hospital =>
          hospital.properties.Region.toLowerCase().indexOf(region.toLowerCase()) > -1,
        )
      )
    }
  }
 
  const supplyChoices=["Alcohol","Strerilium/Disinfectant","Antibacterial Soap","Sanitizing agents","Masks/respirators","Hepa filter and UV light radiation","Gloves (disposable)/ Foot socks","Bedside patient equipments","Testing Kits","Ventilators","Tissue"]
 
  const supplyLevelChoices=["Well stocked","Low", "Critically Low"]

  const regionList=["NCR", "CAR", "ARMM", "Region 1", "Region 2", "Region 3", "Region 4-A", "Region 4-B", "Region 5", "Region 6", "Region 7", "Region 8", "Region 9", "Region 10", "Region 11", "Region 12", "Region 13", ]
  
  return (
    <Grid container direction="column" justify="center" alignItems="center" spacing={1}>
      <Grid container item direction="row" justify="center" alignItems="center" spacing={1}>
        <Grid item xs={4}>
          <FilterInput label="Region" onChange={liveFilterRegion} choices={regionList} value={region}/>
        </Grid>
        <Grid item xs={5}>
          <FilterInput label="City/Province" onChange={liveFilterProvince} choices={Regions.features[region]} value={province}/>
        </Grid>
        <Grid item xs={3}>
          <Button size="small" onClick={resetSettings} color="primary">Reset</Button>
        </Grid>
      </Grid>
      {/*<Grid container item direction="row" justify="center" alignItems="center" spacing={1}>
        <Grid item xs={4}>
          <Button onClick={filterRegion} color="secondary">Set</Button>
        </Grid>
        <Grid item xs={4}>
          <Button onClick={resetSettings} color="primary">Reset</Button>
        </Grid>
      </Grid>*/}
    </Grid>
  );
}
