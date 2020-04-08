import React,{useContext} from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import PeopleIcon from '@material-ui/icons/People';
import DnsRoundedIcon from '@material-ui/icons/DnsRounded';
import PermMediaOutlinedIcon from '@material-ui/icons/PhotoSizeSelectActual';
import PublicIcon from '@material-ui/icons/Public';
import SettingsEthernetIcon from '@material-ui/icons/SettingsEthernet';
import SettingsInputComponentIcon from '@material-ui/icons/SettingsInputComponent';
import TimerIcon from '@material-ui/icons/Timer';
import SettingsIcon from '@material-ui/icons/Settings';
import PhonelinkSetupIcon from '@material-ui/icons/PhonelinkSetup';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Pagination from '@material-ui/lab/Pagination';
import FilterDialog from '../FilterDialog';
import FilterList from '../FilterList';
import { FeaturesContext } from '../../contexts/FeaturesContext';
import { MapsContext } from '../../contexts/MapsContext';
import HospitalInfo from '../HospitalInfo'

const categories = [
  {
    id: 'Develop',
    children: [
      { id: 'Authentication', icon: <PeopleIcon />, active: true },
      { id: 'Database', icon: <DnsRoundedIcon /> },
      { id: 'Storage', icon: <PermMediaOutlinedIcon /> },
      { id: 'Hosting', icon: <PublicIcon /> },
      { id: 'Functions', icon: <SettingsEthernetIcon /> },
      { id: 'ML Kit', icon: <SettingsInputComponentIcon /> },
    ],
  },
  {
    id: 'Quality',
    children: [
      { id: 'Analytics', icon: <SettingsIcon /> },
      { id: 'Performance', icon: <TimerIcon /> },
      { id: 'Test Lab', icon: <PhonelinkSetupIcon /> },
    ],
  },
];

const styles = (theme) => ({
  categoryHeader: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  categoryHeaderPrimary: {
    
  },
  item: {
    paddingTop: 1,
    paddingBottom: 1,
    color: theme.palette.common.white,
  },
  itemCategory: {
    backgroundColor: '#BAB8B2',
    boxShadow: '0 -1px 0 #BAB8B2 inset',
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  header: {
    fontSize: 24,
    color: '#BAB8B2',
    textAlign: "center"
  },
  itemActiveItem: {
    color: 'white',
  },
  itemPrimary: {
    fontSize: 'inherit',
  },
  itemIcon: {
    minWidth: 'auto',
  },
  divider: {
    marginTop: theme.spacing(2),
  },
  root: {
    minWidth: 230,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  rootForm: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
    whiteColor: {
    color: "white"
  }
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  }
});

function Navigator(props) {
  const { classes, ...other } = props;
  const [age, setAge] = React.useState('');
  const { hospitalList,hospitalsShown,setHospitalsShown } = useContext(FeaturesContext);
  const { selectedHospital } = useContext(MapsContext)
  const [open, setOpen] = React.useState(false);

  const handleChange = (event) => {
    setAge(Number(event.target.value) || '');
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Drawer variant="permanent" {...other} >
    { !selectedHospital ?(
      <List disablePadding >
        <ListItem className={clsx(classes.header, classes.item, classes.itemCategory)}>
            <Grid container alignItems="center" spacing={1}>
                <Grid item xs={12}>
                < FilterDialog/>
                </Grid>
            </Grid>
        </ListItem>
            <div style={{overflowY:"scroll", height:"79vh"}}>
            <FilterList/>
            </div>
        <ListItem style={{textAlign:"center"}}>
            
            {hospitalList && <Pagination count={Math.ceil(hospitalList.length/5)} size='small' onChange={(e,page)=>{
                setHospitalsShown([page*5-5,page*5-1])
            }} siblingCount={0} variant="outlined" />}
        </ListItem>
      </List>) : (<HospitalInfo/>)
    }
    </Drawer>
  );
}

Navigator.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Navigator);
