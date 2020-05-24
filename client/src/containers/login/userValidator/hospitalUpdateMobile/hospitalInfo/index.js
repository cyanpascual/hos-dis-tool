import React, {useContext,useState} from 'react';
import { MapsContext } from '../../../../../contexts/MapsContext';
import { LoginContext } from '../../../../../contexts/LoginContext';
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
      padding: 5,
      margin: 5
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
        <Grid item>
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
          <Grid item>
            <Typography style={{fontSize:18, fontWeight:500}}>{selectedHospital.properties.Name_of_Ho}</Typography>
            <Divider/>
            <Typography noWrap style={{fontSize:14, fontWeight:500}}>Hospital ID:</Typography>
            <Typography style={{fontSize:14, fontWeight:350, textAlign:'center'}}>{selectedHospital.properties.HospitalID}</Typography><br/>
            <Typography noWrap style={{fontSize:14, fontWeight:500}}>DOH Level:</Typography>
            <Typography style={{fontSize:14, fontWeight:350, textAlign:'center'}}>{selectedHospital.properties["DOH Level"]}</Typography><br/>
            <Typography noWrap style={{fontSize:14, fontWeight:500}}>Address:</Typography>
            <Typography style={{fontSize:14, fontWeight:350, textAlign:'center'}}>{selectedHospital.properties.Address}</Typography><br/>
            <Typography noWrap style={{fontSize:14, fontWeight:500}}>City/Municipality:</Typography>
            <Typography style={{fontSize:14, fontWeight:350, textAlign:'center'}}>{selectedHospital.properties["City/Municipality"]}</Typography><br/>
            <Typography noWrap style={{fontSize:14, fontWeight:500}}>Province:</Typography>
            <Typography style={{fontSize:14, fontWeight:350, textAlign:'center'}}>{selectedHospital.properties.Province}</Typography><br/>
            <Typography noWrap style={{fontSize:14, fontWeight:500}}>Region:</Typography>
            <Typography style={{fontSize:14, fontWeight:350, textAlign:'center'}}>{selectedHospital.properties.Region}</Typography><br/>
            <Typography noWrap style={{fontSize:14, fontWeight:500}}>Head/Contact Person:</Typography>
            <Typography style={{fontSize:14, fontWeight:350, textAlign:'center'}}>{selectedHospital.properties.Head} </Typography><br/>
            <Typography noWrap style={{fontSize:14, fontWeight:500}}>Contact Number/s:</Typography>
            <Typography style={{fontSize:14, fontWeight:350, textAlign:'center'}}>{selectedHospital.properties["Contact Numbers"]} </Typography><br/>
            <Typography noWrap style={{fontSize:14, fontWeight:500}}>Website:</Typography>
            <Typography style={{fontSize:14, fontWeight:350, textAlign:'center'}}>{selectedHospital.properties.Website} </Typography> <br/>
            <Typography noWrap style={{fontSize:14, fontWeight:500}}>Last Updated:</Typography>
            <Typography noWrap style={{fontSize:14, fontWeight:350, textAlign:'center'}}>{selectedHospital.properties["Last Update"]}</Typography><br/>
          </Grid>  
        </Grid>
      </Grid>
    </div>
  )
}

export default HospitalInfo

