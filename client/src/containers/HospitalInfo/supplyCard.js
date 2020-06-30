import React, {useContext} from 'react';
import cx from 'clsx';
import { makeStyles,  withStyles } from '@material-ui/core/styles';
import {Grid} from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import Avatar from '@material-ui/core/Avatar';
import LinearProgress  from '@material-ui/core/LinearProgress';
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


const BorderLinearProgress = withStyles(theme => ({
  root: {
    height: 10,
    borderRadius: 5
  },
  colorPrimary: {
    backgroundColor:
      theme.palette.grey[theme.palette.type === "light" ? 200 : 700]
  },
  bar: {
    borderRadius: 5,
    backgroundColor: "green"
  }
}))(LinearProgress);

const RedLinearProgress = withStyles(theme => ({
  root: {
    height: 10,
    borderRadius: 5
  },
  colorPrimary: {
    backgroundColor:
      theme.palette.grey[theme.palette.type === "light" ? 200 : 700]
  },
  bar: {
    borderRadius: 5,
    backgroundColor: "red"
  }
}))(LinearProgress);

const YellowLinearProgress = withStyles(theme => ({
  root: {
    height: 10,
    borderRadius: 5
  },
  colorPrimary: {
    backgroundColor:
      theme.palette.grey[theme.palette.type === "light" ? 200 : 700]
  },
  bar: {
    borderRadius: 5,
    backgroundColor: "yellow"
  }
}))(LinearProgress);

const GrayLinearProgress = withStyles(theme => ({
  root: {
    height: 10,
    borderRadius: 5
  },
  colorPrimary: {
    backgroundColor:
      theme.palette.grey[theme.palette.type === "light" ? 200 : 700]
  },
  bar: {
    borderRadius: 5,
    backgroundColor: "gray"
  }
}))(LinearProgress);




const SupplyCard = React.memo(function KanbanCard(props) {
  const styles = useStyles();

  const supplyLabelMap = {
    "alcohol": 'Alcohol',
    "disinfectant": "Disinfectant",
    "soap": "Soap",
    "gown": "Gown",
    "surgmask": "Surgical mask",
    "n95mask": "N95 mask",
    "gloves": "Glover",
    "shoe_cover": "Shoe cover",
    "coverall": "Coverall",
    "goggles": "Goggles",
    "face_shield": "Face shield",
    "head_cover": "Head cover",
    "tissue": "Tissue",
    "vitamins": "Vitamins"
  }

  const unitsLabelMap = {
    "alcohol": 'liters',
    "disinfectant": "liters",
    "soap": "pieces",
    "gown": "pieces",
    "surgmask": "pieces",
    "n95mask": "pieces",
    "gloves": "pairs",
    "shoe_cover": "pairs",
    "coverall": "pieces",
    "goggles": "pieces",
    "face_shield": "pieces",
    "head_cover": "pieces",
    "tissue": "rolls",
    "vitamins": "pieces"
  }
  
  const { supplyIconGetter,facilities, setFacilitiesList, facilitiesList, hospitals, hospitalList, setFilterSetting, filterSetting, filterLevel, setFilterLevel,supplyList,desktop } = useContext(FeaturesContext);
  const { closePopups, mapReference, setMapReference, defaultMapSettings,viewport, setViewport, selectedHospital,setSelectedHospital, hoveredHospital, setHoveredHospital, goToSelected } = useContext(MapsContext)
  return (
    <Grid id="supplyInfo" container direction="row" spacing={1}>
      
      <Grid id="indicatorIcon" item  xs={3} container alignItems="center">  
        <img src={supplyIconGetter(props.name,props.level[props.name])} alt={props.name + props.level[props.name]} style={{width:"80%", opacity:0.75}}/>
      </Grid>
      <Grid item xs={9} container direction="column">
        <h3 className={styles.heading}>{supplyLabelMap[props.name]}</h3>
        
        <Grid item>
          {props.level[props.name]==="Critically Low" ? (<RedLinearProgress variant="determinate" value={(props.current/props.cap)*100} />):(null)}
          {props.level[props.name]==="Low" ? (<YellowLinearProgress variant="determinate" value={(props.current/props.cap)*100} />):(null)}
          {props.level[props.name]==="Well stocked" ? (<BorderLinearProgress variant="determinate" value={(props.current/props.cap)*100 > 100 ? 100:(props.current/props.cap)*100} />):(null)}
          {props.level[props.name]==="No Data" ? (<GrayLinearProgress variant="determinate" value={(props.current/props.cap)*100} />):(null)}
          <span className={styles.value}>{props.current + ` ${props.current===1 ? unitsLabelMap[props.name].slice(0, -1): unitsLabelMap[props.name]}` + " /" + props.cap + ` ${unitsLabelMap[props.name]}`}</span>
        </Grid>
      </Grid>
    </Grid>
  );
});

export default SupplyCard