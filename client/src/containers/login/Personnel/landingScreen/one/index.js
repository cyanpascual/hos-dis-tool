import React, {useContext,useState,useEffect} from 'react';
import { MapsContext } from '../../../../../contexts/MapsContext';
import { LoginContext } from '../../../../../contexts/LoginContext';
import { createMuiTheme, makeStyles, withStyles, ThemeProvider} from '@material-ui/core/styles';
import axios from 'axios';

import {Table, TableBody, TableCell} from '@material-ui/core';
import TableContainer from '@material-ui/core/TableContainer';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';

import { Card, CardContent, CircularProgress, CardHeader, Link,  Typography, Grid, Button, Collapse } from '@material-ui/core';

const styles = (theme) => ({
  categoryHeader: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  }, item: {
    paddingTop: 1,
    paddingBottom: 1,
    color: theme.palette.common.white,
  }, header: {
    fontSize: 24,
    backgroundColor: '#a84343',
    color: '#fffffe',
    textAlign: "center"
  }, container: {
    background: "#fffffe",
    color: '#000000',
  }, button: {
    marginLeft: -theme.spacing(2),
  }, card: {
    margin: theme.spacing(2)
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
  fontWeight: 400
};

theme.typography.h2 = {
  fontSize: 20,
  fontWeight: 500
};

const Dashboard = (props) => {
  const { classes, ...other } = props;
  const { selectedHospital, setSelectedHospital } = useContext(MapsContext)
  const { username, donations, setDonations } = useContext(LoginContext);
  
  const [announcements, setAnnouncements] = useState('')
  const [announceList, setAnnounceList] = useState('')
  const [selectAnnounce, setSelectAnnounce] = useState('')
  const [hos, setHos] = useState(selectedHospital);
  const [loaded, setLoaded] = useState(false)
  const [dloaded, setDloaded] = useState(false)

  const [page, setPage] = useState(0);
  const [dpage, setDpage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [rowsPerPageD, setRowsPerPageD] = useState(5);
  
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangePageD = (event, newPage) => {
    setDpage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleChangeRowsPerPageD = (event) => {
    setRowsPerPageD(+event.target.value);
    setDpage(0);
  };

  

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios('https://trams-up-dge.herokuapp.com/ann0unc3m3nt', );
      const res2 = await axios('https://trams-up-dge.herokuapp.com/all0cati0n', )

      
      setAnnouncements(res.data.sort(function(a,b){
        var x = (new Date(a.reportdate)).getTime();
        var y = (new Date(b.reportdate)).getTime();
        if (x<y) {return 1;}
        if (x>y) {return -1;}
        return 0;
      }).map((item) => { return {
        ...item,
        expand: false
      }}));
      setAnnounceList(res.data.map((item) => { return {
        ...item,
        expand: false
      }}))

      setDonations(res2.data.sort(function(a,b){
        var x = (new Date(a.properties.orderdate.slice(-22))).getTime();
        var y = (new Date(b.properties.orderdate.slice(-22))).getTime();
        if (x<y) {return 1;}
        if (x>y) {return -1;}
        return 0;
      }).filter((donation) => donation.properties.hfhudcode === selectedHospital.properties.hfhudcode))
      //console.log(res2.data)
      setDloaded(true)
    }
    
    fetchData();
  }, [])
  
  useEffect(() => {
    if (announceList){
      setLoaded(true)
      setAnnouncements(announceList.sort(function(a,b){
        var x = (new Date(a.reportdate)).getTime();
        var y = (new Date(b.reportdate)).getTime();
        if (x<y) {return 1;}
        if (x>y) {return -1;}
        return 0;
      }))
    }
  },[announceList])


  const handleClick = (index, value) => {
    setAnnounceList(announcements.filter((item) => item.title !== index))
    let selected = announcements.filter((item) => item.title === index).map((item) => {return{
      ...item,
      expand: value
    }})
    setAnnounceList(prevState => [
      ...prevState,
      selected[0]
    ])
  }

  return (
    <ThemeProvider theme={theme}>
    <div>
      <Grid container direction="row">
        <Grid item xs={6}>
          <Card className={classes.card}>
            <CardHeader className={classes.header} title="Announcements" />
            <CardContent className={classes.container} style={{height:'65vh'}}>
              <Grid container direction='column'>
                <Grid item style={{height:'55vh', overflow: 'scroll', display: 'flex', flexDirection: 'column'}} xs={12}>
                  <TableContainer><Table size="small" style={{height: '100%', overflow: 'scroll', width:'100%'}}>
                    <TableBody>
                      {announcements ? 
                        announcements.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((announce) => { 
                        if (new Date(announce.reportdate.slice(0,24)).getTime() < new Date().getTime()) {
                        return (
                        <TableRow key={announce.title} tabIndex={-1}>
                          <TableCell colSpan={4}><div style={{borderLeft: `3px solid maroon`, width:"100%", padding:"5px", textAlign:'left'}}>
                            <Grid container>
                              <Grid item xs={12}>
                                <Typography style={{fontSize:16, fontWeight:500}} gutterBottom>{announce.title}</Typography>
                              </Grid>
                              <Grid item xs={10}>
                                <Typography style={{fontSize:11, color:"gray"}} gutterBottom>{announce.reportdate.slice(0,24)} - from: {announce.code}</Typography>
                              </Grid>
                              <Grid item xs={10}>
                                <Typography style={{fontSize:14, color:"black"}} gutterBottom>
                                  {announce.expand ? <div/> : announce.content.length < 50 ? <div>{announce.content}</div> : <div>{announce.content.slice(0, 50)}...<Button onClick={()=> handleClick(announce.title, true)}>See more</Button></div>}
                                  <Collapse in={announce.expand} timeout="auto" unmountOnExit>
                                    <div>{announce.content} <Button onClick={()=> handleClick(announce.title, false)}>See less</Button></div>
                                  </Collapse>
                                </Typography>
                              </Grid>
                            </Grid>
                          </div></TableCell>
                        </TableRow>
                        )}}): loaded ? <TableRow><TableCell align='center'><Typography variant='h3'>No announcements</Typography></TableCell></TableRow>
                        : <TableRow><TableCell colSpan={4} align='center'>
                        <Grid container>
                          <Grid item xs={12}>
                            <CircularProgress />
                          </Grid>
                          <Grid item xs={12}>
                            <Typography variant='h3'>Loading...</Typography>
                          </Grid>
                        </Grid>
                      </TableCell></TableRow>
                    }
                    </TableBody>
                  </Table></TableContainer>
                </Grid>
                <Grid item>
                  <TablePagination style={{display: 'flex', padding: 0, alignSelf: 'center'}} component="div" 
                    count={announcements.length} rowsPerPage={rowsPerPage} page={page} rowsPerPageOptions={[5]}
                    onChangePage={handleChangePage} onChangeRowsPerPage={handleChangeRowsPerPage} />
                </Grid>
              </Grid>
            </CardContent>
          </Card>


          {/*<Card className={classes.card}>
            <CardHeader className={classes.header} title="Supplies summary" />
            <CardContent className={classes.container} style={{height:'30vh'}}>
              <Typography variant='h3'>No graphs to show yet</Typography>
            </CardContent>
          </Card>*/}
        </Grid>
        <Grid item xs={6}>
          <Card className={classes.card}>
            <CardHeader className={classes.header} title="Donations Tracking" />
            <CardContent className={classes.container} style={{height:'65vh'}}>
              <Grid container direction='column'>
                <Grid item style={{height:'55vh', overflow: 'scroll', display: 'flex', flexDirection: 'column'}} xs={12}>
                  <TableContainer><Table size="small" style={{height: '100%', overflow: 'scroll', width:'100%'}}>
                    <TableBody>
                      {donations ? donations.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((donation) => { 
                        return (
                        <TableRow key={donation._id} tabIndex={-1}>
                          <TableCell colSpan={4}><div style={{borderLeft: `3px solid maroon`, width:"100%", padding:"5px", textAlign:'left'}}>
                            <Grid container>
                              <Grid item xs={12}>
                                <Typography style={{fontSize:16, fontWeight:500}} gutterBottom>From: {donation.properties.supplier}</Typography>
                              </Grid>
                              <Grid item xs={10}>
                                <Typography style={{fontSize:11, color:"gray"}} gutterBottom>{donation.properties.orderdate}</Typography>
                              </Grid>
                              <Grid item xs={10}>
                                <Typography style={{fontSize:14, color:"black"}} gutterBottom>
                                  Status:  {donation.properties.status}
                                </Typography>
                              </Grid>
                            </Grid>
                          </div></TableCell>
                        </TableRow>
                        )}): dloaded ? <TableRow><TableCell align='center'><Typography variant='h3'>No donations yet</Typography></TableCell></TableRow>
                        : <TableRow><TableCell colSpan={4} align='center'>
                        <Grid container>
                          <Grid item xs={12}>
                            <CircularProgress />
                          </Grid>
                          <Grid item xs={12}>
                            <Typography variant='h3'>Loading...</Typography>
                          </Grid>
                        </Grid>
                      </TableCell></TableRow>
                    }
                    </TableBody>
                  </Table></TableContainer>
                </Grid>
                <Grid item>
                  <TablePagination style={{display: 'flex', padding: 0, alignSelf: 'center'}} component="div" 
                    count={donations.length} rowsPerPage={rowsPerPageD} page={dpage} rowsPerPageOptions={[5]}
                    onChangePage={handleChangePageD} onChangeRowsPerPage={handleChangeRowsPerPageD} />
                </Grid>
                  </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
    </ThemeProvider>
  )
}

export default withStyles(styles)(Dashboard);

