import React, {useContext, useEffect} from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import axios from 'axios';
import { createMuiTheme} from '@material-ui/core/styles';

import 'leaflet/dist/leaflet.css'
import 'typeface-roboto';
import { FeaturesContext } from '../contexts/FeaturesContext';
import Login from './login';
import Main from './main'
import Donate from './DonateDialog';



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


function App(props) {
  const { classes } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const {setHightlightedHospitals,compareValues,setFacilities, setFacilitiesList, hospitals,setHospitals, setHospitalList, hospitalList } = useContext(FeaturesContext);




  useEffect(()=>{
    const supplyList = ["Alcohol",
    "Disinfectant (Sterilium)",
    "Antibacterial Soap",
    "Surgical Gowns",
    "Surgical Masks",
    "N95 Masks",
    "Gloves",
    "Shoe covers",
    "PPE",
    "Goggles and face shields",
    "Testing Kits",
    "Tissue",
    "Vitamins",
    "Food (Meals)"]
    
    const fetchData = async () => {
      const res = await axios('https://trams-up-dge.herokuapp.com/hospitals/', );
      const res2 = await axios('https://trams-up-dge.herokuapp.com/facility/', );

      res.data.forEach(hospital => {
        hospital.properties.priorityScore = 0
        hospital.properties.SupplyStatus = {}
        supplyList.forEach(supply => {
          if(hospital.properties.Supply_Cap[supply]!==0){
            if(hospital.properties.Supply_Cur[supply]/hospital.properties.Supply_Cap[supply] < 0.2){
              hospital.properties.SupplyStatus[supply] = "Critically Low"
              hospital.properties.priorityScore += 2
            } else if((hospital.properties.Supply_Cur[supply]/hospital.properties.Supply_Cap[supply] >= 0.20) && (hospital.properties.Supply_Cur[supply]/hospital.properties.Supply_Cap[supply] <= 0.5)){
              hospital.properties.SupplyStatus[supply] = "Low"
              hospital.properties.priorityScore += 1
            } else{
              hospital.properties.SupplyStatus[supply] = "Well stocked"
            }           
          } else{
            hospital.properties.SupplyStatus[supply] = "No Data"
          }
      });
       
      });
      setHospitals(res.data.sort(compareValues('Name_of_Ho')));
      setHospitalList(res.data.sort(compareValues('Name_of_Ho')));
      setFacilities(res2.data);
      setFacilitiesList(res2.data);
    };

    fetchData();
  }, [])

  return(
    <BrowserRouter>
      <Switch>
        <Route path='/' component={Main} exact/>
        <Route path='/validatorUpdate' component={Login} exact/>
        <Route path='/donate' component={Donate}/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;