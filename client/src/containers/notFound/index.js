import React, {useContext, useEffect} from 'react';
import { Grid } from '@material-ui/core';
import { createMuiTheme} from '@material-ui/core/styles';

import 'leaflet/dist/leaflet.css'
import 'typeface-roboto';
import notFound from '../../assets/logos/404.png'


function NotFound(props) {
  return(
    <div style={{background: "#ffffff", display: "flex", position:"absolute", alignItems:"center", height:"100%", width:"100%"}}>
      <img src={notFound} style={{display:"block", margin:"auto", padding: "2px", width:"50%", verticalAlign:"middle" }}/>
    </div>
  );
}

export default NotFound;