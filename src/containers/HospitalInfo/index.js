import React, {useContext,useState} from 'react';
import { FeaturesContext } from '../../contexts/FeaturesContext';

const HospitalInfo = () => {
    const { hospitals, hospitalList, setHospitalList, setFilterSetting, filterSetting, filterLevel, setFilterLevel } = useContext(FeaturesContext);
    const [userInput, setUserInput] = useState("")

    return (
      <div>
          HospitalInfo
      </div>
    )
}

export default HospitalInfo

