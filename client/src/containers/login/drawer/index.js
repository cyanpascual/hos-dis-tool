import React,{useState, useContext} from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import {Drawer, List, ListItem} from '@material-ui/core';

import Button from '@material-ui/core/Button';
import {Grid, TextField, IconButton} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

import FilterDialog from '../dialog';
import { FeaturesContext } from '../../../contexts/FeaturesContext';
import { MapsContext } from '../../../contexts/MapsContext';

import {Table, Paper, TableHead, TableBody, TableCell} from '@material-ui/core';
import TableContainer from '@material-ui/core/TableContainer';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';

import {SortByAlpha, FormatListNumbered} from '@material-ui/icons';


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
  const { hospitalList, setHospitalList } = useContext(FeaturesContext);
  const { selectedHospital, setSelectedHospital } = useContext(MapsContext)
  const [open, setOpen] = React.useState(false);
  const [sort, setSort] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const [hospitals, setHospitals] = useState(hospitalList);

  const handleChange = (event) => {
    setAge(Number(event.target.value) || '');
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const searchTermChanged = (value) => {
    liveSearch(value)
    setSearchTerm(value);
  }

  const liveSearch = (searchTerm) => {
    setHospitalList( searchTerm ? 
      hospitals.filter(hospital =>
        hospital.properties.Name_of_Ho.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1,
      ) : hospitals
    )
  }

  if (sort === true){
    setHospitalList(hospitalList.sort(function(a,b){
      var x = a.properties.Name_of_Ho.toLowerCase();
      var y = b.properties.Name_of_Ho.toLowerCase();
      if (x<y) {return -1;}
      if (x>y) {return 1;}
      return 0;
    }));
  } else {
    setHospitalList(hospitalList.sort(function(a,b){
      var x = a.properties.HospitalID;
      var y = b.properties.HospitalID;
      if (x<y) {return -1;}
      if (x>y) {return 1;}
      return 0;
    }));
  }

  return (
    <Drawer variant="permanent" {...other} >
      <List disablePadding >
        <ListItem className={clsx(classes.header, classes.item)}>
          <Grid container alignItems="center" spacing={0}>
            <Grid item xs={2}>
              {sort?
                <IconButton onClick={() => setSort(!sort)}><FormatListNumbered/></IconButton> :
                <IconButton onClick={() => setSort(!sort)}><SortByAlpha/></IconButton>}
            </Grid>
            <Grid item xs={10}>
              <form noValidate>  
                <TextField style={{ width:300 }}label="Search Hospitals" value={ searchTerm } onChange={e => searchTermChanged(e.target.value)}/>
              </form>
            </Grid>
          </Grid>
        </ListItem>
        <ListItem className={clsx(classes.item, classes.header)}>
          <Grid container justify="center" alignItems="center" spacing={0}>
            <Grid item xs={12}>
              <FilterDialog/>
            </Grid>
          </Grid>
        </ListItem>
        <br/>
        <div style={{height:'65vh', overflowX: 'hidden' ,overflowY: 'auto'}}>
          <Paper className={classes.table}><TableContainer><Table size="small">
            <TableBody>
              {hospitalList ? 
              hospitalList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((hospital) => { 
              return(
                <TableRow key={hospital.properties.Name_of_Ho} tabIndex={-1}>
                  <TableCell colSpan={4}><Button style={{align: "left"}}onClick={() => setSelectedHospital(hospital)}>
                  <div style={{borderLeft: `3px solid maroon`, width:"100%", maxWidth:400, padding:"5px", textAlign:'left'}}>
                    <Grid container>
                      <Grid item xs={12}>
                        <Typography style={{fontSize:14, fontWeight:500}} noWrap  gutterBottom>{hospital.properties.Name_of_Ho}</Typography>
                      </Grid>
                      <Grid item xs={10}>
                        <Typography style={{fontSize:10, color:"gray"}} noWrap  gutterBottom>{hospital.properties.Address}</Typography>
                      </Grid>
                    </Grid>
                  </div></Button></TableCell>
                </TableRow>
              )}): <TableRow><TableCell><div className="empty">No results</div></TableCell></TableRow>}
            </TableBody>
          </Table></TableContainer></Paper>
        </div>
        <TablePagination rowsPerPageOptions={[5, 10, 25]} component="div" 
          count={hospitalList.length} rowsPerPage={rowsPerPage} page={page}
          onChangePage={handleChangePage} onChangeRowsPerPage={handleChangeRowsPerPage} />
      </List>
    </Drawer>
  );
}

Navigator.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Navigator);
