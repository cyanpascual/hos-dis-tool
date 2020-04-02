import React, {useContext,useState} from 'react';
import { FeaturesContext } from '../../contexts/FeaturesContext';
import hospitalDetails from '../hospitalDetails';
import { MapsContext } from '../../contexts/MapsContext';

import alcohol_high from '../../assets/levelIndicators/alcohol_high.png'
import alcohol_med from '../../assets/levelIndicators/alcohol_mid.png'
import alcohol_low from '../../assets/levelIndicators/alcohol_low.png'

import gloves_high from '../../assets/levelIndicators/gloves_high.png'
import gloves_med from '../../assets/levelIndicators/gloves_mid.png'
import gloves_low from '../../assets/levelIndicators/gloves_low.png'

import mask_high from '../../assets/levelIndicators/mask_high.png'
import mask_med from '../../assets/levelIndicators/mask_mid.png'
import mask_low from '../../assets/levelIndicators/mask_low.png'

import sanitizer_high from '../../assets/levelIndicators/sanitizer_high.png'
import sanitizer_med from '../../assets/levelIndicators/sanitizer_mid.png'
import sanitizer_low from '../../assets/levelIndicators/sanitizer_low.png'

import soap_high from '../../assets/levelIndicators/soap_high.png'
import soap_med from '../../assets/levelIndicators/soap_mid.png'
import soap_low from '../../assets/levelIndicators/soap_low.png'

import tissue_high from '../../assets/levelIndicators/tissue_high.png'
import tissue_med from '../../assets/levelIndicators/tissue_mid.png'
import tissue_low from '../../assets/levelIndicators/tissue_low.png'

const FilterList = () => {
    const { hospitals, resetHospitals, hospitalList, setHospitalList, setFilterSetting, filterSetting, filterLevel, setFilterLevel } = useContext(FeaturesContext);
    const [userInput, setUserInput] = useState("")
    const { goToSelected } = useContext(MapsContext)
    const alcoholImageChoose = (currHospital) =>{
      if(currHospital.properties.Supply_Cur["Alcohol"]/currHospital.properties.Supply_Cap["Alcohol"] < 0.2){
        return(<img className="smallPicture" src={alcohol_low} alt="critically-low"/>)
      } else if((currHospital.properties.Supply_Cur[filterSetting]/currHospital.properties.Supply_Cap[filterSetting] >= 0.20) && (currHospital.properties.Supply_Cur[filterSetting]/currHospital.properties.Supply_Cap[filterSetting] <= 0.5)){
        return(<img className="smallPicture" src={alcohol_med} alt="low"/>)
      }
      return(<img className="smallPicture" src={alcohol_high} alt="well-supplied"/>)
    }
    const disInfectantImageChoose = (currHospital) =>{
      if(currHospital.properties.Supply_Cur["Strerilium/Disinfectant"]/currHospital.properties.Supply_Cap["Strerilium/Disinfectant"] < 0.2){
        return(<img className="smallPicture" src={sanitizer_low} alt="critically-low"/>)
      } else if((currHospital.properties.Supply_Cur[filterSetting]/currHospital.properties.Supply_Cap[filterSetting] >= 0.20) && (currHospital.properties.Supply_Cur[filterSetting]/currHospital.properties.Supply_Cap[filterSetting] <= 0.5)){
        return(<img className="smallPicture" src={sanitizer_med} alt="low"/>)
      }
      return(<img className="smallPicture" src={sanitizer_high} alt="well-supplied"/>)
    }

    const glovesImageChoose = (currHospital) =>{
      if(currHospital.properties.Supply_Cur["Gloves (disposable)/ Foot socks"]/currHospital.properties.Supply_Cap["Gloves (disposable)/ Foot socks"] < 0.2){
        return(<img className="smallPicture" src={gloves_low} alt="critically-low"/>)
      } else if((currHospital.properties.Supply_Cur[filterSetting]/currHospital.properties.Supply_Cap[filterSetting] >= 0.20) && (currHospital.properties.Supply_Cur[filterSetting]/currHospital.properties.Supply_Cap[filterSetting] <= 0.5)){
        return(<img className="smallPicture" src={gloves_med} alt="low"/>)
      }
      return(<img className="smallPicture" src={gloves_high} alt="well-supplied"/>)
    }
    const maskImageChoose = (currHospital) =>{
      if(currHospital.properties.Supply_Cur["Masks/respirators"]/currHospital.properties.Supply_Cap["Masks/respirators"] < 0.2){
        return(<img className="smallPicture" src={mask_low} alt="critically-low"/>)
      } else if((currHospital.properties.Supply_Cur[filterSetting]/currHospital.properties.Supply_Cap[filterSetting] >= 0.20) && (currHospital.properties.Supply_Cur[filterSetting]/currHospital.properties.Supply_Cap[filterSetting] <= 0.5)){
        return(<img className="smallPicture" src={mask_med} alt="low"/>)
      }
      return(<img className="smallPicture" src={mask_high} alt="well-supplied"/>)
    }

    const soapImageChoose = (currHospital) =>{
      if(currHospital.properties.Supply_Cur["Antibacterial Soap"]/currHospital.properties.Supply_Cap["Antibacterial Soap"] < 0.2){
        return(<img className="smallPicture" src={soap_low} alt="critically-low"/>)
      } else if((currHospital.properties.Supply_Cur[filterSetting]/currHospital.properties.Supply_Cap[filterSetting] >= 0.20) && (currHospital.properties.Supply_Cur[filterSetting]/currHospital.properties.Supply_Cap[filterSetting] <= 0.5)){
        return(<img className="smallPicture" src={soap_med} alt="low"/>)
      }
      return(<img className="smallPicture" src={soap_high} alt="well-supplied"/>)
    }

    const tissueImageChoose = (currHospital) =>{
      if(currHospital.properties.Supply_Cur["Tissue"]/currHospital.properties.Supply_Cap["Tissue"] < 0.2){
        return(<img className="smallPicture" src={tissue_low} alt="critically-low"/>)
      } else if((currHospital.properties.Supply_Cur[filterSetting]/currHospital.properties.Supply_Cap[filterSetting] >= 0.20) && (currHospital.properties.Supply_Cur[filterSetting]/currHospital.properties.Supply_Cap[filterSetting] <= 0.5)){
        return(<img className="smallPicture" src={tissue_med} alt="low"/>)
      }
      return(<img className="smallPicture" src={tissue_high} alt="well-supplied"/>)
    }


    return (
      <div className="filterList">
         <label className="labels"> Number of Hospitals Shown: {hospitalList ? (hospitalList.length):("0")}</label>
        <div className="filterBox">
            <form onSubmit={(e)=>{
              e.preventDefault();
              setHospitalList(hospitals.filter((hospital)=>hospital.properties.Name_of_Ho.toLowerCase().indexOf(userInput.toLowerCase()) > -1))
            }}>
              <input placeholder="Search for hospital name" type="text" value={userInput} onChange={(e)=>setUserInput(e.currentTarget.value)}/>
              <input type="submit" value="Search"></input>
            </form>
            <label className="labels">Filter by supply: </label>
            
            <form onSubmit={(e)=>{
              e.preventDefault();
              switch(filterLevel){
                case "Critically Low":
                    setHospitalList(hospitals.filter((hospital) => hospital.properties.Supply_Cur[filterSetting]/hospital.properties.Supply_Cap[filterSetting] < 0.2));
                    break
                case "Low":
                    setHospitalList(hospitals.filter((hospital)=> ((hospital.properties.Supply_Cur[filterSetting]/hospital.properties.Supply_Cap[filterSetting] >= 0.20) && (hospital.properties.Supply_Cur[filterSetting]/hospital.properties.Supply_Cap[filterSetting] <= 0.5))))
                    break
                    
                case "Well stocked":
                    setHospitalList(hospitals.filter((hospital)=> hospital.properties.Supply_Cur[filterSetting]/hospital.properties.Supply_Cap[filterSetting] > 0.5));
            }
            
            
            }}>
              <div class="dropdown">
                <button class="dropbtn">{filterSetting?(filterSetting + "▼"):("Supply ▼")}</button>
                <div class="dropdown-content">
                  <a onClick={()=>setFilterSetting('Alcohol')}>Alcohol</a>
                  <a onClick={()=>setFilterSetting("Strerilium/Disinfectant")}>Sterilium/ Disinfectant</a>
                  <a onClick={()=>setFilterSetting('Antibacterial Soap')}>Antibacterial Soap</a>
                  <a onClick={()=>setFilterSetting("Sanitizing agents")}>Sanitizing Agents</a>
                  <a onClick={()=>setFilterSetting('Masks/respirators')}>Masks/ Respirators</a>
                  <a onClick={()=>setFilterSetting('Hepa filter and UV light radiation')}>Hepa filter and UV light radiation</a>
                  <a onClick={()=>setFilterSetting('Gloves (disposable)/ Foot socks')}>Gloves (disposable)/ Foot socks</a>
                  <a onClick={()=>setFilterSetting('Bedside patient equipments')}>Bedside patient equipments</a>
                  <a onClick={()=>setFilterSetting('Testing Kits')}>Testing kits</a>
                  <a onClick={()=>setFilterSetting('Ventilators')}>Ventilators</a>
                  <a onClick={()=>setFilterSetting('Tissue')}>Tissue</a>
                </div>
              </div>
              <div class="dropdown">
                <button class="dropbtn">{filterLevel?(filterLevel + "▼"):("Supply Level ▼")}</button>
                <div class="dropdown-content">
                  <a onClick={()=>setFilterLevel('Well stocked')}>Well stocked</a>
                  <a onClick={()=>setFilterLevel('Low')}>Low</a>
                  <a onClick={()=>setFilterLevel('Critically Low')}>Critically-Low</a>
                </div>
              </div>
              <br/>
              <input type="submit" value="Filter"></input>
              <input type="button" value="Reset" onClick={resetHospitals}></input>
              
            </form>
        </div>
        {hospitalList ? (
          <ul>
          {hospitalList.map(hospital => {
            const supplies = Object.keys(hospital.properties.Supply_Cur)
            //TODO: MOVE THIS ^
            if(hospital.properties != null){
              return (
              <li onClick={()=>{goToSelected(hospital)}}>
                <div className="title">{hospital.properties.Name_of_Ho}</div>
                <div className="author">{hospital.properties.Address}</div>
                {alcoholImageChoose(hospital)}
                {disInfectantImageChoose(hospital)}
                {glovesImageChoose(hospital)}
                {maskImageChoose(hospital)}
                {soapImageChoose(hospital)}
                {tissueImageChoose(hospital)}
                
                
                
              </li> 
            );}
          })}
        </ul>
        ) : (<div className="empty">No results.</div>)}
        
      </div>
    )
}

export default FilterList

