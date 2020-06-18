import React, { useState, useEffect, useContext } from 'react';
import { MapsContext } from '../../contexts/MapsContext';
import { FeaturesContext } from '../../contexts/FeaturesContext';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import Box from '@material-ui/core/Box';
import ReactMap from '../reactMap'
import { Typography } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      padding: theme.spacing(2)
    },
    paper: {
      padding: theme.spacing(1),
      textAlign: 'center',
      color: theme.palette.text.secondary,
      height:"23vh",
      overflow: 'auto'
    },
    paperMap: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        height:"50vh"
      }
  }));

function Donate() {
  const classes = useStyles();
  useEffect(() => {
    
  }, [])

  const { facilities, setFacilitiesList, facilitiesList, hospitals, hospitalList, setFilterSetting, filterSetting, filterLevel, setFilterLevel,setHospitalList,setHospitals } = useContext(FeaturesContext);
  const { closePopups, mapReference, setMapReference, defaultMapSettings,viewport, setViewport, selectedHospital,setSelectedHospital, hoveredHospital, setHoveredHospital, goToSelected } = useContext(MapsContext)
  const getDistanceFromLatLonInKm = (lat1,lon1,lat2,lon2) => {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2-lat1);  // deg2rad below
    var dLon = deg2rad(lon2-lon1); 
    var a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2)
      ; 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c; // Distance in km
    return d;
  }
  const deg2rad = (deg) => {
    return deg * (Math.PI/180)
}

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper className={classes.paperMap}><ReactMap/></Paper>
        </Grid>
        <Grid item xs={6}>
          <Typography >Partner Suppliers Nearby</Typography>
        </Grid>
        <Grid item xs={6}>
        <Typography >Partner Donation Drives</Typography>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paper}>
            <List>
          {selectedHospital ? (
                  facilitiesList.length !== 0 ?(
                    facilities.filter((facility)=>getDistanceFromLatLonInKm(
                        selectedHospital.geometry.coordinates[1],
                        selectedHospital.geometry.coordinates[0],
                        facility.geometry.coordinates[1],
                        facility.geometry.coordinates[0],
                        ) <= 0.6).map((facility) => {
                        if(facility.properties != null){
                            return(
                              <React.Fragment>
                              <ListItem>
                              <List>
                              <ListItem>Facility:{facility.properties.Name_of_Fa}</ListItem>
                              <ListItem>Address:{facility.properties.Address}</ListItem>
                              <ListItem>Contact Number:{facility.properties["Contact Numbers"]}</ListItem>
                              </List>
                              
                              </ListItem>
                              <Divider light/>
                              </React.Fragment>
                        )}})): (<Typography >No Suppliers Nearby</Typography>)
                    
              ): (
                null
              )}
              </List>


          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paper}>
            <List>
                <ListItem>Angat Buhay</ListItem>
                <ListItem><a href="https://www.facebook.com/photo.php?fbid=10218567767917755&set=a.4208322798674&type=3&theater">Link</a></ListItem>
                <ListItem>
                    
                    <List>
                        <ListItem>
                            Donation Options:
                        </ListItem>
                        <ListItem>Ticket2ME: <a href="#">bit.ly/something</a></ListItem>
                        <ListItem>
                            <ListItem>Bank Transaction:</ListItem>
                            <ListItem>Account Name:  blahblah</ListItem>
                            <ListItem>Account Number: somethinsomethin</ListItem>
                        </ListItem>

                        
                    </List>
                </ListItem>
            </List>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
  }

export default Donate;