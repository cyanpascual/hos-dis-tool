import React, {useContext} from 'react';
import {LoginContext} from '../../../../contexts/LoginContext.js'
import { withStyles, createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import {IconButton, Button} from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Fade from '@material-ui/core/Fade';
import { Typography } from '@material-ui/core';
import InfoIcon from '@material-ui/icons/Info';
import HelpCarousel from './carousel';

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  icon: {
    marginLeft: -theme.spacing(2)
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },  root: {
    display: 'flex',
    minHeight: '100vh',
  },
  dialog: {
    opacity: 0,
  },
  dialogText: {
    opacity: 1,
  },
  app: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  main: {
    flex: 1,
    padding: theme.spacing(6, 4),
    background: '#eaeff1',
  },
  footer: {
    padding: theme.spacing(2),
    background: '#eaeff1',
  },  
  button: {
    marginRight: -theme.spacing(1)
  },
});

const theme = createMuiTheme(
  {
    palette: {
      primary: {
        light: '#993232',
        main: '#800000',
        dark: '#660000',
      },
      secondary: {
        light: '#993232',
        main: '#FFFFFE',
        dark: '#660000',
      },
    },
    shape: {
      borderRadius: 8,
    },
    props: {
      MuiTab: {
        disableRipple: true,
      },
    },
    mixins: {
      toolbar: {
        minHeight: 48,
      },
    },
  }
);

theme.typography.h4 = {
  fontSize: '3vw',
  [theme.breakpoints.up('sm')]: {
    fontSize: 14,
  }, fontWeight: 500
};


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Fade ref={ref} {...props} />;
});

function WelcomeSlideMobile(props) {
  const { classes } = props
  const { user, page, setPage, setLocPage } = useContext(LoginContext);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setPage(0);
    setLocPage(0)
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <IconButton color="inherit" onClick={handleClickOpen} className={classes.button}>
        <InfoIcon/>
      </IconButton>
      <Dialog disablePadding fullScreen open={open} TransitionComponent={Transition} keepMounted onClose={handleClose}
        BackdropProps={{
          style:{
            backgroundColor: 'transparent',
            boxShadow: 'none',
          }
        }} PaperProps={{ style:{ backgroundColor: 'transparent', margin: 0, padding: 0} }}>
        <DialogContent style={{margin: 0, padding: 0}}>
          <HelpCarousel user={user} pageno={0}/>
        </DialogContent>
        {page === 3 ?        
          <DialogActions>
            <Button className={classes.dialogText} onClick={handleClose} color="primary">
              Close
            </Button>
          </DialogActions>: <div/>}
      </Dialog>

    </div>
  );
} 
export default withStyles(styles)(WelcomeSlideMobile)