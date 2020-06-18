import React,{useEffect} from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import WelcomeCarousel from '../WelcomeCarousel';
import TextField from '@material-ui/core/TextField';




const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);



export default function WelcomeDialog(name) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant={'contained'} color="primary" onClick={handleClickOpen}>
        Donate
      </Button>
        <Dialog fullWidth onClose={handleClose} aria-labelledby="customized-dialog-title" open={open} >
        <DialogTitle  onClose={handleClose}>
          {"Contact Donation Drive"}

          <Button style={{marginLeft:250}} variant={'contained'} color="primary" onClick={handleClickOpen}>
            Send
          </Button>
        </DialogTitle>
        <DialogContent dividers>
        <TextField
          fullWidth
          id="standard-number"
          label="Number"
          type="number"
          variant="outlined"
        />
        <TextField
          fullWidth
          multiline
          rows={4}
          label="Message"
          defaultValue=""
          variant="outlined"
        />

        </DialogContent>
      </Dialog>
    </div>
  );
}
