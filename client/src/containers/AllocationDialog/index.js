import React,{useState, useEffect,useContext} from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import {Radio,RadioGroup ,FormControlLabel,FormControl,FormLabel, Grid, Container } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import WelcomeCarousel from '../WelcomeCarousel';
import TextField from '@material-ui/core/TextField';
import { OrganizerContext } from '../../contexts/OrganizerContext';
import { FeaturesContext } from '../../contexts/FeaturesContext';
import ImageUploader from 'react-images-upload';
import axios from "axios"


const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);



export default function WelcomeDialog(props) {
  const [open, setOpen] = React.useState(false);
  const [mop, setMop] = React.useState("Gcash");
  const {ordersTableData,setOrdersTableData,ordersTableFields,setOrdersTableFields,donationTableData,setSelectedPage,pictures,setPictures } = useContext(OrganizerContext);
  const {setHospitalToDonateTo,hospitalToDonateTo,allocationDialogOpen,setAllocationDialogOpen} = useContext(FeaturesContext);
  const handleClickOpen = () => {
    setHospitalToDonateTo(true);
  };
  const handleClose = () => {
    setHospitalToDonateTo(null);
  };

  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();
  today = mm + '/' + dd + '/' + yyyy;
  const [supplier, setSupplier] = React.useState('');
  const [supply, setSupply] = React.useState('');
  const [amount, setAmount] = React.useState(0);
  const [cost, setCost] = React.useState(0);
  const [orderdate, setOrderdate] = React.useState('');
  const [method, setMethod] = React.useState('');
  const [cont_num, setCont_num] = React.useState(0);
  const [status, setStatus] = React.useState('');
  
  var unallocatedFunds = donationTableData.reduce((a, {amount}) => a + amount, 0) - ordersTableData.reduce((a, {cost}) => a + parseFloat(cost), 0);
 
  





  return (
    <div>
        <Dialog fullWidth onClose={handleClose} aria-labelledby="customized-dialog-title" open={hospitalToDonateTo ? true : false} fullScreen >
        <DialogTitle  onClose={handleClose}>
          <Grid container   
          direction="row"
          justify="space-between"
          alignItems="center">
          {hospitalToDonateTo ? hospitalToDonateTo.properties.cfname : ""}
          <Button variant={'contained'} color="primary" onClick={()=>{
            new Promise((resolve, reject) => {
              setTimeout(() => {
                var record = {
                  "properties": {
                      "supplier": supplier,
                      "supply": supply,
                      "amount": amount,
                      "cost": cost,
                      "orderdate": today,
                      "benefactor": hospitalToDonateTo.properties.cfname,
                      "hfhudcode":hospitalToDonateTo.properties.hfhudcode,
                      "method": method,
                      "cont_num": cont_num,
                      "status":status
                  },
                  "type": "Allocation",
              }

                axios.post(`https://trams.com.ph/all0cati0n/add`, record)
                .then(res => {
                  console.log(res);
                  console.log(res.data);
                  var new_record = {
                    "supplier": supplier,
                    "supply": supply,
                    "amount": amount,
                    "cost": cost,
                    "orderdate": today,
                    "benefactor":hospitalToDonateTo.properties.cfname,
                    "hfhudcode":hospitalToDonateTo.properties.hfhudcode,
                    'id':res.data,
                    "method": method,
                    "cont_num": cont_num,
                    "status":status
                  }

                  setOrdersTableData([...ordersTableData, new_record]);
                })
                resolve();
              }, 1000)
            })
          setSelectedPage("Order Tracker")
          setHospitalToDonateTo(null)
          }}>
            Allocate to hospital
          </Button>
          </Grid>
        </DialogTitle>
        <DialogContent dividers>
          <Grid  container direction="column" justify="space-evenly" alignItems="center" spacing={3}>
          <Grid id='supplier' item xs={6} container >
            <TextField
              label="Supplier"
              variant="outlined"
              value={supplier}
              onChange={(event)=>{setSupplier(event.target.value)}}
              fullWidth
            />  
          </Grid>
          <Grid id='supply' item xs={6} container>
            <TextField
            label="Supply"
            variant="outlined"
            value={supply}
            onChange={(event)=>{setSupply(event.target.value)}}
            fullWidth
          />

        </Grid>
          <Grid id='amount' item xs={6} container>
            <TextField
            id="outlined-helperText"
            label="Amount"
            variant="outlined"
            type="number"
            value={amount}
            onChange={(event)=>{setAmount(event.target.value)}}
            fullWidth
            />
          </Grid>
          <Grid id='cost' item xs={6} container> 
            <TextField
              fullWidth
              id="standard-number"
              label="Cost in pesos"
              type="number"
              variant="outlined"
              value={cost}
              onChange={(event)=>{setCost(event.target.value)}}
            />
          </Grid>
          <Grid id='method' item xs={6} container> 
            <TextField
              fullWidth
              label="Method of Payment"
              variant="outlined"
              value={method}
              onChange={(event)=>{setMethod(event.target.value)}}
            />
          </Grid>
          <Grid id='status' item xs={6} container>
            <FormControl component="fieldset">
              <FormLabel component="legend">Status</FormLabel>
              <RadioGroup aria-label="status" name="status" value={status} onChange={(event)=>{setStatus(event.target.value)}}>
                <FormControlLabel value="Order made but unpaid" control={<Radio />} label="Order made but unpaid" />
                <FormControlLabel value="Allocated only" control={<Radio />} label="Allocated only" />
                <FormControlLabel value="Delivered" control={<Radio />} label="Delivered" />
                <FormControlLabel value="Paid" control={<Radio />} label="Paid" />
              </RadioGroup>
            </FormControl>

          </Grid>
          <Grid id='contact number' item xs={6} container> 
            <TextField
              fullWidth
              id="standard-number"
              label="Contact Number"
              type="number"
              variant="outlined"
              value={cont_num}
              onChange={(event)=>{setCont_num(event.target.value)}}
            />
          </Grid>
        </Grid>
        </DialogContent>
      </Dialog>
    </div>
  );
}

