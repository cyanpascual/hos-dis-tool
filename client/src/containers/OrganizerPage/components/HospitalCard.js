import React,{useContext} from 'react';
import GoogleFontLoader from 'react-google-font-loader';
import NoSsr from '@material-ui/core/NoSsr';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { Column, Row, Item } from '@mui-treasury/components/flex';
import { Info, InfoSubtitle, InfoTitle } from '@mui-treasury/components/info';
import { useApexInfoStyles } from '@mui-treasury/styles/info/apex';
import { useGraphicBtnStyles } from '@mui-treasury/styles/button/graphic';
import { Typography, Icon } from '@material-ui/core';
import { useRowFlexStyles } from '@mui-treasury/styles/flex/row';
import simple_high from '../../../assets/levelIndicators/alcohol-green.png'
import LocationOnIcon from '@material-ui/icons/LocationOn';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import { useTwitterBtnStyles } from '@mui-treasury/styles/button/twitter';
import { MapsContext } from '../../../contexts/MapsContext';

const useStyles = makeStyles(() => ({
  root: {
    height: '100%',
    transition: '0.3s',
    position: 'relative',
    '&:before': {
      transition: '0.2s',
      position: 'absolute',
      width: '100%',
      height: '100%',
      content: '""',
      display: 'block',
      backgroundColor: '#d9daf1',
      borderRadius: '1rem',
      zIndex: 0,
      bottom: 0,
    },

  },
  card: {
    zIndex: 1,
    position: 'relative',
    borderRadius: '1rem',
    boxShadow: '0 6px 20px 0 #dbdbe8',
    backgroundColor: '#fff',
    transition: '0.4s',
    height: '100%',
  },
  logo: {
    width: 48,
    height: 48,
    borderRadius: '0.75rem',
  },
  avatar: {
    fontFamily: 'Ubuntu',
    fontSize: '0.875rem',
    backgroundColor: '#6d7efc',
  },
  join: {
    background: 'linear-gradient(to top, #638ef0, #82e7fe)',
    '& > *': {
      textTransform: 'none !important',
    },
  },
}));

const HospitalCard = ({
  hospital,
  supply,label,
  image
}) => {
  const styles = useStyles();
  const btnStyles = useTwitterBtnStyles();
  const flexStyles = useRowFlexStyles();

  const { closePopups,mapReference, clickedFacility, setClickedFacility ,viewport, selectedHospital,setSelectedHospital, goToSelected } = useContext(MapsContext)

  return (
    <div className={styles.root}>
      <Column className={styles.card}>
        <Row p={2} gap={2} className={flexStyles.parent}>
          <Info position={'left'} style={{whiteSpace: 'nowrap',width:"70%"}}>
            {/* hospital name */}
            <Box noWrap style={{fontWeight: 600,fontSize: '1rem'}} textOverflow="ellipsis" overflow="hidden">
              {hospital.properties.cfname}
            </Box>

            {/* address */}
            <Box style={{fontWeight: 400,fontSize: '0.8rem'}}  textOverflow="ellipsis" overflow="hidden"><LocationOnIcon style={{ fontSize: "0.8rem",marginRight:5}} />
              {hospital.properties.city + ", " +hospital.properties.prov}
            </Box>

            {/* DOH level */}
            <Box style={{fontWeight: 400,fontSize: '0.8rem'}}  textOverflow="ellipsis" overflow="hidden"><LocalHospitalIcon style={{ fontSize: "0.8rem",marginRight:5 }}/>
            {hospital.properties.doh_level}
            </Box>
          </Info>
          <div className={flexStyles.rightChild}  style={{textAlign:"center", padding:"0 auto"}}>
          <Avatar style={{margin:'0 auto',opacity: 0.70}}className={styles.logo} variant={'rounded'} src={image} />
          <Box style={{fontWeight: 400,fontSize: '1rem'}}  textOverflow="ellipsis" overflow="hidden">{label}</Box>
          <Box style={{fontWeight: 400,fontSize: '0.7rem'}}  textOverflow="ellipsis" overflow="hidden">{hospital.properties.supply_cur[supply]}/{hospital.properties.supply_need[supply]}</Box>
          </div>
        </Row>
        <Row p={2} gap={2} position={'bottom'}>

          <Item position={'left'}>
            <Button
      
              onClick={(e)=>{
                setSelectedHospital(hospital);
                goToSelected(hospital);
            }}
              
              color={'primary'}
            >
              More Info
            </Button>
          </Item>
           <Item position={'right'}>
    
          </Item> 
        </Row>
      </Column>
    </div>
  );
};


export default HospitalCard