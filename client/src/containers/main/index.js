import React, {useContext} from 'react';
import PropTypes from 'prop-types';


 import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import Card from '@material-ui/core/Card';
import Paper from '@material-ui/core/Paper';
import { List, ListItem, colors, Typography, AppBar, Divider } from '@material-ui/core';
import Navigator from '../Navigator';
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
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import FilterDialog from '../FilterDialog';
import SortDialog from '../SortDialog';
import HospitalInfo  from '../HospitalInfo';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { FeaturesContext } from '../../contexts/FeaturesContext';
import { MapsContext } from '../../contexts/MapsContext';
import {TextField} from '@material-ui/core'
import SidebarMenu from './components/sidebar'




//material ui stuff
import Toolbar from '@material-ui/core/Toolbar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';

import ChatzListItemDemo from './components/faceStyles'
//styled components stuff    
import styled from 'styled-components';

//mui-treasury stuff
import Layout, 
      {
        Root, 
        getHeader, 
        getDrawerSidebar,
        getSidebarTrigger, 
        getSidebarContent,
        getCollapseBtn, 
        getContent, 
        getFooter
      } from '@mui-treasury/layout';


import {
  HeaderMockUp,
  NavHeaderMockUp,
  NavContentMockUp,
  ContentMockUp,
  FooterMockUp,
} from '@mui-treasury/mockup/layout';

//creates the component objects
const scheme = Layout();
const Header = getHeader(styled);
const DrawerSidebar = getDrawerSidebar(styled);
const SidebarTrigger = getSidebarTrigger(styled);
const SidebarContent = getSidebarContent(styled);
const CollapseBtn = getCollapseBtn(styled);
const Content = getContent(styled);
const Footer = getFooter(styled);


//builds a header that has position:sticky from breakpoint xs up
scheme.configureHeader((builder) => {
  builder
    .create("whatever_id")
    .registerConfig("xs", {
      position: "sticky",
    })
    .registerConfig("md", {
      position: "relative", // won't stick to top when scroll down
    });
});

//building  the sidebar
//set to the left side of the browser with temporary variant for all breakpoints
scheme.configureEdgeSidebar(builder => {
  builder
    .create('unique_id', { anchor: 'left' })
    .registerTemporaryConfig('xs', {
      width: 'auto', // 'auto' is only valid for temporary variant
    })
    //makes the sidebar permanent for laptop screens
    .registerPermanentConfig('md', {
      width: 256, // px, (%, rem, em is compatible)

    });
});


//Main function that returns the component
const Main = () => {

  return (
    <Root scheme={scheme}>
      {({ state: { sidebar }, setOpen, setCollapsed }) => (
        <>
          <CssBaseline />
          {/* <Header style={{height:"7vh"}}>
            <Toolbar>
              <SidebarTrigger sidebarId="unique_id" />
              <HeaderMockUp />
            </Toolbar>
          </Header> */}
          <DrawerSidebar sidebarId="unique_id">
            <SidebarContent>
              <NavHeaderMockUp collapsed={sidebar.unique_id.collapsed} />
              <NavContentMockUp />
            </SidebarContent>
            <CollapseBtn />
          </DrawerSidebar>
          <Content>
            {/* <Container maxWidth="md">
              <Box pt={2}>
                {sidebar.unique_id.open && !sidebar.unique_id.collapsed && (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => setCollapsed('unique_id', true)}
                  >
                    Collapse
                  </Button>
                )}
                {sidebar.unique_id.open && (
                  <Button
                    variant="contained"
                    onClick={() => setOpen('unique_id', false)}
                  >
                    Close
                  </Button>
                )}
              </Box>
            </Container> */}
          <Grid style={{ width:"100%", margin:"0 auto"}} container  >
            <Grid item           
                lg={6}
                md={12}
                xl={6}
                xs={12}
                style={{height:'100vh'}}
                >
                  <div id='header' style={{backgroundColor:"blue", height: "10vh", padding:"2vh"}}>
                    <div style={{backgroundColor:"green", height: "6vh"}}>
                      fgfgd
                    </div>
                  </div>
                  <Container id="body" style={{backgroundColor:"pink", height: "90vh"}}>
                    <ChatzListItemDemo/>
                  </Container>
                </Grid>
                <Grid item 
                  lg={6}
                  md={12}
                  xl={6}
                  xs={12}
                  style={{height:'100vh'}}
                  >
       
                  <ReactMap/>

                </Grid>
              </Grid>
          
          </Content>
          <Footer>
           
          </Footer>
        </>
      )}
    </Root>
  );
};

export default Main;

// let theme = createMuiTheme({
//   palette: {
//     primary: {
//       light: '#b73d2a',
//       main: '#9b2b2b',
//       dark: '#4f0000',
//     },
//     secondary: {
//       light: '#4f5b62',
//       main: '#263238',
//       dark: '#000a12',
//     },
//   },
//   typography: {
//     h5: {
//       fontWeight: 500,
//       fontSize: 26,
//       letterSpacing: 0.5,
//     },
//   },
//   shape: {
//     borderRadius: 8,
//   },
//   props: {
//     MuiTab: {
//       disableRipple: true,
//     },
//   },
//   mixins: {
//     toolbar: {
//       minHeight: 48,
//     },
//   }
// });

// theme = {
//   ...theme,
//   overrides: {
//     MuiDrawer: {
//       paper: {
//         //changes the drawers background color
//         backgroundColor: '#9b2b2b',
//       },
//     },
//     MuiButton: {
//       label: {
//         textTransform: 'none',
//       },
//       contained: {
//         boxShadow: 'none',
//         '&:active': {
//           boxShadow: 'none',
//         },
//       },
//     },
//     MuiTabs: {
//       root: {
//         marginLeft: theme.spacing(1),
//       },
//       indicator: {
//         height: 3,
//         borderTopLeftRadius: 3,
//         borderTopRightRadius: 3,
//         backgroundColor: theme.palette.common.white,
//       },
//     },
//     MuiTab: {
//       root: {
//         textTransform: 'none',
//         margin: '0 16px',
//         minWidth: 0,
//         padding: 0,
//         [theme.breakpoints.up('md')]: {
//           padding: 0,
//           minWidth: 0,
//         },
//       },
//     },
//     MuiIconButton: {
//       root: {
//         padding: theme.spacing(1),
//       },
//     },
//     MuiTooltip: {
//       tooltip: {
//         borderRadius: 4,
//       },
//     },
//     MuiDivider: {
//       root: {
//         backgroundColor: '#800000',
//       },
//     },
//     MuiListItemText: {
//       primary: {
//         fontWeight: theme.typography.fontWeightMedium,
//       },
//     },
//     MuiListItemIcon: {
//       root: {
//         color: 'inherit',
//         marginRight: 0,
//         '& svg': {
//           fontSize: 20,
//         },
//       },
//     },

//   },
// };

// const drawerWidthSmall = 1000;
// const drawerWidthMedium = 600

// const styles = {
//   root: {
//     display: 'flex',
//     flexGrow: 1,
//     [theme.breakpoints.down('md')]: {
//       paddingTop: 50,
//     }
//   },
//   mainGrid:{
//     margin: 20,

//     [theme.breakpoints.down('sm')]: {
//       margin: 0,
//       maxWidth:"90vw",
//       paddingLeft: "9%",
//     }
//   },
//   drawer: {
//     [theme.breakpoints.up('sm')]: {
//       flexShrink: 0,
//     },
//     [theme.breakpoints.up('lg')]: {
//       width: drawerWidthMedium,
//       flexShrink: 0,
//     },
//     overflow:"hidden"
//   },
//   app: {
//     flex: 1,
//     display: 'flex',
//     flexDirection: 'column',
//   },
//   paper:{
//     height: "40vh",
//     padding: "5px",
//     [theme.breakpoints.up("lg")]: {
//       height: "90vh"
//     }
//   },
//   paperList:{
//     height: "40vh",
//     padding: "5px",
//     backgroundColor:"#fafafa",
//     [theme.breakpoints.up("lg")]: {
//       height: "90vh"
//     }
//   },
//   item: {
//     display: 'flex',
//     paddingTop: 0,
//     paddingBottom: 0,
//     width: "250px",
//   },
//   mapCard:{
//     order: 2,
//     [theme.breakpoints.up('lg')]: {
//       order: 3,
//     },
//   },
//   listCard:{
//     order: 3,
//     height: "42vh",
//     [theme.breakpoints.up('lg')]: {
//       order: 2,
//       height: "92vh"
//     },
    
    
//   },
//   drawerHeader: {
//     display: 'flex',
//     alignItems: 'center',
//     padding: theme.spacing(0, 1),
//     justifyContent: 'flex-end',
//   },
    
//   button: {
//     color: "#530000",
//     padding: '10px 30px',
//     justifyContent: 'flex-start',
//     textTransform: 'none',
//     letterSpacing: 0,
//     width: '100%',
//   },
//   icon: {
//     width: 24,
//     height: 24,
//     display: 'flex',
//     alignItems: 'center',
//     marginRight: '10px'
//   },
//   active: {
//     color: "#ffffff",
//     padding: '10px 30px',
//     justifyContent: 'flex-start',
//     textTransform: 'none',
//     letterSpacing: 0,
//     width: '100%',
//     backgroundColor: "#9b2b2b",
//     fontWeight: 500,
//     '& $icon': {
//       color: "white"
//     }
//   }
// };

// function Main(props) {
//   const { classes } = props;
//   const [mobileOpen, setMobileOpen] = React.useState(false);
//   const [drawerOpen, setDrawerOpen] = React.useState(false);
//   const [activeView, setActiveView] = React.useState('Hospitals');
//   const {setSelectedHospital, goToSelected} = useContext(MapsContext)
//   const { hospitals, resetHospitals, hospitalList, setFilterSetting, filterSetting, filterLevel, setFilterLevel,compareValues,desktop, setDesktop } = useContext(FeaturesContext);
//   const { selectedHospital } = useContext(MapsContext);
//   const handleDrawerToggle = () => {
//     setMobileOpen(!mobileOpen);
//   };

  
//   const handleDrawerOpen = () => {
//     setDrawerOpen(!drawerOpen);
//   };

//   const isDesktop = useMediaQuery(theme.breakpoints.up('lg'), {
//     defaultMatches: true
//   });

//   setDesktop(isDesktop)

//   var variant = isDesktop ? "permanent":"temporary"


//   return (

//       <div className={`${props.classes.root}`}>
//         {!isDesktop ? (<AppBar>
//           <Toolbar>
//             <IconButton
//               color="inherit"
//               aria-label="open drawer"
//               onClick={handleDrawerOpen}
//               edge="start"
              
//             >
//               <MenuIcon />
//             </IconButton>
//             <Typography variant="h6" noWrap>
//             </Typography>
//           </Toolbar>
//           </AppBar>) : (null)
//           }
//         <Drawer
//           anchor={isDesktop?"left":"bottom"}
//           variant={variant}
//           open={drawerOpen}
//           style={{width:400}}
//         >
//           <SidebarMenu/>
//           {!isDesktop ? (s
//             <div className={classes.drawerHead}>
//               <IconButton onClick={handleDrawerOpen}>
//                 <KeyboardArrowDownIcon/>
//               </IconButton>
//               <Divider/>
//             </div>):(null)}  

//           <List style={{width:"100%"}}>
//             <ListItem
//             className={classes.item}
//             disableGutters
//             style={{width:"100%"}}
//               >
//                 <Button style={{borderRadius:0}} fullWidth className={`${activeView === 'Hospitals' ? (props.classes.active):(props.classes.button)}`} onClick={()=> setActiveView('Hospitals')}>
//                   <div className={classes.icon}><BusinessIcon/></div>
//                 {"Hospitals"}
//                 </Button>
//             </ListItem>
//             <ListItem
//             className={classes.item}
//             disableGutters
//             style={{width:"100%"}}
//               >
//                 <Button style={{borderRadius:0}} disabled fullWidth className={`${activeView === 'Suppliers' ? (props.classes.active):(props.classes.button)}`} onClick={()=> setActiveView('Suppliers')}>
//                   <div className={classes.icon}><WorkIcon/></div>
//                 {"Suppliers"}
//                 </Button>
//             </ListItem>
//             <ListItem
//             className={classes.item}
//             disableGutters
//             style={{width:"100%"}}
//               >
//                 <Button style={{borderRadius:0}} disabled fullWidth className={`${activeView === 'Donation Drives' ? (props.classes.active):(props.classes.button)}`} onClick={()=>  setActiveView('Donation Drives')}>
//                   <div className={classes.icon}><LocalHospitalIcon/></div>
//                 {"Donation Drives"}
//                 </Button>
//             </ListItem>
//             <ListItem
//             className={classes.item}
//             disableGutters
//             style={{width:"100%"}}
//               >
//                 <Button style={{borderRadius:0}} disabled fullWidth className={`${activeView === 'Help' ? (props.classes.active):(props.classes.button)}`} onClick={()=> setActiveView('Help')}>
//                   <div className={classes.icon}><HelpIcon/></div>
//                 {"Help"}
//                 </Button>
//             </ListItem>
//           </List>
//         </Drawer>
        
 

//         <Grid className={classes.mainGrid} container spacing={2}>
//           <Grid item           
//             lg={4}
//             md={12}
//             xl={3}
//             xs={12}
//             className={classes.listCard}
//             >
//               <Paper elevation={0} className={classes.paperList}>
//                 {selectedHospital ? (<HospitalInfo/>):(
//                 <React.Fragment>
//                 <Grid container spacing={1}>
//                   <Grid item xs={3}>
//                     <FilterDialog/>
//                   </Grid>
//                   <Grid item xs={3}>
//                     <SortDialog/>
//                   </Grid>
//                   <Grid item xs={6}>
//                   {hospitalList && <Autocomplete
//                     onInputChange={(obj,value)=>{
//                     goToSelected(hospitalList.filter((hospital)=>{return(hospital.properties.cfname===value)})[0])
//                     setSelectedHospital(hospitalList.filter((hospital)=>{return(hospital.properties.cfname===value)})[0])
//                     }}
//                     options={hospitalList}
//                     getOptionLabel={(option) => option.properties.cfname}
//                     size="small"
//                     style={{marginBottom:'5px'}}
//                     renderInput={(params) => <TextField {...params} label="Search..." variant="outlined" />}
//                     />}
//                     </Grid>
//                 </Grid>
//                 <FilterList/>
//                 </React.Fragment>)}
//               </Paper>
//             </Grid>
//             <Grid item className={classes.mapCard} 
//               lg={8}
//               md={12}
//               xl={9}
//               xs={12}>
//               <Paper variant="outlined" className={classes.paper}><ReactMap/></Paper>
//             </Grid>
//           </Grid>
        

//       </div>
   
//   );
// }

// Main.propTypes = {
//   classes: PropTypes.object.isRequired,
// };

// export default withStyles(styles)(Main);

