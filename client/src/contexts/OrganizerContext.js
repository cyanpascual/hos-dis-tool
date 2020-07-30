
import React, { createContext, useState } from 'react';



export const OrganizerContext = createContext();






const OrganizerContextProvider = (props) => {
  const [donationTableData, setDonationTableData] = useState([]);

  const [ordersTableData, setOrdersTableData] = useState([]);

  const [donationTableFields, setDonationTableFields] = useState([
    { title: 'Name', field: 'donor_name' },
    { title: 'Affiliation', field: 'affiliation' },
    { title: 'Amount', field: 'amount', type: 'currency',filtering: false,
    currencySetting:{ currencyCode:'PHP'}
    },
    { 
        title: 'Item', 
        field: 'donation_supply', 
    },
    {
      title: 'Benefactor',
      field: 'cfname',
    },

    {
        title: 'Time & Date Made',
        field: 'reportdate',
        type: "datetime",
        filtering: false
    },
    {
        title: 'Method of Payment',
        field: 'bank',
    },
    {
        title: 'Contact Number',
        field: 'cont_num',
    },
    {
        title:"ID",
        field:"id",
        cellStyle: { textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden', maxWidth: 80}
    },
    {
        field: 'url',
        title: 'receipt',
        filtering: false,
        render: (rowData) => {return (<a href={rowData.url} target="_blank" rel="noopener noreferrer"><img src={rowData.url} style={{maxWidth: 50,maxHeight:100}} alt={rowData.url}/></a>)}
    },
    {
        title: 'Status',
        field: 'status',
    },
    ]);

  const [selectedPage, setSelectedPage] = useState('Hospital Map');
  
  const [ordersTableFields,setOrdersTableFields] = useState([
    {
        title: 'Date Ordered',
        field: 'orderdate',
        type: "date",
    },
    {
        title: 'Supplier',
        field: 'supplier',
        cellStyle:{whiteSpace: 'normal',wordWrap: 'break-word', maxWidth: 100}
    },
    { 
        title: 'Item', 
        field: 'supply', 
        cellStyle:{whiteSpace: 'normal',wordWrap: 'break-word', maxWidth: 120}
    },
    
    {title:"Amount", field:"amount", type:"numeric",filtering: false,
    cellStyle:{whiteSpace: 'normal',wordWrap: 'break-word', maxWidth: 120}},
    {title: 'Cost', field: 'cost', type: 'currency',filtering: false,
    currencySetting:{ currencyCode:'PHP'},
    cellStyle:{whiteSpace: 'normal',wordWrap: 'break-word', maxWidth: 120}
    },
    {
        title: 'Method of Payment',
        field: 'method',
        cellStyle:{whiteSpace: 'normal',wordWrap: 'break-word', maxWidth: 100}
    },
    {
      title: 'Benefactor',
      field: 'benefactor',
      cellStyle:{whiteSpace: 'normal',wordWrap: 'break-word', maxWidth: 100}
    },
    
    {
        title: 'Contact Number',
        field: 'cont_num',
        type:'numeric',
        cellStyle:{whiteSpace: 'normal',wordWrap: 'break-word', maxWidth: 140}
    },
    {
        title: 'ID',
        field: 'id',
        editable: 'never',
        cellStyle: { textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden', maxWidth: 80}
    },
    {
        title: 'Status',
        field: 'status',
        lookup: {
            "Order made but unpaid":"Order made but unpaid",
            "Paid":"Paid",
            "Delivered":"Delivered",
            "Allocated only":"Allocated only"
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