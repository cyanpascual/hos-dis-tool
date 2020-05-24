import React from 'react';

import notfound from '../../assets/logos/404.png'
import 'leaflet/dist/leaflet.css'
import 'typeface-roboto';


export default function NotFound(props) {

  return(
    <div style={{display: 'flex', margin: 0, alignItems:'center', width: '100%', height: '100vh', background: '#ffffff'}}>
      <img src={notfound} style={{display: 'block', width: '50vw', margin: 'auto'}}/>
    </div>
  );
}
