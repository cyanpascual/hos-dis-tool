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



const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);



export default function WelcomeDialog(props) {
  const [open, setOpen] = React.useState(false);
  const [mop, setMop] = React.useState("Gcash");
  const {ordersTableData,setOrdersTableData,ordersTableFields,setOrdersTableFields,donationTableData,setSelectedPage } = useContext(OrganizerContext);
  const {setHospitalToDonateTo,hospitalToDonateTo,donationDialogOpen,setDonationDialogOpen} = useContext(FeaturesContext);
  const handleClickOpen = () => {
    setDonationDialogOpen(true);
  };
  const handleClose = () => {
    setHospitalToDonateTo(null);
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

  const handleMOPChange = (event) => {
    setMop(event.target.value);
  };

  const handleValueChange = (event) => {
    setValue(parseFloat(event.target.value));
  };

  const [pictures, setPictures] = useState([]);

  const onDrop = picture => {
    setPictures([...pictures, picture]);
  };
  return (
    <div>
        <Dialog fullWidth onClose={handleClose} aria-labelledby="customized-dialog-title" open={true} fullScreen >
        <DialogTitle  onClose={handleClose}>
          <Grid container   
          direction="row"
          justify="space-between"
          alignItems="center">
          {hospitalToDonateTo ? hospitalToDonateTo.properties.cfname : ""}
          <Button variant={'contained'} color="primary" onClick={()=>{
            setOrdersTableData([...ordersTableData, {supplier: "Cyan Pascual's Supply Store", supply: supplyMap[supply], amount: value, cost:value*20,date:today, hospital: "sampleHospital",supplier:0,mop:0,contactNumber:"0927241445",id:"0"+(ordersTableData.length+1), status:3,url:"https://drive.google.com/uc?id=1PZTI9mmA18L8JnElZ_UjngGhzJovi5uf"},
          ]);
          //setSelectedPage("Order Tracker")
          }}>
            Donate
          </Button>
          </Grid>
        </DialogTitle>
        <DialogContent dividers>
        <Grid   container
                direction="column"
                justify="space-evenly"
                alignItems="flex-start"
                spacing={3}>
          <Grid item xs={6}>
            <Container>
               {"Send your donation to <insert bank details here> or <insert Gcash details here> and then please fill out the following. Your email will be used to send you updates regarding your donation."} 
            </Container>
          </Grid>
          <Grid item xs={6}>
            <TextField
            id="outlined-helperText"
            label="Name"
            variant="outlined"
            helperText="First Name Last Name"
          />
          
          </Grid>

          <Grid item xs={6}>
            <TextField
            id="outlined-helperText"
            label="Email"
            variant="outlined"
          />
          
          </Grid>
          <Grid item xs={6}>
          <TextField
          fullWidth
          id="standard-number"
          label="Amount in pesos"
          type="number"
          variant="outlined"
          value={value}
          onChange={handleValueChange}
        />
          </Grid>
          <Grid item xs={6} >
          <FormControl component="fieldset" >
                <FormLabel component="legend">Supply</FormLabel>
                <RadioGroup aria-label="supply" name="supply" value={supply} onChange={handleChange} style={{height:"30vh"}}>
                  {supplies.map((supply)=>{
                    return(
                      <FormControlLabel value={supply} control={<Radio />} label={supply} />
                    )
                  })}
                  
                </RadioGroup>
              </FormControl>
          </Grid>
          <Grid item xs={6}>
            <TextField
            id="outlined-helperText"
            label="Contact Number"
            defaultValue="Number"
            variant="outlined"
            helperText="+63 XXX XXX XXXX"
          />
        </Grid>
        
        <Grid item xs={6} >
          <FormControl component="fieldset" >
                <FormLabel component="legend">Method of Payment</FormLabel>
                <RadioGroup aria-label="MOP" name="mop" value={mop} onChange={handleMOPChange}>
                      <FormControlLabel value={"Gcash"} control={<Radio />} label={"Gcash"} />
                      <FormControlLabel value={"Bank Transfer"} control={<Radio />} label={"Bank Transfer"} />
                </RadioGroup>
              </FormControl>
        </Grid>

        <Grid item xs={2}>
        <ImageUploader
          buttonText="Upload"
          withIcon={false}
          onChange={onDrop}
          imgExtension={[".jpg", ".gif", ".png", ".gif"]}
          maxFileSize={5242880}
          label="Screenshot of receipt"
          withPreview={true}
          fileContainerStyle={{boxShadow: "none",elevation:0,textAlign:"left"}}
        />

        </Grid>
        </Grid>
        

        </DialogContent>
      </Dialog>
    </div>
  );
}

