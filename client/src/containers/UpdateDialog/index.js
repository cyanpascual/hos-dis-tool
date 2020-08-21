import React, {useState,useEffect} from 'react';
import { withStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import * as admBounds from './boundaries.json';

import { MenuItem, Paper, Grid, TextField, Button, FormControl, FormControlLabel, Checkbox, Input, TableHead, Select } from '@material-ui/core';

const axios = require('axios');

const styles = (theme) => ({
  root: {
    width: '100%',
    margin: 0,
    padding: theme.spacing(1),
    '& .MuiTextField-root': {
      margin: 0,
      width: '50ch',
    },
  },

  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },

  container: {
    display: 'grid',
    gridTemplateColumns: 'repeat(12, 1fr)',
    gridGap: theme.spacing(2),
    padding: theme.spacing(1),
  },

  paper: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    whiteSpace: 'nowrap',
    marginLeft: theme.spacing(1),
    marginBottom: theme.spacing(0),
    width: '50ch',
  },

  paper2: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    marginLeft: theme.spacing(1),
    marginBottom: theme.spacing(0),
  },

  divider: {
    margin: theme.spacing(1, 1),
  },

  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
    padding: theme.spacing(1),
  },

  actionsContainer: {
    marginBottom: theme.spacing(2),
  },

  resetContainer: {
    padding: theme.spacing(3),
  },

  table: {
    minWidth: 650,
  },

});

function createData(name, label, unit) {
  return { name, label, unit};
}

const levels = [
  {value: 'Level 1',label: 'Level 1',},
  {value: 'Level 2',label: 'Level 2',},
  {value: 'Level 3',label: 'Level 3',},
  {value: 'General',label: 'General',},
  {value: 'Specialty',label: 'Specialty',},
  {value: 'Infirmary',label: 'Infirmary',},
];

const listLicense = [
  {value: true,label: 'With License',},
  {value: false,label: 'Without License',},
];

const rows = [
  createData('Alcohol', 'alcohol','liter',),
  createData('Disinfectant', 'disinfectant','liter',),
  createData('Soap', 'soap','piece',),
  createData('Gown', 'gown','piece',),
  createData('Surgical Mask', 'surgmask','piece',),
  createData('N95 Mask', 'n95mask','piece',),
  createData('Gloves', 'gloves','pair',),
  createData('Shoe Cover', 'shoe_cover','pair',),
  createData('Coverall', 'coverall','piece',),
  createData('Goggles', 'goggles','pair',),
  createData('Face Shield', 'face_shield','piece',),
  createData('Head Cover', 'head_cover','piece',),
  createData('Tissue','tissue','roll/box',),
  createData('Vitamins','vitamins','piece',),
];

const rows2 = [
  createData('Filter Tip 200', 'filter_tip_200','piece',),
  createData('Filter Tip 10', 'filter_tip_10','piece',),
  createData('Micro Tube', 'micro_tube','piece',),
  createData('Cryogenic Vial', 'cryogenic_vial','piece',),
  createData('Biohazard Bag', 'biohazard_bag','piece',),
  createData('qPCR Plate', 'qpcr_plate','piece',),
  createData('Adhesive Film', 'adhesive_film','piece',),
  createData('Ethanol', 'ethanol','liter',),
  createData('Trash Bag', 'trash_bag','piece',),
  createData('ABS Sheet', 'abs_sheet','piece',),
  createData('NaCl', 'nacl','gram',),
];

const rows3 = [
  {name:'Brand1',},
  {name:'Brand2',},
  {name:'Brand3',},
]

function getSteps() {
  return ['Terms and Condition','Personnel Information', 'Hospital Information', 'Account Verification', 'Medical Supply Inventory Information', 'Testing Center Laboratory Supply Inventory Information'];
}

const DialogTitle = withStyles(styles)((props) => {

  const { children, classes, onClose, ...other } = props;
  const [date, setDate] = useState(new Date().toLocaleString());
  const [inputState, setInputState] = useState(false);
  const [inputState2, setInputState2] = useState(false);
  const [inputState3, setInputState3] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [stepCount, setStepCount] = useState(0);
  const [rtpcrInputs, setRtpcrInputs] = useState([]);
  const [rnaInputs, setRnaInputs] = useState([]);
  const [selectInputRna, setSelectInputRna] = useState('')
  const [selectInputRtpcr, setSelectInputRtpcr] = useState('')
  const [admRegions, setAdmRegions] = useState();
  const [admProvinces, setAdmProvinces] = useState();
  const [admCities, setAdmCities] = useState();
  const [province, setProvince] = useState('Select Province');
  const [iD, setId] = useState({
    regionID: '',
    provinceID:'',
    cityID: ''
  });
  const [selectedCity, setSelectedCity] = useState({
    type: '',
    properties :{
      ID_1 : '',
      ID_2 : '',
      PROVINCE: '',
      REGION : '',
      CITY : '',
      HOSPCOUNT3 : 0         
    },
    geometry :{
      type :'',
      coordinates : []
    }
  });
  const [selectedProvince, setSelectedProvince] = useState({
    type: '',
    properties :{
      HOSPCOUNT2 : 0,
      PROVINCE : '',
      REGION : ''
        
    },
    geometry :{
      type :'',
      coordinates : []
    }
  });
  const [selectedRegion, setSelectedRegion] = useState({
    type: '',
    properties :{
      REGION : '',
      HOSPCOUNT1 : 0
    },
    geometry :{
      type :'',
      coordinates : []
    }
  })
  const [btnDisabled, setbtnDisabled] = useState({
    next: true,
    confirm: false,
    verify: false
  });
  const [conPass, setConPass] = useState({
    value: ''
  });
  const [errorVal, setErrorval] = useState({
    pass: false,
    code: false,
    username: false,
    password: false
  });
  const [errorLabel, setErrorlabel] = useState({
    pass: '',
    code: '',
    username: '',
    password: ''
  });
  const [check, setCheck] = useState({
    checked1: false
  });
  const [user, setUser] = useState(
    {
      type: 'Hospital',
      properties: {
        Surname:'',
        Firstname:'',
        Designation:'',
        Affiliation:'',
        Contact:'',
        Email:'',
        Username:'',
        Password:'',
        HospitalID:''
      }
    }
  );
  const [hospital, setHospital] = useState({
        type: "Feature",
        typeOfFeat: "Hospital",
        data_drop: false,
        priority: false,
        test_center: false,
        numbers: false,
        score: "Low",
        properties:{
          cfname:"",
          hfhudcode:"",
          address:"",
          city:"Select City",
          prov:"Select Province",
          region:"Select Region",
          doh_level:"",
          capacity:{
            icu_v:0,
            icu_o:0,
            isolbed_v:0,
            isolbed_o:0,
            beds_ward_v:0,
            beds_ward_o:0,
            mechvent_v:0,
            mechvent_o:0
          },
          supply_need:{
            alcohol:0,
            disinfectant:0,
            soap:0,
            gown:0,
            surgmask:0,
            n95mask:0,
            gloves:0,
            shoe_cover:0,
            coverall:0,
            goggles:0,
            face_shield:0,
            head_cover:0,
            tissue:0,
            vitamins:0
          },
          lab_need:{
            rtpcr: [],
            rna_extraction: [],
            filter_tip_1000: 0,
            filter_tip_200: 0,
            filter_tip_10: 0,
            micro_tube: 0,
            cryogenic_vial: 0,
            biohazard_bag: 0,
            qpcr_plate: 0,
            adhesive_film: 0,
            ethanol: 0,
            trash_bag: 0,
            abs_sheet: 0,
            nacl: 0
          },
          supply_cur:{
            alcohol: 0,
            disinfectant: 0,
            soap: 0,
            gown: 0,
            surgmask: 0,
            n95mask: 0,
            gloves: 0,
            shoe_cover: 0,
            coverall: 0,
            goggles: 0,
            face_shield: 0,
            head_cover: 0,
            tissue: 0,
            vitamins: 0,
            other: ""
          },
          lab_cur:{
            rtpcr: [],
            rna_extraction: [],
            filter_tip_1000: 0,
            filter_tip_200: 0,
            filter_tip_10: 0,
            micro_tube: 0,
            cryogenic_vial: 0,
            biohazard_bag: 0,
            qpcr_plate: 0,
            adhesive_film: 0,
            ethanol: 0,
            trash_bag: 0,
            abs_sheet: 0,
            nacl: 0,
            other: ""
          },
          cont_person:"",
          cont_num: "",
          email: "",
          website: "",
          reportdate: "",
          assigned_num: "",
          assigned_token: "",
        },
        geometry:{
          type: "Point",
          coordinates: [122.077368,6.915024] //'122.077368','6.915024'
        }
        }
    );

  useEffect(()=>{
    async function fetchData(){
      const res = await axios.get('https://trams-up-dge.herokuapp.com/regions');
      const res2 = await axios.get('https://trams-up-dge.herokuapp.com/provinces');
      const res3 = await axios.get('https://trams-up-dge.herokuapp.com/cities');

      setAdmRegions(res.data);
      setAdmProvinces(res2.data);
      setAdmCities(res3.data);

    }
    fetchData();
  },[])

  useEffect(() => {
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
  }, [rnaInputs])

  useEffect(() => {
    if (selectInputRna){
      setHospital({
        ...hospital,
        properties: {
          ...hospital.properties,
          lab_cur: {
            ...hospital.properties.lab_cur,
            rna_extraction: selectInputRna.map((item) => {
              return item.lab_cur
            })
          },
          lab_need: {
            ...hospital.properties.lab_need,
            rna_extraction: selectInputRna.map((item) => {
              return item.lab_need
            })
          }, reportdate: user.properties.Username + ' on ' + date
        }
      })
    }
  }, [selectInputRna])

  useEffect(() => {
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
  }, [rtpcrInputs])

  useEffect(() => {
    if (selectInputRtpcr){
      setHospital({
        ...hospital,
        properties: {
          ...hospital.properties,
          lab_cur: {
            ...hospital.properties.lab_cur,
            rtpcr: selectInputRtpcr.map((item) => {
              return item.lab_cur
            })
          },
          lab_need: {
            ...hospital.properties.lab_need,
            rtpcr: selectInputRtpcr.map((item) => {
              return item.lab_need
            })
          }, reportdate: user.properties.Username + ' on ' + date
        }
      })
    }
  }, [selectInputRtpcr])

  useEffect(() => {
    if(hospital.properties.address !== '' && hospital.properties.city !== 'Select City' && hospital.properties.prov !== 'Select Province' && hospital.properties.region !== 'Select Region' && hospital.properties.cfname !== '' && hospital.properties.cont_num !== '' && hospital.properties.email !== '' && hospital.properties.hfhudcode !== '' && hospital.properties.doh_level !== ''){
      setbtnDisabled({...btnDisabled, next: false});
      setInputState(true)
    }
    else if(hospital.properties.address === '' || hospital.properties.city === 'Select City' || hospital.properties.prov === 'Select Province' || hospital.properties.region === 'Select Region' || hospital.properties.cfname === '' || hospital.properties.cont_num === '' || hospital.properties.email === '' || hospital.properties.hfhudcode === '' || hospital.properties.doh_level === ''){
      setbtnDisabled({...btnDisabled, next: true})
      setInputState(false)
    }
  },[hospital])

  useEffect(() => {
    if(activeStep === 1){
      if(user.properties.Firstname !== '' && user.properties.Surname !== '' && user.properties.Contact !== '' && user.properties.Designation !== '' && user.properties.Email !== ''){
        setbtnDisabled({...btnDisabled, next: false});
        setInputState2(true)
      }
      else if(user.properties.Firstname === '' || user.properties.Surname === '' || user.properties.Contact === '' || user.properties.Designation === '' || user.properties.Email === ''){
        setbtnDisabled({...btnDisabled, next: true});
        setInputState2(false)
      }
    }
  },[user])
  
  useEffect(()=>{
    if(activeStep === 2){
      if(user.properties.Password === conPass.value && user.properties.Password !== ''){
        setInputState3(true)
      }
      else if(user.properties.Password !== conPass.value){
        setInputState3(false)
      }
    }
  },[user, conPass])

  const boundaryUpdate = () =>{

    setId({
      ...iD,
      ['regionID'] : (admRegions.find(res => res.properties.REGION === hospital.properties.region)._id),
      ['provinceID'] : (admProvinces.find(res => res.properties.PROVINCE === hospital.properties.prov)._id),
      ['cityID'] : (admCities.find(res => res.properties.CITY === hospital.properties.city)._id)
    });

    setSelectedCity({
      ...selectedCity,
      type: admCities.find(res => res.properties.CITY === hospital.properties.city && res.properties.REGION === hospital.properties.region).type,
      properties: {
        ...selectedCity.properties,
        ID_1 : admCities.find(res => res.properties.CITY === hospital.properties.city && res.properties.REGION === hospital.properties.region).properties.ID_1,
        ID_2 : admCities.find(res => res.properties.CITY === hospital.properties.city && res.properties.REGION === hospital.properties.region).properties.ID_2,
        PROVINCE: admCities.find(res => res.properties.CITY === hospital.properties.city && res.properties.REGION === hospital.properties.region).properties.PROVINCE,
        REGION : admCities.find(res => res.properties.CITY === hospital.properties.city && res.properties.REGION === hospital.properties.region).properties.REGION,
        CITY : admCities.find(res => res.properties.CITY === hospital.properties.city && res.properties.REGION === hospital.properties.region).properties.CITY,
        HOSPCOUNT3 : admCities.find(res => res.properties.CITY === hospital.properties.city && res.properties.REGION === hospital.properties.region).properties.HOSPCOUNT3 + 1 
      },
      geometry: {
        ...selectedCity.geometry,
        type: admCities.find(res => res.properties.CITY === hospital.properties.city && res.properties.REGION === hospital.properties.region).geometry.type,
        coordinates: admCities.find(res => res.properties.CITY === hospital.properties.city && res.properties.REGION === hospital.properties.region).geometry.coordinates,
      }
    })

    setSelectedProvince({
      ...selectedProvince,
      type: admProvinces.find(res => res.properties.PROVINCE === hospital.properties.prov && res.properties.REGION === hospital.properties.region).type,
      properties: {
        ...selectedProvince.properties,
        HOSPCOUNT2 : admProvinces.find(res => res.properties.PROVINCE === hospital.properties.prov && res.properties.REGION === hospital.properties.region).properties.HOSPCOUNT2 + 1,
        PROVINCE: admProvinces.find(res => res.properties.PROVINCE === hospital.properties.prov && res.properties.REGION === hospital.properties.region).properties.PROVINCE,
        REGION : admProvinces.find(res => res.properties.PROVINCE === hospital.properties.prov && res.properties.REGION === hospital.properties.region).properties.REGION, 
      },
      geometry: {
        ...selectedProvince.geometry,
        type: admProvinces.find(res => res.properties.PROVINCE === hospital.properties.prov && res.properties.REGION === hospital.properties.region).geometry.type,
        coordinates: admProvinces.find(res => res.properties.PROVINCE === hospital.properties.prov && res.properties.REGION === hospital.properties.region).geometry.coordinates,
      }
    })

    setSelectedRegion({
      ...selectedRegion,
      type: admRegions.find(res => res.properties.REGION === hospital.properties.region).type,
      properties: {
        ...selectedRegion.properties,
        REGION : admRegions.find(res => res.properties.REGION === hospital.properties.region).properties.REGION,
        HOSPCOUNT1 : admRegions.find(res => res.properties.REGION === hospital.properties.region).properties.HOSPCOUNT1 + 1, 
      },
      geometry: {
        ...selectedRegion.geometry,
        type: admRegions.find(res => res.properties.REGION === hospital.properties.region).geometry.type,
        coordinates: admRegions.find(res => res.properties.REGION === hospital.properties.region).geometry.coordinates,
      }
    })
  }

  const handleSubmit = () =>{
    
    handleNext();
    console.log(user);
    console.log(hospital);
    console.log(selectedCity);
    console.log(selectedProvince);
    console.log(selectedRegion);
    
    axios.post(`https://trams-up-dge.herokuapp.com/regions/update/${iD.regionID}`, selectedRegion)
        .then(res => console.log(res.data))
        .catch(error => console.log(error));
    axios.post(`https://trams-up-dge.herokuapp.com/provinces/update/${iD.provinceID}`, selectedProvince)
        .then(res => console.log(res.data))
        .catch(error => console.log(error));
    axios.post(`https://trams-up-dge.herokuapp.com/cities/update/${iD.cityID}`, selectedCity)
        .then(res => console.log(res.data))
        .catch(error => console.log(error));
    axios.post(`https://trams-up-dge.herokuapp.com/uz3rz/add`, user)
        .then(res => console.log(res.data))
        .catch(error => console.log(error));
    axios.post(`https://trams-up-dge.herokuapp.com/h0zPiTaLs/add`, hospital)
        .then(res => console.log(res.data))
        .catch(error => console.log(error));
  }
  
  const handleCheck = (event) =>{ //terms and agreement
    setCheck({...check, checked1: event.target.checked});
    setbtnDisabled({...btnDisabled, next: !event.target.checked})
  }
  
  const handleOnchangePersonnel = (e) =>{ //personnel information
    setUser({
      ...user,
      properties:{
        ...user.properties,
        [e.target.name]: e.target.value
      }
    })

    if(e.target.name === 'Username'){
      if(e.target.value.length < 6){
        setErrorval({...errorVal, username: true});
        setErrorlabel({...errorLabel, username: 'Must be at least 6 Characters.'});
      }
      else if(e.target.value.length === 6 || e.target.value.length > 6){
        setErrorval({...errorVal, username: false});
        setErrorlabel({...errorLabel, username: ''});
      }
    }
    else if(e.target.name === 'Password'){
      if(e.target.value.length < 6){
        setErrorval({...errorVal, password: true});
        setErrorlabel({...errorLabel, password: 'Must be at least 6 Characters.'});
      }
      else if(e.target.value.length === 6 || e.target.value.length > 6){
        setErrorval({...errorVal, password: false});
        setErrorlabel({...errorLabel, password: ''});
      }
    }
  }

  const handleOnchangehospital = (e) =>{ //hospital information (profile)
    setHospital({
      ...hospital,
      properties:{
        ...hospital.properties,
        [e.target.name]: e.target.value
      }
    })
    if(e.target.name === 'cfname'){
      setUser({
        ...user,
        properties:{
          ...user.properties,
          ['Affiliation']: e.target.value
        }
      })
    }
    else if(e.target.name === 'hfhudcode'){
      if(e.target.value < 0){
        setUser({
          ...user,
          properties:{
            ...user.properties,
            ['Username']: Math.abs(e.target.value),
            ['HospitalID']: Math.abs(e.target.value)
          }
        })
      }
      else{
        setUser({
          ...user,
          properties:{
            ...user.properties,
            ['Username']: e.target.value,
            ['HospitalID']: e.target.value
          }
        })
      } 
    }
    else if(e.target.name === 'test_center'){
      setHospital({
        ...hospital,
        [e.target.name]: e.target.value
      })
    }
    else if(e.target.name === 'region'){
      setProvince('Select Province')
    }
    else if(e.target.name === 'prov'){
      setProvince(e.target.value)
    }
  }

  const handleConfirmPass = (e) =>{
    setConPass({...conPass, value: e.target.value})
    if(e.target.value.length < 6){
      setErrorval({...errorVal, pass: true});
      setErrorlabel({...errorLabel, pass: 'Must be at least 6 Characters.'});
    }
    else if(e.target.value.length === 6 || e.target.value.length > 6){
      setErrorval({...errorVal, pass: false});
      setErrorlabel({...errorLabel, pass: ''});
    }
  }

  const handleConfirm = (e) =>{
    boundaryUpdate();
    if(user.properties.Password.length === 0 && conPass.value.length === 0){
      setErrorval({...errorVal, 
        pass: true,
        username: false,
        password: true,
      });
      setErrorlabel({...errorLabel, 
        pass: 'No value entered!',
        username: '',
        password: 'No value entered!'
      });
    }
    else if(user.properties.Password.length === 0){
      setErrorval({...errorVal, 
        pass: false,
        username: false,
        password: true,
      });
      setErrorlabel({...errorLabel, 
        pass: '',
        username: '',
        password: 'No value entered!'
      });
    }    
    else if(conPass.value.length === 0){
      setErrorval({...errorVal, 
        pass: true,
        username: false,
        password: false,
      });
      setErrorlabel({...errorLabel, 
        pass: 'No value entered!',
        username: '',
        password: ''
      });
    }       
    else if(user.properties.Password.length > 5 && conPass.value.length > 5){
      if(conPass.value === user.properties.Password){
        setErrorval({...errorVal, pass: false});
        setErrorlabel({...errorLabel, pass: ''});
        setbtnDisabled({...btnDisabled, next: false}) 
      }
      else if(conPass.value !== user.properties.Password){
        setErrorval({...errorVal, pass: true});
        setErrorlabel({...errorLabel, pass: 'Password does not match'})
        setbtnDisabled({...btnDisabled, next: true})  
      }
    }
  }

  const handleOnchangeSupCur = (e) =>{

    if (e.target.value < 0){
      setHospital({
        ...hospital,
        properties:{
          ...hospital.properties,
          supply_cur:{
            ...hospital.properties.supply_cur,
            [e.target.name]: Math.abs(e.target.value)
          }
        }
      })
    } 
    else {
      setHospital({
        ...hospital,
        properties:{
          ...hospital.properties,
          supply_cur:{
            ...hospital.properties.supply_cur,
            [e.target.name]: e.target.value
          }
        }
      })
    }
  }

  const handleOnchangeSupNeed = (e) =>{
    
    if(e.target.value < 0){
      setHospital({
        ...hospital,
        properties:{
          ...hospital.properties,
          supply_need:{
            ...hospital.properties.supply_need,
            [e.target.name]: Math.abs(e.target.value)
          }
        }
      })
    }
    else {
      setHospital({
        ...hospital,
        properties:{
          ...hospital.properties,
          supply_need:{
            ...hospital.properties.supply_need,
            [e.target.name]: e.target.value
          }
        }
      })
    }
  }

  const handleOnchangeLabCur = (e) =>{

    const re = /^[0-9\b]+$/;
    
    if(e.target.value < 0){
      setHospital({
        ...hospital,
        properties:{
          ...hospital.properties,
          lab_cur:{
            ...hospital.properties.lab_cur,
            [e.target.name]: Math.abs(e.target.value)
          }
        }
      })
    }
    else {
      setHospital({
        ...hospital,
        properties:{
          ...hospital.properties,
          lab_cur:{
            ...hospital.properties.lab_cur,
            [e.target.name]: e.target.value
          }
        }
      })
    }
    
  }

  const handleOnchangeLabNeed = (e) =>{
    const re = /^[0-9\b]+$/;
    
    if(e.target.value < 0){
      setHospital({
        ...hospital,
        properties:{
          ...hospital.properties,
          lab_need:{
            ...hospital.properties.lab_need,
            [e.target.name]: Math.abs(e.target.value)
          }
        }
      })
    }
    else {
      setHospital({
        ...hospital,
        properties:{
          ...hospital.properties,
          lab_need:{
            ...hospital.properties.lab_need,
            [e.target.name]: e.target.value
          }
        }
      })
    }
  }

  const handleOnChangeRtpcr = index => event => {
    const {name, value} = event.target;

    const newInput = [...rtpcrInputs];
    const re = /^[0-9\b]+$/;
    if (name !== 'brand'){
      if (re.test(value)){
        newInput[index][name] = Math.abs(value)
      } else if (value === ''){
        newInput[index][name] = value
      }
    } else {
      newInput[index][name] = value
    }
    setRtpcrInputs(newInput)
  }

  const handleOnChangeRna = index => event => {
    const {name, value} = event.target;

    const newInput = [...rnaInputs];
    const re = /^[0-9\b]+$/;
    if (name !== 'brand'){
      if (re.test(value)){
        newInput[index][name] = Math.abs(value)
      } else if (value === ''){
        newInput[index][name] = value
      }
    } else {
      newInput[index][name] = value
    }
    setRnaInputs(newInput)
  }

  const addSupply = (name) =>{
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

  const deleteInput = (brand, type, index) => {
    if (type === 'rna'){
      setRnaInputs(rnaInputs.filter((item) => item.brand !== brand))
    } else {
      setRtpcrInputs(rtpcrInputs.filter((item) => item.brand !== brand))
    }
  }
  
  const steps = getSteps();

  const handleNext = (e) => {

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setStepCount((stepCount) => stepCount + 1);

    if((activeStep === 0 && inputState2 === false) || (activeStep == 1 && inputState === false) || (activeStep == 2 && inputState3 === false) ){ //|| (activeStep == 0 && stepCount == 0)
      setbtnDisabled({...btnDisabled, next: true})
    }
    else if(activeStep !== 2 || activeStep !== 1 || activeStep !== 0){
      setbtnDisabled({...btnDisabled, next: false})
    }   
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    setbtnDisabled({...btnDisabled, next: false})
  };

  // const handleReset = () => {
  //   setActiveStep(0);
  // };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return termsConditions();
      case 1:
        return personnelInformation();
      case 2:
        return hospitalInformation();
      case 3:
        return accountVerification();
      case 4:
        return medSupplies();
      case 5:
        if(hospital.test_center === true){
          return labSupplies();
        }
        else{
          return notTestingcenter();
        }
    }
  }
  
  const termsConditions = () =>(
    <div className={classes.root}>
    <Grid item xs={12} container justify="center" spacing={1}>
      <Grid item xs={12} justify="center" spacing={2}>
        <Paper className={classes.paper2} fullWidth textAlign='center'>
        <Grid item xs={12} justify='center'>
        <Typography align='center' color='tertiary' display='block' variant="body2" gutterBottom paragraph>
          On behalf of my organization, I consent to be identified as a partner organization of TrAMS+ in project documents and published publicity materials.
        </Typography>
        </Grid>
        <Grid item xs={12} justify='center'>
        <Typography align='center' color='tertiary' variant="body2" gutterBottom paragraph>
          I agree to the proper and lawful use of any information provided herein for the implementation of TrAMS+. With this, TrAMS+ shall be held liable to any misuse of information.
        </Typography>  
        </Grid>
        <Grid item xs={12} justify='center'>
        <Typography align='center' color='tertiary' variant="body2" gutterBottom paragraph>
          I certify, to the best of my knowledge, that the information I provide herein are true and valid.
        </Typography>  
        </Grid>
        </Paper>
      </Grid>
      <Grid item xs={8} fullwidth container justify="center">
        <Paper container className={classes.paper}>
          <FormControl component="fieldset">
            <FormControlLabel
              control={<Checkbox checked={check.checked1} onChange={handleCheck} color="primary" />}
              label="I agree to the Terms and Conditions!"
              labelPlacement="end"
            />
          </FormControl>
        </Paper>
      </Grid>
    </Grid>     
    </div>
  )

  const personnelInformation = () =>(
    <form className={classes.root} noValidate autoComplete="off">
      <div>
      <Grid item xs={12} container justify="center" spacing={1}>
        <Grid container justify="center" spacing={1}>
          <Grid item xs={6} container justify="flex-end"><Paper className={classes.paper}>First Name</Paper></Grid>
          <Grid item xs={6} container justify="flex-start"><TextField value={user.properties.Firstname} name="Firstname" onChange={e => handleOnchangePersonnel(e)} variant="outlined" size="small"/></Grid>
          <Grid item xs={6} container justify="flex-end"><Paper className={classes.paper}>Last Name</Paper></Grid>
          <Grid item xs={6} container justify="flex-start"><TextField value={user.properties.Surname} name="Surname" onChange={e => handleOnchangePersonnel(e)} variant="outlined" size="small"/></Grid>
          <Grid item xs={6} container justify="flex-end"><Paper className={classes.paper}>Mobile Number</Paper></Grid>
          <Grid item xs={6} container justify="flex-start"><TextField type="number" value={user.properties.Contact} name="Contact" onChange={e => handleOnchangePersonnel(e)} variant="outlined" size="small"/></Grid>    
          <Grid item xs={6} container justify="flex-end"><Paper className={classes.paper}>Email Address</Paper></Grid>
          <Grid item xs={6} container justify="flex-start"><TextField value={user.properties.Email} type="email" name="Email" onChange={e => handleOnchangePersonnel(e)} variant="outlined" size="small"/></Grid>
          <Grid item xs={6} container justify="flex-end"><Paper className={classes.paper}>Designation</Paper></Grid>
          <Grid item xs={6} container justify="flex-start"><TextField value={user.properties.Designation} name="Designation" onChange={e => handleOnchangePersonnel(e)} variant="outlined" size="small"/></Grid>
        </Grid>
      </Grid>
      </div>
    </form>
  )

  const hospitalInformation = () =>(
    <form className={classes.root} noValidate autoComplete="off">
    <div>
    <Grid item xs={12} container justify="center" spacing={1}>
      <Grid item xs={12} container justify="flex-start">
        <Typography style={{fontSize:20, fontWeight:350}}>Profile</Typography>
      </Grid>
      <Grid item xs={8} container justify="center" spacing={1}>
        <Grid item xs={6} container justify="flex-end"><Paper className={classes.paper}>Name of Hospital</Paper></Grid>
        <Grid item xs={6} container justify="flex-start"><TextField value={hospital.properties.cfname} name="cfname" onChange={e =>handleOnchangehospital(e)} variant="outlined" size="small"/></Grid>
        <Grid item xs={6} container justify="flex-end"><Paper className={classes.paper}>Head of Hospital</Paper></Grid>
        <Grid item xs={6} container justify="flex-start"><TextField value={hospital.properties.cont_person} name="cont_person" onChange={e =>handleOnchangehospital(e)} variant="outlined" size="small"/></Grid>
        <Grid item xs={6} container justify="flex-end"><Paper className={classes.paper}>Contact Numbers</Paper></Grid>
        <Grid item xs={6} container justify="flex-start"><TextField value={hospital.properties.cont_num} name="cont_num" onChange={e =>handleOnchangehospital(e)} variant="outlined" size="small"/></Grid>
        <Grid item xs={6} container justify="flex-end"><Paper className={classes.paper}>Email Addresses</Paper></Grid>
        <Grid item xs={6} container justify="flex-start"><TextField value={hospital.properties.email} type="email" name="email" onChange={e =>handleOnchangehospital(e)} variant="outlined" size="small"/></Grid>
        <Grid item xs={6} container justify="flex-end"><Paper className={classes.paper}>Website</Paper></Grid>
        <Grid item xs={6} container justify="flex-start"><TextField value={hospital.properties.website} name="website" onChange={e =>handleOnchangehospital(e)} variant="outlined" size="small"/></Grid>
        <Grid item xs={6} container justify="flex-end"><Paper className={classes.paper}>Health Facility Code</Paper></Grid>
        <Grid item xs={6} container justify="flex-start"><TextField value={hospital.properties.hfhudcode} name="hfhudcode" onChange={e =>handleOnchangehospital(e)} type="number" variant="outlined" size="small"/></Grid>
        <Grid item xs={6} container justify="flex-end"><Paper className={classes.paper}>Service Capability Level</Paper></Grid>
        <Grid item xs={6} container justify="flex-start">
        <TextField select value={hospital.properties.doh_level} name="doh_level" onChange={e =>handleOnchangehospital(e)}> 
          {levels.map((option) => (<MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>))}
        </TextField>
        </Grid>
        <Grid item xs={6} container justify="flex-end"><Paper className={classes.paper}>Testing Center License</Paper></Grid>
        <Grid item xs={6} container justify="flex-start">
        <TextField select value={hospital.test_center} name="test_center" onChange={e =>handleOnchangehospital(e)} >
          {listLicense.map((option) => (<MenuItem key={option.label} value={option.value}>{option.label}</MenuItem>))}
        </TextField>
        </Grid>
        <Grid item xs={6} container justify="flex-end"><Paper className={classes.paper2}>You may check your Health Facility Code by clicking this button.</Paper></Grid>
        <Grid item xs={6} container justify="flex-end">
          <Button  variant="contained" color="primary" href="https://nhfr.doh.gov.ph/rfacilities2list.php" fullWidth>
              National Health Facility Registry (NHFR) Database
          </Button>
        </Grid>
      </Grid>
      <Grid item xs={12} container justify="flex-start">
        <Typography align="flex-start" style={{fontSize:20, fontWeight:350}}>Address</Typography>
      </Grid>
      <Grid item xs={8} container justify="center" spacing={1}>
          <Grid item xs={6} container justify="flex-end"><Paper className={classes.paper}>Region</Paper></Grid>
          <Grid item xs={6} container justify="flex-start">
            <TextField select value={hospital.properties.region} name="region" onChange={e=>handleOnchangehospital(e)} >
                {admBounds.boundariesList.map((option) => (<MenuItem key={option.value} value={option.value}>{option.value}</MenuItem>))}
            </TextField>
          </Grid>
          <Grid item xs={6} container justify="flex-end"><Paper className={classes.paper}>Province</Paper></Grid>
          <Grid item xs={6} container justify="flex-start">
            <TextField select value={province} name="prov" onChange={e =>handleOnchangehospital(e)}>
              {admBounds.boundariesList.find(reg=> reg.value === hospital.properties.region).provinces.map((option) => (<MenuItem key={option.prov} value={option.prov}>{option.prov}</MenuItem>))}
            </TextField>
          </Grid>
          <Grid item xs={6} container justify="flex-end"><Paper className={classes.paper}>City</Paper></Grid>
          <Grid item xs={6} container justify="flex-start">
            <TextField select value={hospital.properties.city} name="city" onChange={e =>handleOnchangehospital(e)}>
              {admBounds.boundariesList.find(reg=> reg.value === hospital.properties.region).provinces.find(prov => prov.prov === province).muni.map((option) => (
                <MenuItem key={option.mun} value={option.mun}>{option.mun}</MenuItem>))}
            </TextField>
          </Grid>
          <Grid item xs={6} container justify="flex-end"><Paper className={classes.paper}>Address</Paper></Grid>
          <Grid item xs={6} container justify="flex-start"><TextField id="address" value={hospital.properties.address} name="address" onChange={e =>handleOnchangehospital(e)} variant="outlined" size="small"/></Grid>
      </Grid>
    </Grid>
    </div>
    </form>
  )
 
  const accountVerification = () =>(
    <form className={classes.root} noValidate autoComplete="off">
    <div>
      <Grid item xs={12} container justify="center" spacing={1}>
        <Grid item xs={8} container justify="center" spacing={2}>

          <Grid item xs={12} container justify="center" spacing={1}> 
            <Grid item xs={12} container justify="center" spacing={1}>
              <Grid item xs={6} container justify="flex-end"><Paper className={classes.paper} >Username</Paper></Grid>
              <Grid item xs={6} container justify="flex-start"><Typography variant="h5" align='center' gutterBottom>{user.properties.Username}</Typography></Grid>
            </Grid>
            <Grid item xs={12} container justify="center" spacing={1}>
              <Grid item xs={6} container justify="flex-end"><Paper className={classes.paper}>Password</Paper></Grid>
              <Grid item xs={6} container justify="flex-start"><TextField error={errorVal.password} label={errorLabel.password} type="password" value={user.properties.Password} name="Password" onChange={e => handleOnchangePersonnel(e)} variant="outlined" size="small"/></Grid>
            </Grid>
            <Grid item xs={12} container justify="center"spacing={1}>
              <Grid item xs={6} container justify="flex-end"><Paper className={classes.paper}>Confirm Password</Paper></Grid>
              <Grid item xs={6} container justify="flex-start"><TextField error={errorVal.pass} label={errorLabel.pass} type="password" value={conPass.value} onChange={e=>handleConfirmPass(e)} variant="outlined" size="small"/></Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} container justify="center" spacing={1}> 
            <Grid item xs={8} container justify="center" spacing={1}>
              <Button disabled={btnDisabled.confirm} variant="contained" color="primary" onClick={e=>handleConfirm(e)} fullWidth>
                Confirm Credentials
              </Button>
            </Grid>
          </Grid>

        </Grid>
      </Grid>
    </div>
    </form>
  )

  const medSupplies = () =>(
    <form className={classes.root} noValidate autoComplete="off">
    <div>
    <Grid item xs={12} container justify="center" spacing={1}>
      <Grid item xs={12} container justify="flex-start">
        <Typography align="center" style={{fontSize:16, fontWeight:350}}>Medical Supplies Inventory</Typography>
      </Grid>
      <Grid xs={12} justify="center">
      <TableContainer component={Paper}>
        <Table className={classes.table} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>Medical Supply</TableCell>
              <TableCell align="right">Unit</TableCell>
              <TableCell align="right">Current Supply</TableCell>
              <TableCell align="right">Weekly Need</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.name}>
                <TableCell component="th" scope="row">{row.name}</TableCell>
                <TableCell align="right">{row.unit}</TableCell>
                <TableCell align="right"><Input type='number' value={hospital.properties.supply_cur[row.label]} name={row.label} onChange={e=>handleOnchangeSupCur(e)} width="50px"/></TableCell>
                <TableCell align="right"><Input type='number' value={hospital.properties.supply_need[row.label]} name={row.label} onChange={e=>handleOnchangeSupNeed(e)}width="50px"/></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      </Grid>
    </Grid>
    </div>
    </form>
  )

  const notTestingcenter = () =>(
    <div>
      <Grid item xs={10} container justify="center">
        <Typography variant="body2" gutterBottom paragraph>
          This section will only be available if the hospital is a testing center. Kindly select Finish to submit. Thank you very much!
        </Typography>
      </Grid>
    </div>
  )

  const labSupplies = () =>(
    <form className={classes.root} noValidate autoComplete="off">
    <div>
    <Grid item xs={12} container justify="center" spacing={1}>
      <Grid item xs={12} container justify="flex-start">
        <Typography align="center" style={{fontSize:16, fontWeight:350}}>RTPCR Testing Kits</Typography>
      </Grid>
      <Grid item xs={12} container justify="center">
      <TableContainer component={Paper}>
        <Table className={classes.table} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>
                <Button variant="contained" color="primary" width='25ch' onClick={()=>addSupply('rtpcr')}>
                  Add Entry
                </Button>
              </TableCell>
              <TableCell align="right">Brand</TableCell>
              <TableCell align="right">Current Supply</TableCell>
              <TableCell align="right">Weekly Need</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rtpcrInputs.map((item, index) => (
              <TableRow key={index}>
                <TableCell component="th" scope="row">
                  <Button variant="contained" color="primary" width='25ch' onClick={() => deleteInput(item.brand, 'rtpcr', index)}>
                    Delete
                  </Button>
                </TableCell>
                <TableCell align="right"><Input width="50px" value={item.brand} name='brand' onChange={handleOnChangeRtpcr(index)}/></TableCell>
                <TableCell align="right"><Input type='number' width="50px" value={item.value_cur} name='value_cur' onChange={handleOnChangeRtpcr(index)}/></TableCell>
                <TableCell align="right"><Input type='number' width="50px" value={item.value_need} name='value_need' onChange={handleOnChangeRtpcr(index)}/></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      </Grid>
      <Grid item xs={12} container justify="flex-start">
        <Typography align="center" style={{fontSize:16, fontWeight:350}}>RNA Extraction Kits</Typography>
      </Grid>
      <Grid item xs={12} container justify="center"> 
      <TableContainer component={Paper}>
        <Table className={classes.table} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>
                <Button variant="contained" color="primary" width='25ch' onClick={()=>addSupply('rna_extraction')}>
                  Add Entry
                </Button>
              </TableCell>
              <TableCell align="right">Brand</TableCell>
              <TableCell align="right">Current Supply</TableCell>
              <TableCell align="right">Weekly Need</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rnaInputs.map((item, index) => (
              <TableRow key={index}>
                <TableCell component="th" scope="row">
                  <Button variant="contained" color="primary" width='25ch' onClick={() => deleteInput(item.brand, 'rna', index)}>
                    Delete
                  </Button>
                </TableCell>
                <TableCell align="right"><Input width="50px" value={item.brand} name='brand' onChange={handleOnChangeRna(index)}/></TableCell>
                <TableCell align="right"><Input type='number' width="50px" value={item.value_cur} name='value_cur' onChange={handleOnChangeRna(index)}/></TableCell>
                <TableCell align="right"><Input type='number' width="50px" value={item.value_need} name='value_need' onChange={handleOnChangeRna(index)}/></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      </Grid>
      
      <Grid item xs={12} container justify="flex-start">
        <Typography align="center" style={{fontSize:16, fontWeight:350}}>Testing Center Laboratory Supplies</Typography>
      </Grid>
      <Grid item xs={12} container justify="center"> 
      <TableContainer component={Paper}>
        <Table className={classes.table} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>Medical Supply</TableCell>
              <TableCell align="right">Unit</TableCell>
              <TableCell align="right">Current Supply</TableCell>
              <TableCell align="right">Weekly Need</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows2.map((row) => (
              <TableRow key={row.name}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.unit}</TableCell>
                <TableCell align="right"><Input type='number' width="50px" value={hospital.properties.lab_cur[row.label]} name={row.label} onChange={e=>handleOnchangeLabCur(e)}/></TableCell>
                <TableCell align="right"><Input type='number' width="50px" value={hospital.properties.lab_need[row.label]} name={row.label} onChange={e=>handleOnchangeLabNeed(e)}/></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      </Grid>
    </Grid>
    </div>
    </form>
  )

  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}

      <div className={classes.root}>
        <Stepper activeStep={activeStep} orientation="vertical">
          {steps.map((label, index) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
              <StepContent>
                <Typography>{getStepContent(index)}</Typography>
                <div className={classes.actionsContainer}>
                  <div>
                    <Grid item xs={12} container justify="flex-end" spacing={2}>
                    <Button
                      disabled={activeStep === 0}
                      onClick={handleBack}
                      className={classes.button}
                    >
                      Back
                    </Button>
                    <Button
                      disabled={btnDisabled.next}
                      variant="contained"
                      color="primary"
                      onClick={()=>{activeStep === steps.length - 1 ? handleSubmit() : handleNext()}}
                      className={classes.button}
                    >
                      {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                    </Button>
                    </Grid>
                  </div>
                </div>
              </StepContent>
            </Step>
          ))}
        </Stepper>
        {activeStep === steps.length && (
          <Paper square elevation={0} className={classes.resetContainer}>
            <Typography>All steps completed - you&apos;re finished. You may login to TrAMS+ through www.trams.com.ph/login or clicking the "Login" button</Typography>
            <Button href="https://trams.com.ph/login" variant="contained" color="primary" >
              LOGIN
            </Button>
          </Paper>
        )}
      </div>
    </MuiDialogTitle>  
    );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);


export default function UpdateDialog() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <ListItem button color="inherit" onClick={handleClickOpen} >
        Register Hospital
      </ListItem>
      <Dialog fullScreen={true} onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose} style={{height:60}}/>
      </Dialog>
    </div>
  )

}
