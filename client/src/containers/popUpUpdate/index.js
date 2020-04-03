import React, { useState } from 'react';


function Update(){   
  const [popUp, setPopUp] = useState(false);
  
  return (
    <section>
      <button className="popupbtn" onClick = {() => setPopUp(true)}>Hospital update</button>
      {popUp?
      <div className="popup">  
        <div className="popup_inner"> 
        <button className="popupbtn__close" onClick={() => setPopUp(false)}>Close</button>   
          <h1 className="popup__title">Update hospital data</h1>  
          <iframe src="https://docs.google.com/forms/d/e/1FAIpQLSev23I75jAM78TxgPVpAlUWUrgofX1mVNs366FtBrlAzZgkDA/viewform?embedded=true" 
            frameborder="0" marginheight="0" marginwidth="0">Loading…</iframe>
        </div>  
      </div>  
      : null}
    </section>
  );  
}  
 
  
export default Update;