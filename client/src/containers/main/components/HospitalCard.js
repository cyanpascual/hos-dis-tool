import React,{useContext} from 'react';
import GoogleFontLoader from 'react-google-font-loader';
import NoSsr from '@material-ui/core/NoSsr';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import {Card, Grid,  Typography, Icon } from '@material-ui/core';
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import { Column, Row, Item } from '@mui-treasury/components/flex';
import { Info, InfoSubtitle, InfoTitle } from '@mui-treasury/components/info';
import { useApexInfoStyles } from '@mui-treasury/styles/info/apex';
import { useGraphicBtnStyles } from '@mui-treasury/styles/button/graphic';
import { useRowFlexStyles } from '@mui-treasury/styles/flex/row';
import simple_high from '../../../assets/levelIndicators/alcohol-green.png'
import LocationOnIcon from '@material-ui/icons/LocationOn';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import { useTwitterBtnStyles } from '@mui-treasury/styles/button/twitter';
import { MapsContext } from '../../../contexts/MapsContext';
import { FeaturesContext } from '../../../contexts/FeaturesContext';
import DonationDialog from '../../DonationDialog'
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
    width: "40px",
    height: "40px",
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
  const {hospitalScrollbarReference,hospitalToDonateTo,setHospitalToDonateTo,donationDialogOpen,setDonationDialogOpen,dialogCount, setDialogCount} = useContext(FeaturesContext)
  return (
      <Card style={{padding:10}}>
        <Grid container spacing={1}>
          <Grid item xs={12} container  direction="row" justify="space-between" alignItems="center">
            <Grid item xs={9} sm={9} md={11} lg={9} and xl style={{whiteSpace: 'nowrap', width:"10vw"}}>
              <Typography style={{fontSize:14}} gutterBottom>
                <Box noWrap textOverflow="ellipsis" overflow="hidden" >
                  {hospital.properties.cfname}
                </Box>
              </Typography>
            {/* address */}
              <Typography style={{fontSize:12}} gutterBottom>
                <Box textOverflow="ellipsis" overflow="hidden"><LocationOnIcon style={{fontSize:10, marginRight:5}} />
                  {hospital.properties.city + ", " +hospital.properties.prov}
                </Box>

                {/* DOH level */}
                <Box textOverflow="ellipsis" overflow="hidden"><LocalHospitalIcon style={{fontSize:10,marginRight:5 }}/>
                {hospital.properties.doh_level}
                </Box>
            </Typography>
          </Grid>
            <Grid item xs={3} sm={3} md={1} lg={3} container direction="column" justify="flex-start" alignItems="center" >
              <Avatar style={{opacity: 0.70}}className={styles.logo} variant={'rounded'} src={image} />
              <Typography style={{fontSize:10, textAlign:"center"}} gutterBottom>
                <Box textOverflow="ellipsis" overflow="hidden">{label}</Box>
                <Box textOverflow="ellipsis" overflow="hidden">{hospital.properties.supply_cur[supply]}/{hospital.properties.supply_need[supply]}</Box>
              </Typography>
            </Grid>

          </Grid>
          <Grid item xs={12} container  direction="row" justify="space-between" alignItems="flex-start">
          <Grid item>
            <Button size="small" color={'primary'}
                onClick={(e)=>{
                  setSelectedHospital(hospital);
                  goToSelected(hospital);
              }}
            >
              More Info
            </Button>
          </Grid>
          <Grid item>
            <Button size="small" variant={'contained'} color="primary" onClick={()=>{
                setHospitalToDonateTo(hospital)
              }}>
              Donate
            </Button>
          </Grid>
          </Grid>
        </Grid>
      </Card>

    // <div className={styles.root}>
    //   <Column className={styles.card}>
    //     <Row p={2} gap={2} className={flexStyles.parent}>
    //       <Info position={'left'} style={{whiteSpace: 'nowrap',width:"70%"}}>
    //         {/* hospital name */}
    //         <Typography style={{fontSize:14}} gutterBottom>
    //         <Box noWrap textOverflow="ellipsis" overflow="hidden">
    //           {hospital.properties.cfname}
    //         </Box>
    //         </Typography>
    //         {/* address */}
    //         <Typography style={{fontSize:12}} gutterBottom>
    //         <Box textOverflow="ellipsis" overflow="hidden"><LocationOnIcon style={{fontSize:10, marginRight:5}} />
    //           {hospital.properties.city + ", " +hospital.properties.prov}
    //         </Box>

    //         {/* DOH level */}
    //         <Box textOverflow="ellipsis" overflow="hidden"><LocalHospitalIcon style={{fontSize:10,marginRight:5 }}/>
    //         {hospital.properties.doh_level}
    //         </Box>
    //         </Typography>
    //       </Info>
    //       <div className={flexStyles.rightChild}  style={{textAlign:"center", padding:"0 auto"}}>
          // <Avatar style={{margin:'0 auto',opacity: 0.70}}className={styles.logo} variant={'rounded'} src={image} />
          // <Typography style={{fontSize:12}} gutterBottom>
          // <Box textOverflow="ellipsis" overflow="hidden">{label}</Box>
          // <Box textOverflow="ellipsis" overflow="hidden">{hospital.properties.supply_cur[supply]}/{hospital.properties.supply_need[supply]}</Box>
          // </Typography>
    //       </div>
    //     </Row>
    //     <Row p={2} gap={2} position={'bottom'}>

          // <Item position={'left'}>
            // <Button
            //   size="small"
            //   onClick={(e)=>{
            //     setSelectedHospital(hospital);
            //     goToSelected(hospital);
            // }}
              
            //   color={'primary'}
            // >
            //   More Info
            // </Button>
    //       </Item>
    //       <Item position={'right'}>
            // <Button size="small" variant={'contained'} color="primary" onClick={()=>{
            //   setHospitalToDonateTo(hospital)
            // }}>
            //   Donate
            // </Button>
            
    //       </Item> 
    //     </Row>
    //   </Column>
    // </div>
  );
};


export default HospitalCard