import React, {useContext,useState} from 'react';
import { FeaturesContext } from '../../contexts/FeaturesContext';
import { MapsContext } from '../../contexts/MapsContext';

const HospitalInfo = () => {
    const { hospitals, hospitalList, setHospitalList, setFilterSetting, filterSetting, filterLevel, setFilterLevel } = useContext(FeaturesContext);
    const { viewport, setViewport, selectedHospital,setSelectedHospital, hoveredHospital, setHoveredHospital, goToSelected } = useContext(MapsContext)

    const [userInput, setUserInput] = useState("")

    const supplies = Object.keys(selectedHospital.properties.Supply_Cur)
    
    return (
      <div className="hospitalInfo">
          {selectedHospital.properties.Name_of_Ho}<br/>
          {selectedHospital.properties.Address}<br/>
          {selectedHospital.properties.Head}<br/>
          {selectedHospital.properties.Website}<br/>
          {selectedHospital.properties["Contact Numbers"]}
          {selectedHospital.properties["Contact Numbers"]}
          {supplies.map((supply)=>{
              return(
              <div>
                  hello
              </div>)
          })}
     
      </div>
    )
}

export default HospitalInfo

