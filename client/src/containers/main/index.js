import React from 'react';
import PropTypes from 'prop-types';

import { createMuiTheme, ThemeProvider, withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import Card from '@material-ui/core/Card';
import Paper from '@material-ui/core/Paper';
import { List, ListItem, Button, colors, Typography, AppBar, Divider } from '@material-ui/core';
import Navigator from '../Navigator';
import Header from '../Header';
import ReactMap from '../reactMap'
import Drawer from '@material-ui/core/Drawer';
import { useMediaQuery } from '@material-ui/core';
import 'leaflet/dist/leaflet.css'
import 'typeface-roboto';
import AcUnitIcon from '@material-ui/icons/AcUnit';
import WorkIcon from '@material-ui/icons/Work';
import BusinessIcon from '@material-ui/icons/Business';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import HelpIcon from '@material-ui/icons/Help';
import FilterList from '../FilterList';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';



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
  }
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

const drawerWidthSmall = 250;
const drawerWidthMedium = 500

const styles = {
  root: {
    display: 'flex',
    flexGrow: 1,
    paddingTop:50
  },
  mainGrid:{
    margin: 20,

    [theme.breakpoints.down('sm')]: {
      margin: 0,
      maxWidth:"90vw",
      paddingLeft: "9%",
    }
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidthSmall,
      flexShrink: 0,
    },
    [theme.breakpoints.up('lg')]: {
      width: drawerWidthMedium,
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
  paper:{
    height: "50vh",
    padding: "5px",
    [theme.breakpoints.up('sm')]: {
      height: "83vh"
    }
  },
  item: {
    display: 'flex',
    paddingTop: 0,
    paddingBottom: 0,
    width: "200px"
  },
  mapCard:{
    order: 3,
    [theme.breakpoints.down('sm')]: {
      order: 2,
    },
  },
  listCard:{
    order: 2,
    [theme.breakpoints.down('sm')]: {
      order: 3,
    },
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    justifyContent: 'flex-end',
  },
    
  button: {
    color: colors.blueGrey[800],
    padding: '10px 30px',
    justifyContent: 'flex-start',
    textTransform: 'none',
    letterSpacing: 0,
    width: '100%',
  },
  icon: {
    width: 24,
    height: 24,
    display: 'flex',
    alignItems: 'center',
    marginRight: '10px'
  },
  active: {
    backgroundColor: "white",
    fontWeight: 500,
    '& $icon': {
      color: "red"
    }
  }
};

function Main(props) {
  const { classes } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  
  const handleDrawerOpen = () => {
    setDrawerOpen(!drawerOpen);
  };

  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'), {
    defaultMatches: true
  });


  var variant = isDesktop ? "permanent":"temporary"


  return (
    <ThemeProvider theme={theme}>
      <div className={`${props.classes.root}`}>
        <AppBar>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap>
              Persistent drawer
            </Typography>
          </Toolbar>
          </AppBar>
        <Drawer
          anchor={isDesktop?"left":"bottom"}
          variant={variant}
          open={drawerOpen}
          style={{width:200}}
        >
          {!isDesktop ? (
            <div className={classes.drawerHead}>
              <IconButton onClick={handleDrawerOpen}>
                <KeyboardArrowDownIcon/>
              </IconButton>
              <Divider/>
            </div>):(null)}  

          <List>
            <ListItem
            className={classes.item}
            disableGutters
              >
                <Button activeClassName={classes.active} className={classes.button}>
                  <div className={classes.icon}><BusinessIcon/></div>
                {"Hospitals"}
                </Button>
            </ListItem>
            <ListItem
            className={classes.item}
            disableGutters
              >
                <Button activeClassName={classes.active} className={classes.button}>
                  <div className={classes.icon}><WorkIcon/></div>
                {"Suppliers"}
                </Button>
            </ListItem>
            <ListItem
            className={classes.item}
            disableGutters
              >
                <Button activeClassName={classes.active} className={classes.button}>
                  <div className={classes.icon}><LocalHospitalIcon/></div>
                {"Donation Drives"}
                </Button>
            </ListItem>
            <ListItem
            className={classes.item}
            disableGutters
              >
                <Button activeClassName={classes.active} className={classes.button}>
                  <div className={classes.icon}><HelpIcon/></div>
                {"Help"}
                </Button>
            </ListItem>
          </List>
        </Drawer>
        
        {/* <nav className={classes.drawer}>
          <Hidden lgUp implementation="js">
            <Navigator
              PaperProps={{ style: { width: drawerWidthSmall, backgroundColor:"#BAB8B2" } }}
              variant="temporary"
              open={mobileOpen}
              onClose={handleDrawerToggle}
            />
          </Hidden>
          <Hidden mdDown implementation="css">
            <Navigator PaperProps={{ style: { width: drawerWidthMedium, backgroundColor:"#BAB8B2" } }} />
          </Hidden>
        </nav> */}

        <Grid className={classes.mainGrid} container spacing={2}>
          <Grid item           
            lg={4}
            md={12}
            xl={3}
            xs={12}
            className={classes.listCard}
            >
              <div>
                City Name

              </div>
              <FilterList/>
            </Grid>
            <Grid item className={classes.mapCard} 
              lg={8}
              md={12}
              xl={9}
              xs={12}>
              <Paper className={classes.paper}><ReactMap/></Paper>
            </Grid>
          </Grid>
        

      </div>
    </ThemeProvider>
  );
}

Main.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Main);

