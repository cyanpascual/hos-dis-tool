import React, { useState } from 'react';


function Donate(){   
  const [popUp, setPopUp] = useState(false);
  
  return (
    <section>
      <button className="popupbtn" onClick = {() => setPopUp(true)}>Donate</button>
      {popUp?
      <div className="popup">  
        <div className="popup_inner">  
          <h1>Donation form</h1>  
          <iframe src="https://docs.google.com/forms/d/e/1FAIpQLSdOG7rBP3aJU_CNKjgearZsi3-0RRwzz7RBDJMWtdTfA00btw/viewform?embedded=true"  
            width="650" height="350" frameborder="10" marginheight="10" marginwidth="10">Loading…</iframe>
          <button className="popupbtn" onClick={() => setPopUp(false)}>Close</button>  
        </div>  
      </div>  
      : null}
    </section>
  );  
}  
 
  
export default Donate;