import React, {useContext, useState, useEffect} from 'react';
import MaterialTable,{MTableToolbar } from 'material-table'

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
import {Paper, Box} from '@material-ui/core'
import { OrganizerContext } from '../../../contexts/OrganizerContext';
import axios from 'axios';

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

const OrderTable = () => {
    const {ordersTableData,setOrdersTableData,ordersTableFields,setOrdersTableFields,donationTableData } = useContext(OrganizerContext);

 

    var unallocatedFunds = donationTableData.reduce((a, {amount}) => a + amount, 0) - ordersTableData.reduce((a, {cost}) => a + parseFloat(cost), 0);
    var allocatedFunds = ordersTableData.reduce((a, {cost}) => a + parseFloat(cost), 0);
 
  
    return (
      <MaterialTable
        title={`Unallocated Donations: ${unallocatedFunds} | Allocated Donations: ${allocatedFunds}`}
        components={{
            Container: props => <div {...props} style={{ height:"100%"}}/>
        }}
        options={{
            exportButton: true,
            pageSize:5,
            maxBodyHeight:"71vh",
            filtering:true
          }}
        
        columns={ordersTableFields}
        data={ordersTableData}
        icons={tableIcons}
        maxBodyHeight={100}
        minBodyHeight={100}
        editable={{
          onRowAdd: newData =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                
                
                var record = {
                  "properties": {
                      "supplier": newData.supplier,
                      "supply": newData.supply,
                      "amount": newData.amount,
                      "cost": newData.cost,
                      "orderdate": newData.orderdate,
                      "cfname": newData.benefactor,
                      "hfhudcode":'N/A',
                      "method": newData.method,
                      "cont_num": newData.cont_num
                  },
                  "type": "Allocation",
              }

                axios.post(`https://trams.com.ph/all0cati0n/add`, record)
                .then(res => {
                  console.log(res);
                  console.log(res.data);
                  var new_record = {
                    "supplier": newData.supplier,
                    "supply": newData.supply,
                    "amount": newData.amount,
                    "cost": newData.cost,
                    "orderdate": newData.orderdate,
                    "cfname": newData.cfname,
                    "hfhudcode":"N/A",
                    "method": newData.method,
                    "cont_num": newData.cont_num,
                    "status":newData.status
                  }

                  setOrdersTableData([...ordersTableData, new_record]);
                })
                resolve();
              }, 1000)
            }),
          onRowUpdate: (newData, oldData) =>
          

            new Promise((resolve, reject) => {
              var record = {
                "properties": {
                    "supplier": newData.supplier,
                    "supply": newData.supply,
                    "amount": newData.amount,
                    "cost": newData.cost,
                    "orderdate": newData.orderdate,
                    "benefactor": newData.benefactor  ,
                    "hfhudcode":'',
                    "method": newData.method,
                    "cont_num": newData.cont_num,
                    "status":newData.status
                },
                "type": "Allocation",
              }
              setTimeout(() => {
                const dataUpdate = [...ordersTableData];
                const index = oldData.tableData.id;
                dataUpdate[index] = newData;
                setOrdersTableData([...dataUpdate]);
                axios.post(`https://trams.com.ph/all0cati0n/update/${oldData.id}`, record)
                .then(res => {
                  console.log(res);
                  console.log(res.data);
                  
                })
                resolve();
              }, 1000)
            }),
          onRowDelete: oldData =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                const dataDelete = [...ordersTableData];
                const index = oldData.tableData.id;
                dataDelete.splice(index, 1);
                setOrdersTableData([...dataDelete]);
                axios.delete(`https://trams.com.ph/all0cati0n/${oldData.id}`)
                .then(res => {
                  console.log(res);
                  console.log(res.data);
                })
                resolve()
              }, 1000)
            }),
        }}


      />
    )
  }

  export default OrderTable;