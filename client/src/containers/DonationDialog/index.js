import React,{useEffect,useContext} from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import {Radio,RadioGroup ,FormControlLabel,FormControl,FormLabel,  } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import WelcomeCarousel from '../WelcomeCarousel';
import TextField from '@material-ui/core/TextField';
import { OrganizerContext } from '../../contexts/OrganizerContext';



const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);



export default function WelcomeDialog(name) {
  const [open, setOpen] = React.useState(false);
  const {ordersTableData,setOrdersTableData,ordersTableFields,setOrdersTableFields,donationTableData,setSelectedPage } = useContext(OrganizerContext);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const [value, setValue] = React.useState(0);
  const [supply, setSupply] = React.useState('Alcohol');
  var unallocatedFunds = donationTableData.reduce((a, {amount}) => a + amount, 0) - ordersTableData.reduce((a, {cost}) => a + parseFloat(cost), 0) - (value*34);
  const supplies =[
    "Alcohol",
    "Disenfectant",
    "Soap",
    "Gown",
    "Surgical Mask",
    "N95 Mask",
    "Gloves",
    "Shoe covers",
    "Coverall",
    "Goggles",
    "Face Shield",
    "Head Cover",
    "Tissue",
    "Vitamins"
  ]

  const supplyMap ={
    "Alcohol":1,
    "Disenfectant":2,
    "Soap":3,
    "Gown":4,
    "Surgical Mask":5,
    "N95 Mask":6,
    "Gloves":7,
    "Shoe covers":8,
    "Coverall":9,
    "Goggles":10,
    "Face Shield":11,
    "Head Cover":12,
    "Tissue":13,
    "Vitamins":14
  }
  

  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();

  today = dd + '.' + mm + '.' + yyyy;


  const handleChange = (event) => {
    setSupply(event.target.value);
  };

  const handleValueChange = (event) => {
    setValue(parseFloat(event.target.value));
  };
  return (
    <div>
      <Button variant={'contained'} color="primary" onClick={handleClickOpen}>
        Allocate
      </Button>
        <Dialog fullWidth onClose={handleClose} aria-labelledby="customized-dialog-title" open={open} >
        <DialogTitle  onClose={handleClose}>
          Unallocated Funds: {unallocatedFunds}
        
          <Button style={{marginLeft:30}} variant={'contained'} color="primary" onClick={()=>{
            setOrdersTableData([...ordersTableData, {supplier: "Cyan Pascual's Supply Store", supply: supplyMap[supply], amount: value, cost:value*20,date:today, hospital: "sampleHospital",supplier:0,mop:0,contactNumber:"0927241445",id:"0"+(ordersTableData.length+1), status:3,url:"https://drive.google.com/uc?id=1PZTI9mmA18L8JnElZ_UjngGhzJovi5uf"},
          ]);
          setSelectedPage("Order Tracker")
          }}>
            Allocate
          </Button>
        </DialogTitle>
        <DialogContent dividers>
        <TextField
          fullWidth
          id="standard-number"
          label="Amount"
          type="number"
          variant="outlined"
          value={value}
          onChange={handleValueChange}
        />
              <FormControl component="fieldset">
                <FormLabel component="legend">Supply</FormLabel>
                <RadioGroup aria-label="supply" name="supply" value={supply} onChange={handleChange}>
                  {supplies.map((supply)=>{
                    return(
                      <FormControlLabel value={supply} control={<Radio />} label={supply} />
                    )
                  })}
                  
                </RadioGroup>
              </FormControl>

        </DialogContent>
      </Dialog>
    </div>
  );
}

