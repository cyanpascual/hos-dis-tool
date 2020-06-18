import React, {useContext} from 'react';
import cx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import Avatar from '@material-ui/core/Avatar';
import Slider from '@material-ui/core/Slider';
import { FeaturesContext } from '../../contexts/FeaturesContext';
import { MapsContext } from '../../contexts/MapsContext';

const useStyles = makeStyles(({ spacing, palette }) => {
  

  return {
    card: {
      display: 'flex',
      padding: spacing(2),
      borderRadius: 12,
      width:"300px",      
      boxShadow: 'inset 0 2px 4px 0 rgba(138, 148, 159, 0.2)',
      '& > *:nth-child(1)': {
        marginRight: spacing(2),
      },
      '& > *:nth-child(2)': {
        flex: 'auto',
      },
    },
    avatar: {},
    heading: {

      fontSize: 16,
      marginBottom: 0,
    },
    subheader: {

      fontSize: 14,
      color: palette.grey[600],
      letterSpacing: '1px',
      marginBottom: 4,
    },
    value: {
      marginLeft: 8,
      fontSize: 14,
      color: palette.grey[500],
    },
  };
});

const useSliderStyles = makeStyles(() => ({
  root: {
    height: 4,
  },
  rail: {
    borderRadius: 10,
    height: 4,
    backgroundColor: 'rgb(202,211,216)',
  },
  track: {
    borderRadius: 10,
    height: 4,
    backgroundColor: '#9b2b2b',
  },
  thumb: {
    display: 'none',
  },
}));

const green = makeStyles(() => ({
  root: {
    height: 4,
  },
  rail: {
    borderRadius: 10,
    height: 4,
    backgroundColor: 'rgb(202,211,216)',
  },
  track: {
    borderRadius: 10,
    height: 4,
    backgroundColor: 'green',
  },
  thumb: {
    display: 'none',
  },
}));

const yellow = makeStyles(() => ({
  root: {
    height: 4,
  },
  rail: {
    borderRadius: 10,
    height: 4,
    backgroundColor: 'rgb(202,211,216)',
  },
  track: {
    borderRadius: 10,
    height: 4,
    backgroundColor: 'yellow',
  },
  thumb: {
    display: 'none',
  },
}));

const red = makeStyles(() => ({
  root: {
    height: 4,
  },
  rail: {
    borderRadius: 10,
    height: 4,
    backgroundColor: 'rgb(202,211,216)',
  },
  track: {
    borderRadius: 10,
    height: 4,
    backgroundColor: 'red',
  },
  thumb: {
    display: 'none',
  },
}));


const SupplyCard = React.memo(function KanbanCard(props) {
  const styles = useStyles();
  var sliderStyles = useSliderStyles();
  if(props.level[props.name] ==="Well stocked"){
    sliderStyles = green();
  } else if(props.level[props.name] ==="Low"){
    sliderStyles = yellow();
  }else if(props.level[props.name] ==="Critically Low"){
    sliderStyles = red();
  } else {
    sliderStyles = useSliderStyles();
  }
  
  const { supplyIconGetter,facilities, setFacilitiesList, facilitiesList, hospitals, hospitalList, setFilterSetting, filterSetting, filterLevel, setFilterLevel,supplyList,desktop } = useContext(FeaturesContext);
  const { closePopups, mapReference, setMapReference, defaultMapSettings,viewport, setViewport, selectedHospital,setSelectedHospital, hoveredHospital, setHoveredHospital, goToSelected } = useContext(MapsContext)
  return (
    <Card className={cx(styles.card)} style={{width:  desktop?"38vw":"75vw"}}elevation={0}>
      <Avatar src={supplyIconGetter(props.name,props.level[props.name])} className={styles.avatar} />
      <Box>
        <h3 className={styles.heading}>{props.name}</h3>
        <p className={styles.subheader}>Current/Supply</p>
        <Box display={'flex'} alignItems={'center'}>
          <Slider classes={sliderStyles} defaultValue={(props.current/props.cap)*100} />
            <span className={styles.value}>{props.current + "/" + props.cap}</span>
        </Box>
      </Box>
    </Card>
  );
});

export default SupplyCard