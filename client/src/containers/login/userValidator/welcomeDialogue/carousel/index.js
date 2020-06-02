import React, {useState, useContext} from 'react';
import {LoginContext} from '../../../../../contexts/LoginContext.js'
import { createMuiTheme, ThemeProvider, withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import PageTwo from './pageTwo';
import PageThree from './pageThree';
import PageFour from './pageFour';


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
    backgroundColor: 'rgba(105,105,105, 0.7)'
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
    alignItems: 'center',
    justify: 'center',
    width: '50%',
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

function HelpCarousel(props){
  const { classes, user } = props;
  const { page, setPage } = useContext(LoginContext);

  const nextPage = () => {
    setPage(page + 1)
  }

  const prevPage = () => {
    setPage(page - 1)
  }

  if (page === 1){
    return(
      <PageTwo/>
    )
  } else if (page === 2){
    return(
      <PageThree/>
    )
  } else if (page > 2){
    return(
      <PageFour/>
    )
  }

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.backDrop}>
        <Card className={classes.dialog} variant="outlined">
          <CardContent>
            <Typography variant='h2' gutterBottom>
              Hello, {user.properties.Firstname}!
            </Typography>
            <Typography variant='h3' gutterBottom>
              This interface is for volunteers, validators, and staff of TrAMS used to update and monitor hospital supplies. 
            </Typography>
      
          </CardContent>
          <CardActions>
            <Button size="small" onClick={nextPage}>
              <Typography variant='h4' color="textSecondary" gutterBottom>
                Next
              </Typography>
            </Button>
          </CardActions>
        </Card>
      </div>
    </ThemeProvider>
  )
}

export default withStyles(styles)(HelpCarousel)