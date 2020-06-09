import React, {useState, useContext} from 'react';
import {LoginContext} from '../../../../../../../contexts/LoginContext'
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
    alignItems: 'center',
    justify: 'center',
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

function PageFour(props){
  const { classes, user } = props;
  const { page, setPage, locPage, setLocPage } = useContext(LoginContext);

  const nextPage = () => {
    setPage(page + 1)
  }

  const prevPage = () => {
    setPage(page - 1)
    setLocPage(2)
  }

  return (
    <div className={classes.backDrop}>
    <Card className={classes.dialog} variant="outlined">
      <CardContent>
        <Typography variant='h3' gutterBottom>
        Should you have any question or concerns, you may contact us through the following: <br/>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <EmailIcon/> trams.upd@up.edu.ph <br/>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <FacebookIcon/> facebook.com/TrAMSProject. 
        </Typography>
        <br/>
        <Typography variant='h4' gutterBottom>
        To exit this tutorial, you may press the close button on the bottom left of the screen. Thank you! 
        </Typography>
        <CardActions>
          <Button size="small" onClick={prevPage}>
            <Typography variant='h4' color="textSecondary" gutterBottom>
              Previous
            </Typography>
          </Button>
        </CardActions>  
      </CardContent>
    </Card>
  </div>
  )
}

export default withStyles(styles)(PageFour)