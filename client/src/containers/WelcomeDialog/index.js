import React,{useEffect} from 'react';
import { withStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
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
    <React.Fragment>
      <ListItem button  color="inherit" onClick={handleClickOpen}>
        About Us
      </ListItem>
        <Dialog fullWidth onClose={handleClose} aria-labelledby="customized-dialog-title" open={open} >

        <DialogContent dividers>
          <WelcomeCarousel/>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}
