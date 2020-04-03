import React, {useContext,useState} from 'react';
import { FeaturesContext } from '../../contexts/FeaturesContext';
import { MapsContext } from '../../contexts/MapsContext';

import simple_high from '../../assets/levelIndicators/simple_high.png'
import simple_med from '../../assets/levelIndicators/simple_mid.png'
import simple_low from '../../assets/levelIndicators/simple_low.png'


const HospitalInfo = () => {
    const { hospitals, hospitalList, setHospitalList, setFilterSetting, filterSetting, filterLevel, setFilterLevel } = useContext(FeaturesContext);
    const { mapReference, setMapReference, defaultMapSettings,viewport, setViewport, selectedHospital,setSelectedHospital, hoveredHospital, setHoveredHospital, goToSelected } = useContext(MapsContext)

    const [userInput, setUserInput] = useState("")

    const supplies = Object.keys(selectedHospital.properties.Supply_Cur)
    const imageChoose = (currHospital, supply) =>{
        if(currHospital.properties.Supply_Cur[supply]/currHospital.properties.Supply_Cap[supply] < 0.2){
          return(<img className="smallPicture" src={simple_low} alt="critically-low"/>)
        } else if((currHospital.properties.Supply_Cur[filterSetting]/currHospital.properties.Supply_Cap[filterSetting] >= 0.20) && (currHospital.properties.Supply_Cur[filterSetting]/currHospital.properties.Supply_Cap[filterSetting] <= 0.5)){
          return(<img className="smallPicture" src={simple_med} alt="low"/>)
        }
        return(<img className="smallPicture" src={simple_high} alt="well-supplied"/>)
      }
  
    return (
      <div className="hospitalInfo">
        <div><button className="deselectButton" onClick={()=>{
            mapReference.closePopup();
            setMapReference(null)
            setSelectedHospital(null)
            }}>X</button></div>
        <div className="title">{selectedHospital.properties.Name_of_Ho}</div>
        <div className="author">Address: </div><span className="info"> {selectedHospital.properties.Address}</span>
        <div className="author">Head: </div><span className="info">{selectedHospital.properties.Head}</span>
        <div className="author">Website: </div><a className="info" href={selectedHospital.properties.Website}>{selectedHospital.properties.Website}</a>
        <div className="author">Contact Numbers: </div><span className="info">{selectedHospital.properties["Contact Numbers"]}</span>
        <hr/>
          {supplies.map((supply)=>{
              if(supply === "Other Needs"){
                return(
                    <div className="supplies">
                        {supply} : {selectedHospital.properties.Supply_Cur[supply]}
                    </div>
                )
              }
                
            return(
                <div className="supplies">
                    {imageChoose(selectedHospital, supply)} {supply}: {selectedHospital.properties.Supply_Cur[supply]}/{selectedHospital.properties.Supply_Cap[supply]}              
                </div>)
                
            
              
          })}
     
      </div>
    )
}

export default HospitalInfo

