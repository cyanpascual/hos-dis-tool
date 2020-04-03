import React, { useState } from 'react';


function Volunteer(){   
  const [popUp, setPopUp] = useState(false);
  
  return (
    <section>
      <button className="popupbtn" onClick = {() => setPopUp(true)}>Be a volunteer</button>
      {popUp?
      <div className="popup">  
        <div className="popup_inner"> 
        <button className="popupbtn__close" onClick={() => setPopUp(false)}>Close</button>   
          <h1 className="popup__title">Volunteer form</h1>  
          <iframe src="https://docs.google.com/forms/d/e/1FAIpQLScVQrqBzL9y151vkI-Y6v9pvh4y44G-tftbDO6OoGHCnd3aTg/viewform?embedded=true" 
            frameborder="0" marginheight="0" marginwidth="0">Loading…</iframe>
        </div>  
      </div>  
      : null}
    </section>
  );  
}  
 
  
export default Volunteer;