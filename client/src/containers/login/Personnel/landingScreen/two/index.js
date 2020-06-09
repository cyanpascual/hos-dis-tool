import React, {useContext,useState} from 'react';
import { MapsContext } from '../../../../../contexts/MapsContext';
import { LoginContext } from '../../../../../contexts/LoginContext';
import { FeaturesContext } from '../../../../../contexts/FeaturesContext';
import { createMuiTheme, withStyles, ThemeProvider} from '@material-ui/core/styles';
import axios from 'axios';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

import simple_high from '../../../../../assets/levelIndicators/simple_high.png'
import simple_med from '../../../../../assets/levelIndicators/simple_mid.png'
import simple_low from '../../../../../assets/levelIndicators/simple_low.png'
import simple_none from '../../../../../assets/levelIndicators/simple_none.png'

import { Divider, Typography } from '@material-ui/core';

import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import {Button, Input, Grid} from '@material-ui/core';
import EditIcon from "@material-ui/icons/EditOutlined";
import DoneIcon from "@material-ui/icons/DoneAllTwoTone";
import CancelIcon from '@material-ui/icons/CancelTwoTone';
import AddIcon from '@material-ui/icons/Add';

import * as supplyNames from './supplyNames/supply.json'


const styles = (theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justify: 'center',
    width: '95%',
    padding: '10px',
    margin: '10px',
    background: '#fffffe'
  }, categoryHeader: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  }, item: {
    paddingTop: 1,
    paddingBottom: 1,
    color: theme.palette.common.white,
  }, header: {
    fontSize: 24,
    backgroundColor: '#BAB8B2',
    color: '#a84343',
    textAlign: "center"
  }, button: {
    width: '80%',
    backgroundColor: '#BAB8B2',
    color: '#660000',
  }, cancelButton: {
    width: '80%',
    backgroundColor: '#a84343',
    color: '#BAB8B2',
  }, card: {
    marginTop: theme.spacing(3)
  },
});

const theme = createMuiTheme(
  {
    palette: {
      primary: {
        light: '#993232',
        main: '#800000',
        dark: '#660000',
      },
      secondary: {
        light: '#993232',
        main: '#FFFFFE',
        dark: '#660000',
      },
    },
    shape: {
      borderRadius: 8,
    },
    props: {
      MuiTab: {
        disableRipple: true,
      },
    },
    mixins: {
      toolbar: {
        minHeight: 48,
      },
    },
  }
);

theme.typography.h4 = {
  fontSize: 14,
  fontWeight: 400
};

theme.typography.h3 = {
  fontSize: 16,
  fontWeight: 500
};

theme.typography.h2 = {
  fontSize: 20,
  fontWeight: 500
};

const HospitalUpdate = (props) => {
  const { classes, ...other } = props;
  const { selectedHospital, setSelectedHospital } = useContext(MapsContext)
  const { hospitalList, setHospitalList, hospitals, setHospitals } = useContext(FeaturesContext)
  const { username } = useContext(LoginContext);

  const [date, setDate] = useState(new Date())
  const [hos, setHos] = useState(selectedHospital);
  
  const [isEditMode, setIsEditMode] = useState(false);

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

  const handleOnChangeNeed = (event) => {
    const {name, value} = event.target;
    var date = new Date().toLocaleString()
    const re = /^[0-9\b]+$/;

    if (re.test(value)){
      setSelectedHospital({
        ...selectedHospital,
        properties: {
          ...selectedHospital.properties,
          supply_need:{
            ...selectedHospital.properties.supply_need,
            [name]: Math.abs(value),
          }, reportdate: username + ' on ' + date,
        }
      })
    } else if (value === '') {
      setSelectedHospital({
        ...selectedHospital,
        properties: {
          ...selectedHospital.properties,
          supply_need:{
            ...selectedHospital.properties.supply_need,
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

  const handleChangeDate = date => {
    setDate(date)
  }

  const handleSubmit = () => {
    console.log(selectedHospital);
    axios.post(`https://trams-up-dge.herokuapp.com/h0zPiTaLs/update/${selectedHospital._id}`, selectedHospital )
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

  const supplies = Object.keys(selectedHospital.properties.supply_cur)
  const imageChoose = (currHospital, supply) =>{
    if (supply === "Other Needs"){
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
    <ThemeProvider theme={theme}>
    <div className={classes.container}>
      <Grid container direction="row" justify="center" alignItems="flex-start" spacing={2}>
        <Grid container item xs={5} direction="column" justify="center" alignItems='flex-start'>
          <br/><Typography variant="h3">Select a date to view log</Typography><br/>
          <Grid item xs={10}>
            <Calendar calendarType="US" maxDate={new Date()} onChange={handleChangeDate} value={date} style={{display: 'block', margin: 'auto', width: '80%'}} />
          </Grid>
          <br/>Supply log for <Typography variant="h3">{date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</Typography><br/><br/>
            {isEditMode ? 
              <div style={{width: '100%'}}>
                <Button className={classes.cancelButton} onClick={() => handleCancel()}>
                  <CancelIcon/> <Typography variant="subtitle2">Cancel</Typography>
                </Button><br/><br/>
                <Button className={classes.button} onClick={() => handleSubmit()}>
                  <DoneIcon/> <Typography variant="subtitle2">Save</Typography>
                </Button>
              </div>  
              : <div style={{width: '100%'}}>
                <Button className={classes.button} onClick={() => handleEdit()}>
                  <EditIcon/> <Typography variant="subtitle2">Edit log</Typography>
                </Button><br/><br/>
                <Button className={classes.button}>
                  <AddIcon/> <Typography variant="subtitle2">Add new log</Typography>
                </Button>
              </div>}
        </Grid>
        <Grid item xs={7} >
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
                          <Typography align="center" noWrap style={{fontSize:12, fontWeight:500}}>{supplyNames.features[supply]}</Typography>
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
                      {isEditMode? 
                        <Typography align="center" variant="subtitle2">
                          <Input style={{width: 80, fontSize: 12}} name={supply} value={selectedHospital.properties.supply_need[supply]} 
                            onChange={handleOnChangeNeed}/> </Typography>
                        :<Typography align="center" style={{fontSize:12, fontWeight:350}}>{selectedHospital.properties.supply_need[supply]}</Typography>}
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
    </ThemeProvider>
  )
}

export default withStyles(styles)(HospitalUpdate)

