import React, {useContext,useState} from 'react';
import { createStyles, makeStyles, useTheme} from '@material-ui/core/styles';

import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import HospitalSupply from './hospitalSupplies';
import HospitalInfo from './hospitalInfo';

const useStyles = makeStyles((theme) =>
  createStyles({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
      padding: 0,
      margin: 0
    }

  }),
);

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}


const HospitalUpdateMobile = (props) => {
  const [value, setValue] = React.useState(0);

  const classes = useStyles();
  const theme = useTheme();
  

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <div className={classes.container}>
      <AppBar position="static" color="default">
        <Tabs value={value} onChange={handleChange} indicatorColor="primary"
          textColor="primary" variant="fullWidth">
          <Tab label="Hospital Details" {...a11yProps(0)} />
          <Tab label="Hospital Supplies" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <SwipeableViews axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value} onChangeIndex={handleChangeIndex}>
        <TabPanel value={value} index={0} dir={theme.direction}>
          <HospitalInfo/>
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <HospitalSupply/>
        </TabPanel>
      </SwipeableViews>
    </div>
  )
}

export default HospitalUpdateMobile

