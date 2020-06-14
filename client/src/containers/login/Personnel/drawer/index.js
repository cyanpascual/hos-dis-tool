import React,{useState, useContext} from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import {Drawer, List, ListItem} from '@material-ui/core';

import Button from '@material-ui/core/Button';
import {Grid, TextField, IconButton} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

import { MapsContext } from '../../../../contexts/MapsContext';
import { LoginContext } from '../../../../contexts/LoginContext';
import InfoCard from './card';


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
  },
  button: {
    width: '80%',
    background: "#a84343",
    color: '#f5f3ed'
  },
  manageButton:{
    width: '80%',
    background: "#a84343",
    color: '#f5f3ed',
    display: 'block',
    margin: 'auto',
    marginBottom: theme.spacing(3)
  }
  
});

function Navigator(props) {
  const { classes, ...other } = props;
  const { selectedHospital } = useContext(MapsContext);
  const { setLanding } = useContext(LoginContext);
  

  const handleKeyPress = (e) => {
    if (e.keyCode === 13 || e.which === 13) {
      e.preventDefault()
    }
  }


  return (
    <Drawer variant="permanent" {...other} >
      <Grid container direction="column" justify="center" alignItems="center">
        <Grid item className={clsx(classes.header, classes.item)} style={{width: '80%'}}>
          <InfoCard/>
        </Grid>
        <br/>
        <Button variant="contained" size="large" className={classes.button} onClick={()=>setLanding(0)}>
          Dashboard
        </Button>
        <br/>
        <Button variant="contained" size="large" className={classes.button} onClick={()=>setLanding(3)}>
          Donations tracker
        </Button>
        <br/>
        <Button variant="contained" size="large" className={classes.button} onClick={()=>setLanding(1)}>
          Medical Supplies
        </Button>
        <br/>
        {selectedHospital.test_center === true ?
          <Button variant="contained" size="large" className={classes.button} onClick={()=>setLanding(2)}>
            Laboratory Supplies
          </Button> : <p/>}
        <br/>
        <Grid item xs/>
      </Grid>
      <Button variant="contained" size="large" className={classes.manageButton} onClick={()=>setLanding(4)}>
        Manage account
      </Button>
    </Drawer>
  );
}

Navigator.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Navigator);
