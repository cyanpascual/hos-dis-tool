import React, {useContext} from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { FeaturesContext } from '../../../../contexts/FeaturesContext';
import FilterInput from './filterInput';
import * as Regions from './regions/regions.json'

export default function FilterDialog() {
  const [region, setRegion] = React.useState('');
  const [province, setProvince] = React.useState('');
  const [check, setCheck] = React.useState({
    dataDrop: false,
    priority: false,
    testCenter: false
  });
  

  const { hospitals, setHospitalList, setSearchTerm } = useContext(FeaturesContext);

  
  const resetSettings = () =>{
    setHospitalList(hospitals)
    setRegion('')
    setProvince('')
    setSearchTerm('');
    setCheck({
      dataDrop: false,
      priority: false,
      testCenter: false
    });
  }

  const checkboxFilter = (event) => {
    const { name, checked } = event.target;
    setCheck({
      ...check,
      [name]: checked
    })
    if (name === 'dataDrop'){
      setHospitalList(checked ?
        hospitals.filter(hospital =>
          hospital.data_drop === true,
        ): hospitals
      )
    } else if (name === 'priority'){
      setHospitalList(checked ?
        hospitals.filter(hospital =>
          hospital.priority === true,
        ): hospitals
      )
    } else {
      setHospitalList(checked ?
        hospitals.filter(hospital =>
          hospital.testCenter === true,
        ): hospitals
      )
    }
  }

  const liveFilterRegion = (region) => {
    setRegion(region)
    setHospitalList( region ?
      hospitals.filter(hospital =>
        hospital.properties.region.toLowerCase().indexOf(region.toLowerCase()) > -1,
      ): hospitals
    )
  }

  const liveFilterProvince = (province) => {
    setProvince(province)
    if (region === "NCR"){
      setHospitalList( province ?
        hospitals.filter(hospital =>
        hospital.properties.city.toLowerCase().indexOf(province.toLowerCase()) > -1,
        ) : hospitals
      )
    } else {
      setHospitalList( province ?
        hospitals.filter(hospital =>
        hospital.properties.prov.toLowerCase().indexOf(province.toLowerCase()) > -1,
        ) : hospitals
      )
    }
  }

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
      <Grid container item direction="row" justify="center" alignItems="center" spacing={0}>
        <Grid item xs={4}>
          <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
            <Checkbox checked={check.dataDrop} onChange={checkboxFilter} name="dataDrop" color="primary"/>
            <Typography style={{fontSize:14, fontWeight:400, textAlign:'left', color: '#000000'}}>DOH Data Drop</Typography>
          </div>
        </Grid>
        <Grid item xs={4}>
          <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
            <Checkbox checked={check.priority} onChange={checkboxFilter} name="priority" color="primary"/>
            <Typography style={{fontSize:14, fontWeight:400, textAlign:'left', color: '#000000'}}>Priority Hospital</Typography>
          </div>
        </Grid>
        <Grid item xs={4}>
          <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
            <Checkbox checked={check.testCenter} onChange={checkboxFilter} name="testCenter" color="primary"/>
            <Typography style={{fontSize:14, fontWeight:400, textAlign:'left', color: '#000000'}}>Test Center</Typography>
          </div>      
        </Grid>
      </Grid>
    </Grid>
  );
}
