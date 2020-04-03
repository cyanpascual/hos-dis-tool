import React, {useContext, useEffect} from 'react';
import Feedback from '../popUpFeedback';
import Donate from '../popUpDonate';
import Welcome from '../popUpWelcome';
import Volunteer from '../popUpVolunteers';
import Update from '../popUpUpdate';

function Menu(){
  return(
    <div className="menuToggle">
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
    </div>
  );
}

export default Menu;