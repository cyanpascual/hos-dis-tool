import React, {useContext,useState,useEffect} from 'react';
import axios from 'axios';
import HospitalUpdate from '../hospitalUpdate';
import { FeaturesContext } from '../../../contexts/FeaturesContext';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import glass from '../../../assets/logos/magnifying-glass-md.png';
import Typography from '@material-ui/core/Typography';

import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import { TextField } from '@material-ui/core';

import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MuiExpansionPanel from '@material-ui/core/ExpansionPanel';
import MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import MuiExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';

const ExpansionPanel = withStyles({
  root: {
    border: '1px solid rgba(0, 0, 0, .125)',
    boxShadow: 'none',
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
    '&$expanded': {
      margin: 'auto',
    },
  },
  expanded: {},
})(MuiExpansionPanel);

const ExpansionPanelSummary = withStyles({
  root: {
    backgroundColor: '#a9a8a8',
    borderBottom: '1px solid rgba(0, 0, 0, .125)',
    marginBottom: -1,
    minHeight: 56,
    '&$expanded': {
      minHeight: 56,
      background: "#860000",
      color: "#fff"
    },

  },
  content: {
    '&$expanded': {
      margin: '5px 0',
    },
  },
  expanded: {},
})(MuiExpansionPanelSummary);

const ExpansionPanelDetails = withStyles((theme) => ({
  root: {
    padding: theme.spacing(5),
    margin: 'auto'
  },
}))(MuiExpansionPanelDetails);

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    align: "center"
  },
  container:{
    maxHeight: 600,
    margin: 10,
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
  cardcontent: {
    padding: "5px",
    "&:last-child": {
      paddingBottom: "5px"
    }
  },
  table: {
    maxHeight: "90vh",
    overflowY: "scroll"
  }
});

const HospitalList = (props) => {
  const { hospitals,setHospitals, hospitalList, setHospitalList } = useContext(FeaturesContext);
  const classes = useStyles();
  const [expanded, setExpanded] = useState();
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

  useEffect(()=> {
    const fetchData = async () => {
      const res2 = await axios('https://trams-up-dge.herokuapp.com/hospitals/', );
      
      setHospitals(res2.data);
      setHospitalList(res2.data);
    }
    fetchData();
  }, [])
  
  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
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

  return(
    <Grid container direction="column" spacing={0}>
      <Grid item xs={12}>
        <TableContainer>
          <Table stickyHeader size="small">
            <TableHead position="sticky">
              <TableRow position="sticky">
                <TableCell position="sticky">
                  <form noValidate>  
                    <TextField style={{ width: "120vh" }} label="Search Hospitals"
                      value={ searchTerm } onChange={e => searchTermChanged(e.target.value)}/>
                  </form>
                </TableCell >
                <TableCell position="sticky">
                  <TablePagination rowsPerPageOptions={[5, 10, 25]} component="div" 
                    count={hospitalList.length} rowsPerPage={rowsPerPage} page={page}
                    onChangePage={handleChangePage} onChangeRowsPerPage={handleChangeRowsPerPage} />
                </TableCell>
              </TableRow>
            </TableHead>
          </Table>
        </TableContainer>
      </Grid>
      <Grid item>
        <Paper className={classes.table}>
          <TableContainer>
            <Table>
              <TableBody>
                {hospitalList ? 
                hospitalList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((obj) => { 
                return(
                  <TableRow key={obj.properties.Name_of_Ho} tabIndex={-1}>
                    <TableCell colSpan={4}>
                      <ExpansionPanel TransitionProps={{unmountOnExit: true}} square expanded={expanded === obj.properties.Name_of_Ho} onChange={handleChange(obj.properties.Name_of_Ho)}>
                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                          <Typography variant="body1" component="h2">
                            <Box lineHeight={1.25}>{obj.properties.Name_of_Ho}</Box>
                          </Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                          <HospitalUpdate selected={obj}/>
                        </ExpansionPanelDetails>
                      </ExpansionPanel>
                    </TableCell>
                  </TableRow>
                )}): <TableRow><TableCell><div className="empty">No results</div></TableCell></TableRow>}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Grid>
    </Grid>
    
  );
}

export default HospitalList;