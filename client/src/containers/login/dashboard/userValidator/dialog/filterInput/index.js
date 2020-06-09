import React from 'react'
import {createMuiTheme, ThemeProvider} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Input from '@material-ui/core/Input';

const theme = createMuiTheme()

theme.typography.subtitle1 = {
  color: 'gray',
  fontSize: '4vw',
  [theme.breakpoints.up('sm')]: {
    fontSize: 16,
  }, fontWeight: 400
};

export default function FilterInput(props){

  return (
    <ThemeProvider theme={theme}>
    <FormControl style={{margin:8 , width: "100%",}}>
      <InputLabel><Typography variant='subtitle1'>{props.label}</Typography></InputLabel>
      <Select
        value={props.value}
        onChange={(e)=>{props.onChange(e.target.value)}}
        input={<Input/>}
      >
        
        <MenuItem value="" key='0'>
          <em>None</em>
        </MenuItem>
        {props.choices ? props.choices.map((option)=>{
          return(<MenuItem value={option} key={option}>{option}</MenuItem>)
        }): null}
      </Select>
    </FormControl>
    </ThemeProvider>
  )
}