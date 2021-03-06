import React, {useContext,useState} from 'react';
import { MapsContext } from '../../../../../contexts/MapsContext';
import { LoginContext } from '../../../../../contexts/LoginContext';
import { FeaturesContext } from '../../../../../contexts/FeaturesContext';
import { createStyles, makeStyles} from '@material-ui/core/styles';
import axios from 'axios';

import simple_high from '../../../../../assets/levelIndicators/simple_high.png'
import simple_med from '../../../../../assets/levelIndicators/simple_mid.png'
import simple_low from '../../../../../assets/levelIndicators/simple_low.png'
import simple_none from '../../../../../assets/levelIndicators/simple_none.png'

import { Typography } from '@material-ui/core';

import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import {IconButton, Input, Grid, TextField} from '@material-ui/core';
import EditIcon from "@material-ui/icons/EditOutlined";
import DoneIcon from "@material-ui/icons/DoneAllTwoTone";
import CancelIcon from '@material-ui/icons/CancelTwoTone';

import * as supplyNames from './supplyNames/supply.json'

const useStyles = makeStyles((theme) =>
  createStyles({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
      padding: 0,
      margin: 0
    }

  }),
);

const HospitalSupply = (props) => {
  const { selectedHospital, setSelectedHospital } = useContext(MapsContext)
  const { hospitalList, setHospitalList, hospitals, setHospitals, setSearchTerm} = useContext(FeaturesContext)
  const { username } = useContext(LoginContext);

  const [hos, setHos] = useState(selectedHospital);
  const [isEditMode, setIsEditMode] = useState(false);
  const classes = useStyles();

  const handleOnChange = (event) => {
    const {name, value} = event.target;
    var date = new Date().toLocaleString()
    const re = /^[0-9\b]+$/;

    if (name !== "other"){
      if (re.test(value)){
        setSelectedHospital({
          ...selectedHospital,
          properties: {
            ...selectedHospital.properties,
            supply_cur:{
              ...selectedHospital.properties.supply_cur,
              [name]: Math.abs(parseInt(value)),
            }, reportdate: username + ' on ' + date,
          }
        })
      } else if (value === '') {
        setSelectedHospital({
          ...selectedHospital,
          properties: {
            ...selectedHospital.properties,
            supply_cur:{
              ...selectedHospital.properties.supply_cur,
              [name]: value,
            }, reportdate: username + ' on ' + date,
          }
        })
      }
    }else {
      setSelectedHospital({
        ...selectedHospital,
        properties: {
          ...selectedHospital.properties,
          supply_cur:{
            ...selectedHospital.properties.supply_cur,
            [name]: value,
          }, reportdate: username + ' on ' + date,
        }
      })
    }
  };


  const handleCancel = (event) => {
    setSelectedHospital(hos)
    setIsEditMode(!isEditMode)
  }

  const handleSubmit = () => {
    axios.post(`https://trams-up-dge.herokuapp.com/h0zPiTaLs/update/${selectedHospital._id}`, selectedHospital )
      .then(res => console.log(res.data))
      .catch(error => console.log(error))
    axios.post(`https://trams-up-dge.herokuapp.com/hl0gs/add`, selectedHospital )
      .then(res => console.log(res.data))
      .catch(error => console.log(error))
    setIsEditMode(!isEditMode);
    setHospitalList(hospitals.filter(hos => hos._id !== selectedHospital._id))
    setHospitalList(prevState => [
      ...prevState,
      selectedHospital
    ])
  }

  const supplies = Object.keys(selectedHospital.properties.supply_cur)
  const imageChoose = (currHospital, supply) =>{
    if (currHospital.properties.supply_need[supply] > 0){
      if(currHospital.properties.supply_cur[supply]/currHospital.properties.supply_need[supply] < 0.2){
        return(<img style={{width:20}} src={simple_low} alt="critically-low"/>)
      } else if((currHospital.properties.supply_cur[supply]/currHospital.properties.supply_need[supply] > 0.5)){
        return(<img style={{width:20}} src={simple_high} alt="well-supplied"/>)
      } else return(<img style={{width:20}} src={simple_med} alt="low"/>)
    } else return(<img style={{width:20}} src={simple_none} alt="none"/>)
  }
  
  return (
    <div className={classes.container}>
      <Grid container direction="column" justify="center" alignItems="flex-start" spacing={0}>
        <Grid item xs>
          {isEditMode ? 
            <Grid container direction="row">
              <Grid item xs>
                <IconButton onClick={() => handleCancel()}>
                  <CancelIcon/> <Typography variant="subtitle2">Cancel</Typography>
                </IconButton>
              </Grid>
              <Grid item xs>
                <IconButton onClick={() => handleSubmit()}>
                  <DoneIcon/> <Typography variant="subtitle2">Done</Typography>
                </IconButton>
              </Grid>
            </Grid>  
            : <IconButton onClick={() => setIsEditMode(!isEditMode)}>
              <EditIcon/> <Typography variant="subtitle2">Edit</Typography>
            </IconButton>}
        </Grid>
        <Grid item container direction="row" xs>
          <Grid item xs={12}>
          <TableContainer>
            <Table className={classes.table} size="small" aria-label="Hospital Supplies">
              <TableHead className={classes.head}>
                <TableRow>
                  <TableCell/>
                  <TableCell align="center" >Medical Supply</TableCell>
                  <TableCell align="center" >Current Supply</TableCell>
                  <TableCell align="center" >Weekly Needs</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {supplies.map((supply)=>{
                  if(supply === "other"){
                    return(
                      <TableRow key={supply} className="supplies">
                        <TableCell>{imageChoose(selectedHospital, supply)}</TableCell>
                        <TableCell>
                          <Typography align="center" noWrap style={{fontSize:12, fontWeight:500}}>Other Needs</Typography>
                        </TableCell>
                        <TableCell>
                          {isEditMode? 
                            <TextField width="50px" name={supply} value={selectedHospital.properties.supply_cur[supply]} onChange={(e) => handleOnChange(e)}/> 
                            :<Typography align="center" style={{fontSize:12, fontWeight:350}}>{selectedHospital.properties.supply_cur[supply]}</Typography>}                      
                        </TableCell>
                        <TableCell/>
                      </TableRow>
                    )  
                  } return(
                    <TableRow key={supply} className="supplies">
                      <TableCell>{imageChoose(selectedHospital, supply)}</TableCell>
                      <TableCell>
                        <Typography align="center" style={{fontSize:12, fontWeight:500}}>{supplyNames.features[supply]}</Typography>
                      </TableCell>
                      <TableCell align="center">
                      {isEditMode? 
                        <Typography align="center" variant="subtitle2">
                          <Input type="number" style={{width: 80, fontSize: 12}} name={supply} value={selectedHospital.properties.supply_cur[supply]} 
                            onChange={handleOnChange}/> </Typography>
                        :<Typography align="center" style={{fontSize:12, fontWeight:350}}>{selectedHospital.properties.supply_cur[supply]}</Typography>}
                      </TableCell>
                      <TableCell align="center">
                        <Typography align="center" style={{fontSize:12, fontWeight:350}}>{selectedHospital.properties.supply_need[supply]}</Typography>
                      </TableCell>
                    </TableRow>
                  )  
                })}
              </TableBody>
            </Table>
          </TableContainer>
          </Grid>
        </Grid>
      </Grid>
    </div>
  )
}

export default HospitalSupply

