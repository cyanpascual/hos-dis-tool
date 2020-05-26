import React, {useContext} from 'react';
import { MapsContext } from '../../../../../contexts/MapsContext';
import { createStyles, makeStyles} from '@material-ui/core/styles';

import { Divider, Typography } from '@material-ui/core';

import {Grid} from '@material-ui/core';

const useStyles = makeStyles((theme) =>
  createStyles({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
      padding: 5,
      margin: 5
    }

  }),
);

const HospitalInfo = (props) => {
  const { selectedHospital } = useContext(MapsContext)
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Grid container direction="row" justify="flex-start" alignItems="flex-start" spacing={0}>
        <Grid item container justify="flex-start" alignItems="flex-start" spacing={0}>
          <Grid item>
            <Typography style={{fontSize:18, fontWeight:500}}>{selectedHospital.properties.Name_of_Ho}</Typography>
            <Divider/>
            <Typography noWrap style={{fontSize:14, fontWeight:500}}>Hospital ID:</Typography>
            <Typography style={{fontSize:14, fontWeight:350, textAlign:'center'}}>{selectedHospital.properties.HospitalID}</Typography><br/>
            <Typography noWrap style={{fontSize:14, fontWeight:500}}>DOH Level:</Typography>
            <Typography style={{fontSize:14, fontWeight:350, textAlign:'center'}}>{selectedHospital.properties["DOH Level"]}</Typography><br/>
            <Typography noWrap style={{fontSize:14, fontWeight:500}}>Address:</Typography>
            <Typography style={{fontSize:14, fontWeight:350, textAlign:'center'}}>{selectedHospital.properties.Address}</Typography><br/>
            <Typography noWrap style={{fontSize:14, fontWeight:500}}>City/Municipality:</Typography>
            <Typography style={{fontSize:14, fontWeight:350, textAlign:'center'}}>{selectedHospital.properties["City/Municipality"]}</Typography><br/>
            <Typography noWrap style={{fontSize:14, fontWeight:500}}>Province:</Typography>
            <Typography style={{fontSize:14, fontWeight:350, textAlign:'center'}}>{selectedHospital.properties.Province}</Typography><br/>
            <Typography noWrap style={{fontSize:14, fontWeight:500}}>Region:</Typography>
            <Typography style={{fontSize:14, fontWeight:350, textAlign:'center'}}>{selectedHospital.properties.Region}</Typography><br/>
            <Typography noWrap style={{fontSize:14, fontWeight:500}}>Head/Contact Person:</Typography>
            <Typography style={{fontSize:14, fontWeight:350, textAlign:'center'}}>{selectedHospital.properties.Head} </Typography><br/>
            <Typography noWrap style={{fontSize:14, fontWeight:500}}>Contact Number/s:</Typography>
            <Typography style={{fontSize:14, fontWeight:350, textAlign:'center'}}>{selectedHospital.properties["Contact Numbers"]} </Typography><br/>
            <Typography noWrap style={{fontSize:14, fontWeight:500}}>Website:</Typography>
            <Typography style={{fontSize:14, fontWeight:350, textAlign:'center'}}>{selectedHospital.properties.Website} </Typography> <br/>
            <Typography noWrap style={{fontSize:14, fontWeight:500}}>Last Updated:</Typography>
            <Typography noWrap style={{fontSize:14, fontWeight:350, textAlign:'center'}}>{selectedHospital.properties["Last Update"]}</Typography><br/>
          </Grid>  
        </Grid>
      </Grid>
    </div>
  )
}

export default HospitalInfo

