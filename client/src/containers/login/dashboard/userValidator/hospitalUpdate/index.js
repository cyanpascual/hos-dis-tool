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

import { Divider, Typography } from '@material-ui/core';

import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
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
      width: '95%',
      padding: '10px',
      margin: '10px'
    }

  }),
);

const HospitalUpdate = (props) => {
  const { selectedHospital, setSelectedHospital } = useContext(MapsContext)
  const { hospitalList, setHospitalList, hospitals, setHospitals } = useContext(FeaturesContext)
  const { username } = useContext(LoginContext);

  const [hos, setHos] = useState(selectedHospital);
  
  const [isEditMode, setIsEditMode] = useState(false);

  const classes = useStyles();

  const handleOnChange = (event) => {
    const {name, value} = event.target;
    var date = new Date().toLocaleString()
    const re = /^[0-9\b]+$/;

    if (name !== "Other Needs"){
      if (re.test(value)){
        setSelectedHospital({
          ...selectedHospital,
          properties: {
            ...selectedHospital.properties,
            Supply_Cur:{
              ...selectedHospital.properties.Supply_Cur,
              [name]: Math.abs(parseInt(value)),
            }, "Last Update": username + ' on ' + date,
          }
        })
      } else if (value === '') {
        setSelectedHospital({
          ...selectedHospital,
          properties: {
            ...selectedHospital.properties,
            Supply_Cur:{
              ...selectedHospital.properties.Supply_Cur,
              [name]: value,
            }, "Last Update": username + ' on ' + date,
          }
        })
      }
    }else {
      setSelectedHospital({
        ...selectedHospital,
        properties: {
          ...selectedHospital.properties,
          Supply_Cur:{
            ...selectedHospital.properties.Supply_Cur,
            [name]: value,
          }, "Last Update": username + ' on ' + date,
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
    axios.post(`https://trams-up-dge.herokuapp.com/hospitals/update/${selectedHospital._id}`, selectedHospital )
      .then(res => console.log(res.data))
      .catch(error => console.log(error))
    setIsEditMode(!isEditMode);
    setHospitalList(hospitals.filter(hos => hos._id !== selectedHospital._id))
    setHospitalList(prevState => [
      ...prevState,
      selectedHospital
    ])
    setHospitals(hospitalList)
  }

  const supplies = Object.keys(selectedHospital.properties.Supply_Cur)
  const imageChoose = (currHospital, supply) =>{
    if (supply === "Other Needs"){
      return null
    }else{
      if (currHospital.properties.Supply_Cap[supply] > 0){
        if(currHospital.properties.Supply_Cur[supply]/currHospital.properties.Supply_Cap[supply] < 0.2){
          return(<img style={{width:20}} src={simple_low} alt="critically-low"/>)
        } else if((currHospital.properties.Supply_Cur[supply]/currHospital.properties.Supply_Cap[supply] > 0.5)){
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
          <Typography style={{fontSize:16, fontWeight:500}}>{selectedHospital.properties.Name_of_Ho}</Typography>
          <Divider/>
          <Typography noWrap style={{fontSize:14, fontWeight:500}}>Hospital ID:</Typography>
            <Typography style={{fontSize:14, fontWeight:350, textAlign:'center'}}>{selectedHospital.properties.HospitalID}</Typography><br/>
          <Typography noWrap style={{fontSize:12, fontWeight:500}}>DOH Level:</Typography>
          <Typography style={{fontSize:12, fontWeight:350, textAlign:'center'}}>{selectedHospital.properties["DOH Level"]}</Typography><br/>
          <Typography noWrap style={{fontSize:12, fontWeight:500}}>Address:</Typography>
          <Typography style={{fontSize:12, fontWeight:350, textAlign:'center'}}>{selectedHospital.properties.Address}</Typography><br/>
          <Typography noWrap style={{fontSize:12, fontWeight:500}}>City/Municipality:</Typography>
          <Typography style={{fontSize:12, fontWeight:350, textAlign:'center'}}>{selectedHospital.properties["City/Municipality"]}</Typography><br/>
          <Typography noWrap style={{fontSize:12, fontWeight:500}}>Province:</Typography>
          <Typography style={{fontSize:12, fontWeight:350, textAlign:'center'}}>{selectedHospital.properties.Province}</Typography><br/>
          <Typography noWrap style={{fontSize:12, fontWeight:500}}>Region:</Typography>
          <Typography style={{fontSize:12, fontWeight:350, textAlign:'center'}}>{selectedHospital.properties.Region}</Typography><br/>
          <Typography noWrap style={{fontSize:12, fontWeight:500}}>Head/Contact Person:</Typography>
          <Typography style={{fontSize:12, fontWeight:350, textAlign:'center'}}>{selectedHospital.properties.Head} </Typography><br/>
          <Typography noWrap style={{fontSize:12, fontWeight:500}}>Contact Number/s:</Typography>
          <Typography style={{fontSize:12, fontWeight:350, textAlign:'center'}}>{selectedHospital.properties["Contact Numbers"]}</Typography><br/>
          <Typography noWrap style={{fontSize:12, fontWeight:500}}>Website:</Typography>
          <Typography style={{fontSize:12, fontWeight:350, textAlign:'center'}}>{selectedHospital.properties.Website}</Typography><br/>
          <Typography noWrap style={{fontSize:12, fontWeight:500}}>Last Updated:</Typography>
          <Typography style={{fontSize:12, fontWeight:350, textAlign:'center'}}>{selectedHospital.properties["Last Update"]}</Typography><br/>
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
                  if(supply === "Other Needs"){
                    return(
                      <TableRow key={supply} className="supplies">
                        <TableCell>{imageChoose(selectedHospital, supply)}</TableCell>
                        <TableCell>
                          <Typography align="center" noWrap style={{fontSize:12, fontWeight:500}}>{supply}</Typography>
                        </TableCell>
                        <TableCell>
                          {isEditMode? 
                            <Input width="50px" name={supply} value={selectedHospital.properties.Supply_Cur[supply]} onChange={(e) => handleOnChange(e)}/> 
                            :<Typography align="center" style={{fontSize:12, fontWeight:350}}>{selectedHospital.properties.Supply_Cur[supply]}</Typography>}                      
                        </TableCell>
                        <TableCell/>
                      </TableRow>
                    ) 
                  } return(
                    <TableRow key={supply} className="supplies">
                      <TableCell>{imageChoose(selectedHospital, supply)}</TableCell>
                      <TableCell>
                        <Typography align="center" style={{fontSize:12, fontWeight:500}}>{supply}</Typography>
                      </TableCell>
                      <TableCell align="center">
                      {isEditMode? 
                        <Typography align="center" variant="subtitle2">
                          <Input style={{width: 80, fontSize: 12}} name={supply} value={selectedHospital.properties.Supply_Cur[supply]} 
                            onChange={handleOnChange}/> </Typography>
                        :<Typography align="center" style={{fontSize:12, fontWeight:350}}>{selectedHospital.properties.Supply_Cur[supply]}</Typography>}
                      </TableCell>
                      <TableCell>
                        <Typography align="center" variant="subtitle2">{selectedHospital.properties.Supply_Cap[supply]}</Typography>
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

