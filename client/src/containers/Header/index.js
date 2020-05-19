import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';

import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import TextField from '@material-ui/core/TextField';
import Toolbar from '@material-ui/core/Toolbar';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { withStyles } from '@material-ui/core/styles';
import tramslogo from '../../assets/logos/tramsLogo.png';
import uplogo from '../../assets/logos/up.png';
import dgelogo from '../../assets/logos/dge.png';
import engglogo from '../../assets/logos/engineering.png';
import geoplogo from '../../assets/logos/geop_light.png';
import WelcomeDialog from '../WelcomeDialog';
import FeedbackDialog from '../FeedbackDialog';
import UpdateDialog from '../UpdateDialog'
import { FeaturesContext } from '../../contexts/FeaturesContext';
import { MapsContext } from '../../contexts/MapsContext';


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

function Header(props) {
  const { classes, onDrawerToggle } = props;
  const { hospitalList,compareValues } = useContext(FeaturesContext);
  const {setSelectedHospital, goToSelected} = useContext(MapsContext)
  var hospitalNames =[]
  var prioritizedHospitals=[]
  if(hospitalList){
      hospitalNames=hospitalList.map((hospital)=>{return(hospital.properties.Name_of_Ho)})
      prioritizedHospitals = Array.from(hospitalList.sort(compareValues("priorityScore",'Descending')),x=>x)
  }

  
  return (
    <React.Fragment>
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
            <Grid item>
                <img src={geoplogo} className="App-logo" alt="logo" style={{height:"30px"}}/>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <AppBar
        component="div"
        className={classes.secondaryBar}
        color="primary"
        position="static"
        elevation={0}
      >
          <Toolbar>
          <Grid container spacing={1} alignItems="center">
            <Hidden smUp>
              <Grid item>
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  onClick={onDrawerToggle}
                  className={classes.menuButton}
                >
                  <MenuIcon />
                </IconButton>
              </Grid>
            </Hidden>
            <Grid item xs />
            <Grid item>
                <WelcomeDialog/>
            </Grid>
            <Grid item>
                <FeedbackDialog/>
            </Grid>
            {/* <Grid item>
                <DonateDialog/>
            </Grid> */}
            {/* <Grid item>
                <VolunteerDialog/>
            </Grid> */}
            <Grid item>
                <UpdateDialog/>
            </Grid>
          </Grid>
        </Toolbar>
        
      </AppBar>
      <AppBar
        component="div"
        className={classes.secondaryBar}
        color="secondary"
        position="static"
        elevation={0}
      >
        <Toolbar>
          <Grid container alignItems="center" spacing={1}>
            <Grid item xs>
            {hospitalList && <Autocomplete
            onInputChange={(obj,value)=>{
                goToSelected(hospitalList.filter((hospital)=>{return(hospital.properties.Name_of_Ho===value)})[0])
                setSelectedHospital(hospitalList.filter((hospital)=>{return(hospital.properties.Name_of_Ho===value)})[0])
            }}
            options={hospitalList}
            getOptionLabel={(option) => option.properties.Name_of_Ho}
            size="small"
            style={{margin:10}}
            renderInput={(params) => <TextField {...params} label="Search by hospital name" variant="outlined" />}
            />}
            </Grid>
    
          </Grid>
        </Toolbar>

        
      </AppBar>
      {/* <AppBar color="secondary" position="sticky" elevation={0}>
        <Grid xs={12}>
        <Typography style={{textAlign: 'center'}} className={classes.title}  gutterBottom>
                  Priority Hospitals
        </Typography>
        </Grid>
        
        <Grid container direction="row"> 
          {hospitalList && prioritizedHospitals.slice(0,4).map((hospital)=>{
            return(
              <Grid item xs={3}
              style={{height:'22vh'}}>
              <Card style={{height:'20vh'}}>
                <CardContent>
                  <Typography className={classes.title}  gutterBottom>
                  {hospital.properties.Name_of_Ho}
                  </Typography> 
                </CardContent>
                <CardActions>
                <Button size="small" color="primary">
                  Donate
                </Button>
                <Button size="small" color="primary">
                  Share on Facebook
                </Button>
              </CardActions>
              </Card>
              </Grid>
            )
          })}
        </Grid>
      </AppBar> */}
    </React.Fragment>
  );
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
  onDrawerToggle: PropTypes.func.isRequired,
};

export default withStyles(styles)(Header);