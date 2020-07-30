import React, {useContext, useEffect} from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import axios from 'axios';
import { createMuiTheme} from '@material-ui/core/styles';

import { FeaturesContext } from '../contexts/FeaturesContext';
import Login from './login';
import OrganizerPage from './OrganizerPage';
import Main from './main';
import NotFound from './notFound';
import { MapsContext } from '../contexts/MapsContext';



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
      root:{
        [theme.breakpoints.up('xs')]: {
          fontSize:12
        },
        [theme.breakpoints.up('md')]: {
          fontSize:16
        }
      }
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

const drawerWidth = 300;

const styles = {
  root: {
    display: 'flex',
    minHeight: '100vh',
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

function App(props) {
  const { classes } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const {setHightlightedHospitals,compareValues,setFacilities, setFacilitiesList, hospitals,setHospitals, setHospitalList, hospitalList,supplyList, setSupplyList } = useContext(FeaturesContext);
  const {regions, setRegions,
    provinces, setProvinces,
    cities, setCities}  = useContext(MapsContext)



  useEffect(()=>{

    
    const fetchData = async () => {
      const res = await axios('https://trams-up-dge.herokuapp.com/h0zPiTaLs', );
      const res2 = await axios('https://trams-up-dge.herokuapp.com/facility/', );
      var temp = Object.keys(res.data[0].properties.supply_need)
      //this is because supplyList won't update before this function is over 
      setSupplyList(temp) 
      res.data.forEach(hospital => {
        hospital.properties.priorityScore = 0
        hospital.properties.supply_status = {}
        temp.forEach(supply => {
          if(hospital.properties.supply_need[supply]!==0){
            if(hospital.properties.supply_cur[supply]/hospital.properties.supply_need[supply] < 0.2){
              hospital.properties.supply_status[supply] = "Critically Low"
              hospital.properties.priorityScore += 2
            } else if((hospital.properties.supply_cur[supply]/hospital.properties.supply_need[supply] >= 0.20) && (hospital.properties.supply_cur[supply]/hospital.properties.supply_need[supply] <= 0.5)){
              hospital.properties.supply_status[supply] = "Low"
              hospital.properties.priorityScore += 1
            } else{
              hospital.properties.supply_status[supply] = "Well stocked"
            }           
          } else{
            hospital.properties.supply_status[supply] = "No Data"
          }
      });

      
       
      });
      setHospitals(res.data.sort(compareValues('cfname')));
      setHospitalList(res.data.sort(compareValues('cfname')));
      setFacilities(res2.data);
      setFacilitiesList(res2.data);
    };

    fetchData();
  }, [])

  return(
    <BrowserRouter>
      <Switch>
        <Route path='/' component={Main} exact/>
        <Route path='/login' component={Login}/>  
        <Route path='/0ffering'component={OrganizerPage}/>    
        <Route path='*'>
          <NotFound/>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;