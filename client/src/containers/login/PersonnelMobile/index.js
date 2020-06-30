import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import { createMuiTheme, ThemeProvider, withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import {Typography, AppBar, Toolbar, IconButton, Button, Grid, Slide, useScrollTrigger} from '@material-ui/core';
import Header from './header';
import 'typeface-roboto';
import { MapsContext } from '../../../contexts/MapsContext';
import { LoginContext } from '../../../contexts/LoginContext';

import Dashboard from './landingScreen/one';
import HospitalTabs from './landingScreen/three/tab'
import ManageAccount from './landingScreen/four'

import HomeIcon from '@material-ui/icons/Home';
import InsertChartIcon from '@material-ui/icons/InsertChart';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import donateIcon from './donateicon.png'


let theme = createMuiTheme({
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
  typography: {
    h5: {
      fontWeight: 500,
      fontSize: 26,
      letterSpacing: 0.5,
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
});

theme = {
  ...theme,
  overrides: {
    MuiDrawer: {
      paper: {
        backgroundColor: '#BAB8B2',
      },
    },
    MuiButton: {
      label: {
        textTransform: 'none',
      },
      contained: {
        boxShadow: 'none',
        '&:active': {
          boxShadow: 'none',
        },
      },
    },
    MuiTabs: {
      root: {
        marginLeft: theme.spacing(1),
      },
      indicator: {
        height: 3,
        borderTopLeftRadius: 3,
        borderTopRightRadius: 3,
        backgroundColor: theme.palette.common.white,
      },
    },
    MuiTab: {
      root: {
        textTransform: 'none',
        margin: '0 16px',
        minWidth: 0,
        padding: 0,
        [theme.breakpoints.up('md')]: {
          padding: 0,
          minWidth: 0,
        },
      },
    },
    MuiIconButton: {
      root: {
        padding: theme.spacing(1),
      },
    },
    MuiTooltip: {
      tooltip: {
        borderRadius: 4,
      },
    },
    MuiDivider: {
      root: {
        backgroundColor: '#404854',
      },
    },
    MuiListItemText: {
      primary: {
        fontWeight: theme.typography.fontWeightMedium,
      },
    },
    MuiListItemIcon: {
      root: {
        color: 'inherit',
        marginRight: 0,
        '& svg': {
          fontSize: 20,
        },
      },
    },

  },
};

const drawerWidth = 475;

const styles = {
  root: {
    display: 'flex',
    minHeight: '100vh',
    [theme.breakpoints.up('md')]: {
      width: '100vw'
    }
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  drawer: {
    [theme.breakpoints.up('md')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
    overflow:"hidden"
  },
  app: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justify: 'center',
    overflow: 'hidden'
  },
  main: {
    flex: 1,
    padding: theme.spacing(6, 4),
    background: '#eaeff1',
  },
  footer: {
    padding: theme.spacing(2),
    background: '#eaeff1',
  }, button: {
    display: 'flex', 
    flexDirection: 'column',
    justify: 'center',
    alignItems: 'center'
  },
  appBar: {
    top: 'auto',
    bottom: 0,
    display: 'flex',
    justify: 'center'
  }, offset: theme.mixins.toolbar,
};

function ShowOnScroll(props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({ target: window ? window(): undefined });

  return (
    <Slide appear={false} direction="down" in={trigger}>
      {children}
    </Slide>
  );
}

ShowOnScroll.propTypes = {
  children: PropTypes.element.isRequired,
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

function PersonnelMobile(props) {
  const { classes } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const { selectedHospital } = useContext(MapsContext)
  const { landing, setLanding } = useContext(LoginContext)

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.root}>
        <CssBaseline />
        <div className={classes.app}>
          <Header onDrawerToggle={handleDrawerToggle} />
          <ShowOnScroll {...props}>
            <AppBar position="fixed">
              <Toolbar>
                <Typography style={{fontSize:18, fontWeight:500}}>{selectedHospital.properties.cfname}</Typography>
                <Typography style={{fontSize: 16, fontWeight: 500}}>Last Updated: <br/> {selectedHospital.properties.reportdate}</Typography>
              </Toolbar>
            </AppBar>
          </ShowOnScroll>
          <div>
            {landing === 0 ? <Dashboard/>
            :landing === 2 ? <HospitalTabs/>
            :landing === 1 ? <Typography align='center'>Feature under construction</Typography>
            :landing === 3 ? <ManageAccount/>:<p/>}
          </div> 
          <AppBar position="fixed" color="primary" className={classes.appBar}>
            <Toolbar>
              <Grid container direction='row' justify="space-between">
                <Grid item>
                  <Button color="inherit" classes={{label: classes.button, root: classes.button}} onClick={()=>setLanding(0)}>
                    <HomeIcon />
                    <Typography variant="subtitle1"style={{fontSize: '2vh'}}>Dashboard</Typography>
                  </Button>
                </Grid>
                <Grid item>
                  <Button color="inherit" classes={{label: classes.button, root: classes.button}} onClick={()=>setLanding(1)}>
                    <img src={donateIcon} style={{height: 24}}/>
                    <Typography variant="subtitle1"style={{fontSize: '2vh'}}>Donations</Typography>
                  </Button>
                </Grid>
                <Grid item>
                  <Button color="inherit" classes={{label: classes.button, root: classes.button}} onClick={()=>setLanding(2)}>
                    <LocalHospitalIcon />
                    <Typography variant="subtitle1"style={{fontSize: '2vh'}}>Supplies</Typography>
                  </Button>
                </Grid>
                <Grid item>
                  <Button color="inherit" classes={{label: classes.button, root: classes.button}} onClick={()=>setLanding(3)}>
                    <AccountCircleIcon />
                    <Typography variant="subtitle1" style={{fontSize: '2vh'}}>Account</Typography>
                  </Button>
                </Grid>
              </Grid>
            </Toolbar>
          </AppBar>
          <div className={classes.offset} />
        </div>
      </div>
    </ThemeProvider>
  );
}

PersonnelMobile.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PersonnelMobile);
