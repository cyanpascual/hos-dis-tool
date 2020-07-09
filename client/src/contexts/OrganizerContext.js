
import React, { createContext, useState } from 'react';



export const OrganizerContext = createContext();






const OrganizerContextProvider = (props) => {
  const [donationTableData, setDonationTableData] = useState([
    { name: 'Cyan Pascual', amount: 1234, supply: 1, hospital: "sampleHospital", date:"18.06.2020 07:49:00",mop:1,contactNumber:"0927241448",id:"01", url:"https://drive.google.com/uc?id=1PZTI9mmA18L8JnElZ_UjngGhzJovi5uf"},
    { name: 'Someone Else', amount: 5678, supply: 12, hospital: "sampleHospital", date:"18.05.2020 12:49:00",mop:2,contactNumber:"0999224536",id:"02", url:"https://drive.google.com/uc?id=1Hz0BC1GNPcmfqx0A-jIzzefmoZg8yk2X"},
    { name: 'Cyan Pascual', amount: 1234, supply: 1, hospital: "sampleHospital", date:"18.06.2020 07:49:00",mop:1,contactNumber:"0927241448",id:"03", url:"https://drive.google.com/uc?id=1PZTI9mmA18L8JnElZ_UjngGhzJovi5uf"},
    { name: 'Someone Else', amount: 5678, supply: 12, hospital: "sampleHospital", date:"18.05.2020 12:49:00",mop:2,contactNumber:"0999224536",id:"04", url:"https://drive.google.com/uc?id=1Hz0BC1GNPcmfqx0A-jIzzefmoZg8yk2X"},
    { name: 'Cyan Pascual', amount: 1234, supply: 1, hospital: "sampleHospital", date:"18.06.2020 07:49:00",mop:1,contactNumber:"0927241448",id:"05", url:"https://drive.google.com/uc?id=1PZTI9mmA18L8JnElZ_UjngGhzJovi5uf"},
    { name: 'Someone Else', amount: 5678, supply: 12, hospital: "sampleHospital", date:"18.05.2020 12:49:00",mop:2,contactNumber:"0999224536",id:"06", url:"https://drive.google.com/uc?id=1Hz0BC1GNPcmfqx0A-jIzzefmoZg8yk2X"},
    { name: 'Cyan Pascual', amount: 1234, supply: 1, hospital: "sampleHospital", date:"18.06.2020 07:49:00",mop:1,contactNumber:"0927241448",id:"07", url:"https://drive.google.com/uc?id=1PZTI9mmA18L8JnElZ_UjngGhzJovi5uf"},
    { name: 'Someone Else', amount: 5678, supply: 12, hospital: "sampleHospital", date:"18.05.2020 12:49:00",mop:2,contactNumber:"0999224536",id:"08", url:"https://drive.google.com/uc?id=1Hz0BC1GNPcmfqx0A-jIzzefmoZg8yk2X"},
    { name: 'Cyan Pascual', amount: 1234, supply: 1, hospital: "sampleHospital", date:"18.06.2020 07:49:00",mop:1,contactNumber:"0927241448",id:"09", url:"https://drive.google.com/uc?id=1PZTI9mmA18L8JnElZ_UjngGhzJovi5uf"},
    { name: 'Someone Else', amount: 5678, supply: 12, hospital: "sampleHospital", date:"18.05.2020 12:49:00",mop:2,contactNumber:"0999224536",id:"10", url:"https://drive.google.com/uc?id=1Hz0BC1GNPcmfqx0A-jIzzefmoZg8yk2X"},
    { name: 'Cyan Pascual', amount: 1234, supply: 1, hospital: "sampleHospital", date:"18.06.2020 07:49:00",mop:1,contactNumber:"0927241448",id:"11", url:"https://drive.google.com/uc?id=1PZTI9mmA18L8JnElZ_UjngGhzJovi5uf"},
    { name: 'Someone Else', amount: 5678, supply: 12, hospital: "sampleHospital", date:"18.05.2020 12:49:00",mop:2,contactNumber:"0999224536",id:"12", url:"https://drive.google.com/uc?id=1Hz0BC1GNPcmfqx0A-jIzzefmoZg8yk2X"},
  ]);

  const [ordersTableData, setOrdersTableData] = useState([
    {supplier: "Cyan Pascual's Supply Store", supply: 1, amount: 10,cost:500,date:"18.06.2020", hospital: "sampleHospital",supplier:1,mop:1,contactNumber:"0927241448",id:"01", status:1,url:"https://drive.google.com/uc?id=1PZTI9mmA18L8JnElZ_UjngGhzJovi5uf"},
    {supplier: "Cyan Pascual's Supply Store", supply: 2, amount: 50,cost:500,date:"18.05.2020", hospital: "sampleHospital",supplier:2,mop:1,contactNumber:"0927241445",id:"02", status:2,url:"https://drive.google.com/uc?id=1PZTI9mmA18L8JnElZ_UjngGhzJovi5uf"},
    {supplier: "Cyan Pascual's Supply Store", supply: 5, amount: 50, cost:200,date:"18.05.2020", hospital: "sampleHospital",supplier:2,mop:2,contactNumber:"0927241445",id:"03", status:0,url:"https://drive.google.com/uc?id=1PZTI9mmA18L8JnElZ_UjngGhzJovi5uf"},
    ]);

  const [donationTableFields, setDonationTableFields] = useState([
    { title: 'Name', field: 'name' },
    { title: 'Amount', field: 'amount', type: 'currency',filtering: false,
    currencySetting:{ currencyCode:'PHP'}
    },
    { 
        title: 'Supply', 
        field: 'supply', 
        lookup: {
            1: "Alcohol",
            2: "Disenfectant",
            3: "Soap",
            4: "Gown",
            5: "Surgical Mask",
            6: "N95 Mask",
            7: "Gloves",
            8: "Shoe covers",
            9: "Coverall",
            10: "Goggles",
            11: "Face Shield",
            12: "Head Cover",
            13: "Tissue",
            14: "Vitamins"
        } 
    },
    {
      title: 'Hospital',
      field: 'hospital',
    },

    {
        title: 'Date Made',
        field: 'date',
        type: "datetime",
    },
    {
        title: 'Method of Payment',
        field: 'mop',
        lookup: {
            1: "Gcash",
            2: "Bank Transfer"
        } 
    },
    {
        title: 'Contact Number',
        field: 'contactNumber',
    },
    {
        title:"ID",
        field:"id"
    },
    {
        field: 'url',
        title: 'Receipt',
        filtering: false,
        render: rowData => (<a href={rowData.url} target="_blank" rel="noopener noreferrer"><img src={rowData.url} style={{maxWidth: 50,maxHeight:100}}/></a>)
    }
    ]);

  const [selectedPage, setSelectedPage] = useState('Hospital Map');
  
  const [ordersTableFields,setOrdersTableFields] = useState([
    {
        title: 'Supplier',
        field: 'supplier',
    },
    { 
        title: 'Supply', 
        field: 'supply', 
        lookup: {
            1: "Alcohol",
            2: "Disenfectant",
            3: "Soap",
            4: "Gown",
            5: "Surgical Mask",
            6: "N95 Mask",
            7: "Gloves",
            8: "Shoe covers",
            9: "Coverall",
            10: "Goggles",
            11: "Face Shield",
            12: "Head Cover",
            13: "Tissue",
            14: "Vitamins"
        } 
    },
    {title:"Amount", field:"amount", type:"number",filtering: false},
    { title: 'Cost', field: 'cost', type: 'currency',filtering: false,
    currencySetting:{ currencyCode:'PHP'}
    },
    {
        title: 'Date Ordered',
        field: 'date',
        type: "date",
    },

    {
      title: 'Assigned Hospital',
      field: 'hospital'
    },
    {
        title: 'Method of Payment',
        field: 'mop',
        lookup: {
            0: "Unassigned",
            1: "Gcash",
            2: "Bank Transfer"
        } 
    },
    {
        title: 'Contact Number',
        field: 'contactNumber',
    },
    {
        title: 'ID',
        field: 'id',
    },
    {
        title: 'Status',
        field: 'status',
        lookup: {
            0:"Order made but unpaid",
            1:"Paid",
            2:"Delivered",
            3:"Allocated only"
        } 
    },
    // {
    //     field: 'url',
    //     title: 'Receipt',
    //     filtering: false,
    //     render: rowData => (<a href={rowData.url} target="_blank" rel="noopener noreferrer"><img src={rowData.url} style={{maxWidth: 50,maxHeight:100}}/></a>),
    //     editable:"never"
    // }    
]);

const [pictures, setPictures] = useState([]);

 

  return (
    <OrganizerContext.Provider value={{
        donationTableData, setDonationTableData,
        donationTableFields, setDonationTableFields,
        selectedPage, setSelectedPage,
        ordersTableData,setOrdersTableData,
        ordersTableFields,setOrdersTableFields,
        pictures, setPictures
    }}>
      {props.children}
    </OrganizerContext.Provider>
  );
}
 
export default OrganizerContextProvider;