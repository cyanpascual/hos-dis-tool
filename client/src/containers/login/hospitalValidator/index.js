import React, {useContext,useState,useEffect} from 'react';
import { MapsContext } from '../../../contexts/MapsContext';
import { FeaturesContext } from '../../../contexts/FeaturesContext';
import { createStyles, makeStyles} from '@material-ui/core/styles';
import axios from 'axios';

import simple_high from '../../../assets/levelIndicators/simple_high.png'
import simple_med from '../../../assets/levelIndicators/simple_mid.png'
import simple_low from '../../../assets/levelIndicators/simple_low.png'
import simple_none from '../../../assets/levelIndicators/simple_none.png'

import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
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

const HospitalValidate = (props) => {
  const { hosID } = props;
  const { setHospitalList, hospitalList } = useContext(FeaturesContext);
  const { selectedHospital, setSelectedHospital } = useContext(MapsContext)
  const [hos, setHos] = useState(selectedHospital);
  const [origHos, setOrigHos] = useState(selectedHospital);
  
  const [isEditMode, setIsEditMode] = useState(false);

  const [hospitals, setHospitals] = useState(hospitalList)
  const classes = useStyles();

  useEffect(() => {

    /*
    setSelectedHospital(hospitalList.filter(hospital =>
      hospital.properties.HospitalID === hosID,
    ))
    setHos(selectedHospital)
    setOrigHos(selectedHospital)*/
    /*setHospitalList(hosID ? hospitals.filter(hospital =>
        hospital.properties.HospitalID === hosID,
    ) : hospitals)*/
  }, []);

  console.log(hos)
  console.log(hosID)

  const handleOnChange = (event) => {
    const {name, value} = event.target;
    setHos((prevState) => {
      prevState.properties.Supply_Cur[name] = value;
      prevState.properties["Last Update"] = new Date().toLocaleString();
      return({
        ...prevState
      })
    })
  };

  const handleCancel = (event) => {
    setHos(origHos);
    setIsEditMode(!isEditMode)
  }

  const handleSubmit = () => {
    console.log(hos);
    /*
    fetch(`https://trams-up-dge.herokuapp.com/hospitals/update/${hos._id}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(hos),
    }).then(response => console.log(response.json()));*/
    axios.post(`https://trams-up-dge.herokuapp.com/hospitals/update/${hos._id}`, hos )
      .then(res => console.log(res.data))
      .catch(error => console.log(error))
    setIsEditMode(!isEditMode);
  }

  const supplies = Object.keys(hos.properties.Supply_Cur)
  const imageChoose = (currHospital, supply) =>{
    if (currHospital.properties.Supply_Cur[supply] > 0){
      if(currHospital.properties.Supply_Cur[supply]/currHospital.properties.Supply_Cap[supply] < 0.2){
        return(<img style={{width:20}} src={simple_low} alt="critically-low"/>)
      } else if((currHospital.properties.Supply_Cur[supply]/currHospital.properties.Supply_Cap[supply] > 0.5)){
        return(<img style={{width:20}} src={simple_high} alt="well-supplied"/>)
      } else return(<img style={{width:20}} src={simple_med} alt="low"/>)
    } else return(<img style={{width:20}} src={simple_none} alt="none"/>)
  }
  
  return (
    <div className={classes.container}>
      <Grid container direction="row" justify="flex-start" alignItems="flex-start" spacing={0}>
        <Grid item xs={5}>
          {isEditMode ? 
            <div>
              
              <IconButton onClick={handleCancel}>
                <CancelIcon/> <Typography variant="subtitle2">Cancel</Typography>
              </IconButton>
              <IconButton onClick={handleSubmit}>
                <DoneIcon/> <Typography variant="subtitle2">Done</Typography>
              </IconButton>
            </div>  
            : <IconButton onClick={() => setIsEditMode(!isEditMode)}>
              <EditIcon/> <Typography variant="subtitle2">Edit</Typography>
            </IconButton>}
          <Typography style={{fontSize:16, fontWeight:500}}>{hos.properties.Name_of_Ho}</Typography>
          <Divider/>
          <Typography noWrap style={{fontSize:12, fontWeight:500}}>DOH Level:</Typography>
          <Typography noWrap style={{fontSize:12, fontWeight:350, textAlign:'center'}}>{hos.properties["DOH Level"]}</Typography><br/>
          <Typography noWrap style={{fontSize:12, fontWeight:500}}>Address:</Typography>
          <Typography noWrap style={{fontSize:12, fontWeight:350, textAlign:'center'}}>{hos.properties.Address}</Typography><br/>
          <Typography noWrap style={{fontSize:12, fontWeight:500}}>Region:</Typography>
          <Typography noWrap style={{fontSize:12, fontWeight:350, textAlign:'center'}}>{hos.properties.Region}</Typography><br/>
          <Typography noWrap style={{fontSize:12, fontWeight:500}}>Head/Contact Person:</Typography>
          <Typography noWrap style={{fontSize:12, fontWeight:350, textAlign:'center'}}>{hos.properties.Head} </Typography><br/>
          <Typography noWrap style={{fontSize:12, fontWeight:500}}>Contact Number/s:</Typography>
          <Typography noWrap style={{fontSize:12, fontWeight:350, textAlign:'center'}}>{hos.properties["Contact Numbers"]}</Typography><br/>
          <Typography noWrap style={{fontSize:12, fontWeight:500}}>Website:</Typography>
          <Typography noWrap style={{fontSize:12, fontWeight:350, textAlign:'center'}}>{hos.properties.Website}</Typography><br/>
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
                        <TableCell>{imageChoose(hos, supply)}</TableCell>
                        <TableCell>
                          <Typography align="center" noWrap style={{fontSize:12, fontWeight:500}}>{supply}</Typography>
                        </TableCell>
                        <TableCell>
                          {isEditMode? 
                            <Input width="50px" name={supply} value={hos.properties.Supply_Cur[supply]} onChange={handleOnChange}/> 
                            :<Typography align="center" style={{fontSize:12, fontWeight:350}}>{hos.properties.Supply_Cur[supply]}</Typography>}                      
                        </TableCell>
                        <TableCell/>
                      </TableRow>
                    ) 
                  } return(
                    <TableRow key={supply} className="supplies">
                      <TableCell>{imageChoose(hos, supply)}</TableCell>
                      <TableCell>
                        <Typography align="center" style={{fontSize:12, fontWeight:500}}>{supply}</Typography>
                      </TableCell>
                      <TableCell align="center">
                      {isEditMode? 
                        <Input type="number" style={{width: 80, fontSize: 12}} name={supply} value={hos.properties.Supply_Cur[supply]} 
                          onChange={handleOnChange}/>
                        :<Typography align="center" style={{fontSize:12, fontWeight:350}}>{hos.properties.Supply_Cur[supply]}</Typography>}
                      </TableCell>
                      <TableCell>
                      {isEditMode?
                        <Input type="number" style={{width: 80, fontSize: 12}} name={supply} value={hos.properties.Supply_Cap[supply]} 
                          onChange={handleOnChange}/>
                        :<Typography align="center" variant="subtitle2">{hos.properties.Supply_Cap[supply]}</Typography>}
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

export default HospitalValidate

