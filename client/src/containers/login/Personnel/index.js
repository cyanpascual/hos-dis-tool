import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import { createMuiTheme, ThemeProvider, withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Hidden from '@material-ui/core/Hidden';
import {Typography} from '@material-ui/core';
//import HospitalUpdate from './hospitalUpdate';
//import HospitalUpdateMobile from './hospitalUpdateMobile'
import Navigator from './drawer';
import Header from './header';
import 'typeface-roboto';
import { MapsContext } from '../../../contexts/MapsContext';
import { LoginContext } from '../../../contexts/LoginContext';

import Dashboard from './landingScreen/one';
import HospitalUpdate from './landingScreen/two'
import Donations from './landingScreen/three'
import ManageAccount from './landingScreen/four'
import LabSupplies from './landingScreen/five'
import Contact from './contactUs'


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
  },
};

function Personnel(props) {
  const { classes } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const { selectedHospital } = useContext(MapsContext)
  const { landing } = useContext(LoginContext)

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.root}>
        <CssBaseline />
        <nav className={classes.drawer}>

          <Hidden mdUp implementation="js">
            <Navigator
              PaperProps={{ style: { width: '85vw', backgroundColor:"#8c0e0e" } }}
              variant="temporary"
              open={mobileOpen}
              onClose={handleDrawerToggle}
            />
          </Hidden>
          <Hidden smDown implementation="css">
            <Navigator PaperProps={{ style: { width: drawerWidth, backgroundColor:"#8c0e0e" } }} />
          </Hidden>


        </nav>
        <div className={classes.app}>
          <Header onDrawerToggle={handleDrawerToggle} />
          <div style={{overflow: "auto", height:'85vh'}}>
            {landing === 0 ? <Dashboard/> 
            :landing === 1 ? <HospitalUpdate/>
            :landing === 2 ? <Typography>Feature under construction</Typography>/*<Donations/>*/
            :landing === 4 ? <LabSupplies/>
            :landing === 3 ? <ManageAccount/>
            :landing === 'f' ? <Contact/>:<p/>}
          </div>  
        </div>
      </div>
    </ThemeProvider>
  );
}

Personnel.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Personnel);
