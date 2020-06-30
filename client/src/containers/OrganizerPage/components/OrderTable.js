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
    console.log('fasjflkjajslkfjasjflkajsdlkfja')
    console.log(ordersTableData)

  
    return (
      <MaterialTable
        title="Donations"
        components={{
            Container: props => <div {...props} style={{ height:"100%"}}/>
        }}
        options={{
            exportButton: true,
            pageSize:10,
            minBodyHeight:"87vh",
            maxBodyHeight:"87vh",
            filtering:true
          }}
        
        columns={ordersTableFields}
        data={ordersTableData}
        icons={tableIcons}
        maxBodyHeight={200}
        minBodyHeight={200}
        editable={{
          onRowAdd: newData =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                setOrdersTableData([...ordersTableData, newData]);
                
                resolve();
              }, 1000)
            }),
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                const dataUpdate = [...ordersTableData];
                const index = oldData.tableData.id;
                dataUpdate[index] = newData;
                setOrdersTableData([...dataUpdate]);
  
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
                
                resolve()
              }, 1000)
            }),
        }}

        components={{
          Toolbar: props => (
            <div>
              <MTableToolbar {...props} />
              <div style={{padding: '0px 10px'}}>
                <Box>Unallocated Donations: PHP {unallocatedFunds}</Box>
                <Box>Allocated Donations: PHP {allocatedFunds}</Box>
                <Box>Total Donations</Box>
              </div>
            </div>
          ),
        }}
      />
    )
  }

  export default OrderTable;