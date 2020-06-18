import React, {useContext,useState,useEffect} from 'react';
import { MapsContext } from '../../../../../contexts/MapsContext';
import { LoginContext } from '../../../../../contexts/LoginContext';
import { FeaturesContext } from '../../../../../contexts/FeaturesContext';
import { createMuiTheme, makeStyles, withStyles, ThemeProvider} from '@material-ui/core/styles';
import axios from 'axios';

import simple_high from '../../../../../assets/levelIndicators/simple_high.png'
import simple_med from '../../../../../assets/levelIndicators/simple_mid.png'
import simple_low from '../../../../../assets/levelIndicators/simple_low.png'
import simple_none from '../../../../../assets/levelIndicators/simple_none.png'

import EditIcon from "@material-ui/icons/EditOutlined";
import DoneIcon from "@material-ui/icons/DoneAllTwoTone";
import CancelIcon from '@material-ui/icons/CancelTwoTone';
import AddIcon from '@material-ui/icons/Add';

import {Table, TableHead, TableFooter, TableBody, TableCell} from '@material-ui/core';
import TableContainer from '@material-ui/core/TableContainer';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';

import { Typography, Grid, Button, Collapse, Divider, Input, IconButton } from '@material-ui/core';
import * as supplyNames from './supplyNames/supply.json'

const styles = (theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justify: 'center',
    width: '98%',
    padding: '5px',
    margin: '5px',
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
    width: 100,
    backgroundColor: '#BAB8B2',
    color: '#660000',
  }, cancelButton: {
    width: 100,
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

const LabSupplies = (props) => {
  const { classes, ...other } = props;
  const { selectedHospital, setSelectedHospital } = useContext(MapsContext);
  const { username } = useContext(LoginContext);
  const { hospitalList, setHospitalList, hospitals, setHospitals } = useContext(FeaturesContext);
  
  const [hos, setHos] = useState(selectedHospital);
  const [rtpcrInputs, setRtpcrInputs] = useState([]);
  const [rnaInputs, setRnaInputs] = useState([]);
  const [selectInputRna, setSelectInputRna] = useState('')
  const [selectInputRtpcr, setSelectInputRtpcr] = useState('')
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    setRtpcrInputs(selectedHospital.properties.lab_cur.rtpcr.map((item) => {
      return {
        brand: item.brand,
        value_cur: item.value,
        value_need: selectedHospital.properties.lab_need.rtpcr.filter((need) => need.brand === item.brand )
          .map((item) => {return item.value})[0]
      }
    }))
    setRnaInputs(selectedHospital.properties.lab_cur.rna_extraction.map((item) => {
      return {
        brand: item.brand,
        value_cur: item.value,
        value_need: selectedHospital.properties.lab_need.rna_extraction.filter((need) => need.brand === item.brand )
          .map((item) => {return item.value})[0]
      }
    }))
    setSelectInputRna(selectedHospital.properties.lab_cur.rna_extraction.map((item) => {
      return {
        lab_cur: {
        brand: item.brand,
        value: item.value
        },
        lab_need: {
          brand: item.brand,
          value: selectedHospital.properties.lab_need.rna_extraction.filter((need) => need.brand === item.brand )
          .map((item) => {return item.value})[0]
        }
      }
    }))
    setSelectInputRtpcr(selectedHospital.properties.lab_cur.rtpcr.map((item) => {
      return {
        lab_cur: {
        brand: item.brand,
        value: item.value
        },
        lab_need: {
          brand: item.brand,
          value: selectedHospital.properties.lab_need.rtpcr.filter((need) => need.brand === item.brand )
          .map((item) => {return item.value})[0]
        }
      }
    }))
  }, [])


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
            lab_cur:{
              ...selectedHospital.properties.lab_cur,
              [name]: Math.abs(parseInt(value)),
            }, reportdate: username + ' on ' + date,
          }
        })
      } else if (value === '') {
        setSelectedHospital({
          ...selectedHospital,
          properties: {
            ...selectedHospital.properties,
            lab_cur:{
              ...selectedHospital.properties.lab_cur,
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
          lab_cur:{
            ...selectedHospital.properties.lab_cur,
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
          lab_need:{
            ...selectedHospital.properties.lab_need,
            [name]: Math.abs(value),
          }, reportdate: username + ' on ' + date,
        }
      })
    } else if (value === '') {
      setSelectedHospital({
        ...selectedHospital,
        properties: {
          ...selectedHospital.properties,
          lab_need:{
            ...selectedHospital.properties.lab_need,
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
    setIsEditMode(!isEditMode)
  }

  const handleSubmit = () => {
    setSelectInputRna(rnaInputs.map((item) => {
      return {
        lab_cur: {
        brand: item.brand,
        value: item.value_cur
        },
        lab_need: {
          brand: item.brand,
          value: item.value_need
        }
      }
    }))
    setSelectInputRtpcr(rtpcrInputs.map((item) => {
      return {
        lab_cur: {
        brand: item.brand,
        value: item.value_cur
        },
        lab_need: {
          brand: item.brand,
          value: item.value_need
        }
      }
    }))
    setSelectedHospital({
      ...selectedHospital,
      properties: {
        ...selectedHospital.properties,
        lab_cur: {
          ...selectedHospital.properties.lab_cur,
          rtpcr: selectInputRtpcr.map((item) => {
            return item.lab_cur
          }),
          rna_extraction: selectInputRna.map((item) => {
            return item.lab_cur
          })
        },
        lab_need: {
          ...selectedHospital.properties.lab_need,
          rtpcr: selectInputRtpcr.map((item) => {
            return item.lab_need
          }),
          rna_extraction: selectInputRna.map((item) => {
            return item.lab_need
          })
        }
      }
    })
    
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

  const handleOnChangeRtpcr = index => event => {
    const {name, value} = event.target;
    
    rtpcrInputs[index][name] = value
    setRtpcrInputs(rtpcrInputs)
  }

  /*const handleOnChangeRtpcr = index => event => {
    const {name, value} = event.target;
    if (name === 'value_need'){
      setSelectedHospital({
        ...selectedHospital
      })
    }
  }*/

  const handleOnChangeRna = index => event => {
    const {name, value} = event.target;
    const newInput = [...rnaInputs];
    newInput[index][name] = value
    setRnaInputs(newInput)
  }


  const addSupply = (name) =>{
    var date = new Date().toLocaleString()
    const newInput = Object.create({
      brand: 'new brand',
      value_need: '',
      value_cur: ''
    })
    if (name === 'rtpcr'){
      setRtpcrInputs(prevState =>[
        ...prevState,
        newInput
      ])
    } else if (name === 'rna_extraction'){
      setRnaInputs(prevState =>[
        ...prevState,
        newInput
      ])
    }
  }
  
  /*const addSupply = (name) =>{
    if (name === 'rtpcr'){
      setSelectedHospital({
        ...selectedHospital,
        properties: {
          ...selectedHospital.properties,
          lab_cur: {
            ...selectedHospital.properties.lab_cur,
            rtpcr: [
              ...selectedHospital.properties.lab_cur.rtpcr,
              {
                brand: '',
                value: ''
              }
            ]
          },
          lab_need: {
            ...selectedHospital.properties.lab_need,
            rtpcr: [
              ...selectedHospital.properties.lab_need.rtpcr,
              {
                brand: '',
                value: ''
              }
            ]
          }
        }
      })
    } else if (name === 'rna_extraction'){
      setSelectedHospital({
        ...selectedHospital,
        properties: {
          ...selectedHospital.properties,
          lab_cur: {
            ...selectedHospital.properties.lab_cur,
            rna_extraction: [
              ...selectedHospital.properties.lab_cur.rna_extraction,
              {
                brand: '',
                value: ''
              }
            ]
          },
          lab_need: {
            ...selectedHospital.properties.lab_need,
            rna_extraction: [
              ...selectedHospital.properties.lab_need.rna_extraction,
              {
                brand: '',
                value: ''
              }
            ]
          }
        }
      })
    }
    console.log(selectedHospital)
  }*/

  const deleteInput = (brand, type, index) => {
    if (type === 'rna'){
      setRnaInputs(rnaInputs.filter((item) => item.brand !== brand))
    } else {
      setRtpcrInputs(rtpcrInputs.filter((item) => item.brand !== brand))
    }
  }

  const supplies = Object.keys(selectedHospital.properties.lab_cur)
  const imageChoose = (currHospital, supply) =>{
    if (supply === "other"){
      return null
    }else{
      if (currHospital.properties.lab_need[supply] > 0){
        if(currHospital.properties.lab_cur[supply]/currHospital.properties.lab_need[supply] < 0.2){
          return(<img style={{width:20}} src={simple_low} alt="critically-low"/>)
        } else if((currHospital.properties.lab_cur[supply]/currHospital.properties.lab_need[supply] > 0.5)){
          return(<img style={{width:20}} src={simple_high} alt="well-supplied"/>)
        } else return(<img style={{width:20}} src={simple_med} alt="low"/>)
      } else return(<img style={{width:20}} src={simple_none} alt="none"/>)
    }
  }
  return (
    <ThemeProvider theme={theme}>
      <div className={classes.container}>
      <br/>
      <Typography variant="h2">
        Laboratory supplies
      </Typography>
      <Divider/>
      <br/>
      <Grid container direction='row' alignItems="flex-start" justify="center">
        <Grid container item direction="column" alignItems="flex-start" xs={6} spacing={2}>
          <Grid item xs>
            <TableContainer><Table size="small">
              <TableHead className={classes.head}>
                <TableRow>
                  <TableCell colSpan={4} align="center"><Typography variant="h3"> RT-PCR testing kits</Typography></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell/>
                  <TableCell align="center" >Brand Name</TableCell>
                  <TableCell align="center" >Current Supply</TableCell>
                  <TableCell align="center" >Weekly Needs</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {selectedHospital.properties.lab_cur.rtpcr ? selectedHospital.properties.lab_cur.rtpcr.map((brand, index)=>{
                  return (isEditMode ? <div/> : 
                    <TableRow key={brand.brand} className="supplies">
                      <TableCell/>
                      <TableCell>
                        <Typography align="center" style={{fontSize:12, fontWeight:350}}>{brand.brand}</Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Typography align="center" style={{fontSize:12, fontWeight:350}}>{brand.value}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography align="center" style={{fontSize:12, fontWeight:350}}>{selectedHospital.properties.lab_need.rtpcr[index].value}</Typography>
                      </TableCell>
                    </TableRow>
                  )}): <TableRow>
                    <TableCell colSpan={3}><Typography variant="h4">Nothing to show</Typography></TableCell>
                  </TableRow>}
                {isEditMode ? rtpcrInputs ? rtpcrInputs.map((item, index) => {
                  return(
                    <TableRow key={index}>
                      <TableCell>
                        <IconButton size='small'onClick={() => deleteInput(item.brand, 'rtpcr', index)}>
                          <CancelIcon/>
                        </IconButton>
                        {index}
                      </TableCell>
                      <TableCell align='center'>
                        <Input style={{width: 80, fontSize: 12}} name='brand' value={item.brand} 
                          onChange={handleOnChangeRtpcr(index)}/>
                      </TableCell>
                      <TableCell align='center'>
                        
                        <Input style={{width: 80, fontSize: 12}} name='value_cur' value={item.value_cur} 
                          onChange={handleOnChangeRtpcr(index)}/>
                      </TableCell>
                      <TableCell align='center'>
                        <Input style={{width: 80, fontSize: 12}} name='value_need' value={item.value_need} 
                          onChange={handleOnChangeRtpcr(index)}/>
                      </TableCell>
                    </TableRow>
                  )
                }):<div/>:<div/>}  
              </TableBody>
              {isEditMode?
                <TableFooter><TableCell colSpan={4}>
                  <Button onClick={()=>addSupply('rtpcr')}><AddIcon/> Add new entry</Button>
                </TableCell></TableFooter>:<TableFooter/>}
            </Table></TableContainer>
      
          </Grid>
          <Grid item xs>
            <TableContainer><Table size="small">
              <TableHead className={classes.head}>
                <TableRow>
                  <TableCell colSpan={4} align="center"><Typography variant="h3">RNA extraction kits</Typography></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell/>
                  <TableCell align="center" >Brand Name</TableCell>
                  <TableCell align="center" >Current Supply</TableCell>
                  <TableCell align="center" >Weekly Needs</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {selectedHospital.properties.lab_cur.rna_extraction ? selectedHospital.properties.lab_cur.rna_extraction.map((brand)=>{
                  return (isEditMode ? <div/> : 
                    <TableRow key={brand.brand} className="supplies">
                      <TableCell/>
                      <TableCell>
                        <Typography align="center" style={{fontSize:12, fontWeight:350}}>{brand.brand}</Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Typography align="center" style={{fontSize:12, fontWeight:350}}>{brand.value}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography align="center" style={{fontSize:12, fontWeight:350}}>{brand.value}</Typography>
                      </TableCell>
                    </TableRow>
                  )}): <TableRow>
                    <TableCell colSpan={3}><Typography variant="h4">Nothing to show</Typography></TableCell>
                  </TableRow>}
                  {isEditMode ? rnaInputs ? rnaInputs.map((item, index) => {
                  return(
                    <TableRow key={item.brand}>
                      <TableCell>
                        <IconButton size='small' onClick={() => deleteInput(item.brand, 'rna')}>
                          <CancelIcon/>
                        </IconButton>
                      </TableCell>
                      <TableCell align='center'>
                        <Input style={{width: 80, fontSize: 12}} name='brand' value={item.brand} 
                          onChange={() => handleOnChangeRna(index)}/>
                      </TableCell>
                      <TableCell align='center'>
                        <Input style={{width: 80, fontSize: 12}} name='value_cur' value={item.value_cur} 
                          onChange={() => handleOnChangeRna(index)}/>
                      </TableCell>
                      <TableCell align='center'>
                        <Input style={{width: 80, fontSize: 12}} name='value_need' value={item.value_need} 
                          onChange={() => handleOnChangeRna(index)}/>
                      </TableCell>
                    </TableRow>
                  )
                }):<div/>:<div/>}  
              </TableBody>
              {isEditMode?
                <TableFooter><TableCell colSpan={4}>
                  <Button onClick={()=>addSupply('rna_extraction')}><AddIcon/> Add new entry</Button>
                </TableCell></TableFooter>:<TableFooter/>}
            </Table></TableContainer>
          </Grid>
        </Grid>
        <Grid item xs={6}>
          <TableContainer><Table size="small">
            <TableHead className={classes.head}>
              <TableRow>
                <TableCell colSpan={4} align="center"><Typography variant="h3"> Other items</Typography></TableCell>
              </TableRow>
              <TableRow>
                <TableCell/>
                <TableCell align="center" >Supply name</TableCell>
                <TableCell align="center" >Current Supply</TableCell>
                <TableCell align="center" >Weekly Needs</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {supplies ? supplies.map((supply)=>{
                if (supply !== "rtpcr"){if (supply !== "rna_extraction"){
                  return (
                    <TableRow key={supply} className="supplies">
                      <TableCell>{imageChoose(selectedHospital, supply)}</TableCell>
                      <TableCell>
                        <Typography align="center" style={{fontSize:12, fontWeight:500}}>{supplyNames.features[supply]}</Typography>
                      </TableCell>
                      <TableCell align="center">
                        {isEditMode?<Typography align="center" variant="subtitle2">
                          <Input style={{width: 80, fontSize: 12}} name={supply} value={selectedHospital.properties.lab_cur[supply]} 
                            onChange={handleOnChange}/> </Typography>
                        :<Typography align="center" style={{fontSize:12, fontWeight:350}}>{selectedHospital.properties.lab_cur[supply]}</Typography>}
                      </TableCell>
                      <TableCell>
                      {isEditMode? 
                        <Typography align="center" variant="subtitle2">
                          <Input style={{width: 80, fontSize: 12}} name={supply} value={selectedHospital.properties.lab_need[supply]} 
                            onChange={handleOnChangeNeed}/> </Typography>
                        :<Typography align="center" style={{fontSize:12, fontWeight:350}}>{selectedHospital.properties.lab_need[supply]}</Typography>}
                      </TableCell>
                    </TableRow>
                  )}}}) : <TableRow>
                    <TableCell colSpan={3}><Typography variant="h4">Nothing to show</Typography></TableCell>
                  </TableRow>}
              </TableBody>
              {/*isEditMode?
                <TableFooter><Button onClick={()=>addSupply()}>Add new entry</Button></TableFooter>:<div/>*/}
            </Table></TableContainer>
        </Grid>
        <Grid item container direction='row' justify='flex-end'>
          {isEditMode ? 
            <div style={{position:"fixed", bottom:5, left:480}}>
              <Button className={classes.cancelButton} onClick={() => handleCancel()}>
                <CancelIcon/> <Typography variant="subtitle2">Cancel</Typography>
              </Button>
              <Button className={classes.button} onClick={() => handleSubmit()}>
                <DoneIcon/> <Typography variant="subtitle2">Save</Typography>
              </Button>
            </div>  
            : <div style={{position:"fixed", bottom:5, left:480}}>
              <Button className={classes.button} onClick={() => handleEdit()}>
                <EditIcon/> <Typography variant="subtitle2">Edit</Typography>
              </Button>
            </div>}
        </Grid>
      </Grid>
      </div>
    </ThemeProvider>
  )
}

export default withStyles(styles)(LabSupplies);
