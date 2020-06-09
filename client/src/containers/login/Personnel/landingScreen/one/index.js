import React, {useContext,useState,useStyles} from 'react';
import { MapsContext } from '../../../../../contexts/MapsContext';
import { LoginContext } from '../../../../../contexts/LoginContext';
import { createMuiTheme, makeStyles, withStyles, ThemeProvider} from '@material-ui/core/styles';
import axios from 'axios';

import {IconButton, Input, TextField} from '@material-ui/core';
import { Card, CardContent, CardActions, CardHeader, Link,  Typography, Grid } from '@material-ui/core';

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
  fontWeight: 500
};

theme.typography.h2 = {
  fontSize: 20,
  fontWeight: 500
};

const Dashboard = (props) => {
  const { classes, ...other } = props;
  const { selectedHospital, setSelectedHospital } = useContext(MapsContext)
  const { username } = useContext(LoginContext);

  const [hos, setHos] = useState(selectedHospital);

  
  return (
    <ThemeProvider theme={theme}>
    <div className={classes.container}>
      <Grid container direction="row">
        <Grid item xs={7}>
          <Card className={classes.card}>
            <CardHeader className={classes.header} title="Announcements" />
            <CardContent className={classes.container} style={{height:'30vh'}}>
              <Typography variant='h3'>No announcements</Typography>
            </CardContent>
          </Card>
          <Card className={classes.card}>
            <CardHeader className={classes.header} title="Supplies summary" />
            <CardContent className={classes.container} style={{height:'30vh'}}>
              <Typography variant='h3'>No graphs to show yet</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={5}>
          <Card className={classes.card}>
            <CardHeader className={classes.header} title="Donations Tracking" />
            <CardContent className={classes.container} style={{height:'60vh'}}>
              <Typography variant='h3'>No donations yet</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
    </ThemeProvider>
  )
}

export default withStyles(styles)(Dashboard);

