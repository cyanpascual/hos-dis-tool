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
  const { username } = useContext(LoginContext);

  const [hos, setHos] = useState(selectedHospital);
  const [isEditMode, setIsEditMode] = useState(false);

  const classes = useStyles();

  const handleOnChange = (event) => {
    const {name, value} = event.target;
    var date = new Date().toLocaleString()
    setSelectedHospital({
      ...selectedHospital,
      properties: {
        ...selectedHospital.properties,
<<<<<<< HEAD
        [name]: value,
        }, reportdate: username + ' on ' + date,
=======
        [name]: [value],
        }, "Last Update": username + ' on ' + date,
>>>>>>> parent of 6edc597... Merge pull request #46 from cyanpascual/develop
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
    </div>
  )
}

export default HospitalInfo

