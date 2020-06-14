import React, {useContext,useState, useEffect} from 'react';
import { MapsContext } from '../../../../../contexts/MapsContext';
import { LoginContext } from '../../../../../contexts/LoginContext';
import { FeaturesContext } from '../../../../../contexts/FeaturesContext';
import { createStyles, makeStyles} from '@material-ui/core/styles';
import axios from 'axios';

import { Divider, Typography } from '@material-ui/core';

import {IconButton, TextField, Input, Grid, Button, Collapse} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import EditIcon from "@material-ui/icons/EditOutlined";
import DoneIcon from "@material-ui/icons/DoneAllTwoTone";
import CancelIcon from '@material-ui/icons/CancelTwoTone';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import CloseIcon from '@material-ui/icons/Close';

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
  const { user, setUser, users, setUsers, username } = useContext(LoginContext);

  const [hos, setHos] = useState(selectedHospital);
  const [origUser, setOrigUser] = useState(user);
  const [userList, setUserList] = useState(users);
  const [isEditMode, setIsEditMode] = useState(false);
  const [expanded, setExpanded] = useState('')
  const [changed, setChanged] = useState(false)
  const [open, setOpen] = useState(false);

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const classes = useStyles();

  useEffect(() => {
    if (selectedHospital !== hos){
      setChanged(true)
    } else if (user !== origUser){
      setChanged(true)
    } else {
      setChanged(false)
    }
  }, [selectedHospital, user])

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

  const handleCancel = () => {
    setSelectedHospital(hos)
    setIsEditMode(!isEditMode)
  }

  const handleSubmit = () => {
    axios.post(`https://trams-up-dge.herokuapp.com/h0zPiTaLs/update/${selectedHospital._id}`, selectedHospital )
      .then(res => console.log(res.data))
      .then(setOpen(true))
      .catch(error => console.log(error))
    setIsEditMode(!isEditMode);
    setHos(selectedHospital);
    setHospitalList(hospitals.filter(hos => hos._id !== selectedHospital._id))
    setHospitalList(prevState => [
      ...prevState,
      selectedHospital
    ])
    setHospitals(hospitalList)
    setChanged(false)
  }

  const handleOnChangeUser = (event) => {
    const {name, value} = event.target;
    setUser({
      ...user,
      properties: {
        ...user.properties,
        [name]: value,
        }
    })
  }

  const handleCancelUser = () => {
    setUser(origUser)
    setIsEditMode(!isEditMode)
  }

  const handleSubmitUser = () => {
    axios.post(`https://trams-up-dge.herokuapp.com/uz3rz/update/${user._id}`, user )
      .then(res => console.log(res.data))
      .then(setOpen(true))
      .catch(error => console.log(error))
    setIsEditMode(!isEditMode);
    setOrigUser(user);
    setUsers(userList.filter(usr => usr._id !== user._id))
    setUsers(prevState => [
      ...prevState,
      user
    ])
    setUserList(users)
    setChanged(false)
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
            <Collapse in={open}>
              {!selectedHospital.properties.cont_person || !selectedHospital.properties.cont_num || !selectedHospital.properties.website ? 
              <Alert action={<IconButton color="inherit" size="small" onClick={() => {setOpen(false);}}>
                <CloseIcon fontSize="inherit" />
                </IconButton>} severity="error">Fill all necessary details</Alert>: 
              <Alert action={<IconButton color="inherit" size="small" onClick={() => {setOpen(false);}}>
                <CloseIcon fontSize="inherit" />
              </IconButton>} severity="success">Changes are saved!
              </Alert>}
            </Collapse>
          </Grid>
        </ExpansionPanelDetails>
        <ExpansionPanelActions>
          <Button className={classes.cancelButton} disabled={!changed} onClick={() => handleCancel()}>
            <CancelIcon/> <Typography variant="subtitle2">Cancel</Typography>
          </Button><br/><br/>
          <Button className={classes.button} disabled={!changed} onClick={() => {if (!selectedHospital.properties.cont_person || !selectedHospital.properties.cont_num || !selectedHospital.properties.website) {setOpen(true)} else {handleSubmit()}}}>
            <DoneIcon/> <Typography variant="subtitle2">Save</Typography>
          </Button>
        </ExpansionPanelActions>
      </ExpansionPanel>
      <ExpansionPanel square expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel2a-content" id="panel2a-header">
          <Typography className={classes.heading}>Personnel information</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Grid container direction="column" justify="flex-start" alignItems="flex-start" spacing={1}>
            <Grid item container direction="row" justify="center" alignItems="flex-start" spacing={2}>
              <Grid item xs={3}>
                <TextField required label="Surname" name="Surname" value={user.properties.Surname} onChange={handleOnChangeUser} style={{width: '100%'}}/>
              </Grid>
              <Grid item xs={4}>
                <TextField required label="First name" name="Firstname" value={user.properties.Firstname} onChange={handleOnChangeUser} style={{width: '100%'}}/>
              </Grid>
              <Grid item xs={5}>
                <TextField disabled label="Designation" defaultValue={user.properties.Designation} style={{width: '100%'}}/>
              </Grid>
            </Grid>
            <Grid item container direction="row" justify="flex-start" alignItems="flex-start" spacing={2}>
              <Grid item xs={4}>
                <TextField required label="Contact Numbers" name="Contact" value={user.properties.Contact} onChange={handleOnChangeUser} style={{width: '100%'}}/>
              </Grid>
              <Grid item xs={4}>
                <TextField required label="Email Address" name="Email" value={user.properties.Email} onChange={handleOnChangeUser} style={{width: '100%'}}/>
              </Grid>
            </Grid>
            <Collapse in={open}>
              {!user.properties.Surname || !user.properties.Firstname || !user.properties.Contact || !user.properties.Email  ? 
              <Alert action={<IconButton color="inherit" size="small" onClick={() => {setOpen(false);}}>
                <CloseIcon fontSize="inherit" />
                </IconButton>} severity="error">Fill all necessary details</Alert>: 
              <Alert action={<IconButton color="inherit" size="small" onClick={() => {setOpen(false);}}>
                <CloseIcon fontSize="inherit" />
              </IconButton>} severity="success">Changes are saved!
              </Alert>}
            </Collapse>
          </Grid>
        </ExpansionPanelDetails>
        <ExpansionPanelActions>
          <Button className={classes.cancelButton} disabled={!changed} onClick={() => {if (!user.properties.Surname || !user.properties.Firstname || !user.properties.Contact || !user.properties.Email) {setOpen(true)} else {handleCancelUser()}}}>
            <CancelIcon/> <Typography variant="subtitle2">Cancel</Typography>
          </Button><br/><br/>
          <Button className={classes.button} disabled={!changed} onClick={() => handleSubmitUser()}>
            <DoneIcon/> <Typography variant="subtitle2">Save</Typography>
          </Button>
        </ExpansionPanelActions>
      </ExpansionPanel>
    </div>
  )
}

export default ManageAccount

