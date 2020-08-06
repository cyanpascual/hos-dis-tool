import React, {useContext, useState} from 'react';
import MaterialTable from 'material-table'

import AddBox from '@material-ui/icons/AddBox';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import {Paper} from '@material-ui/core'
import { OrganizerContext } from '../../../contexts/OrganizerContext';
import axios from 'axios'

const tableIcons = {
  Add: AddBox,
  Check: Check,
  Clear: Clear,
  Delete: DeleteOutline,
  DetailPanel: ChevronRight,
  Edit: Edit,
  Export: SaveAlt,
  Filter: FilterList,
  FirstPage: FirstPage,
  LastPage: LastPage,
  NextPage: ChevronRight,
  PreviousPage: ChevronLeft,
  ResetSearch: Clear,
  Search: Search,
  SortArrow: ArrowUpward,
  ThirdStateCheck: Remove,
  ViewColumn: ViewColumn
};

const Editable = () => {
    const { donationTableData,setDonationTableData,donationTableFields } = useContext(OrganizerContext);
    var total_donations = donationTableData.reduce((a, {amount}) => a + amount, 0);
  
    return (
      <MaterialTable
        title={`Total Donations: ${total_donations}`}
        components={{
            Container: props => <div {...props} style={{ height:"100%"}}/>
        }}
        options={{
            exportButton: true,
            pageSize:10,
            minBodyHeight:"80vh",
            maxBodyHeight:"80vh",
            filtering:true
          }}
        
        columns={donationTableFields}
        data={donationTableData}
        icons={tableIcons}
        maxBodyHeight={200}
        minBodyHeight={200}
        
        actions={[
          {
            icon: () =>  <Check/>,
            tooltip: 'Confirm that the donation has been received',
            onClick: (event, rowData) => {
              new Promise((resolve, reject) => {
                var record = {
                  "properties": {
                      "reportdate": rowData.reportdate,
                      "bank": rowData.bank,
                      "cont_num": rowData.cont_num,
                      "receipt": rowData.receipt,
                      "status": "Confirmed",
                      "donor_name":rowData.donor_name,
                      "affiliation": rowData.affiliation,
                      "amount": rowData.amount
                  },
                  "type": "Donation",
                }
                setTimeout(() => {
                  const dataUpdate = [...donationTableData];
                  const index = rowData.tableData.id;
                  dataUpdate[index] = rowData;
                  setDonationTableData([...dataUpdate]);
                  axios.post(`https://trams.com.ph/d0nati0n/update/${rowData.id}`, record)
                  .then(res => {
                    console.log(res);
                    console.log(res.data);
                    
                  })
                  resolve();
                }, 1000)
              })
              
            }
          },
          {
            icon: () => <DeleteOutline />,
            tooltip: 'Delete record',
            onClick: (event, rowData) => {
              if(window.confirm("You want to delete this donation record")){
                new Promise((resolve, reject) => {
                  setTimeout(() => {
                    const dataDelete = [...donationTableData];
                    const index = rowData.tableData.id;
                    dataDelete.splice(index, 1);
                    setDonationTableData([...dataDelete]);
                    axios.delete(`https://trams.com.ph/d0nati0n/${rowData.id}`)
                    .then(res => {
                      console.log(res);
                      console.log(res.data);
                    })
                    resolve()
                  }, 1000)
                })
              }
            }
          }
        ]}
      />
    )
  }

  export default Editable;