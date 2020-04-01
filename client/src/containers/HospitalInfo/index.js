import React, {useContext,useState} from 'react';
import { FeaturesContext } from '../../contexts/FeaturesContext';
import { MapsContext } from '../../contexts/MapsContext';


const HospitalInfo = () => {
    const { hospitals, hospitalList, setHospitalList, setFilterSetting, filterSetting, filterLevel, setFilterLevel } = useContext(FeaturesContext);
    const { mapReference, setMapReference, defaultMapSettings,viewport, setViewport, selectedHospital,setSelectedHospital, hoveredHospital, setHoveredHospital, goToSelected } = useContext(MapsContext)

    const [userInput, setUserInput] = useState("")

    const supplies = Object.keys(selectedHospital.properties.Supply_Cur)
    
    return (
      <div className="hospitalInfo">
        <div><button className="deselectButton" onClick={()=>{
            mapReference.closePopup();
            setMapReference(null)
            setSelectedHospital(null)
            }}>X</button></div>
        <div className="title">{selectedHospital.properties.Name_of_Ho}</div>
        <div className="author">Address: {selectedHospital.properties.Address}</div>
        <div className="author">Head: {selectedHospital.properties.Head}</div>
        <div className="author">Website: {selectedHospital.properties.Website}</div>
        <div className="author">Contact Numbers: {selectedHospital.properties["Contact Numbers"]}</div>
        <hr/>
          {supplies.map((supply)=>{
              if(supply === "Other Needs"){
                return(
                    <div className="author">
                        {supply} : {selectedHospital.properties.Supply_Cur[supply]}
                    </div>
                )
                }
                
            return(
                <div className="author">
                    {supply} : {selectedHospital.properties.Supply_Cur[supply]}/{selectedHospital.properties.Supply_Cap[supply]}              
                </div>)
                
            
              
          })}
     
      </div>
    )
}

export default HospitalInfo

