import React, {useContext, useEffect} from 'react';
import Feedback from '../popUpFeedback';
import Donate from '../popUpDonate';
import Welcome from '../popUpWelcome';
import Volunteer from '../popUpVolunteers';
import Update from '../popUpUpdate';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import uplogo from '../../assets/logos/up.png';
import dgelogo from '../../assets/logos/dge.png';
import engglogo from '../../assets/logos/engineering.png';
import geoplogo from '../../assets/logos/geop_light.png';
import tramslogo from '../../assets/logos/tramsLogo.png'

function Menu(){
  return(
    <Navbar expand="lg" bg="dark" variant="dark" className="header">
      <div className="logos">
    
          <img src={tramslogo} className="App-main-logo" alt="logo" />
          
          
          <img src={uplogo} className="App-logo" alt="logo" />
          <img src={engglogo} className="App-logo" alt="logo" />
          <img src={dgelogo} className="App-logo" alt="logo" />
          <img src={geoplogo} className="App-logo" alt="logo" />
        </div> 
      <label for="menu-toggle"><img className="menuIcon" alt="Menu" title="Menu"
        src="https://img.icons8.com/carbon-copy/2x/menu.png" />
      </label>
      <input type="checkbox" id="menu-toggle" />
      <ul className="menu" id="menu">
        <li><Welcome/></li>
        <li><Feedback/></li>
        <li><Donate/></li>
        <li><Volunteer/></li>
        <li><Update/></li>
      </ul>
    </Navbar>
  );
}

export default Menu;