import React, {useContext,useState, useEffect} from 'react';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import { MapsContext } from '../../../../../contexts/MapsContext';
import { LoginContext } from '../../../../../contexts/LoginContext';
import { FeaturesContext } from '../../../../../contexts/FeaturesContext';
import { createMuiTheme, withStyles, ThemeProvider} from '@material-ui/core/styles';
import axios from 'axios';

import { Table, TableBody, TableCell, TableContainer, TableFooter, TableRow, TablePagination } from '@material-ui/core';
import {Button, Input, Grid, Typography, Paper} from '@material-ui/core';
import EditIcon from "@material-ui/icons/EditOutlined";
import DoneIcon from "@material-ui/icons/DoneAllTwoTone";
import CancelIcon from '@material-ui/icons/CancelTwoTone';
import AddIcon from '@material-ui/icons/Add';;


const styles = (theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justify: 'center',
    width: '98%',
    margin: 5,
    padding: 5,
    background: '#fffffe'
  }, categoryHeader: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  }, item: {
    paddingTop: 1,
    paddingBottom: 1,
    color: theme.palette.common.white,
  }, header: {
    fontSize: 24,
    backgroundColor: '#BAB8B2',
    color: '#a84343',
    textAlign: "center"
  }, button: {
    width: '80%',
    backgroundColor: '#BAB8B2',
    color: '#660000',
  }, cancelButton: {
    width: '80%',
    backgroundColor: '#a84343',
    color: '#BAB8B2',
  }, card: {
    marginTop: theme.spacing(3)
  }, tiledCalendar: {
    backgroundColor: '#BAB8B2'
  }
});

const theme = createMuiTheme(
  {
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
  }
);

theme.typography.h4 = {
  fontSize: 14,
  fontWeight: 400
};

theme.typography.h3 = {
  fontSize: 16,
  fontWeight: 500
};

theme.typography.h2 = {
  fontSize: 20,
  fontWeight: 500
};

const Donations = (props) => { 
  const { classes, ...other } = props;
  const { selectedHospital, setSelectedHospital } = useContext(MapsContext)
  const { hospitalList, setHospitalList, hospitals, setHospitals } = useContext(FeaturesContext)
  const { username, donations } = useContext(LoginContext);

  const [selectedDonation, setSelectedDonation] = useState();
  
  const [isEditMode, setIsEditMode] = useState(false);
  const [dpage, setDpage] = useState(0);
  const [rowsPerPageD, setRowsPerPageD] = useState(5);

  const handleChangePageD = (event, newPage) => {
    setDpage(newPage);
  };

  const handleChangeRowsPerPageD = (event) => {
    setRowsPerPageD(+event.target.value);
    setDpage(0);
  };



  return (
    <ThemeProvider theme={theme}>
    <div className={classes.container}>
      <Grid container direction="row" justify="flex-start" alignItems="flex-start" spacing={2}>
        <Grid container item xs={5} direction="column" justify="flex-start" alignItems='flex-start'>
          <Grid item>
            <TableContainer><Table size="small" style={{height: '82vh', overflow: 'scroll', width:'100%'}}>
              <TableBody>
                {donations ? donations.slice(dpage * rowsPerPageD, dpage * rowsPerPageD + rowsPerPageD).map((donation) => { 
                return (
                  <TableRow key={donation._id} tabIndex={-1}>
                    <TableCell colSpan={4}><Button style={{align: "left"}}>
                      <div style={{borderLeft: `3px solid maroon`, width:"100%", padding:"5px", textAlign:'left'}}>
                      <Grid container>
                        <Grid item xs={12}>
                          <Typography style={{fontSize:16, fontWeight:500}} gutterBottom>From: {donation.properties.donor}</Typography>
                        </Grid>
                        <Grid item xs={10}>
                          <Typography style={{fontSize:11, color:"gray"}} gutterBottom>{donation.properties.reportdate.slice(-22)}</Typography>
                        </Grid>
                        <Grid item xs={10}>
                          <Typography style={{fontSize:14, color:"black"}} gutterBottom>
                            Status: 
                          </Typography>
                        </Grid>
                      </Grid>
                    </div></Button></TableCell>
                  </TableRow>
                  )}): <TableRow><TableCell align='center'><Typography variant='h3'>No donations yet</Typography></TableCell></TableRow>}
                  </TableBody>
                  <TableFooter>
                  <TablePagination style={{display: 'flex', padding: 0, alignSelf: 'center'}} component="div" 
                    count={donations.length} rowsPerPage={rowsPerPageD} page={dpage} rowsPerPageOptions={[5]}
                    onChangePage={handleChangePageD} onChangeRowsPerPage={handleChangeRowsPerPageD} />
                  </TableFooter>
                  </Table></TableContainer>
                </Grid>
        </Grid>
        <Grid item xs={7}>
        </Grid>
      </Grid>
    </div>
    </ThemeProvider>
  )
}

export default withStyles(styles)(Donations)

