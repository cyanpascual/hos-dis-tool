import React, {useContext,useState} from 'react';
import { MapsContext } from '../../../../../contexts/MapsContext';
import { LoginContext } from '../../../../../contexts/LoginContext';
import { FeaturesContext } from '../../../../../contexts/FeaturesContext';
import { createStyles, makeStyles} from '@material-ui/core/styles';
import axios from 'axios';

import { Divider, Typography } from '@material-ui/core';

import {IconButton, TextField, Input, Grid, Button} from '@material-ui/core';
import EditIcon from "@material-ui/icons/EditOutlined";
import DoneIcon from "@material-ui/icons/DoneAllTwoTone";
import CancelIcon from '@material-ui/icons/CancelTwoTone';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';

const useStyles = makeStyles((theme) =>
  createStyles({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
      flexDirection: 'column',
      padding: 5,
      margin: 5
    }

  }),
);


const ManageAccount = (props) => {
  const { selectedHospital, setSelectedHospital } = useContext(MapsContext)
  const { hospitals, setHospitals, hospitalList, setHospitalList } = useContext(FeaturesContext)
  const { username } = useContext(LoginContext);

  const [hos, setHos] = useState(selectedHospital);
  const [isEditMode, setIsEditMode] = useState(false);
  const [expanded, setExpanded] = useState('')

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const classes = useStyles();

  const handleOnChange = (event) => {
    const {name, value} = event.target;
    var date = new Date().toLocaleString()
    setSelectedHospital({
      ...selectedHospital,
      properties: {
        ...selectedHospital.properties,
        [name]: value,
        }, reportdate: username + ' on ' + date,
    })
  }

  const handleCancel = (event) => {
    setSelectedHospital(hos)
    setIsEditMode(!isEditMode)
  }

  const handleSubmit = () => {
    axios.post(`https://trams-up-dge.herokuapp.com/h0zPiTaLs/update/${selectedHospital._id}`, selectedHospital )
      .then(res => console.log(res.data))
      .catch(error => console.log(error))
    setIsEditMode(!isEditMode);
    setHos(selectedHospital);
    setHospitalList(hospitals.filter(hos => hos._id !== selectedHospital._id))
    setHospitalList(prevState => [
      ...prevState,
      selectedHospital
    ])
    setHospitals(hospitalList)
  }
  
  return (
    <div className={classes.container}>
      <Typography style={{fontSize:24, fontWeight:500}}>{selectedHospital.properties.cfname}</Typography>
      <Divider/>
      <ExpansionPanel square expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
          <Typography className={classes.heading}>Hospital information</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Grid container direction="column" justify="center" alignItems="flex-start" spacing={1}>
            <Grid item container direction="row" justify="center" alignItems="flex-start" spacing={2}>
              <Grid item xs={8}>
                <TextField disabled label="Hospital Name" defaultValue={selectedHospital.properties.cfname} style={{width: '100%'}}/>
              </Grid>
              <Grid item xs={2}>
                <TextField disabled label="Hospital ID" defaultValue={selectedHospital.properties.hfhudcode} style={{width: '100%'}}/>
              </Grid>
              <Grid item xs={2}>
                <TextField disabled label="DOH Level" defaultValue={selectedHospital.properties.doh_level} style={{width: '100%'}}/>
              </Grid>
            </Grid>
            <Grid item xs>
              <TextField disabled label="Address" defaultValue={selectedHospital.properties.address} style={{width: '100%'}}/>
            </Grid>
            <Grid item container direction="row" justify="center" alignItems="flex-start" spacing={2}>
              <Grid item xs={4}>
                <TextField disabled label="City/Municipality" defaultValue={selectedHospital.properties.city} style={{width: '100%'}}/>
              </Grid>
              <Grid item xs={4}>
                <TextField disabled label="Province" defaultValue={selectedHospital.properties.prov} style={{width: '100%'}}/>
              </Grid>
              <Grid item xs={4}>
                <TextField disabled label="Region" defaultValue={selectedHospital.properties.region} style={{width: '100%'}}/>
              </Grid>
            </Grid>
            <Grid item container direction="row" justify="center" alignItems="flex-start" spacing={2}>
              <Grid item xs={4}>
                <TextField required name="cont_person" label="Head/Contact Person" value={selectedHospital.properties.cont_person} onChange={handleOnChange} style={{width: '100%'}}/>
              </Grid>
              <Grid item xs={4}>
                <TextField required name="cont_num" label="Contact Numbers" value={selectedHospital.properties.cont_num} onChange={handleOnChange} style={{width: '100%'}}/>
              </Grid>
              <Grid item xs={4}>
                <TextField required name="website" label="Website" value={selectedHospital.properties.website} onChange={handleOnChange} style={{width: '100%'}}/>
              </Grid>
            </Grid>
          </Grid>
        </ExpansionPanelDetails>
        <ExpansionPanelActions>
          <Button className={classes.cancelButton} onClick={() => handleCancel()}>
            <CancelIcon/> <Typography variant="subtitle2">Cancel</Typography>
          </Button><br/><br/>
          <Button className={classes.button} onClick={() => handleSubmit()}>
            <DoneIcon/> <Typography variant="subtitle2">Save</Typography>
          </Button>
        </ExpansionPanelActions>
      </ExpansionPanel>
      <ExpansionPanel square expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel2a-content" id="panel2a-header">
          <Typography className={classes.heading}>Personnel information</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Grid container direction="row" justify="flex-start" alignItems="flex-start" spacing={0}>
            <Grid item container justify="flex-start" alignItems="flex-start" spacing={0}>
              <Grid item>
                <Typography style={{fontSize:18, fontWeight:500}}>{selectedHospital.properties.cfname}</Typography>
                <Divider/>
                <Typography noWrap style={{fontSize:14, fontWeight:500}}>DOH Level:</Typography>
                <Typography style={{fontSize:14, fontWeight:350, textAlign:'center'}}>{selectedHospital.properties.doh_level}</Typography><br/>
                <Typography noWrap style={{fontSize:14, fontWeight:500}}>Address:</Typography>
                <Typography style={{fontSize:14, fontWeight:350, textAlign:'center'}}>{selectedHospital.properties.address}</Typography><br/>
                <Typography noWrap style={{fontSize:14, fontWeight:500}}>City/Municipality:</Typography>
                <Typography style={{fontSize:14, fontWeight:350, textAlign:'center'}}>{selectedHospital.properties.city}</Typography><br/>
                <Typography noWrap style={{fontSize:14, fontWeight:500}}>Province:</Typography>
                <Typography style={{fontSize:14, fontWeight:350, textAlign:'center'}}>{selectedHospital.properties.prov}</Typography><br/>
                <Typography noWrap style={{fontSize:14, fontWeight:500}}>Region:</Typography>
                <Typography style={{fontSize:14, fontWeight:350, textAlign:'center'}}>{selectedHospital.properties.region}</Typography><br/>
                <Typography noWrap style={{fontSize:14, fontWeight:500}}>Head/Contact Person:</Typography>
                {isEditMode ? <Input type="text" style={{width: 300, fontSize: 14}} name="cont_person" value={selectedHospital.properties.cont_person} onChange={handleOnChange}/>
                : <Typography style={{fontSize:14, fontWeight:350, textAlign:'center'}}>{selectedHospital.properties.cont_person} </Typography>}<br/>
                <Typography noWrap style={{fontSize:14, fontWeight:500}}>Contact Number/s:</Typography>
                {isEditMode? <Input type="text" style={{width: 300, fontSize: 14}} name="cont_num" value={selectedHospital.properties.cont_num} onChange={handleOnChange}/>
                : <Typography style={{fontSize:14, fontWeight:350, textAlign:'center'}}>{selectedHospital.properties.cont_num} </Typography>}<br/>
                <Typography noWrap style={{fontSize:14, fontWeight:500}}>Website:</Typography>
                {isEditMode? <Input type="text" style={{width: 300, fontSize: 14}} name="website" value={selectedHospital.properties.website} onChange={handleOnChange}/>
                : <Typography style={{fontSize:14, fontWeight:350, textAlign:'center'}}>{selectedHospital.properties.website} </Typography>} <br/>
                <Typography noWrap style={{fontSize:14, fontWeight:500}}>Last Updated:</Typography>
                <Typography noWrap style={{fontSize:14, fontWeight:350, textAlign:'center'}}>{selectedHospital.properties.reportdate}</Typography><br/>
              </Grid>  
            </Grid>
          </Grid>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  )
}

export default ManageAccount

