// ChangeTodo.js
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';


function ChangeTodo({open,handleClose,todo,onChange,changeTodo}) {
  const {description,date,priority} = todo;
  
  return(
    <div>
     <Dialog open={open} onClose={handleClose}>
       <DialogTitle>Change todo</DialogTitle>
       <DialogContent> 
         <TextField
            name="description"
            value={description}
            onChange={e=>onChange(e)}
            variant="outlined"
            margin="dense"
            label="Description"
            fullWidth
          /> 
         <TextField
           name="date"
           value={date}
           onChange={e=>onChange(e)}
           variant="outlined"
           margin="dense"
           label="Date"
           fullWidth
         /> 
         <TextField
           name="priority"
           value={priority}
           onChange={e=>onChange(e)}
           variant="outlined"
           margin="dense"
           label="Priority"
           fullWidth
         /> 
      </DialogContent>
      <DialogActions>
         <Button color="secondary" variant="outlined" onClick={handleClose}>Cancel</Button>
         <Button color="primary"variant="outlined" onClick={()=>changeTodo()}>Save</Button>
      </DialogActions>
     </Dialog> 
    </div>
  );
}

export default ChangeTodo;