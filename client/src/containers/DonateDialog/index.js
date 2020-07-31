import React,{useState, useEffect,useContext} from 'react';
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import {IconButton, Typography, Dialog, ListItem, Grid, Button, TextField} from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close';
import { OrganizerContext } from '../../contexts/OrganizerContext';
import { FeaturesContext } from '../../contexts/FeaturesContext';
import ImageUploader from "react-images-upload";

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

export default function DonateDialog() {
  const {setDonationTableData,donationTableData,setSelectedPage} = useContext(OrganizerContext);
  const {donationDialogOpen,setDonationDialogOpen} = useContext(FeaturesContext);



  const handleClickOpen = () => {
    setDonationDialogOpen(true);
  };
  const handleClose = () => {
    setDonationDialogOpen(false);
  };

  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();
  today = mm + '/' + dd + '/' + yyyy;
  const [donor_name, setDonorName] = React.useState('');
  const [affiliation, setAffiliation] = React.useState('');
  const [amount, setAmount] = React.useState(0);
  const [bank, setBank] = React.useState('');
  const [cont_num, setCont_num] = React.useState(0);
  const [status, setStatus] = React.useState('');
  const [pictures, setPictures] = useState([]);

  const onDrop = picture => {
    setPictures([...pictures, picture]);
  };

  return (
    <div>
      <ListItem button color="inherit" onClick={handleClickOpen}>
      Donate
      </ListItem>
      <Dialog fullScreen={true} onClose={handleClose} aria-labelledby="customized-dialog-title" open={donationDialogOpen}>
      <DialogTitle  onClose={handleClose}>
          <Grid container   
          direction="row"
          justify="space-between"
          alignItems="center">
          <Button variant={'contained'} color="primary" onClick={()=>{
            new Promise((resolve, reject) => {
              setTimeout(() => {
                var record = {
                  "properties": {
                    "donor_name": donor_name,
                    "affiliation": affiliation,
                    "amount": amount,
                    "donation_supply": "",
                    "cfname": "",
                    "hfhudcode": "",
                    "reportdate": today,
                    "bank": bank,
                    "cont_num": cont_num,
                    "status": status,
                    "receipt": pictures[0]
                  },
                  "type": "Donation",
              }

                axios.post(`https://trams.com.ph/d0nati0n/add`, record)
                .then(res => {
                  console.log(res);
                  console.log(res.data);
                  var new_record = {
                    "donor_name": donor_name,
                    "affiliation": affiliation,
                    "amount": amount,
                    "donation_supply": "",
                    "cfname": "",
                    "hfhudcode": "",
                    "reportdate": today,
                    "bank": bank,
                    "cont_num": cont_num,
                    "status": status,
                    "receipt": pictures[0]
                  }

                  setDonationTableData([...donationTableData, new_record]);
                })
                resolve();
              }, 1000)
            })
          }}>
            Donate
          </Button>
          </Grid>
        </DialogTitle>
        <DialogContent dividers>
          <Grid  container direction="column" justify="space-evenly" alignItems="center" spacing={3}>
            <Grid id='donor_name' item xs={6} container >
              <TextField
                label="Name"
                variant="outlined"
                value={donor_name}
                onChange={(event)=>{setDonorName(event.target.value)}}
                fullWidth
              />  
            </Grid>
            <Grid id='affiliation' item xs={6} container >
              <TextField
                label="Affiliation"
                variant="outlined"
                value={affiliation}
                onChange={(event)=>{setAffiliation(event.target.value)}}
                fullWidth
              />  
            </Grid>
            <Grid id='amount' item xs={6} container >
              <TextField
                label="Amount"
                variant="outlined"
                value={amount}
                onChange={(event)=>{setAmount(event.target.value)}}
                type="number"
                fullWidth
              />  
            </Grid>
            <Grid id='bank' item xs={6} container >
              <TextField
                label="Bank"
                variant="outlined"
                value={bank}
                onChange={(event)=>{setBank(event.target.value)}}
                fullWidth
              />  
            </Grid>
            <Grid id='cont_num' item xs={6} container >
              <TextField
                label="Contact Number"
                variant="outlined"
                value={cont_num}
                onChange={(event)=>{setCont_num(event.target.value)}}
                type="number"
                helperText={'(Optional if you want to get updated)'}
                fullWidth
              />  
            </Grid>
            {/* <Grid id='receipt' item xs={6} container>
            <ImageUploader
                withIcon={true}
                onChange={onDrop}
                imgExtension={[".jpg",".png"]}
                maxFileSize={5242880}
                singleImage={true}
                label="Upload receipt as proof"
                withPreview={true}
              />
            </Grid> */}
          </Grid>
        </DialogContent>
      </Dialog>
    </div>
  );
}
