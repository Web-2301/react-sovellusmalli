import React, { useState, useEffect } from 'react';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import AddTodo from './AddTodo';
import ChangeTodo from './ChangeTodo';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

const url = 'https://react-bookstore-omnia-default-rtdb.europe-west1.firebasedatabase.app/items/';
const initialValue = { description: '', date: '', priority: '' }

function Todolist() {
  const [todos, setTodos] = useState([]);
  /* Muutoslomakkeet tilamuuttujat */
  const [open, setOpen] = useState();
  const [todo, setTodo] = useState(initialValue);

  useEffect(() => {
    fetchItems()
  }, [])

  const addKeys = (data) => {
    //console.log('data I:',data)
    const keys = Object.keys(data);
    //console.log('data I, keys:',keys)
    //console.log('data I, values:',Object.values(data))
    const valueKeys = Object.values(data).map(
      (item, index) => Object.defineProperty(item, 'id', {value: keys[index]})
      );
    //console.log('data II:',valueKeys)
    setTodos(valueKeys);
  }

  const handleUpdate = (oldTodo,id) => {
    /* Listan muutospainikkeet: listarivin arvot todo-lomaketilamuuttujaan.
       Lomakkeen avaaminen esitäytettynä. */
    oldTodo = { ...oldTodo,['id']:id}
    console.log('oldTodo:',oldTodo);   
    setTodo(oldTodo);
    setOpen(true);
    }  

  const handleClose = () => {
    setOpen(false);
    }

  const onChange = (e) => {
    /* Todo-tilamuuttujaan lisätään id-kenttä */
    const { value,name } = e.target
    setTodo({...todo, [name]:value});
    }

  const fetchItems = () => {
    fetch(url + '.json')
    .then(response => response.json())
    .then(data => addKeys(data))
    .catch(err => console.error(err))
  }

  const deleteTodo = (id) => {
    const confirm = window.confirm("Are you sure, you want to delete this row?");
    confirm && fetch(url + `${id}.json`,{
      method: 'DELETE',
      })
    .then(response => fetchItems())
    .catch(err => console.error(err))
  }

  const changeTodo = () => {
    console.log('todo:',todo)
    const confirm = window.confirm("Are you sure, you want to update this row?");
    confirm && fetch(url + `${todo.id}.json`,{
      method: 'PUT',
      body: JSON.stringify(todo)
      })
    .then(
      response => { fetchItems();
      handleClose();
      })
    .catch(err => console.error(err))
  }

  const addTodo = (newTodo) => {
    fetch(url + '.json',{
      method: 'POST',
      body: JSON.stringify(newTodo)
    })
    .then(response => fetchItems())
    .catch(err => console.error(err))
  }

  return (
    <div style={{ minWidth:725 }}>
    <AddTodo addTodo={addTodo}/>
    <ChangeTodo open={open} handleClose={handleClose}
        todo={todo} onChange={onChange} changeTodo={changeTodo}/> 
      {/*<div className="ag-theme-material" style={ { height: 400, width: 800, margin: 'auto' } }>*/}
    <div className="ag-theme-material" style={{width:'100%'}}>
        <AgGridReact 
            rowData={todos}  
            domLayout={'autoHeight'}
            //suppressHorizontalScroll={true}
          >
          <AgGridColumn sortable={true} filter={true} field='description' />
          <AgGridColumn sortable={true} filter={true} field='date' />
          <AgGridColumn sortable={true} filter={true} field='priority' />     
          <AgGridColumn 
            headerName=''
            field='id' 
            width={120}
            cellRendererFramework={ params => 
            <>
              <IconButton onClick={() => handleUpdate(params.data,params.value)} size="small" color="secondary">
                <EditIcon/>
              </IconButton>
              <IconButton onClick={() => deleteTodo(params.value)} size="small" color="secondary">
                <DeleteIcon/>
              </IconButton>
            </>
            }
          />      
          
        </AgGridReact>
      </div>
    </div>
  )
}

export default Todolist;