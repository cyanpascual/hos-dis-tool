import React from 'react'
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Input from '@material-ui/core/Input';

export default function FilterInput(props){

  return (
    <FormControl style={{margin:8 , minWidth: 150,}}>
      <InputLabel>{props.label}</InputLabel>
      <Select
        value={props.value}
        onChange={(e)=>{props.onChange(e.target.value)}}
        input={<Input/>}
      >
        
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {props.choices.map((option)=>{
          return(<MenuItem value={option}>{option}</MenuItem>)
        })}
      </Select>
    </FormControl>
  )
}