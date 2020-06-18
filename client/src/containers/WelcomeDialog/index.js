import React,{useEffect} from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogContent from '@material-ui/core/DialogContent';
import WelcomeCarousel from '../WelcomeCarousel';





const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);



export default function WelcomeDialog() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button  color="inherit" onClick={handleClickOpen}>
        About Us
      </Button>
        <Dialog fullWidth onClose={handleClose} aria-labelledby="customized-dialog-title" open={open} >

        <DialogContent dividers>
          <WelcomeCarousel/>
        </DialogContent>
      </Dialog>
    </div>
  );
}
