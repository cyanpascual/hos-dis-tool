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
            <Typography style={{fontSize:18, fontWeight:500}}>{selectedHospital.properties.cfname}</Typography>
            <Divider/>
            <Typography noWrap style={{fontSize:14, fontWeight:500}}>Hospital ID:</Typography>
            <Typography style={{fontSize:14, fontWeight:350, textAlign:'center'}}>{selectedHospital.properties.hfhudcode}</Typography><br/>
            <Typography noWrap style={{fontSize:14, fontWeight:500}}>DOH Level:</Typography>
            <Typography style={{fontSize:14, fontWeight:350, textAlign:'center'}}>{selectedHospital.properties.doh_level}</Typography><br/>
            <Typography noWrap style={{fontSize:14, fontWeight:500}}>Address:</Typography>
            <Typography style={{fontSize:14, fontWeight:350, textAlign:'center'}}>{selectedHospital.properties.address}</Typography><br/>
            <Typography noWrap style={{fontSize:14, fontWeight:500}}>City/Municipality:</Typography>
            <Typography style={{fontSize:14, fontWeight:350, textAlign:'center'}}>{selectedHospital.properties.city}</Typography><br/>
            <Typography noWrap style={{fontSize:14, fontWeight:500}}>Province:</Typography>
            <Typography style={{fontSize:14, fontWeight:350, textAlign:'center'}}>{selectedHospital.properties.prov}</Typography><br/>
            <Typography noWrap style={{fontSize:14, fontWeight:500}}>Region:</Typography>
            <Typography style={{fontSize:14, fontWeight:350, textAlign:'center'}}>{selectedHospital.properties.region}</Typography><br/>
            <Typography noWrap style={{fontSize:14, fontWeight:500}}>Head/Contact Person:</Typography>
            <Typography style={{fontSize:14, fontWeight:350, textAlign:'center'}}>{selectedHospital.properties.cont_person} </Typography><br/>
            <Typography noWrap style={{fontSize:14, fontWeight:500}}>Contact Number/s:</Typography>
            <Typography style={{fontSize:14, fontWeight:350, textAlign:'center'}}>{selectedHospital.properties.cont_num} </Typography><br/>
            <Typography noWrap style={{fontSize:14, fontWeight:500}}>Website:</Typography>
            <Typography style={{fontSize:14, fontWeight:350, textAlign:'center'}}>{selectedHospital.properties.website} </Typography> <br/>
            <Typography noWrap style={{fontSize:14, fontWeight:500}}>Last Updated:</Typography>
            <Typography noWrap style={{fontSize:14, fontWeight:350, textAlign:'center'}}>{selectedHospital.properties.reportdate}</Typography><br/>
          </Grid>  
        </Grid>
      </Grid>
    </div>
  )
}

export default HospitalInfo

