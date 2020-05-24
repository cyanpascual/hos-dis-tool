import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import {AppBar, Button, Grid, Hidden, IconButton, Toolbar} from '@material-ui/core';
import { LoginContext } from '../../../../contexts/LoginContext';

import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import FeedbackDialog from '../../../FeedbackDialog';
import tramslogo from '../../../../assets/logos/tramsLogo.png';
import uplogo from '../../../../assets/logos/up.png';
import dgelogo from '../../../../assets/logos/dge.png';
import engglogo from '../../../../assets/logos/engineering.png';
//import geoplogo from '../../../assets/logos/geop_light.png';


const lightColor = 'rgba(255, 255, 255, 0.7)';

const styles = (theme) => ({
  secondaryBar: {
    zIndex: 0,
  },
  menuButton: {
    marginLeft: -theme.spacing(1),
  },
  iconButtonAvatar: {
    padding: 4,
  },
  link: {
    textDecoration: 'none',
    color: lightColor,
    '&:hover': {
      color: theme.palette.common.white,
    },
  },
  button: {
    borderColor: lightColor,
  },
});

function Header(props) {
  const { classes, onDrawerToggle } = props;
  const { user, logout } = useContext(LoginContext);

  return (
    <div position="absolute" >
      <AppBar color="primary" position="sticky" elevation={0}>
      <Toolbar>
          <Grid container alignItems="center" spacing={1}>
            <Grid item xs>
              <img src={tramslogo} style={{height:"30px"}} alt="logo"/>
            </Grid>
            <Grid item>
                <img src={uplogo} className="App-logo" alt="logo" style={{height:"30px"}}/>
            </Grid>
            <Grid item>
                <img src={engglogo} className="App-logo" alt="logo" style={{height:"30px"}}/>
            </Grid>
            <Grid item>
                <img src={dgelogo} className="App-logo" alt="logo" style={{height:"30px"}}/>
            </Grid>
            {/*<Grid item>
                <img src={geoplogo} className="App-logo" alt="logo" style={{height:"30px"}}/>
            </Grid>*/}
          </Grid>
        </Toolbar>
      </AppBar>
      <AppBar component="div" className={classes.secondaryBar} color="primary"
        position="static" elevation={0}>
        <Toolbar>
          <Grid container spacing={1} alignItems="center" justify="flex-end">
            {/*<Grid item>
                <WelcomeDialog/>
            </Grid> */}
            <Grid item>
              <Typography style={{fontSize: 16, fontWeight: 500}}>Welcome, {user.properties.Firstname}!</Typography>
            </Grid>
            <Grid item>
              <FeedbackDialog/>
            </Grid>
            <Grid item>
              <Button style={{color: "white"}} onClick={() => logout()}>Logout</Button>
            </Grid>
          </Grid>
        </Toolbar>  
      </AppBar>
    </div>
  );
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
  onDrawerToggle: PropTypes.func.isRequired,
};

export default withStyles(styles)(Header);