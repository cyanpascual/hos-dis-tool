import React, {useState, useContext} from 'react';
import {LoginContext} from '../../../../../../contexts/LoginContext'
import { createMuiTheme, ThemeProvider, withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import EmailIcon from '@material-ui/icons/Email';
import FacebookIcon from '@material-ui/icons/Facebook';


const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },  root: {
    display: 'flex',
    minHeight: '100vh',
  },
  backDrop:{
    display: 'flex',
    alignItems: 'center',
    justify: 'center',
    margin: 0,
    height: '100%',
    width: '100%',
    backgroundColor: 'rgba(105,105,105, 0.5)'
  },
  backSub: {
    backgroundColor: 'rgba(105,105,105, 0.7)',
    display: 'flex',
    height: '100%',
    alignItems: 'center',
  },
  dialog: {
    background: 'white',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justify: 'center',
    margin: 'auto',
    textAlign: 'justify'
  },
  app: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  main: {
    flex: 1,
    padding: theme.spacing(6, 4),
    background: '#eaeff1',
  },
  footer: {
    padding: theme.spacing(2),
    background: '#eaeff1',
  },
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
  fontSize: '3vw',
  [theme.breakpoints.up('sm')]: {
    fontSize: 14,
  }, fontWeight: 500
};
theme.typography.h3 = {
  fontSize: '4vw',
  [theme.breakpoints.up('sm')]: {
    fontSize: 16,
  }, fontWeight: 350
};
theme.typography.h2 = {
  fontSize: '4vw',
  [theme.breakpoints.up('sm')]: {
    fontSize: 20,
  }, fontWeight: 500
};

function PageFour(props){
  const { classes, user } = props;
  const { page, setPage, locPage, setLocPage } = useContext(LoginContext);

  const nextPage = () => {
    setPage(page + 1)
  }

  const prevPage = () => {
    setPage(page - 1)
  }
  if (page === 4){
    return(
      <div className={classes.backDrop}>
        <Card className={classes.dialog} variant="outlined" width="40%">
          <CardContent>
            <Typography variant='h3' gutterBottom>
            Should you have any question or concerns, you may contact us through the following: <br/>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <EmailIcon/> trams.upd@up.edu.ph <br/>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <FacebookIcon/> facebook.com/TheTrAMSProject. 
            </Typography>
            <br/>
            <Typography variant='h4' gutterBottom>
            To exit this tutorial, you may press the escape button. Thank you! 
            </Typography>
       
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <ThemeProvider theme={theme}>
      <Grid container direction="row" spacing={0} alignItems='flex-start' justify='flex-start'
        style={{ display: 'flex', margin: 0, height: '100%', width: '100%'}}> 
        <Grid item disablePadding className={classes.backSub}>
          <div style={{width: 475}}>
            
          </div>
        </Grid>
        <Grid container item xs direction="column" justify="flex-start">
          <Grid item>
            <div style={{height: 96}}/>
          </Grid>
          <Grid item>
          <div style={{height: '6vh', backgroundColor: 'rgba(105,105,105, 0.7)'}}/>
          </Grid>
          <Grid item>
            <div style={{height: '80vh', backgroundColor: 'rgba(105,105,105, 0.7)'}}>
            <Card className={classes.dialog} variant="outlined" style={{width: '80%'}}>
            <CardContent>
              <Typography variant='h3' gutterBottom>
                If you wish to go back on this step-by-step tutorial of the website, feel free to click the <i><b>Help</b></i> button again.
                Also, help us improve our website by clicking on the <i><b>Feedback</b></i> button. 
                And finally, once done, you may sign out by clicking the <i><b>Logout</b></i> button. 
              </Typography>
      
            </CardContent>
            <CardActions>
              <Button size="small" onClick={nextPage}>
                <Typography variant='h4' color="textSecondary" gutterBottom>
                  Next
                </Typography>
              </Button>
              <Button size="small" onClick={prevPage}>
                <Typography variant='h4' color="textSecondary" gutterBottom>
                  Previous
                </Typography>
              </Button>
            </CardActions>
          </Card>
          </div>
          </Grid>
            
        </Grid>
      </Grid>
    </ThemeProvider>
  )
}

export default withStyles(styles)(PageFour)