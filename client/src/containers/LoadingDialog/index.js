import React,{useEffect,useContext} from 'react';
import { withStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogContent from '@material-ui/core/DialogContent';
import CircularProgress from '@material-ui/core/CircularProgress';
import { FeaturesContext } from '../../contexts/FeaturesContext';





const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);



export default function LoadingDialog() {
  const [open, setOpen] = React.useState(false);
  const {loading} = useContext(FeaturesContext);


  return (
    <React.Fragment>
        <Dialog aria-labelledby="customized-dialog-title" open={true} >
            <div style={{height:'10vh',width:'10vh',textAlign:"center", overflow:'hidden'}}>
                <CircularProgress style={{height:'100%',width:'100%', margin:'auto'}}/>
            </div>
            
        </Dialog>
    </React.Fragment>
  );
}
