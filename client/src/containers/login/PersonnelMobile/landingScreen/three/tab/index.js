import React from 'react';
import { MapsContext } from '../../../../../../contexts/MapsContext'
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import HospitalUpdate from '../medSupply';
import LabSupplies from '../labSupply';

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

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: '100%',
  },
}));

export default function HospitalTabs() {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const { selectedHospital } = React.useContext(MapsContext)

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <div className={classes.root}>
      {selectedHospital.test_center ? <div>
        <AppBar position="static" color="default">
          <Tabs value={value} onChange={handleChange} indicatorColor="primary"
            textColor="primary" variant="fullWidth">
            <Tab label="Medical supplies" {...a11yProps(0)} />
            <Tab label="Laboratory supplies" {...a11yProps(1)} />
          </Tabs>
        </AppBar>
        <div>
          <SwipeableViews axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
            index={value} onChangeIndex={handleChangeIndex}>
            <TabPanel value={value} index={0} dir={theme.direction}>
              <HospitalUpdate/>
            </TabPanel>
            <TabPanel value={value} index={1} dir={theme.direction}>
              <LabSupplies/>
            </TabPanel>
          </SwipeableViews>
        </div>
      </div> : <HospitalUpdate/>}
    </div>
  );
}