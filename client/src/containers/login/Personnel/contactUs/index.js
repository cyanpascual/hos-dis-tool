import React, {useContext,useState,useEffect} from 'react';
import { MapsContext } from '../../../../contexts/MapsContext';
import { LoginContext } from '../../../../contexts/LoginContext';
import { createMuiTheme, makeStyles, withStyles, ThemeProvider} from '@material-ui/core/styles';
import axios from 'axios';

import {Table, TableBody, TableCell, } from '@material-ui/core';
import TableContainer from '@material-ui/core/TableContainer';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import CloseIcon from '@material-ui/icons/Close';

import { TextField, Divider, Typography, Grid, Button, Collapse, IconButton, CircularProgress } from '@material-ui/core';
import { Alert } from '@material-ui/lab'

const styles = (theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justify: 'center',
    margin: theme.spacing(5),
    padding: '10px',
  },categoryHeader: {
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
  fontWeight: 400,
  color: 'grey'
};

theme.typography.h3 = {
  fontSize: 16,
  fontWeight: 400
};

theme.typography.h2 = {
  fontSize: 32,
  fontWeight: 500
};

const Contact = (props) => {
  const { classes, ...other } = props;
  const { selectedHospital, setSelectedHospital } = useContext(MapsContext)
  const { username } = useContext(LoginContext);

  const [msg, setMsg] = useState('')
  const [open, setOpen] = useState(false)
  const [sever, setSever] = useState('info')
  const [loading, setLoading] = useState(false)
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    console.log(message)
    axios({
        method: "POST", 
        url:"http://trams.com.ph/send/send", 
        data: {
            name: name,   
            email: email,  
            message: message
        }
    }).then((response)=>{
        if (response.data.msg === 'success'){
            setOpen(true);
            setMsg('Message sent!')
            setSever('success')
            setLoading(false)
            resetForm()
        }else if(response.data.msg === 'fail'){
            setOpen(true);
            setMsg('Message failed to send. Please try again later.')
            setLoading(false)
            setSever('error')
        }
    })
  }

  const resetForm = () =>{
    document.getElementById('contact-form').reset();
  }
  return (
    <ThemeProvider theme={theme}>
      <div className={classes.container}>
        <Typography align='center' variant='h2'>Feedback</Typography>
        <Divider/><br/>
        <Typography align='center' style={{fontSize: 14}}>We value your feedbacks as we continually improve our website. Alternatively, you can contact us at <i><b>trams.upd@up.edu.ph</b></i>.</Typography>
        <br/>
        <Typography align='center' variant='h4'>*Required fields</Typography>
        <br/>
        <form id="contact-form" onSubmit={handleSubmit} method="POST">
          <Grid container direction="column" justify="center" alignItems='center'>
            <Grid item className="form-group">
              <TextField className="form-control" label="Name" id="name" variant="filled"/>
            </Grid>
            <br/>
            <Grid item className="form-group">
              <TextField className="form-control" id="email" label="Email" required aria-describedby="emailHelp" variant="filled"/>
            </Grid>
            <br/>
            <Grid item className="form-group">
              <TextField className="form-control" multiline required label="Message/Concern" rows={5} id="message" style={{width: '40vw'}} variant="filled"/>
            </Grid>
            <br/>
            <Grid item xs>
              <Button type="submit" color="inherit" onClick={() => setLoading(true)}>Submit {loading ? <CircularProgress size={24}/>: <div/>}</Button>
            </Grid>
            <Grid item>
              
              <Collapse in={open}>
                <Alert severity={sever} action={<IconButton aria-label="close" color="inherit" size="small" onClick={() => {setOpen(false);}}>
                    <CloseIcon fontSize="inherit" />
                    </IconButton>}>
                  {msg}
                </Alert>
              </Collapse>
            </Grid>
          </Grid>
        </form>
      </div>
    </ThemeProvider>
  )
}

export default withStyles(styles)(Contact);

