import React, {useState, useContext} from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { withStyles, createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';

import { Card, CardContent, CardActions, CardHeader, Link,  Typography, Grid } from '@material-ui/core';

import { MapsContext } from '../../../../../../contexts/MapsContext';


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
    backgroundColor: '##cccac6',
    color: '#a84343',
    textAlign: "center"
  }, container: {
    background: "#a84343",
    color: '#f5f3ed',
  }, button: {
    marginLeft: -theme.spacing(2),
  }, card: {
    marginTop: theme.spacing(3)
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

function InfoCard(props) {
  const { classes, ...other } = props;
  const { selectedHospital } = useContext(MapsContext)
  
  console.log(selectedHospital)
  return (
    <ThemeProvider theme={theme}>
      <Card className={classes.card}>
        <CardHeader className={classes.header} title={selectedHospital.properties.cfname} />
        <CardContent className={classes.container}>
          <Grid container direction="row" justify="center" alignItems='center'>
            <Grid item xs={4}>
              <Typography variant="h3" align="center">Hospital ID</Typography>
              <Typography variant="h4" align="center">{selectedHospital.properties.hfhudcode}</Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="h3" align="center">DOH Level</Typography>
              <Typography variant="h4" align="center">{selectedHospital.properties.doh_level}</Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="h3" align="center">Region</Typography>
              <Typography variant="h4" align="center">{selectedHospital.properties.region}</Typography>
            </Grid>
          </Grid>
          <br/>
          <Typography variant="h3" align="center">Last Updated</Typography>
          <Typography variant="h4" align="center">{selectedHospital.properties.reportdate}</Typography>
        </CardContent>
      </Card>
    </ThemeProvider>
  );
}

Navigator.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(InfoCard);
