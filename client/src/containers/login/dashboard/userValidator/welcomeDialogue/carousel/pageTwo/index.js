import React, {useState, useContext} from 'react';
import {LoginContext} from '../../../../../../../contexts/LoginContext'
import { createMuiTheme, ThemeProvider, withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';


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
    margin: 0,
    height: '100%',
    width: '100%',
    backgroundColor: 'rgba(105,105,105, 0.5)'
  },
  backSub: {
    backgroundColor: 'rgba(105,105,105, 0.7)',
    display: 'flex',
    height: '100%',
  },
  dialog: {
    background: 'white',
    display: 'flex',
    justify: 'flex-start',
    margin: 'auto',
    direction: 'column',
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

function PageTwo(props){
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
      if (page === 1){
        setLocPage(0)
      } else {
        setLocPage(2)
      } setPage(page - 1)
    } else {
      setLocPage(locPage - 1)
    }
  }

  if (locPage === 2){
    return(
      <ThemeProvider theme={theme}>
      <Grid container direction="row" spacing={0}
        style={{ display: 'flex', alignItems: 'flex-start', justify: 'flex-start', margin: 0, height: '100%', width: '100%'}}> 
        <Grid item disablePadding>
          <div style={{width: 475}}>
            <Grid container direction="column" spacing={0}>
              <Grid item>
                <div style={{height: '19vh', width: '100%' }}/>
              </Grid>
              <Grid item xs>
                <div style={{height:'81vh', backgroundColor: 'rgba(105,105,105, 0.7)'}}/> 
              </Grid>
            </Grid>
          </div>
        </Grid>
        <Grid item>
          <div style={{width: 40, height: '100vh', backgroundColor: 'rgba(105,105,105, 0.7)'}}/>
        </Grid>
        <Grid container item xs className={classes.backSub} direction='column'>
          <Grid item style={{height: '5vh'}}/>
          <Grid item style={{height: '25vh'}}>
            <Card className={classes.dialog} variant="outlined" >
              <CardContent>
                <Typography variant='h3' gutterBottom>
                You may search hospitals by typing its name on the search bar, sorting them by hospital ID or hospital name or filtering them by region and province. 
                There’s also a designated <b><i>Reset</i></b> button if you wish to make another search. 
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
          </Grid>
        </Grid>
        <Grid item>
          <div style={{width: 300, height: '100vh', backgroundColor: 'rgba(105,105,105, 0.7)'}}/>
        </Grid>
      </Grid>
    </ThemeProvider>
    )
  } else if (locPage === 1){
    return(
      <ThemeProvider theme={theme}>
      <Grid container direction="row" spacing={0}
        style={{ display: 'flex', alignItems: 'center', justify: 'center', margin: 0, height: '100%', width: '100%'}}> 
        <Grid item disablePadding>
          <div style={{width: 475}}>
            <Grid container direction="column" spacing={0}>
              <Grid item>
                <div style={{height: '17vh', backgroundColor: 'rgba(105,105,105, 0.7)'}}/>
              </Grid>
              <Grid item xs>
                <div style={{height:'77vh'}}/> 
              </Grid>
              <Grid item xs>
                <div style={{height:'6vh', backgroundColor: 'rgba(105,105,105, 0.7)'}}/> 
              </Grid>
            </Grid>
          </div>
        </Grid>
        <Grid item>
          <div style={{width: 40, height: '100vh', backgroundColor: 'rgba(105,105,105, 0.7)'}}/>
        </Grid>
        <Grid item xs className={classes.backSub}>
          <Card className={classes.dialog} variant="outlined">
            <CardContent>
              <Typography variant='h3' gutterBottom>
              You can choose to view the list of hospitals by changing the <b><i>Rows per page</i></b> by 5, 10 or 25. Just click the drop down button found at the bottom of the list.
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
        </Grid>
        <Grid item>
          <div style={{width: 300, height: '100vh', backgroundColor: 'rgba(105,105,105, 0.7)'}}/>
        </Grid>
      </Grid>
    </ThemeProvider>
    )
  }

  return (
    <ThemeProvider theme={theme}>
      <Grid container direction="row" spacing={0} alignItems='center' justify='flex-start'
        style={{ display: 'flex', margin: 0, height: '100%', width: '100%'}}> 
        <Grid item disablePadding>
          <div style={{width: 475}}/>
        </Grid>
        <Grid item>
          <div style={{width: 40, height: '100vh', backgroundColor: 'rgba(105,105,105, 0.7)'}}/>
        </Grid>
        <Grid item xs className={classes.backSub}>
          <Card className={classes.dialog} variant="outlined" width={300}>
            <CardContent>
              <Typography variant='h3'>
              This side panel shows the list of all partner hospitals registered under the TrAMS+ project. 
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
        </Grid>
        <Grid item>
          <div style={{width: 300, height: '100vh', backgroundColor: 'rgba(105,105,105, 0.7)'}}/>
        </Grid>
      </Grid>
    </ThemeProvider>
  )
}

export default withStyles(styles)(PageTwo)