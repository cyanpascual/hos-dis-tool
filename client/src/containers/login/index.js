import React, { useState, useEffect, useContext } from 'react';
import { Router, Route, Switch } from "react-router-dom";
import { MapsContext } from '../../contexts/MapsContext';
import { LoginContext } from '../../contexts/LoginContext';
import { FeaturesContext } from '../../contexts/FeaturesContext';
import TextField from '@material-ui/core/TextField';
import { createStyles, makeStyles, createMuiTheme, ThemeProvider, withStyles } from '@material-ui/core/styles';
import { Card, CardContent, CardActions, Button, CardHeader, Link, Dialog, DialogTitle, DialogActions, DialogContent, Typography } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import HospitalList from './userValidator';
import HospitalValidate from './hospitalValidator';
import Personnel from './Personnel';
import axios from 'axios';
import EmailIcon from '@material-ui/icons/Email';
import FacebookIcon from '@material-ui/icons/Facebook';

import PropTypes from "prop-types";
import { connect, useDispatch } from "react-redux";
import { loginUser } from "./redux/actions/authActions";
import classnames from "classnames";


const useStyles = makeStyles((theme) =>
  createStyles({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
      width: 400,
      margin: `${theme.spacing(0)} auto`
    },
    loginBtn: {
      marginTop: theme.spacing(2),
      flexGrow: 1,
      background: '#800000',
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
  const { hospitalList, setHospitalList, setHospitals } = useContext(FeaturesContext)
  const { setSelectedHospital } = useContext(MapsContext);
  const { users, setUsers, login, setLogin, setUser, username, setUsername, password, setPassword, helperText, setHelperText} = useContext(LoginContext);

  const classes = useStyles();
  const dispatch = useDispatch(); 
  
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [error, setError] = useState(false);
  const [accountType, setAccountType] = useState('');
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if(props.auth.isAuthenticated){
      props.history.push('/dashboard')
    }
  }, [])

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
      const res2 = await axios('https://trams-up-dge.herokuapp.com/hospitals', ); 
      const res3 = await axios('https://trams-up-dge.herokuapp.com/h0zPiTaLs', )
      
      setUsers(res.data);
      setHospitals(res3.data);
      setHospitalList(res3.data);
      //console.log(res2.data)
    }
    
    fetchData();
  }, [])
  
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
          console.log(hos)
          setSelectedHospital(hos[0]);
        } else {
          setSelectedHospital(null)
        }
        setUser(ob[0]);
        setLogin(true);
        setError(false);
        setAccountType(ob[0].type)
        setHelperText('Login Successfully');
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
    }
  };
  
  if (login){
    if (accountType === 'Validator'){
      return(
        <HospitalList />
      )
    } else if (accountType === 'Hospital'){
      return(
        <HospitalValidate />
      )
    }
  } else {
  return (
    <ThemeProvider theme={theme}>
      <form className={classes.container} noValidate autoComplete="off">
        <Card className={classes.card}>
          <CardHeader className={classes.header} title="TrAMS Update Login" />
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
            <Button
              variant="contained"
              size="large"
              className={classes.loginBtn}
              onClick={(e)=>handleLogin(e)}
              disabled={isButtonDisabled}>
              Login
            </Button>
          </CardActions>
        </Card>
      </form>
    </ThemeProvider>
  );}
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { loginUser }
)(Login);