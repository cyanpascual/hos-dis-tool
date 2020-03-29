import React, {useContext,useState} from 'react';
import { FeaturesContext } from '../../contexts/FeaturesContext';
import hospitalDetails from '../hospitalDetails';
import { MapsContext } from '../../contexts/MapsContext';

const FilterList = () => {
    const { hospitals, hospitalList, setHospitalList, setFilterSetting, filterSetting, filterLevel, setFilterLevel } = useContext(FeaturesContext);
    const [userInput, setUserInput] = useState("")
    const { goToSelected } = useContext(MapsContext)

    return (
      <div className="filterList">
        <div className="filterBox">
            <form onSubmit={(e)=>{
              e.preventDefault();
              setHospitalList(hospitals.filter((hospital)=>hospital.properties.Name_of_Ho.toLowerCase().indexOf(userInput.toLowerCase()) > -1))
            }}>
              <input placeholder="Search for hospital name" type="text" value={userInput} onChange={(e)=>setUserInput(e.currentTarget.value)}/>
              <input type="submit" value="Search"></input>
            </form>
            <label>Filter by supply ({hospitalList ? (hospitalList.length):("0")})</label>
            
            <form onSubmit={(e)=>{
              e.preventDefault();
              switch(filterLevel){
                case "Critically Low":
                    setHospitalList(hospitals.filter((hospital) => hospital.properties.Supply_Cur[filterSetting]/hospital.properties.Supply_Cap[filterSetting] < 0.25));
                    break
                case "Low":
                    setHospitalList(hospitals.filter((hospital)=> ((hospital.properties.Supply_Cur[filterSetting]/hospital.properties.Supply_Cap[filterSetting] >= 0.25) && (hospital.properties.Supply_Cur[filterSetting]/hospital.properties.Supply_Cap[filterSetting] <= 0.9))))
                    break
                    
                case "Well stocked":
                    setHospitalList(hospitals.filter((hospital)=> hospital.properties.Supply_Cur[filterSetting]/hospital.properties.Supply_Cap[filterSetting] > 0.9));
            }
            
            
            }}>
              <input type="submit" value="Filter"></input>
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
              
            </form>
        </div>
        {hospitalList ? (
          <ul>
          {hospitalList.map(hospital => {
            if(hospital.properties != null){
              return (
              <li onClick={()=>{goToSelected(hospital)}}>
                <div className="title">{hospital.properties.Name_of_Ho}</div>
                <div className="author">{hospital.properties.Address}</div>
              </li> 
            );}
          })}
        </ul>
        ) : (<div className="empty">No results.</div>)}
        
      </div>
    )
}

export default FilterList

