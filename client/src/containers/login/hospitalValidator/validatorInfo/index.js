import React, {useContext,useState} from 'react';
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
  const { user, setUser, users, setUsers } = useContext(LoginContext);

  const [origUser, setOrigUser] = useState(user)
  const [isEditMode, setIsEditMode] = useState(false);
  const [userList, setUserList] = useState(users)
  const classes = useStyles();

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

  const handleCancel = (event) => {
    setUser(origUser)
    setIsEditMode(!isEditMode)
  }

  const handleSubmit = () => {
    axios.post(`https://trams-up-dge.herokuapp.com/uz3rz/update/${user._id}`, user )
      .then(res => console.log(res.data))
      .catch(error => console.log(error))
    setIsEditMode(!isEditMode);
    setOrigUser(user);
    setUsers(userList.filter(usr => usr._id !== user._id))
    setUsers(prevState => [
      ...prevState,
      user
    ])
    setUserList(users)
    
  }
  
  return (
    <div className={classes.container}>
      <Grid container direction="column" justify="flex-start" alignItems="flex-start" spacing={0}>
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
        <Grid item>
          <Typography style={{fontSize:18, fontWeight:500}}>Personnel</Typography>
          <Divider/>
          {!isEditMode? <div>
            <Typography noWrap style={{fontSize:14, fontWeight:500}}>Surname:</Typography>
            <Typography style={{fontSize:14, fontWeight:350, textAlign:'center'}}>{user.properties.Surname}</Typography><br/>
            <Typography noWrap style={{fontSize:14, fontWeight:500}}>First Name:</Typography>
            <Typography style={{fontSize:14, fontWeight:350, textAlign:'center'}}>{user.properties.Firstname}</Typography><br/>
            <Typography noWrap style={{fontSize:14, fontWeight:500}}>Designation:</Typography>
            <Typography style={{fontSize:14, fontWeight:350, textAlign:'center'}}>{user.properties.Designation}</Typography><br/>
            <Typography noWrap style={{fontSize:14, fontWeight:500}}>Contact Number:</Typography>
            <Typography style={{fontSize:14, fontWeight:350, textAlign:'center'}}>{user.properties.Contact}</Typography><br/>
            <Typography noWrap style={{fontSize:14, fontWeight:500}}>E-mail Address:</Typography>
            <Typography style={{fontSize:14, fontWeight:350, textAlign:'center'}}>{user.properties.Email}</Typography><br/>
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
    </div>
  )
}

export default HospitalInfo

