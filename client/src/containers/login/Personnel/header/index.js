import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import {AppBar, Button, Grid, Toolbar} from '@material-ui/core';
import { LoginContext } from '../../../../contexts/LoginContext';

import Typography from '@material-ui/core/Typography';
import { withStyles, createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import FeedbackDialog from '../../FeedbackDialog';
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

theme.typography.h3 = {
  fontSize: '4vw',
  [theme.breakpoints.up('sm')]: {
    fontSize: 18,
  }, fontWeight: 500
};

theme.typography.h4 = {
  fontSize: '3vw',
  [theme.breakpoints.up('sm')]: {
    fontSize: 14,
  }, fontWeight: 500
};

function Header(props) {
  const { classes } = props;
  const { user, logout, setLanding } = useContext(LoginContext);

  return (
    <ThemeProvider theme={theme}>
    <div position="absolute">
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
          <Grid container spacing={1} alignItems="center">
            {/*<Grid item>
                <WelcomeDialog/>
            </Grid> */}
            <Grid item container spacing={0} alignItems="center" justify="flex-end" xs={12}>
              <Grid item>
                <Typography variant='h3'>Welcome, {user.properties.Firstname}!</Typography>
              </Grid>
              {/*<Grid item>
                <FeedbackDialog/>
              </Grid>*/}
              <Grid item>
                <Button style={{color: "white"}} onClick={() => setLanding('f')}><Typography variant='h4'>FEEDBACK</Typography></Button>
              </Grid>
              <Grid item>
                <Button style={{color: "white"}} onClick={() => logout()}><Typography variant='h4'>LOGOUT</Typography></Button>
              </Grid>
            </Grid>
          </Grid>
        </Toolbar>
        
      </AppBar>
    </div>
    </ThemeProvider>
  );
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
  onDrawerToggle: PropTypes.func.isRequired,
};

export default withStyles(styles)(Header);