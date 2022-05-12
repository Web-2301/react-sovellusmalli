// ChangeTodo.js
import React, { useEffect } from 'react';
//import moment from 'moment'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
//import MenuItem from '@material-ui/core/MenuItem';
import { Error,InputS,SelectS } from './Styled';
import { useForm } from "react-hook-form";

const options = ['','Matala','Keskiverto','Korkea']
//moment.locale('fi')

function ChangeTodo({open,handleClose,todo,changeTodo}) {
  const {date,description,id,priority} = todo;
  console.log(`ChangeTodo,date:${date},priority:${priority}`)
  /* Tietokannasta date muodossa YYYY-MM-DD hh:mm. 
  Ag-gridin paikallinen listausnäkymä ei vaikuta kentän arvoon,
  joten sen muoto sopii date- ja time-tyyppisiin HTML-elementteihin. 
  Huom. 00:00-minuuttilukemaa ei näytetä. Se näkyisi Firefoxissa
  kellonaikana 12:00 (engl.) ja toisaalta tyhjä minuuttilukema näkyis
  kello 03:00 (engl. ja toLocaleString(), ks. katkaisu Todolist.js). */
  let pvm,t,dt = date;
  [pvm,t] = dt.split(" ");
  console.log(`ChangeTodo,date:${pvm},time:${t}`)
  let initialValue = {
    description,
    date:pvm,
    time:t,
    priority
  }
  console.log('todo:',{...todo})
  console.log('initialValue:',{...initialValue})
  const { register, handleSubmit, reset, setValue, watch, control, formState: { errors } } = useForm();
  
  useEffect(() => {
    console.log('useEffect,todo:',todo)
    /*let dt = moment(todo.date).format('YYYY-MM-DD hh:mm:ss')
    console.log('useEffect,dt:',dt)
    let d = dt.split(" ");
    setValue('description',todo.description)
    setValue('date',d[0])
    setValue('time',d[1])
    setValue('priority',todo.priority)*/
    reset(initialValue)
    //setValue('priority',todo.priority)
  
  }, [todo]);

 return(
    <div>
     <Dialog open={open} onClose={handleClose}>
       <DialogTitle>Change todo</DialogTitle>
       <DialogContent> 
       <TextField
            {...register("description", { 
              required: true,
              validate: value => !value.match(/(<([^>]+)>)/ig) 
            })}
            placeholder="Description"
            variant="outlined"
            margin="dense"
            fullWidth
          /> 
          {errors.description?.type === 'required' && <Error>This field is required</Error>} 
          {errors.description?.type === 'validate' && <Error>Luvattomia merkkejä</Error>} 
         <TextField
            {...register("date", { required: true })}
            type="date"
            variant="outlined"
            margin="dense"
            fullWidth
         />
        {errors.date && <Error>This date field is required</Error>} 
        <TextField
            {...register("time")}
            type="time"
            variant="outlined"
            margin="dense"
            fullWidth
         />
        {/*<Select
          {...register("priority", { required: true })}
          variant="outlined"
          margin="dense"
          fullWidth
          defaultValue= ""
          style={{marginTop:10}}>
          {options.map(value => 
          <MenuItem key={value} value={value}>{value}</MenuItem>
          )}  
        </Select>*/}

      <SelectS 
          register={register} 
          options={options} 
          name='priority'
          style={{width:'100%',fontSize:'1rem'}}
      />
    {errors.priority?.type === 'required' && <Error>Priority field is required</Error>}     
    {errors.priority && <Error>Valitse tärkeys</Error>}
      </DialogContent>
      <DialogActions>
         <Button color="secondary" variant="outlined" onClick={handleClose}>Cancel</Button>
         <Button color="primary"variant="outlined" onClick={handleSubmit(data => changeTodo(data))}>Save</Button>
      </DialogActions>
     </Dialog> 
    </div>
  );
}

export default ChangeTodo;