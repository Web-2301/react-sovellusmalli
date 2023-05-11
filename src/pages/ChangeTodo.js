// ChangeTodo.js
import { useEffect } from 'react';
import { 
  Button,TextField,FormControl,InputLabel,Select,MenuItem,Dialog,
  DialogActions,DialogContent, DialogTitle } from '@mui/material';
import { Error } from './Styled';
import { useForm } from "react-hook-form";


function ChangeTodo({open,close,todo,changeTodo}) {
   
  const { register, handleSubmit, reset, watch, formState: { errors } } = useForm();
  //const {description,date,priority,id} = todo;
  /* Huom. reset-parametri id välittyy dataan, vaikka id-parametri ei ole lomakekenttä */
  let initialValue = todo
  console.log(watch("description"));

  useEffect(() => {
    console.log('useEffect,todo:',todo)
    reset(initialValue) 
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [todo]);

  const handleReset = () => {
    console.log("handleReset")
    reset({description:'',date:'',priority:'',id:initialValue.id})
    }

  const handleRecover = () => {
    console.log("handleRecover")
    reset(initialValue)
    }  

  return(
    <div>
     <Dialog open={open}>
       <DialogTitle>Change todo</DialogTitle>
       <DialogContent> 
         <form onSubmit={handleSubmit(data => changeTodo(data))} >
         <TextField
            {...register("description", { 
              required: true,
              validate: value => !value.match(/(<([^>]+)>)/ig)  })}
            variant="outlined"
            margin="normal"
            label="Description"
            fullWidth
          /> 
         {errors.description?.type === 'required' && <Error>Kirjoita kuvaus</Error>} 
         {errors.description?.type === 'validate' && <Error>Luvattomia merkkejä</Error>} 

         <TextField
           {...register("date", { required: true })}
           variant="outlined"
           margin="normal"
           label="Date"
           type="datetime-local"
           fullWidth
            />

         {errors.date && <Error>Lisää päivämäärä ja aika</Error>} 
         {/*<TextField
           {...register("priority", { required: true })}
           variant="outlined"
           margin="dense"
           label="Priority"
           fullWidth
            /> */}

        <FormControl fullWidth margin="normal">
        <InputLabel id="priority-label">Priority</InputLabel>
          <Select fullWidth
          {...register("priority", { required: true })}
          label="Priority"
          defaultValue={initialValue.priority}
          >
          <MenuItem value="Matala">Matala</MenuItem>
          <MenuItem value="Normaali">Normaali</MenuItem>
          <MenuItem value="Korkea">Korkea</MenuItem>
          </Select>
        </FormControl>

         {errors.priority && <Error>Lisää kiireellisyys</Error>} 

         <DialogActions>
         <Button color="secondary" variant="outlined" onClick={handleReset}>Tyhjennä</Button>
         <Button color="secondary" variant="outlined" onClick={close}>Peruuta</Button>
         <Button color="secondary" variant="outlined" onClick={handleRecover}>Palauta</Button>
         <Button type="submit" value="Tallenna" color="primary" variant="outlined">Tallenna</Button>
         </DialogActions>     
      </form>   
      </DialogContent>
    </Dialog> 
    </div>
  );
}

export default ChangeTodo;