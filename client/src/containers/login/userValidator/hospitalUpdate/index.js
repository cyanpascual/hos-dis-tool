import React, {useContext,useState} from 'react';
import { MapsContext } from '../../../../contexts/MapsContext';
import { LoginContext } from '../../../../contexts/LoginContext';
import { FeaturesContext } from '../../../../contexts/FeaturesContext';
import { createStyles, makeStyles} from '@material-ui/core/styles';
import axios from 'axios';

import simple_high from '../../../../assets/levelIndicators/simple_high.png'
import simple_med from '../../../../assets/levelIndicators/simple_mid.png'
import simple_low from '../../../../assets/levelIndicators/simple_low.png'
import simple_none from '../../../../assets/levelIndicators/simple_none.png'

import dataDrop from '../../../../assets/logos/data_drop-01.png'
import priority from '../../../../assets/logos/priority-01.png'
import testCenter from '../../../../assets/logos/testing_centers-01.png'

import { Divider, Typography } from '@material-ui/core';

import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import {IconButton, Input, Grid} from '@material-ui/core';
import EditIcon from "@material-ui/icons/EditOutlined";
import DoneIcon from "@material-ui/icons/DoneAllTwoTone";
import CancelIcon from '@material-ui/icons/CancelTwoTone';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import * as supplyNames from './supplyNames/supply.json'

const useStyles = makeStyles((theme) =>
  createStyles({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
      width: '95%',
      padding: '10px',
      margin: '10px'
    }

  }),
);

const HospitalUpdate = (props) => {
  const { selectedHospital, setSelectedHospital } = useContext(MapsContext)
  const { setHospitalList, hospitals } = useContext(FeaturesContext)
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
    } else {
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

  const handleEdit = () => {
    setHos(selectedHospital)
    setIsEditMode(!isEditMode)
  }

  const handleCancel = () => {
    setSelectedHospital(hos);
    console.log(selectedHospital);
    setIsEditMode(!isEditMode) 
  }

  const handleSubmit = () => {
    console.log(selectedHospital);
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
    if (supply === "other"){
      return null
    }else{
      if (currHospital.properties.supply_need[supply] > 0){
        if(currHospital.properties.supply_cur[supply]/currHospital.properties.supply_need[supply] < 0.2){
          return(<img style={{width:20}} src={simple_low} alt="critically-low"/>)
        } else if((currHospital.properties.supply_cur[supply]/currHospital.properties.supply_need[supply] > 0.5)){
          return(<img style={{width:20}} src={simple_high} alt="well-supplied"/>)
        } else return(<img style={{width:20}} src={simple_med} alt="low"/>)
      } else return(<img style={{width:20}} src={simple_none} alt="none"/>)
    }
  }

  return (
    <div className={classes.container}>
      <Grid container direction="row" justify="flex-start" alignItems="flex-start" spacing={1}>
        <Grid item xs={5}>
          <IconButton onClick={() => setSelectedHospital(null)}>
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
            : <IconButton onClick={() => handleEdit()}>
              <EditIcon/> <Typography variant="subtitle2">Edit</Typography>
            </IconButton>}
            <Typography style={{fontSize:18, fontWeight:500}}>{selectedHospital.properties.cfname}
            {selectedHospital.data_drop ? <img style={{width: 30}} src={dataDrop} title='Part of DOH Data Drop'/>: <p/>}
            {selectedHospital.priority ? <img style={{width: 30}} src={priority} title='Priority hospital'/>: <p/>}
            {selectedHospital.test_center ? <img style={{width: 30}} src={testCenter} title='Testing center'/>: <p/>}
            </Typography>
            <Divider/>
            <Typography noWrap style={{fontSize:14, fontWeight:500}}>Hospital ID:</Typography>
            <Typography style={{fontSize:14, fontWeight:350, textAlign:'center'}}>{selectedHospital.properties.hfhudcode}</Typography><br/>
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
            <Typography style={{fontSize:14, fontWeight:350, textAlign:'center'}}>{selectedHospital.properties.cont_person} </Typography><br/>
            <Typography noWrap style={{fontSize:14, fontWeight:500}}>Contact Number/s:</Typography>
            <Typography style={{fontSize:14, fontWeight:350, textAlign:'center'}}>{selectedHospital.properties.cont_num} </Typography><br/>
            <Typography noWrap style={{fontSize:14, fontWeight:500}}>Website:</Typography>
            <Typography style={{fontSize:14, fontWeight:350, textAlign:'center'}}>{selectedHospital.properties.website} </Typography> <br/>
            <Typography noWrap style={{fontSize:14, fontWeight:500}}>Last Updated:</Typography>
            <Typography noWrap style={{fontSize:14, fontWeight:350, textAlign:'center'}}>{selectedHospital.properties.reportdate}</Typography><br/>
        </Grid>
        <Grid item xs={7}>
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
                            <Input width="50px" name={supply} value={selectedHospital.properties.supply_cur[supply]} onChange={(e) => handleOnChange(e)}/> 
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
                          <Input style={{width: 80, fontSize: 12}} name={supply} value={selectedHospital.properties.supply_cur[supply]} 
                            onChange={handleOnChange}/> </Typography>
                        :<Typography align="center" style={{fontSize:12, fontWeight:350}}>{selectedHospital.properties.supply_cur[supply]}</Typography>}
                      </TableCell>
                      <TableCell>
                        <Typography align="center" variant="subtitle2">{selectedHospital.properties.supply_need[supply]}</Typography>
                      </TableCell>
                    </TableRow>
                  )  
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </div>
  )
}

export default HospitalUpdate

