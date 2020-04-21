import React, {useContext,useState,useEffect} from 'react';
import { FeaturesContext } from '../../../contexts/FeaturesContext';
import { createStyles, makeStyles} from '@material-ui/core/styles';
import axios from 'axios';

import simple_high from '../../../assets/levelIndicators/simple_high.png'
import simple_med from '../../../assets/levelIndicators/simple_mid.png'
import simple_low from '../../../assets/levelIndicators/simple_low.png'
import simple_none from '../../../assets/levelIndicators/simple_none.png'

import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {IconButton, Input} from '@material-ui/core';
import EditIcon from "@material-ui/icons/EditOutlined";
import DoneIcon from "@material-ui/icons/DoneAllTwoTone";

const useStyles = makeStyles((theme) =>
  createStyles({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
      width: 800,
      margin: `${theme.spacing(0)} auto`
    }

  }),
);

const HospitalUpdate = (props) => {
  const [hos, setHos] = useState(props.selected);
  
  const [isEditMode, setIsEditMode] = useState(false);

  const classes = useStyles();

  const handleOnChange = (event) => {
    const {name, value} = event.target;
    /*setHos({
      ...hos,
      properties: {
        ...hos.properties,
        Supply_Cur: {
          ...hos.properties.Supply_Cur,
          [name]: value
        },
        "Last Update": new Date().toLocaleString()
      }
    })*/
    setHos((prevState) => {
      prevState.properties.Supply_Cur[name] = value;
      prevState.properties["Last Update"] = new Date().toLocaleString();
      return({
        ...prevState
      })
    })
  };

  console.log(hos);

  const handleSubmit = () => {
    console.log(hos);
    /*
    fetch(`https://trams-up-dge.herokuapp.com/hospitals/update/${hos._id}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(hos),
    }).then(response => console.log(response.json()));*/
    /*axios.post(`https://trams-up-dge.herokuapp.com/hospitals/update/${hos._id}`, hos )
      .then(res => console.log(res.data))
      .catch(error => console.log(error))*/
    setIsEditMode(!isEditMode);
  }

  useEffect(() => {
    const postData = async () => {
      const res = await axios.post(`https://trams-up-dge.herokuapp.com/hospitals/update/${hos._id}`, hos );
      console.log(res.data);
    }

    postData();
    
  }, [hos])

  const supplies = Object.keys(hos.properties.Supply_Cur)
  const imageChoose = (currHospital, supply) =>{
    if (currHospital.properties.Supply_Cur[supply] > 0){
      if(currHospital.properties.Supply_Cur[supply]/currHospital.properties.Supply_Cap[supply] < 0.2){
        return(<img style={{width:20}} src={simple_low} alt="critically-low"/>)
      } else if((currHospital.properties.Supply_Cur[supply]/currHospital.properties.Supply_Cap[supply] > 0.5)){
        return(<img style={{width:20}} src={simple_high} alt="well-supplied"/>)
      } else return(<img style={{width:20}} src={simple_med} alt="low"/>)
    } else return(<img style={{width:20}} src={simple_none} alt="none"/>)
  }
  
  return (
    <div className={classes.container}>
      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell align="center" colSpan={3}>
                <Typography variant="h6">{hos.properties.Name_of_Ho}</Typography>
              </TableCell>
              <TableCell align="right">
                {isEditMode ? 
                <IconButton onClick={handleSubmit}>
                  <DoneIcon/> <Typography variant="subtitle2">Done</Typography>
                </IconButton>
                : <IconButton onClick={() => setIsEditMode(!isEditMode)}>
                <EditIcon/> <Typography variant="subtitle2">Edit</Typography>
              </IconButton>}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell align="left">
                <Typography variant="subtitle1">Address:</Typography>
              </TableCell>
              <TableCell colSpan={3}>
                <Typography variant="subtitle2">{hos.properties.Address}</Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="left">
                <Typography variant="subtitle1">Head/Contact Person:</Typography>
              </TableCell>
              <TableCell colSpan={3}>
                <Typography variant="subtitle2">{hos.properties.Head}</Typography>
              </TableCell>                
            </TableRow>
            <TableRow>
              <TableCell align="left">
                <Typography variant="subtitle1">Contact Number/s:</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2">{hos.properties["Contact Numbers"]}</Typography>
              </TableCell>
              <TableCell align="left">
                <Typography variant="subtitle1">Website:</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2">{hos.properties.Website}</Typography>
              </TableCell>
            </TableRow>
            <TableRow style={{background: "#017225", color: "#fff"}}>
              <TableCell/>
              <TableCell align="center" >Medical Supply</TableCell>
              <TableCell align="center" >Current Supply</TableCell>
              <TableCell align="center" >Hospital Capacity</TableCell>
            </TableRow>
            {supplies.map((supply)=>{
              if(supply === "Other Needs"){
                return(
                  <TableRow key={supply} className="supplies">
                    <TableCell>{imageChoose(hos, supply)}</TableCell>
                    <TableCell>
                      <Typography align="center" variant="subtitle2">{supply}</Typography>
                    </TableCell>
                    <TableCell>
                      {isEditMode? 
                        <Input width="50px" name={supply} value={hos.properties.Supply_Cur[supply]} onChange={handleOnChange}/> 
                        :<Typography align="center" variant="subtitle2">{hos.properties.Supply_Cur[supply]}</Typography>}
                      
                    </TableCell>
                    <TableCell/>
                  </TableRow>
                )
              }
            
              return(
                <TableRow key={supply} className="supplies">
                  <TableCell>{imageChoose(hos, supply)}</TableCell>
                  <TableCell>
                    <Typography align="center" variant="subtitle2">{supply}</Typography>
                  </TableCell>
                  <TableCell align="center">
                  {isEditMode? 
                    <Typography align="center" variant="subtitle2">
                      <Input type="number" style={{width: 80}} name={supply} value={hos.properties.Supply_Cur[supply]} 
                        onChange={handleOnChange}/> </Typography>
                    :<Typography align="center" variant="subtitle2">{hos.properties.Supply_Cur[supply]}</Typography>}
                  </TableCell>
                  <TableCell>
                    <Typography align="center" variant="subtitle2">{hos.properties.Supply_Cap[supply]}</Typography>
                  </TableCell>
                </TableRow>
              )  
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default HospitalUpdate

