import React, {useState, useContext} from 'react';
import {LoginContext} from '../../../../../../contexts/LoginContext'
import { createMuiTheme, ThemeProvider, withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import sidePanel from '../../assets/3-sidepanel.png';
import header from '../../assets/header.png';
import menu from '../../assets/hamburger.png';
import rows from '../../assets/Rowsperpage.png';
import searchbar from '../../assets/searchbar.png';


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
    width: '100%',
    height: '100%'
  },
  dialog: {
    background: 'white',
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'justify',
    justify: 'flex-start',
    alignItems: 'flex-start',
    margin: theme.spacing(2),
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
      <div className={classes.backDrop}>
        <Card className={classes.dialog} variant="outlined">
          <CardContent>
            <Typography variant='h3' gutterBottom>
            Search hospitals by typing its name on the <i><b>search bar</b></i>, <b><i>sorting by hospital ID or hospital name</i></b>, or 
            <i><b>filtering by region and province</b></i>. Click <i><b>Reset</b></i> if you wish to make another search. <br/>
            <br/><img src={searchbar} style={{display: 'block', margin: 'auto', width:'90%'}}/>
            <br/><br/>
            Customize viewing by changing the <b><i>Rows per page</i></b> by 5, 10 or 25. Click the drop down button found at the bottom of the list.<br/>
            <br/><img src={rows} style={{display: 'block', margin: 'auto', width: '90%'}}/>
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
            The hospital side panel shows the list of all partner hospitals registered under the TrAMS+ project
            <br/><br/>
            <img src={sidePanel} style={{width:'80%', display: 'block', margin: 'auto'}}/>
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
            This is the menu button. <br/><br/>
            <img src={menu} style={{display: 'block', margin: 'auto'}}/>
            <br/>
            The menu button is located at the <i><b>upper left side of the screen</b></i>. 
            <br/><br/>
            <img src={header} style={{width: '100%'}}/>
            <br/><br/>
            Once clicked, the hospital side panel will appear. 

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

export default withStyles(styles)(PageTwo)