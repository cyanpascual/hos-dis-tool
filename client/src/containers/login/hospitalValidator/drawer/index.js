import React,{useContext} from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import {Drawer, List, ListItem} from '@material-ui/core';

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import { MapsContext } from '../../../../contexts/MapsContext';
import { LoginContext } from '../../../../contexts/LoginContext';

import { Grid} from '@material-ui/core';


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

function SideDrawer(props) {
  const { classes, ...other } = props;
  const { selectedHospital } = useContext(MapsContext)
  const { setPage } = useContext(LoginContext)

  return (
    <Drawer variant="permanent" {...other} >
      <List>
        <ListItem className={clsx(classes.header, classes.item)}>
          <Grid container alignItems="center" justify="center" spacing={3}>
            <Grid item xs>
            <Typography style={{fontSize: 24, fontWeight: 750}} color="primary">{selectedHospital.properties.Name_of_Ho}</Typography>
            </Grid>
          </Grid>
        </ListItem>
        <Divider/>
        <ListItem className={clsx(classes.itemCategory, classes.item)}>
          <Grid container direction="column" justify="center" alignItems="center" spacing={3}>
            <Grid item xs>
              <Button style={{width: 300}} color="primary" onClick={() => setPage('1')}>
                <Typography style={{fontSize: 16, fontWeight:500}} color="secondary">
                  Hospital Information
                </Typography>
              </Button>
            </Grid>
            <Grid item xs>
              <Button style={{width: 300}} color="primary" onClick={() => setPage('2')}>
                <Typography style={{fontSize: 16, fontWeight:500}} color="secondary">
                  Hospital Supplies
                </Typography>
              </Button>
            </Grid>
            {/*<Grid item xs>
              <Button style={{width: 300}} color="primary" onClick={() => setPage('3')}>
                <Typography style={{fontSize: 16, fontWeight:500}} color="secondary">
                  Validator Information
                </Typography>
              </Button>
            </Grid>*/}
          </Grid>
        </ListItem>
      </List>
    </Drawer>
  );
}

SideDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SideDrawer);
