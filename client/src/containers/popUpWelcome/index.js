import React, { useState } from 'react';
import '../../assets/welcomePopUp.css'

function Welcome(){   
  const [popUp, setPopUp] = useState(true);
  
  return (
    <section>
      <button className="popupbtn" onClick = {() => setPopUp(true)}>Help</button>
      {popUp?
      <div className="popup">  
        <div className="popupwelcome_inner">  
          <section className="welcome" aria-label="Gallery">
            <ol className="welcome__viewport">
              <li id="welcome__slide1" tabindex="0" className="welcome__slide">
                <div className="welcome__snapper">
                  <a href="#welcome__slide3"
                    className="welcome__prev">Go to last slide</a>
                    
                  <a href="#welcome__slide2"
                    className="welcome__next">Go to next slide</a>
                </div>
              </li>
              <li id="welcome__slide2" tabindex="0" className="welcome__slide">
                <div className="welcome__snapper"></div>
                  <a href="#welcome__slide1"
                    className="welcome__prev">Go to previous slide</a>
                  <a href="#welcome__slide3"
                    className="welcome__next">Go to next slide</a>
              </li>
              <li id="welcome__slide3" tabindex="0" className="welcome__slide">
                <div className="welcome__snapper"></div>
                  <a href="#welcome__slide2"
                    className="welcome__prev">Go to previous slide</a>
                  <a href="#welcome__slide1"
                    className="welcome__next">Go to next slide</a>
              </li>
            </ol>
            <aside className="welcome__navigation">
              <ol className="welcome__navigation-list">
                <li className="welcome__navigation-item">
                  <a href="#welcome__slide1"
                    className="welcome__navigation-button">Go to slide 1</a>
                </li>
                <li className="welcome__navigation-item">
                  <a href="#welcome__slide2"
                    className="welcome__navigation-button">Go to slide 2</a>
                </li>
                <li className="welcome__navigation-item">
                  <a href="#welcome__slide3"
                    className="welcome__navigation-button">Go to slide 3</a>
                </li>
              </ol>
            </aside>
          </section>
          <button className="popupbtn" onClick={() => setPopUp(false)}>Close</button>  
        </div>  
      </div>  
      : null}
    </section>
  );  
}  
 
  
export default Welcome;