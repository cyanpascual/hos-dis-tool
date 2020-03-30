import React, { useState } from 'react';


function Feedback(){   
  const [popUp, setPopUp] = useState(false);
  
  return (
    <section>
      <button className="popupbtn" onClick = {() => setPopUp(true)}>Feedback</button>
      {popUp?
      <div className="popup">  
        <div className="popup_inner">  
          <h1>Feedback form</h1>  
          <iframe src="https://docs.google.com/forms/d/e/1FAIpQLSdrIYT9pmBIra0N6oBko4IMkoOeRLLZaHMiEyT4-MtdZEkg5A/viewform?embedded=true" 
            width="650" height="350" frameborder="10" marginheight="10" marginwidth="10">Loading…</iframe>
          <button className="popupbtn" onClick={() => setPopUp(false)}>Close</button>  
        </div>  
      </div>  
      : null}
    </section>
  );  
}  
 
  
export default Feedback;