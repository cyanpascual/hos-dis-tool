import React, { useState, useEffect, useContext } from 'react';
import { MapsContext } from '../../contexts/MapsContext';
import { LoginContext } from '../../contexts/LoginContext';
import { FeaturesContext } from '../../contexts/FeaturesContext';
//import ReactGoogleSheets from 'react-google-sheets';
import TextField from '@material-ui/core/TextField';
import { createStyles, makeStyles, createMuiTheme, ThemeProvider, withStyles } from '@material-ui/core/styles';
import { Card, CardContent, Hidden, CardActions, Button, CardHeader, Link, Dialog, DialogTitle, DialogActions, DialogContent, Typography } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import HospitalList from './userValidator';
import Personnel from './Personnel';
import OrganizerPage from '../OrganizerPage'
import PersonnelMobile from './PersonnelMobile';
import axios from 'axios';
import EmailIcon from '@material-ui/icons/Email';
import FacebookIcon from '@material-ui/icons/Facebook';
import * as serviceWorker from '../../serviceWorker';
import { useReactPWAInstall } from "react-pwa-install";
import myLogo from '../../assets/logos/logo192.png'

import PropTypes from "prop-types";
import { DriveEtaRounded } from '@material-ui/icons';



const useStyles = makeStyles((theme) =>
  createStyles({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
      justify: 'center',
      width: 400,
      margin: `${theme.spacing(0)} auto`
    },
    loginBtn: {
      marginTop: theme.spacing(2),
      flexGrow: 1,
      background: '#800000',
      color: '#fff'
    },
    but: {
      marginTop: theme.spacing(2),
      flexGrow: 1,
      background: '#993232',
      color: '#fff'
    },
    header: {
      textAlign: 'center',
      background: '#660000',
      color: '#fff'
    },
    card: {
      marginTop: theme.spacing(10)
    },
    dialog: {

    }

  }),
);

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
  fontSize: '3vw',
  [theme.breakpoints.up('sm')]: {
    fontSize: 14,
  }, fontWeight: 400
};
theme.typography.h3 = {
  fontSize: '4vw',
  [theme.breakpoints.up('sm')]: {
    fontSize: 16,
  }, fontWeight: 500
};
theme.typography.h2 = {
  fontSize: '4vw',
  [theme.breakpoints.up('sm')]: {
    fontSize: 20,
  }, fontWeight: 500
};



function Login(props) {
  const { updateCell, getSheetsData } = props;
  const { hospitalList, setHospitalList, setHospitals } = useContext(FeaturesContext)
  const { pwaInstall, supported, isInstalled } = useReactPWAInstall();
  const { setSelectedHospital } = useContext(MapsContext);
  const { users, setUsers, login, setLogin, setUser, username, setUsername, password, setPassword, helperText, setHelperText, allowed} = useContext(LoginContext);

  const classes = useStyles();

  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [error, setError] = useState(false);
  const [accountType, setAccountType] = useState('');
  const [open, setOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);
  //const [sheetLoaded, setSheetLoaded] = useState(false);

  useEffect(() => {
    if (username.trim() && password.trim()) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
    setHelperText('');
  }, [username, password]);

  useEffect(() => {
    setHelperText('');
    const fetchData = async () => {
      const res = await axios('https://trams-up-dge.herokuapp.com/uz3rz', );
      const res3 = await axios('https://trams-up-dge.herokuapp.com/h0zPiTaLs', )

      setUsers(res.data);
      setHospitals(res3.data);
      setHospitalList(res3.data);
      //console.log(res2.data)
      setLoaded(true)
    }

    fetchData();
  }, [])

  const handleClick = () => {
    pwaInstall({
      title: "Install TrAMS+ login",
      logo: myLogo,
      features: (
        <ul>
          <li>This is a beta test</li>
          <li>Please respond to the feedback form if it works or not</li>
          <li>This feature should install the app on your device</li>
          <li>Should work offline</li>
        </ul>
      ),
      description: "Add TrAMS+ login to your device for easier access.",
    })
      .then(() => alert("App installed successfully"))
      .catch(() => alert("User opted out from installing"));
  };

  const handleLogin = (e) => {
    //e.preventDefault();

    /*const userData = {
      email: username,
      password: password,
    };

    dispatch(loginUser(userData));*/

    let ob = users.filter(data => data.properties.Username === username);
    if (ob.length > 0){
      if (ob[0].properties.Password === password){
        if (ob[0].type === 'Hospital'){
          let hos = hospitalList.filter(hospital => hospital.properties.hfhudcode === username);
          setSelectedHospital(hos[0]);
        } else {
          setSelectedHospital(null)
        }
        setUser(ob[0]);
        setLogin(true);
        setError(false);
        setAccountType(ob[0].type)
        /*let dataHospi = parseInt(getSheetsData('Sample db sheets')[0].data[0][1])
        let dataVali = parseInt(getSheetsData('Sample db sheets')[0].data[0][0])
        if (ob[0].type === 'Validator'){
          updateCell('Sheet1', 'A', '2', dataVali + 1, null, (error) => {
            console.log('error', error)
          })
        } else if (ob[0].type === 'Hospital'){

          updateCell('Sheet1', 'B', '2', dataHospi + 1, null, (error) => {
            console.log('error', error)
          })
        }*/
        setHelperText('Login Successfully');

        const logindetails = {
          "type": ob[0].type,
          "properties": {
            "Surname": ob[0].properties.Surname,
            "Firstname": ob[0].properties.Firstname,
            "Username": ob[0].properties.Username,
            "loginDate": new Date().toLocaleString()
          }
        }

        axios.post(`https://trams-up-dge.herokuapp.com/uz3rl0gz/add`, logindetails )
          .then(res => console.log(res.data))
          .catch(error => console.log(error))

      } else {
        setError(true);
        setHelperText('Wrong password');
      }
    } else {
      setError(true);
      setHelperText('Account does not exist')
    }
  };


  const handleKeyPress = (e) => {
    if (e.keyCode === 13 || e.which === 13) {
      isButtonDisabled || handleLogin();
      /*if (sheetLoaded){
        isButtonDisabled || handleLogin();
      }*/
    }
  };

  if (login){
    if (accountType === 'Validator'){
      return(
        <HospitalList />
      )
    } else if (accountType === 'Hospital'){
      return(
        <div>
          <Hidden smDown implementation="css">
            <Personnel />
          </Hidden>
          <Hidden mdUp implementation='js'>
            <PersonnelMobile/>
          </Hidden>
        </div>

      )
    } else{
      return(
        <OrganizerPage/>
      )
    }
  } else if(!loaded){
    return(
    <ThemeProvider theme={theme}>
      <div className={classes.container}>
        <Card className={classes.card} style={{width:400}}>
          <CardHeader className={classes.header} title="TrAMS Update Login" />
          <CardContent>
            <Typography align="center"><CircularProgress/><br/></Typography>
            <Typography align="center">Loading...</Typography>
          </CardContent>
        </Card>
      </div>
    </ThemeProvider>
    )
  } else {
    return (
    <ThemeProvider theme={theme}>
      <form className={classes.container} noValidate autoComplete="off">
        <Card className={classes.card}>
          <CardHeader className={classes.header} title="TrAMS Login" />
          <CardContent>
            <div>
              <TextField
                error={error}
                fullWidth
                id="email"
                type="email"
                label="Username"
                placeholder="Username"
                margin="normal"
                onChange={(e)=>setUsername(e.target.value)}
                onKeyPress={(e)=>handleKeyPress(e)}
              />
              <TextField
                error={error}
                fullWidth
                id="password"
                type="password"
                label="Password"
                placeholder="Password"
                margin="normal"
                helperText={helperText}
                onChange={(e)=>setPassword(e.target.value)}
                onKeyPress={(e)=>handleKeyPress(e)}
              />
            </div>
            <div>
              <Link href="#" onClick={()=>setOpen(true)}>
                <Typography style={{fontSize: 12, color: 'gray'}}>Frequently Asked Questions (FAQs)</Typography>
              </Link>
              <Dialog onClose={()=>setOpen(false)} aria-labelledby="simple-dialog-title" open={open} style={{display: 'block', margin: 'auto', width:'60vw', height: '80vh'}}>
                <DialogTitle id="simple-dialog-title"><Typography variant="h2">Frequently Asked Questions (FAQs)</Typography></DialogTitle>
                <DialogContent>
                  <Typography variant="h3">Who can access this page?</Typography>
                  <Typography variant="h4">Volunteers, assistants, and staff of the TrAMS project, and hospital personnel can log in and access this page. </Typography><br/><br/>
                  <Typography variant="h3">How can a user create an account?</Typography>
                  <Typography variant="h4">The Database and GIS team will provide your credentials for you. </Typography><br/><br/>
                  <Typography variant="h3">Should donors access this page?</Typography>
                  <Typography variant="h4">Donors don't have to log in this interface. Access the main website instead.</Typography><br/><br/>
                  <Typography variant="h3">Can we change our passwords once our accounts are created?</Typography>
                  <Typography variant="h4">For now, your passwords will remain as is, but we will update and inform all users as soon as you can change it. </Typography><br/><br/>
                  <Typography variant="h3">Who should we contact in case we have other concerns?</Typography>
                  <Typography variant="h4">Should you have any question or concerns, you may contact us through the following: <br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <EmailIcon/> trams.upd@up.edu.ph <br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <FacebookIcon/> facebook.com/TrAMSProject.
                  </Typography><br/><br/>
                </DialogContent>
                <DialogActions>
                  <Button onClick={()=>setOpen(false)} color="primary">
                    Close
                  </Button>
                </DialogActions>
              </Dialog>
            </div>
          </CardContent>
          <CardActions>
            <Button variant="contained" size="large" className={classes.loginBtn}
                onClick={(e)=>handleLogin(e)} disabled={isButtonDisabled}>
                Login
            </Button>
            {allowed && !isInstalled() && (
              <div>
                <Button variant="contained" size="large" className={classes.but}
                  onClick={(e)=>handleClick(e)}>
                  Install app on your device</Button>
              </div>
            )}

            {/*<ReactGoogleSheets clientId="462837753842-3iur2of57stvapg6oo4gll2gr8999gbe.apps.googleusercontent.com" 
              apiKey="AIzaSyAAQsMS44Idq1_XT4Xlh4PQbEweMso-xX8"
              spreadsheetId="1xked3wuj7t66XftXn_70j2H9tLkxAxosv0d9COflB2k" afterLoading={() => setSheetLoaded(true)}>
              {sheetLoaded? <Button variant="contained" size="large" className={classes.loginBtn}
                onClick={(e)=>handleLogin(e)} disabled={isButtonDisabled}>
                Login
              </Button> : <Button variant="contained" size="large"
                className={classes.loginBtn} disabled="true">
                <CircularProgress/> Loading...
              </Button>}
            </ReactGoogleSheets>*/}
          </CardActions>
        </Card>
      </form>
    </ThemeProvider>
  );}
}


//export default ReactGoogleSheets.connect(Login);
export default Login;
serviceWorker.register();

