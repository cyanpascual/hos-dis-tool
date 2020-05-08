import React, {useContext, useEffect} from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { createMuiTheme, ThemeProvider, withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Hidden from '@material-ui/core/Hidden';
import {Link, Grid, Paper, Typography} from '@material-ui/core';
import LinearProgress from '@material-ui/core/LinearProgress';
import HospitalUpdate from '../hospitalUpdate';
import Navigator from '../drawer';
import Header from '../header';
import 'typeface-roboto';
import { FeaturesContext } from '../../../contexts/FeaturesContext';
import { MapsContext } from '../../../contexts/MapsContext';



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

const drawerWidth = 400;

const styles = {
  root: {
    display: 'flex',
    minHeight: '100vh',
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
    overflow:"hidden"
  },
  app: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
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

function Update(props) {
  const { classes, user } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const { setFacilities, setFacilitiesList, hospitals,setHospitals, setHospitalList, hospitalList } = useContext(FeaturesContext);
  const { selectedHospital, setSelectedHospital } = useContext(MapsContext)

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  useEffect(()=>{   
    const fetchData = async () => {
      const res2 = await axios('https://trams-up-dge.herokuapp.com/hospitals/', );
      
      setHospitals(res2.data);
      console.log('hospitals in')
      setHospitalList(res2.data);
    }
    fetchData();
  }, [])
  return (
    <ThemeProvider theme={theme}>
      <div className={classes.root}>
        <CssBaseline />
        <nav className={classes.drawer}>

          <Hidden smUp implementation="js">
            <Navigator
              PaperProps={{ style: { width: 300, backgroundColor:"#BAB8B2" } }}
              variant="temporary"
              open={mobileOpen}
              onClose={handleDrawerToggle}
            />
          </Hidden>
          <Hidden xsDown implementation="css">
            <Navigator PaperProps={{ style: { width: drawerWidth, backgroundColor:"#BAB8B2" } }} />
          </Hidden>
        </nav>
        <div className={classes.app}>
          <Header onDrawerToggle={handleDrawerToggle} />  
          {selectedHospital ? 
          <HospitalUpdate/> : 
          <div style={{margin: 'auto'}}>
            <Typography style={{fontSize:16, color:"gray", textAlign: 'center'}} >
              Select a hospital
            </Typography>
          </div>
            
          }
        </div>
      </div>
    </ThemeProvider>
  );
}

Update.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Update);

