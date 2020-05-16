import React, {useContext,useState} from 'react';
import { MapsContext } from '../../../../contexts/MapsContext';
import { LoginContext } from '../../../../contexts/LoginContext';
import { createStyles, makeStyles} from '@material-ui/core/styles';
import axios from 'axios';

import { Divider, Typography } from '@material-ui/core';

import {IconButton, Input, Grid} from '@material-ui/core';
import EditIcon from "@material-ui/icons/EditOutlined";
import DoneIcon from "@material-ui/icons/DoneAllTwoTone";
import CancelIcon from '@material-ui/icons/CancelTwoTone';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const useStyles = makeStyles((theme) =>
  createStyles({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
      padding: '10px',
      margin: '10px'
    }

  }),
);

const HospitalInfo = (props) => {
  const { selectedHospital, setSelectedHospital } = useContext(MapsContext)
  const { username, setPage, user, setUser } = useContext(LoginContext);

  const [hos, setHos] = useState(selectedHospital);
  const [origUser, setOrigUser] = useState(user)

  
  const [isEditMode, setIsEditMode] = useState(false);

  const classes = useStyles();

  const handleOnChange = (event) => {
    const {name, value} = event.target;
    var date = new Date().toLocaleString()
    setSelectedHospital({
      ...selectedHospital,
      properties: {
        ...selectedHospital.properties,
        [name]: [value],
        }, "Last Update": username + ' on ' + date,
    })
  }

  const handleOnChangeUser = (event) => {

  }

  const handleCancel = (event) => {
    setSelectedHospital(hos)
    setUser(origUser)
    setIsEditMode(!isEditMode)
  }

  const handleSubmit = () => {
    console.log(selectedHospital);
    axios.post(`https://trams-up-dge.herokuapp.com/hospitals/update/${selectedHospital._id}`, selectedHospital )
      .then(res => console.log(res.data))
      .catch(error => console.log(error))
    axios.post(`https://trams-up-dge.herokuapp.com/user/update/${user._id}`, user )
      .then(res => console.log(res.data))
      .catch(error => console.log(error))
    setIsEditMode(!isEditMode);
    setHos(selectedHospital);
    setOrigUser(user);
  }
  
  return (
    <div className={classes.container}>
      <Grid container direction="row" justify="flex-start" alignItems="flex-start" spacing={0}>
        <Grid item xs={12}>
          <IconButton onClick={() => setPage('0')}>
            <ArrowBackIcon/> <Typography variant="subtitle2">Back</Typography>
          </IconButton>
          {isEditMode ? 
            <div>
              <IconButton onClick={() => handleCancel()}>
                <CancelIcon/> <Typography variant="subtitle2">Cancel</Typography>
              </IconButton>
              <IconButton onClick={() => handleSubmit()}>
                <DoneIcon/> <Typography variant="subtitle2">Done</Typography>
              </IconButton>
            </div>  
            : <IconButton onClick={() => setIsEditMode(!isEditMode)}>
              <EditIcon/> <Typography variant="subtitle2">Edit</Typography>
            </IconButton>}
        </Grid>
        <Grid item container justify="flex-start" alignItems="flex-start" spacing={0}>
          <Grid item xs={6}>
            <Typography style={{fontSize:18, fontWeight:500}}>{selectedHospital.properties.Name_of_Ho}</Typography>
            <Divider/>
            <Typography noWrap style={{fontSize:14, fontWeight:500}}>DOH Level:</Typography>
            <Typography noWrap style={{fontSize:14, fontWeight:350, textAlign:'center'}}>{selectedHospital.properties["DOH Level"]}</Typography><br/>
            <Typography noWrap style={{fontSize:14, fontWeight:500}}>Address:</Typography>
            <Typography noWrap style={{fontSize:14, fontWeight:350, textAlign:'center'}}>{selectedHospital.properties.Address}</Typography><br/>
            <Typography noWrap style={{fontSize:14, fontWeight:500}}>City/Municipality:</Typography>
            <Typography noWrap style={{fontSize:14, fontWeight:350, textAlign:'center'}}>{selectedHospital.properties["City/Municipality"]}</Typography><br/>
            <Typography noWrap style={{fontSize:14, fontWeight:500}}>Province:</Typography>
            <Typography noWrap style={{fontSize:14, fontWeight:350, textAlign:'center'}}>{selectedHospital.properties.Province}</Typography><br/>
            <Typography noWrap style={{fontSize:14, fontWeight:500}}>Region:</Typography>
            <Typography noWrap style={{fontSize:14, fontWeight:350, textAlign:'center'}}>{selectedHospital.properties.Region}</Typography><br/>
            <Typography noWrap style={{fontSize:14, fontWeight:500}}>Head/Contact Person:</Typography>
            {isEditMode ? <Input type="text" style={{width: 300, fontSize: 14}} name="Head" value={selectedHospital.properties.Head} onChange={handleOnChange}/>
            : <Typography noWrap style={{fontSize:14, fontWeight:350, textAlign:'center'}}>{selectedHospital.properties.Head} </Typography>}<br/>
            <Typography noWrap style={{fontSize:14, fontWeight:500}}>Contact Number/s:</Typography>
            {isEditMode? <Input type="text" style={{width: 300, fontSize: 14}} name="Contact Numbers" value={selectedHospital.properties["Contact Numbers"]} onChange={handleOnChange}/>
            : <Typography noWrap style={{fontSize:14, fontWeight:350, textAlign:'center'}}>{selectedHospital.properties["Contact Numbers"]} </Typography>}<br/>
            <Typography noWrap style={{fontSize:14, fontWeight:500}}>Website:</Typography>
            {isEditMode? <Input type="text" style={{width: 300, fontSize: 14}} name="Website" value={selectedHospital.properties.Website} onChange={handleOnChange}/>
            : <Typography noWrap style={{fontSize:14, fontWeight:350, textAlign:'center'}}>{selectedHospital.properties.Website} </Typography>} <br/>
          </Grid>  
          <Grid item xs={6}>
            <Typography style={{fontSize:18, fontWeight:500}}>Personnel</Typography>
            <Divider/>
            {!isEditMode? <div>
              <Typography noWrap style={{fontSize:14, fontWeight:500}}>Surname:</Typography>
              <Typography noWrap style={{fontSize:14, fontWeight:350, textAlign:'center'}}>{user.properties.Surname}</Typography><br/>
              <Typography noWrap style={{fontSize:14, fontWeight:500}}>First Name:</Typography>
              <Typography noWrap style={{fontSize:14, fontWeight:350, textAlign:'center'}}>{user.properties.Firstname}</Typography><br/>
              <Typography noWrap style={{fontSize:14, fontWeight:500}}>Designation:</Typography>
              <Typography noWrap style={{fontSize:14, fontWeight:350, textAlign:'center'}}>{user.properties.Designation}</Typography><br/>
              <Typography noWrap style={{fontSize:14, fontWeight:500}}>Contact Number:</Typography>
              <Typography noWrap style={{fontSize:14, fontWeight:350, textAlign:'center'}}>{user.properties.Contact}</Typography><br/>
              <Typography noWrap style={{fontSize:14, fontWeight:500}}>E-mail Address:</Typography>
              <Typography noWrap style={{fontSize:14, fontWeight:350, textAlign:'center'}}>{user.properties.Email}</Typography><br/>
            </div> : <div>
            <Typography noWrap style={{fontSize:14, fontWeight:500}}>Surname:</Typography>
            <Input type="text" style={{width: 300, fontSize: 14}} name="Surname" value={user.properties.Surname} onChange={handleOnChangeUser}/><br/>
            <Typography noWrap style={{fontSize:14, fontWeight:500}}>First Name:</Typography>
            <Input type="text" style={{width: 300, fontSize: 14}} name="Firstname" value={user.properties.Firstname} onChange={handleOnChangeUser}/><br/>
            <Typography noWrap style={{fontSize:14, fontWeight:500}}>Designation:</Typography>
            <Input type="text" style={{width: 300, fontSize: 14}} name="Designation" value={user.properties.Designation} onChange={handleOnChangeUser}/><br/>
            <Typography noWrap style={{fontSize:14, fontWeight:500}}>Contact Number:</Typography>
            <Input type="text" style={{width: 300, fontSize: 14}} name="Contact" value={user.properties.Contact} onChange={handleOnChangeUser}/><br/>
            <Typography noWrap style={{fontSize:14, fontWeight:500}}>E-mail Address:</Typography>
            <Input type="text" style={{width: 300, fontSize: 14}} name="Email" value={user.properties.Email} onChange={handleOnChangeUser}/>
            </div>}
          </Grid>
        </Grid>
      </Grid>
    </div>
  )
}

export default HospitalInfo

