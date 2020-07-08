import React, {useContext,useState, useEffect} from 'react';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import { MapsContext } from '../../../../../contexts/MapsContext';
import { LoginContext } from '../../../../../contexts/LoginContext';
import { FeaturesContext } from '../../../../../contexts/FeaturesContext';
import { createMuiTheme, withStyles, ThemeProvider} from '@material-ui/core/styles';
import axios from 'axios';
import 'react-calendar/dist/Calendar.css';

import simple_high from '../../../../../assets/levelIndicators/simple_high.png'
import simple_med from '../../../../../assets/levelIndicators/simple_mid.png'
import simple_low from '../../../../../assets/levelIndicators/simple_low.png'
import simple_none from '../../../../../assets/levelIndicators/simple_none.png'

import { Divider, Typography, Badge } from '@material-ui/core';
import {
  MuiPickersUtilsProvider,
  DatePicker,
} from '@material-ui/pickers';

import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import {Button, Input, Grid} from '@material-ui/core';
import EditIcon from "@material-ui/icons/EditOutlined";
import DoneIcon from "@material-ui/icons/DoneAllTwoTone";
import CancelIcon from '@material-ui/icons/CancelTwoTone';
import AddIcon from '@material-ui/icons/Add';
import green from './greenDate.png';

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
  }, tiledCalendar: {
    backgroundColor: '#BAB8B2'
  }
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
  const [shownLog, setShownLog] = useState(selectedHospital)
  const [today, setToday] = useState(new Date())
  const [hos, setHos] = useState(selectedHospital);
  const [logs, setLogs] = useState('');
  const [logList, setLogList] = useState('');
  const [enabledDates, setEnabledDates] = useState([(new Date()).toLocaleDateString()])

  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios('https://trams-up-dge.herokuapp.com/hl0gs', );

      setLogs(res.data);
      setLogList(res.data);
      //console.log(res2.data)
      setEnabledDates(res.data.filter(log => log.properties.hfhudcode.toLowerCase() === shownLog.properties.hfhudcode.toLowerCase())
        .map(log => {
          if (log.properties.reportdate.slice(-22)[0] === 'n'){
            return new Date(log.properties.reportdate.slice(-21)).toLocaleDateString()
          } else {
            return new Date(log.properties.reportdate.slice(-22)).toLocaleDateString()
          }
        }))
    }

    fetchData();
  }, [])


  useEffect(() => {
    if(logs){
      setLogs(logs.filter(log => log.properties.hfhudcode.toLowerCase() === shownLog.properties.hfhudcode.toLowerCase()))
      if (date.toLocaleDateString() !== (new Date()).toLocaleDateString()){
        setLogs(logs.filter(log => log.properties.reportdate.slice(-22) <= date.toLocaleDateString()).sort(function(a,b){
          var x = new Date(a.properties.reportdate.slice(-22));
          var y = new Date(b.properties.reportdate.slice(-22));
          if (x<y) {return 1;}
          if (x>y) {return -1;}
          return 0;
        }));
        let count = 0
        while (count < logs.length){
          if (logs[count].properties.hfhudcode.toLowerCase() === shownLog.properties.hfhudcode.toLowerCase()){
            if (logs[count].properties.reportdate.slice(-22)[0] === 'n'){
              if ((new Date(date.toLocaleDateString()).getTime() >= new Date((new Date(logs[count].properties.reportdate.slice(-21)).toLocaleDateString()).getTime()))){
                setShownLog(logs[count])
                console.log('i c u')
                break
              }
            } else {
              if ((new Date(date.toLocaleDateString()).getTime() >= new Date(new Date(logs[count].properties.reportdate.slice(-22)).toLocaleDateString()).getTime())){
                setShownLog(logs[count])
                console.log('i c u')
                break
              }
            }
          } count = count + 1
        }

      } else {
        setShownLog(selectedHospital)
      }
    }
  }, [date])

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
        setShownLog({
          ...shownLog,
          properties: {
            ...shownLog.properties,
            supply_cur:{
              ...shownLog.properties.supply_cur,
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
        setShownLog({
          ...shownLog,
          properties: {
            ...shownLog.properties,
            supply_cur:{
              ...shownLog.properties.supply_cur,
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
      setShownLog({
        ...shownLog,
        properties: {
          ...shownLog.properties,
          supply_cur:{
            ...shownLog.properties.supply_cur,
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
      setShownLog({
        ...shownLog,
        properties: {
          ...shownLog.properties,
          supply_need:{
            ...shownLog.properties.supply_need,
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
      setShownLog({
        ...shownLog,
        properties: {
          ...shownLog.properties,
          supply_need:{
            ...shownLog.properties.supply_need,
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
    setShownLog(hos)
    setIsEditMode(!isEditMode)
  }

  const handleChangeDate = date => {
    setDate(date);
  }

  const handleSubmit = () => {
    console.log(selectedHospital);
    axios.post(`https://trams-up-dge.herokuapp.com/h0zPiTaLs/update/${selectedHospital._id}`, selectedHospital )
      .then(res => console.log(res.data))
      .catch(error => console.log(error))
    axios.post(`https://trams-up-dge.herokuapp.com/hl0gs/add`, selectedHospital )
      .then(res => console.log(res.data))
      .catch(error => console.log(error))

    const message = '[TrAMS Alert] ' + new Date().toLocaleString() + ': ' + selectedHospital.properties.cfname + '\'s inventory is now updated. Thank you.';
    const number = selectedHospital.properties.assigned_num;
    const access_token = selectedHospital.properties.assigned_token;

    var headers = {
      'Access-Control-Allow-Origin': '*',
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Methods': 'POST, GET, OPTIONS'
    }

    const formData = {"outboundSMSMessageRequest": {
      "clientCorrelator": "24601",
      "senderAddress": "0661",
      "outboundSMSTextMessage": {"message": message},
      "address": number
       }};

    console.log(formData);
    axios.post(`https://cors-anywhere.herokuapp.com/https://devapi.globelabs.com.ph/smsmessaging/v1/outbound/0661/requests?access_token=${access_token}`, formData, {mode: 'no-cors', headers: headers})
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
    if (supply === "other"){
      return null
    } else {
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
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <DatePicker autoOk disableToolbar disableFuture variant="static" openTo="date" value={date} onChange={handleChangeDate}
                renderDay={(date, selectedDate, dayInCurrentMonth, dayComponent) => {
                  if (enabledDates.includes(date.toLocaleDateString())){
                    return <Badge badgeContent={<img src={green} style={{width: 7}}/>}>{dayComponent}</Badge>
                  } else if (new Date(date.toLocaleDateString()).getTime() === new Date(today.toLocaleDateString()).getTime()){
                    return <Badge badgeContent={<img src={green} style={{width: 7}}/>}>{dayComponent}</Badge>
                  } else return dayComponent
                }}/>
            </MuiPickersUtilsProvider>
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
              : date.toLocaleDateString() === today.toLocaleDateString() ? <div style={{width: '100%'}}>
                <Button className={classes.button} onClick={() => handleEdit()}>
                  <EditIcon/> <Typography variant="subtitle2">Edit log</Typography>
                </Button>
              </div> : <div/>}
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
                        <TableCell>{imageChoose(shownLog, supply)}</TableCell>
                        <TableCell>
                          <Typography align="center" noWrap style={{fontSize:12, fontWeight:500}}>Other Needs</Typography>
                        </TableCell>
                        <TableCell>
                          {isEditMode? 
                            <Input width="50px" name={supply} value={shownLog.properties.supply_cur[supply]} onChange={(e) => handleOnChange(e)}/> 
                            :<Typography align="center" style={{fontSize:12, fontWeight:350}}>{shownLog.properties.supply_cur[supply]}</Typography>}                      
                        </TableCell>
                        <TableCell/>
                      </TableRow>
                    ) 
                  } return(
                    <TableRow key={supply} className="supplies">
                      <TableCell>{imageChoose(shownLog, supply)}</TableCell>
                      <TableCell>
                        <Typography align="center" style={{fontSize:12, fontWeight:500}}>{supplyNames.features[supply]}</Typography>
                      </TableCell>
                      <TableCell align="center">
                      {isEditMode? 
                        <Typography align="center" variant="subtitle2">
                          {shownLog.properties.supply_cur[supply] ?
                          <Input style={{width: 80, fontSize: 12}} name={supply} value={shownLog.properties.supply_cur[supply]} 
                            onChange={handleOnChange}/> 
                          : <Input style={{width: 80, fontSize: 12}} name={supply} value={0} 
                            onChange={handleOnChange}/>}
                        </Typography>
                        :<Typography align="center" style={{fontSize:12, fontWeight:350}}>{shownLog.properties.supply_cur[supply]}</Typography>}
                      </TableCell>
                      <TableCell>
                      {isEditMode? 
                        <Typography align="center" variant="subtitle2">
                          {shownLog.properties.supply_need[supply] ?
                          <Input style={{width: 80, fontSize: 12}} name={supply} value={shownLog.properties.supply_need[supply]} 
                            onChange={handleOnChangeNeed}/> 
                          : <Input style={{width: 80, fontSize: 12}} name={supply} value={0} 
                            onChange={handleOnChangeNeed}/>}
                        </Typography>
                        :<Typography align="center" style={{fontSize:12, fontWeight:350}}>{shownLog.properties.supply_need[supply]}</Typography>}
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

