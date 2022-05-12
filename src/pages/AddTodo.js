// AddTodo.js
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Grid, Button } from '@material-ui/core'
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Error,InputS,SelectS,Button as ButtonS } from './Styled';
import { Form, Input, Button as ButtonR, 
  Modal, ModalFooter,
  ModalHeader, ModalBody } from 'reactstrap';
import { useForm } from "react-hook-form";

const initialValue = { description: '', date: '', time: '', priority: '' }
const options = ['','Matala','Keskiverto','Korkea']

function AddTodo(props) {

  const [open, setOpen] = useState(false);
  const [openS, setOpenS] = useState(false);
  const [openR, setOpenR] = useState(false);
  //const [todo, setTodo] = useState(initialValue);
  const { register, handleSubmit, reset, setValue, watch, control, formState: { errors } } = useForm(initialValue);
  const { 
    register:registerS, 
    handleSubmit:handleSubmitS, 
    reset:resetS, 
    watch:watchS, 
    formState: { errors:errorsS } } = useForm(initialValue);

  const { 
    register:registerR, 
    handleSubmit:handleSubmitR, 
    reset:resetR, 
    watch:watchR, 
    formState: { errors:errorsR } } = useForm(initialValue);

    const defaultValues = {
      description: "",
      date: "",
      time: "",
      priority: ""
    };
 
  console.log(watch("description"));
  
  const handleOpen = () => {
    setOpen(true)
    }
  const handleOpenS = () => {
    setOpenS(true)
    }
  const handleOpenR = () => {
    setOpenR(true)
    }

  const handleClose = () => {
    setOpen(false);
    setOpenS(false);
    setOpenR(false);
    }

  const handleEmpty = () => {
    resetR();
    resetS(defaultValues);
    reset(defaultValues);
    //setValue("priority", "");
    }
  
  const handleSave = data => {
    console.log('handleSave:',data)
    props.addTodo(data);
    handleClose();
    }

  /*const inputChanged = (event) => {
    setTodo({...todo, [event.target.name]: event.target.value});
  }*/

  const inputChangedReactstrap = (event) => {
    /* Toimii: Lomakkeen tallennukseen tarvitaan todo,
       lomakkeen tarkistuksiin tarvitaan kentän reset,
       mutta korvaamalla lähetyksessä todo lomakkeen datalla,
       tämä käy tarpeettomaksi. */
    /* setTodo({...todo, [event.target.name]: event.target.value});
    reset({[event.target.name]:event.target.value})*/
  }

  var {ref, ...description} = registerR('description', { required: true });
  let refDescription = ref;
  var {ref, ...date} = registerR('date', { required: true })
  let refDate = ref;
  var {ref, ...time} = registerR('time')
  let refTime = ref;
  var {ref, ...priority} = registerR('priority', { required: true })
  let refPriority = ref;
  return(
    <div>
    <Grid align="center">
      <ButtonS variant="outlined" color="primary" onClick={handleOpenS}>
        Add todo Styled
      </ButtonS>
      <ButtonR variant="outlined" color="primary" onClick={handleOpenR}>
        Add todo Reactstrap
      </ButtonR>
      <Button variant="outlined" color="primary" onClick={handleOpen}>
        Add todo Material-UI
      </Button>
    </Grid>

    <Dialog open={open}>
       <DialogTitle>New todo Material-UI</DialogTitle>
       <DialogContent>
       <form key={1}>
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
            placeholder="Date"
            type="date"
            variant="outlined"
            margin="dense"
            fullWidth
         />
        {errors.date && <Error>This date field is required</Error>} 
        <TextField
            {...register("time")}
            placeholder="Date"
            type="time"
            variant="outlined"
            margin="dense"
            fullWidth
         />
      
        {/*<TextField
           {...register("priority", { required: true })}
           placeholder="Priority"
           variant="outlined"
           margin="dense"
           fullWidth
  /> */}

    {/* Huom. Material UI:n Select-arvon asetus esim. 
    reset()-funktiolla ei muuta näkyvää Select-valintaa
    Material-UI:n Dialogissa, vaikka arvo muuttuukin. 
    Esim. arvon tyhjentäminen tuottaa validointivirheen,  
    vaikka näytössä pysyy aikaisempi valinta. */}
    <Select
        {...register("priority", { required: true })}
        variant="outlined"
        margin="dense"
        fullWidth
        defaultValue= ""
        style={{marginTop:10}}>
        {options.map(value => 
        <MenuItem key={value} value={value}>{value}</MenuItem>
        )}  
        </Select>
    {errors.priority && <Error>Valitse tärkeys</Error>} 

    
   

    </form>
      </DialogContent>
      <DialogActions>
         <Button color="secondary" variant="outlined" onClick={handleEmpty}>Tyhjennä</Button>
         <Button color="secondary" variant="outlined" onClick={handleClose}>Peruuta</Button>
         <Button color="primary" variant="outlined" onClick={handleSubmit(handleSave)}>Lisää</Button>
      </DialogActions>
    </Dialog> 

    <Dialog open={openS}>
      <DialogTitle>New todo Styled</DialogTitle>
      <DialogContent>
      <form key={2}>
         <InputS
            {...registerS("description", { required: true })}
            placeholder="Description"
          /> 
          {errorsS.description && <Error>Description field is required</Error>} 
         <InputS
            {...registerS("date", { required: true })}
            placeholder='Date'
            type='date'
         />
        {errorsS.date && <Error>Date field is required</Error>} 
        <InputS
            {...registerS("time", { required: true })}
            placeholder='Time'
            type='time'
        />
        {/*<InputS options={options}
          {...register("priority", { required: true })}
           placeholder="Priority"
        />*/}

        <SelectS 
          register={registerS} 
          options={options} 
          name='priority'
          //validation={ {required: true} }
    
        />
        {errorsS.priority?.type === 'required' && <Error>Priority field is required</Error>}     
      </form>
      </DialogContent>
      <DialogActions>
        <ButtonS color="secondary" variant="outlined" onClick={handleEmpty}>Tyhjennä</ButtonS>
        <ButtonS color="secondary" variant="outlined" onClick={handleClose}>Cancel</ButtonS>
        <ButtonS color="primary" variant="outlined" onClick={handleSubmitS(handleSave)}>Save</ButtonS>
      </DialogActions>
     </Dialog> 

     <Modal isOpen={openR}>
       <ModalHeader>New todo Reactstrap</ModalHeader>
       <ModalBody>
       <form key={3}>
         <Input
            innerRef={refDescription}
            {...description}    
            placeholder="Description"
          /> 
          {errorsR.description && <Error>Description field is required</Error>} 
         <Input
           style={{marginTop:10}}
           innerRef={refDate}
           {...date}
           type='date'
         />
        {errorsR.date && <Error>Date field is required</Error>} 
        <Input
           style={{marginTop:10}}
           innerRef={refTime}
           {...time}
           type='time'
         />
        <Input type='select'
          style={{marginTop:10}}
          innerRef={refPriority}
          {...priority}
          >
          {options.map(value => 
            <option value={value}>{value}</option>)}
        </Input>
        {errorsR.priority && <Error>Priority field is required</Error>}  
    </form>
      </ModalBody>
      <ModalFooter>
        <ButtonR color="secondary" variant="outlined" onClick={handleEmpty}>Tyhjennä</ButtonR>
        <ButtonR color="secondary" variant="outlined" onClick={handleClose}>Cancel</ButtonR>
        <ButtonR color="primary" variant="outlined" onClick={handleSubmitR(handleSave)}>Save</ButtonR>
      </ModalFooter>
     </Modal> 

    </div>
  );
}

export default AddTodo;