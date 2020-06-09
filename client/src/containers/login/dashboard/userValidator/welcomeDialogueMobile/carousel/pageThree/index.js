import React, {useState, useContext} from 'react';
import {LoginContext} from '../../../../../../../contexts/LoginContext'
import { createMuiTheme, ThemeProvider, withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import details from '../../assets/4-hospitaldetails.png';
import supplies from '../../assets/5-hospitalsupplies.png';
import help from '../../assets/help.png';
import feedback from '../../assets/feedback.png';
import logout from '../../assets/logout.png';
import header from '../../assets/header.png';
import legendPic from '../../assets/legend.png'


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
    justify: 'flex-start',
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

function PageThree(props){
  const { classes, user } = props;
  const { page, setPage, locPage, setLocPage } = useContext(LoginContext);

  const nextPage = () => {
    if (locPage === 2){
      setPage(page + 1)
      setLocPage(0)
    } else {
      setLocPage(locPage + 1)
    }
  }

  const prevPage = () => {
    if (locPage === 0){
      setPage(page - 1)
      setLocPage(2)
    } else {
      setLocPage(locPage - 1)
    }
  }

  if (locPage === 2){
    return(
      <ThemeProvider theme={theme}>
      <div className={classes.backDrop}>
        <Card className={classes.dialog} variant="outlined">
          <CardContent>
            <Typography variant='h3' gutterBottom>
            <img src={header} style={{display: 'block', margin: 'auto', width: '100%'}}/><br/>
            To repeat the guide, feel free to click  the <img src={help}/> again. <br/><br/>
            For feedback, you may click the <img src={feedback}/> to answer our form.<br/><br/>
            Lastly, to sign out, click the <img src={logout}/>.

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
    </ThemeProvider>
    )
  } else if (locPage === 1){
    return(
      <ThemeProvider theme={theme}>
      <div className={classes.backDrop}>
        <Card className={classes.dialog} variant="outlined">
          <CardContent>
            <Typography variant='h3' gutterBottom>
            Update supply inventory through the <b><i>Hospital Supplies</i></b> tab. Click the <i><b>Edit</b></i> button to do so.
            <br/>
            <br/>
            <img src={supplies} style={{display: 'block', margin: 'auto', width: '75%'}}/><br/>
            The following table shows the assigned count category for each supply.
            <br/>
            <br/>
            <img src={legendPic} alt="legend" style={{
              display: 'block',
              margin: 'auto',
              width: '80%'
            }}/> 
            
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
    </ThemeProvider>
    )
  }

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.backDrop}>
        <Card className={classes.dialog} variant="outlined">
          <CardContent>
            <Typography variant='h3' gutterBottom>
            Access hospital information (name, address, tassigned medical personnel and their contact details) through the <b><i>Hospital Details</i></b> tab. 
            Note that information here <i><b>cannot be edited by validators</b></i>. <br/>
            <br/>
            <img src={details} style={{display: 'block', margin: 'auto', width: '75%'}}/>
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
    </ThemeProvider>
  )
}

export default withStyles(styles)(PageThree)