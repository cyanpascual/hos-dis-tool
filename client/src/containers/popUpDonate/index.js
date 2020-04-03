import React, { useState } from 'react';


function Donate(){   
  const [popUp, setPopUp] = useState(false);
  
  return (
    <section>
      <button className="popupbtn" onClick = {() => setPopUp(true)}>Donate</button>
      {popUp?
      <div className="popup">  
        <div className="popup_inner">  
        <button className="popupbtn__close" onClick={() => setPopUp(false)}>Close</button>
          <h1 className="popup__title">Donation form</h1>  
          <iframe src="https://docs.google.com/forms/d/e/1FAIpQLSdOG7rBP3aJU_CNKjgearZsi3-0RRwzz7RBDJMWtdTfA00btw/viewform?embedded=true"  
            className="formWindow">Loading…</iframe>
          
        </div>  
      </div>  
      : null}
    </section>
  );  
}  
 
  
export default Donate;