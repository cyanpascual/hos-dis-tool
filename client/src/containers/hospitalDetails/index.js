import React, { useContext } from 'react';

const hospitalDetails = ({ hospital }) => {
  return (
    <li>
      <div className="title">{hospital.properties.Name_of_Ho}</div>
      <div className="author">{hospital.properties.Address}</div>
    </li>
  );
}

export default hospitalDetails;