import React,{useContext} from 'react';
import cx from 'clsx';
import NoSsr from '@material-ui/core/NoSsr';
import GoogleFontLoader from 'react-google-font-loader';

import {Button, Avatar, Grid, Divider,Link,Container} from '@material-ui/core'

import { makeStyles } from '@material-ui/core/styles';
import { Column, Row, Item } from '@mui-treasury/components/flex';
import { useDynamicAvatarStyles } from '@mui-treasury/styles/avatar/dynamic';
import HospitalCard from './HospitalCard';
import { FeaturesContext } from '../../../contexts/FeaturesContext';
import { MapsContext } from '../../../contexts/MapsContext';
import DonationDialog from '../../DonationDialog'

const usePersonStyles = makeStyles(() => ({
  text: {
    fontFamily: 'Barlow, san-serif',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
  },
  name: {
    fontWeight: 600,
    fontSize: '1rem',
    color: '#122740',
  },
  caption: {
    fontSize: '0.875rem',
    color: '#758392',
    marginTop: -4,
  },
  btn: {
    borderRadius: 20,
    padding: '0.125rem 0.75rem',
    borderColor: '#becddc',
    fontSize: '0.75rem',
  },
}));



const useStyles = makeStyles(() => ({
  card: {
    width: '100%',
    borderRadius: 16,
    boxShadow: '0 8px 16px 0 #BDC9D7',
    overflow: 'auto',
  },
  header: {
    fontFamily: 'Barlow, san-serif',
    backgroundColor: '#fff',
  },
  headline: {
    color: '#122740',
    fontSize: '1.25rem',
    fontWeight: 600,
  },
  link: {
    color: '#2281bb',
    padding: '0 0.25rem',
    fontSize: '0.875rem',
  },
  actions: {
    color: '#BDC9D7'
  },
  divider: {
    backgroundColor: '#d9e2ee',
    margin: '0 20px',
  }
}));




const HospitalDeck = React.memo(function SocialCard(hospitals, page) {
  const styles = useStyles();
  const {facilities, hospitalList,filterLevel, filterSetting,selectedProvince,selectedCity,justTestCenters,supplyLabels,supplyIconGetter} = useContext(FeaturesContext);
  const { closePopups,mapReference, clickedFacility, setClickedFacility ,viewport, selectedHospital,setSelectedHospital, goToSelected } = useContext(MapsContext)

  return (
    <>
      {hospitalList ? (
        <Grid container spacing={2} >
          <DonationDialog/> 
        {hospitals['hospitals']
          .filter((hospital)=>{
            if(justTestCenters){
                return(hospital.test_center === true)
            }
            else{
                return(hospital)
            }
          })
        .filter((hospital)=> {
            if (filterLevel=== 'All'){
              return(hospital.properties.prov.includes(selectedProvince) && hospital.properties.city.includes(selectedCity))
            } else{
              return(hospital.properties.supply_status[filterSetting] === filterLevel && hospital.properties.prov.includes(selectedProvince) && hospital.properties.city.includes(selectedCity))
            }
            
          })       
        .sort((hospital1,hospital2)=>{
          if(hospital1.properties.supply_status[filterSetting]===hospital2.properties.supply_status[filterSetting]){
            return 0
          }
          else if(hospital1.properties.supply_status[filterSetting]==="Well stocked"){
            return 1
          }
          else if(hospital1.properties.supply_status[filterSetting]==="Low"){
            if(hospital2.properties.supply_status[filterSetting]==="Well stocked"){
              return -1
            }
            else if(hospital2.properties.supply_status[filterSetting]==="Critically Low"){
              return 1
            }
            else if(hospital2.properties.supply_status[filterSetting]==="No Data"){
              return -1
            }
          }
          else if(hospital1.properties.supply_status[filterSetting]==="Critically Low"){
            return -1
          }
          else if(hospital1.properties.supply_status[filterSetting]==="No Data"){
            return 1
          }
        })
        .map((hospital)=>{
          return(
          <Grid item xs={12} md={12} lg={12}>
            <HospitalCard hospital={hospital} page={hospitals['page']} supply={filterSetting} label={supplyLabels[filterSetting]} image={supplyIconGetter(filterSetting,hospital.properties.supply_status[filterSetting])}/>
          </Grid>
          )
        })}
      </Grid>
      ):(<Container>Loading</Container>)}
    </>
  );
});

export default HospitalDeck;