// AddTodo.js
import React, { useState } from 'react';
import { 
  Box,Button,TextField,Dialog,DialogActions,
  DialogContent,DialogTitle } from '@mui/material';
import { Error,InputS,Button as ButtonS } from './Styled';
import { Form, Input, Button as ButtonR, 
  Modal, ModalFooter,
  ModalHeader, ModalBody } from 'reactstrap';
import { useForm } from "react-hook-form";

const initialValue = { description: '', date: '', priority: '' }

function AddTodo(props) {
  const [openM, setOpenM] = useState(false);
  const [openS, setOpenS] = useState(false);
  const [openR, setOpenR] = useState(false);
  //const [todo, setTodo] = useState(initialValue);

  const { register, handleSubmit, reset, watch, formState: { errors } } = useForm();
  console.log(watch("description"));
  

  const handleOpenM = () => {
    setOpenM(true)
    }
  const handleOpenS = () => {
    setOpenS(true)
    }
  const handleOpenR = () => {
    setOpenR(true)
    }

  const handleClose = () => {
    setOpenM(false);
    setOpenS(false);
    setOpenR(false);
    }

  const handleEmpty = () => {
    reset();
    }
  
  const handleSave = (data) => {
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

  /*
    const registerInnerRef = (n,...loput) => {
    let {ref:innerRef,...rest} = registerR(n,...loput);
    return {innerRef,...rest}
    }
  */

  const {ref:refDescription, ...description} = register('description', { required: true });
  const {ref:refDate, ...date} = register('date', { required: true })
  const {ref:refPriority, ...priority} = register('priority', { required: true })

  return(
    <div>
    <Box sx={{ display:'grid',gap:1,gridTemplateColumns:'repeat(3,1fr)',width:700 }}>
      <ButtonS variant="outlined" color="primary" onClick={handleOpenS}>
        Add todo Styled
      </ButtonS>
      <ButtonR variant="outlined" color="primary" onClick={handleOpenR}>
        Add todo Reactstrap
      </ButtonR>
      <Button variant="outlined" color="primary" onClick={handleOpenM}>
        Add todo Material-UI
      </Button>
    </Box>

    <Dialog open={openM}>
       <DialogTitle>New todo Material-UI</DialogTitle>
       <DialogContent>
       <form onSubmit={handleSubmit(handleSave)}>
         <TextField
            {...register("description", { required: true })}
            placeholder="Description"
            variant="outlined"
            margin="dense"
            fullWidth
          /> 
          {errors.description && <Error>This field is required</Error>} 
         <TextField
            {...register("date", { required: true })}
            placeholder="Date"
            variant="outlined"
            margin="dense"
            fullWidth
         />
        {errors.date && <Error>This date field is required</Error>} 
        <TextField
           {...register("priority", { required: true })}
           placeholder="Priority"
           variant="outlined"
           margin="dense"
           fullWidth
         /> 
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
       <form onSubmit={handleSubmit(handleSave)}>
         <InputS
            {...register("description", { required: true })}
            placeholder="Description"
          /> 
          {errors.description && <Error>Description field is required</Error>} 
         <InputS
            {...register("date", { required: true })}
            placeholder='Date'
         />
        {errors.date && <Error>Date field is required</Error>} 
        <InputS
          {...register("priority", { required: true })}
           placeholder="Priority"
        /> 
        {errors.priority && <Error>Priority field is required</Error>}     
      </form>
      </DialogContent>
      <DialogActions>
        <ButtonS color="secondary" variant="outlined" onClick={handleEmpty}>Tyhjennä</ButtonS>
        <ButtonS color="secondary" variant="outlined" onClick={handleClose}>Cancel</ButtonS>
        <ButtonS color="primary" variant="outlined" onClick={handleSubmit(handleSave)}>Save</ButtonS>
      </DialogActions>
     </Dialog> 

     <Modal isOpen={openR}>
       <ModalHeader>New todo Reactstrap</ModalHeader>
       <ModalBody>
       <form>
         <Input
            innerRef={refDescription}
            {...description}    
            placeholder="Description"
          /> 
          {errors.description && <Error>Description field is required</Error>} 
         <Input
           innerRef={refDate}
           {...date}
           placeholder='Date'
         />
        {errors.date && <Error>Date field is required</Error>} 
        <Input
           innerRef={refPriority}
           {...priority}
           placeholder="Priority"
         /> 
         {errors.priority && <Error>Priority field is required</Error>}  
    </form>
      </ModalBody>
      <ModalFooter>
        <ButtonR color="secondary" variant="outlined" onClick={handleEmpty}>Tyhjennä</ButtonR>
        <ButtonR color="secondary" variant="outlined" onClick={handleClose}>Cancel</ButtonR>
        <ButtonR color="primary" variant="outlined" onClick={handleSubmit(handleSave)}>Save</ButtonR>
      </ModalFooter>
     </Modal> 

    </div>
  );
}

export default AddTodo;