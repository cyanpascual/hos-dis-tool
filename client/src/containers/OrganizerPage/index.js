import React, {useContext,  useEffect} from 'react';
import Grid from '@material-ui/core/Grid';
import { ListItem, Divider } from '@material-ui/core';
import ReactMap from '../reactMap'
import { useMediaQuery, createMuiTheme} from '@material-ui/core';
import 'leaflet/dist/leaflet.css'
import 'typeface-roboto';
import FilterDialog from '../FilterDialog';
import HospitalInfo  from '../main/components/HospitalInfo';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { FeaturesContext } from '../../contexts/FeaturesContext';
import { MapsContext } from '../../contexts/MapsContext';
import {TextField} from '@material-ui/core'
import DonationTable from './components/DonationTable';
import OrderTable from './components/OrderTable';
import { makeStyles } from '@material-ui/core/styles';
import tramsLogo from '../../assets/logos/tramsLogo.png';
import { OrganizerContext } from '../../contexts/OrganizerContext';
import { LoginContext } from '../../contexts/LoginContext';


//material ui stuff
import Toolbar from '@material-ui/core/Toolbar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';

import HospitalDeck from '../main/components/HospitalDeck'
//styled components stuff    
import styled from 'styled-components';

//for backend calls
import axios from 'axios';

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
    .registerConfig("lg", {
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
      width: 150, // px, (%, rem, em is compatible)

    });
});

let theme = createMuiTheme({
    palette: {
      primary: {
        light: '#b73d2a',
        main: '#9b2b2b',
        dark: '#4f0000',
      },
      secondary: {
        light: '#4f5b62',
        main: '#263238',
        dark: '#000a12',
      },
    },

  });

  const useStyles = makeStyles(() => ({
    header: {
      backgroundColor: '#fff',
      borderBottom: '1px solid hsl(210, 32%, 93%)',
    },
    collapseBtn: {
      color: '#fff',
      minWidth: 0,
      width: 40,
      borderRadius: '50%',
      border: 'none',
      backgroundColor: 'rgba(0,0,0,0.24)',
      margin: '0 auto 16px',
      '&:hover': {
        backgroundColor: 'rgba(0,0,0,0.38)',
      },
    },
    sidebar: {
      backgroundColor: '#9b2b2b',
      border: 'none',
      fontSize:"1rem",
      fontWeight:600,
      color:"white"
    },
    content: {
      backgroundColor: '#f9f9f9',
    },
  }));


//Main function that returns the component
const Main = () => {
  const styles = useStyles();
  const {hospitalScrollbarReference,  hospitals, resetHospitals, hospitalList, setFilterSetting, filterSetting, filterLevel, setFilterLevel,compareValues,desktop, setDesktop, supplyLabels,selectedProvince,selectedCity,hospitalToDonateTo,setHospitalToDonateTo} = useContext(FeaturesContext);
  const { selectedHospital,goToSelected,setSelectedHospital } = useContext(MapsContext);
  const { selectedPage, setSelectedPage,setOrdersTableData,setDonationTableData } = useContext(OrganizerContext);
  const {login, setLogin} = useContext(LoginContext);
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'), {
    defaultMatches: true
  });

  setDesktop(isDesktop)
  useEffect(()=>{
    setSelectedPage("Hospital Map")

    const fetchDonationData = async () => {
      const res_donation_data = await axios('https://trams-up-dge.herokuapp.com/d0nati0n/')
      const res_allocation_data = await axios('https://trams-up-dge.herokuapp.com/all0cati0n/')  
      setOrdersTableData(res_allocation_data.data.map((record)=>{
        if(record){
          return({
            supplier:record.properties.supplier,
            supply:record.properties.supply,
            amount:record.properties.amount,
            cost:record.properties.cost,
            orderdate:record.properties.orderdate,
            benefactor:record.properties.benefactor,
            method:record.properties.method,
            cont_num:record.properties.cont_num,
            id:record._id,
            status:record.properties.status,
          })
        }
      }))
      setDonationTableData(res_donation_data.data.map((record)=>{
        if(record){
          return({
            "donor_name": record.properties.donor_name,
            "affiliation": record.properties.affiliation,
            "amount": record.properties.amount,
            "donation_supply": record.properties.donation_supply,
            "cfname": record.properties.cfname,
            "id": record._id,
            "reportdate": record.properties.reportdate,
            "bank": record.properties.bank,
            "cont_num": record.properties.cont_num,
            "status": record.properties.status,
            "receipt": record.properties.receipt
          })
        }
      }))
    }
        
    fetchDonationData()
  },[])


    

if(login){
  return (
    <Root theme={theme} scheme={scheme}>
      {({ state: { sidebar }, setOpen, setCollapsed }) => (
        <>
          <CssBaseline />
          {isDesktop?(null):( <Header style={{height:"8vh"}}>
            <Toolbar>
              <SidebarTrigger sidebarId="unique_id" />
            </Toolbar>
          </Header>)}
          <DrawerSidebar sidebarId="unique_id" PaperProps={{ className: styles.sidebar }}>
            <SidebarContent>
              <Box style={{marginLeft:15}}>
                  <img src={tramsLogo} style={{width:90, marginTop:30}}/>
              </Box>
            <Divider style={{marginTop:20,marginBottom:20}}/>
            <Box minWidth={150}>
              <ListItem button onClick={()=>{setSelectedPage("Donation Tracker")}}>
              {"Donations"}
              </ListItem>
              <ListItem button onClick={()=>{setSelectedPage("Order Tracker")}}>

              {"Orders"}
              </ListItem>
              <ListItem button onClick={()=>{setSelectedPage("Hospital Map")}}>

                {"Hospitals"}
              </ListItem>
              
            </Box>
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
          <Grid style={{ width:"100%", margin:"0 auto"}} container>
            {
              selectedPage ==='Donation Tracker'?(
                <Grid item 
                  lg={12}
                  md={12}
                  xl={12}
                  xs={12}
                  style={{height: isDesktop ? "100vh": "40vh", overflow:"auto"}}
                  >
        
                  <DonationTable/>
                </Grid>
              ):
              null
            }
            {
              selectedPage === "Order Tracker" ? (
                <Grid item 
                lg={12}
                md={12}
                xl={12}
                xs={12}
                style={{height: isDesktop ? "100vh": "40vh", overflow:"auto"}}
                >
      
                <OrderTable/>
              </Grid>
              ):null
            }
                        {
              selectedPage === "Hospital Map" ? (
                <React.Fragment>

                  <Grid item 
                    lg={9}
                    md={12}
                    xl={9}
                    xs={12}
                    style={{height: isDesktop ? "100vh": "40vh"}}
                    >
        
                    <ReactMap/>

                  </Grid>
                  <Grid id="rightBar"  item lg={3} md={12} xl={3} xs={12} style={{height: isDesktop ? "100vh": "50vh"}} container>
              {!selectedHospital? 
              <Grid id="topBar" item xs={12} container direction="row" justify="space-evenly" alignItems="center">
                {hospitalList ?
                <Grid item xs={2} id="filterButton">
                      <FilterDialog/>
                    </Grid>:null}
                <Grid item xs={6} id="searchBar" >
                  {hospitalList && <Autocomplete
                    onInputChange={(obj,value)=>{
                    goToSelected(hospitalList.filter((hospital)=>{return(hospital.properties.cfname===value)})[0])
                    setSelectedHospital(hospitalList.filter((hospital)=>{return(hospital.properties.cfname===value)})[0])
                    }}
                    fullWidth
                    options={hospitalList}
                    getOptionLabel={(option) => option.properties.cfname}
                    size="small"
                    style={{marginBottom:'5px', marginTop:"20px"}}
                    renderInput={(params) => <TextField {...params} label="Search..." variant="outlined" />}
                    />}
                </Grid>                        
              </Grid>:null}
              {hospitalList && !selectedHospital ? 
              <Grid id="textGuide" xs={12} item style={{fontSize:desktop?"12px":"12px", textAlign:"center"}}>
                <Box style={{maxWidth:"250px", margin:"0 auto"}}>{`Showing ${supplyLabels[filterSetting]} supply of hospitals${selectedProvince?(" in " + selectedProvince):("")}${selectedCity?(", " + selectedCity):("")} `}</Box>
              </Grid>:null}
              <Grid xs={12} item id="hospitalDeck">
                <Container id="body" style={{  height: isDesktop ? "80vh": "35vh", overflow:"auto" }} ref={hospitalScrollbarReference}>
                  {!selectedHospital ? (<HospitalDeck hospitals={hospitalList} page={selectedPage}/>): (<HospitalInfo/>)}
                </Container>
              </Grid>
          </Grid>  
       
                
                </React.Fragment>
              ):null
            }
                
              </Grid>
            
          </Content>
          <Footer>
           
          </Footer>
        </>
      )}
    </Root>
  );
  }
  else{
    return(null)
  }
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

