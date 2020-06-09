import React, {useState, useContext} from 'react';
import {LoginContext} from '../../../../../../../contexts/LoginContext'
import { createMuiTheme, ThemeProvider, withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import legendPic from '../../assets/legend.png';
import info from '../../assets/info.png';
import supplies from '../../assets/supplies.png';



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
    textAlign: 'justify',
    margin: 'auto'
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
      <Grid container direction="row" spacing={0} alignItems='flex-start' justify='flex-start'
        style={{ display: 'flex', margin: 0, height: '100%', width: '100%'}}> 
        <Grid item disablePadding className={classes.backSub}>
          <div style={{width: 475}}/>
        </Grid>
        <Grid container item xs direction="column" justify="flex-start">
          <Grid item>
            <div style={{height: 97, backgroundColor: 'rgba(105,105,105, 0.7)'}}/>
          </Grid>
          <Grid container item direction='row'>
            <Grid item xs={5}>
            <img src={info} style={{ position:'absolute', zIndex: -1 }}/>
              <div style={{display: 'flex', height: '86vh', overflow: 'clip', backgroundColor: 'rgba(105,105,105, 0.7)'}}>
                <Card className={classes.dialog} variant="outlined" style={{width: '90%'}}>
                  <CardContent>
                    <Typography variant='h3' gutterBottom>
                    At the same time, medical supply inventory of the chosen hospital will be flashed on this side. Each supply is color tagged based on its current count. 
                    Note that only the Current Supply row can be edited. The following table shows the assigned count category for each supply.
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
            </Grid>
            <Grid item xs={7}>
              <div style={{display: 'flex', height: '86vh', overflow: 'clip'}}>
                <img src={supplies} style={{height: '100%', width: '100%'}}/>
              </div>
            </Grid>
          </Grid>
            
        </Grid>
      </Grid>
    </ThemeProvider>
    )
  } else if (locPage === 1){
    return(
    <ThemeProvider theme={theme}>
      <Grid container direction="row" spacing={0} alignItems='flex-start' justify='flex-start'
        style={{ display: 'flex', margin: 0, height: '100%', width: '100%'}}> 
        <Grid item disablePadding className={classes.backSub}>
          <div style={{width: 475}}/>
        </Grid>
        <Grid container item xs direction="column" justify="flex-start">
          <Grid item>
            <div style={{height: 97, backgroundColor: 'rgba(105,105,105, 0.7)'}}/>
          </Grid>
          <Grid container item direction='row'>
            <Grid item xs={5}>
              <div style={{display: 'flex', height: '86vh', overflow: 'clip'}}>
                <img src={info} style={{height: '100%', width: '100%'}}/>
              </div>
            </Grid>
            <Grid item xs={7}>
            <img src={supplies} style={{ position:'absolute', zIndex: -1 }}/>
              <div style={{display: 'flex', height: '86vh', overflow: 'clip', backgroundColor: 'rgba(105,105,105, 0.7)'}}>
                <Card className={classes.dialog} variant="outlined" style={{width: '85%'}}>
                  <CardContent>

                    <Typography variant='h3' gutterBottom>
                    Hospital information such as their name, address, the assigned <b><i>medical personnel</i></b>,  their contact details and their last log will be shown in this part. 
                    Note that the information flashed can only be edited by the medical personnel.  The edit button shown is fixed for updating the Current Supply row.
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
      </Grid>
    </ThemeProvider>
    )
  }

  return (
    <ThemeProvider theme={theme}>
      <Grid container direction="row" spacing={0} alignItems='flex-start' justify='flex-start'
        style={{ display: 'flex', margin: 0, height: '100%', width: '100%'}}> 
        <Grid item disablePadding className={classes.backSub}>
          <div style={{width: 475}}>
            <Card className={classes.dialog} variant="outlined" style={{width: '85%'}}>
            <CardContent>
              <Typography variant='h3' gutterBottom>
              On the right side, you’ll see the main screen which flashes all the data information once a hospital is selected.
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
        <Grid container item xs direction="column" justify="flex-start">
          <Grid item>
            <div style={{height: 97, backgroundColor: 'rgba(105,105,105, 0.7)'}}/>
          </Grid>
          <Grid item>
            <div style={{height: 400}}/>
          </Grid>
            
        </Grid>
      </Grid>
    </ThemeProvider>
  )
}

export default withStyles(styles)(PageThree)