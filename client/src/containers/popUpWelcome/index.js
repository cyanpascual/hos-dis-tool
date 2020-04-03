import React, { useState } from 'react';
import { Carousel } from 'react-bootstrap';
import '../../assets/welcomePopUp.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import uplogo from '../../assets/logos/up.png';
import dgelogo from '../../assets/logos/dge.png';
import engglogo from '../../assets/logos/engineering.png';
import geoplogo from '../../assets/logos/geop_light.png';
import tramslogo from '../../assets/logos/trams_h.png'

function Welcome(){   
  const [popUp, setPopUp] = useState(true);

  return (
    <section>
      <button className="popupbtn" onClick = {() => setPopUp(true)}>Help</button>
      {popUp?
      <div className="popup">  
        <div className="popupwelcome_inner">  
          <Carousel className="bootstrap" fade="true" interval="30000">
            <Carousel.Item className="slide">
              <div className="content">
    
                <img src={tramslogo} className="welcome-logo"/>
                <h3 className="welcome__subtitle">Introducing TrAMS</h3>
                <p className="welcome__text">The Tracing for Allocation of Medical Supplies or known as TrAMS is an initiative of the UP College of Engineering (UPCoE) together with the 
                  UP Department of Geodetic Engineering (UPDGE) as response to the ongoing crisis of our health care system against COVID-19. The TrAMS project is
                  part of Project 3: Tracking-High Risk Individual (headed by Dr. Ariel C. Blanco) and is currently led by Asst. Prof. Roseanne Ramos and 
                  Asst. Prof. Ransie Joy Apura with team members from the UP Society of Geodetic Engineering Majors (UPGEOP).</p>
                <div className="bottom">
                  <img src={uplogo} className="welcome-logo-bottom"/>
                  <img src={engglogo} className="welcome-logo-bottom"/>
                  <img src={dgelogo} className="welcome-logo-bottom"/>
                  <img src={geoplogo} className="welcome-logo-bottom"/>
                </div>
              </div>
            </Carousel.Item>
            <Carousel.Item className="slide">
              <div className="content">
                <h3 className="welcome__subtitle">Our Goal</h3>
                <p className="welcome__text">TrAMS is an online geographic and information tracking system which aims to properly allocate medical resources (such as alcohol, sanitizing agents, 
                  masks, gloves, etc.) to health facilities in the country. This system will serve as platform for government agencies, donors and other interested 
                  parties to efficiently distribute resources on hospitals with much-needed supplies.</p>
              </div>
            </Carousel.Item>
            <Carousel.Item className="slide">
              <div className="content">
                <h2 className="help__titleleft">Filter</h2>
                <p className="help__left">Hospitals can be classified based on their current capacity on medical supplies. Filter by supply works by choosing a certain supply 
                  (alcohol, disinfectant, sanitizing kits, PPE,etc) and a supply level category (whether chosen supply is well-stocked, low or critically-low in stock).</p>
                <h2 className="help__titleright">Selecting Hospitals</h2>
                <p className="help__right">To access information on selected hospital, location marker must be clicked first. Information includes hospital’s address, 
                  their designated contact person and contact details and their inventory on medical supplies.</p>
                <h2 className="help__titleleft">Facilities</h2>
                <p className="help__left">Other facilities such as markets, convenience stores, gas stations and transport terminals can also be viewed on the map once a hospital is selected. </p>
              </div>
            </Carousel.Item>
            <Carousel.Item className="slide">
              <div className="content">
                <h2 className="help__titleright">Legend</h2>
                <p className="help__right">Medical supply icons under each corresponding hospital may be tagged as red or green. 
                  Red means certain supply is low on stock while green means supply is still well-stocked.</p>
                <h2 className="help__titleleft">Donation and Feedback</h2>
                <p className="help__left">To donate medical supplies or give feedback regarding our service, 
                  you may answer our forms by clicking Donate or Feedback located on the upper right hand corner of your browser.</p>
              </div>
            </Carousel.Item>
          </Carousel>
          <button className="popupbtn" onClick={() => setPopUp(false)}>Close</button>  
        </div>  
      </div>  
      : null}
    </section>
  );  
}  
 
  
export default Welcome;