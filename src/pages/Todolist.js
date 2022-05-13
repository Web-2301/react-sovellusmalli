import React, { useState, useEffect } from 'react';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import AddTodo from './AddTodo';
import ChangeTodo from './ChangeTodo';
import moment from 'moment'
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
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

 const fetchItems = () => {
    fetch(url + '.json')
    .then(response => response.json())
    .then(data => addKeys(data))
    .catch(err => console.error(err))
  }

  const deleteTodo = (id) => {
    //const confirm = window.confirm("Are you sure, you want to delete this row?");
    let confirm = true;
    confirm && fetch(url + `${id}.json`,{
      method: 'DELETE',
      })
    .then(response => fetchItems())
    .catch(err => console.error(err))
  }

  const changeTodo = data => {
    /* Lomakkeen date-kentästä YYYY-MM-DD,
       lomakkeen time-kentästä hh:mm */ 
    console.log('changeTodo,data I:',data)  
    let t = data.time;
    t = t.trim().replace('klo','')
    if (t) data.date += ' ' + t
    delete data.time   
    console.log('changeTodo,data II:',data)
    const confirm = window.confirm(`Muutatko tehtävän ${data.date}?`);
    //let confirm = true;
    confirm && fetch(url + `${todo.id}.json`,{
      method: 'PUT',
      body: JSON.stringify(data)
      })
    .then(
      response => { 
        fetchItems();
        handleClose();
      })
    .catch(err => console.error(err))
  }

  const addTodo = (newTodo) => {
    /* Lomakkeelta YYYY-MM-DD ja 'hh:mm' */
    let t = newTodo.time
    let dt = newTodo.date
    if (t) dt += ' ' + t; 
    //console.log('addTodo,dt I:',dt)
    // dt = moment(dt).format('YYYY-MM-DD hh:mm:ss')
    console.log('addTodo,dt:',dt)
    let todo = {...newTodo,['date'] : dt}  
    delete todo.time
    console.log('addTodo:',todo)
    fetch(url + '.json',{
      method: 'POST',
      body: JSON.stringify(todo)
    })
    .then(response => fetchItems())
    .catch(err => console.error(err))
  }

const localDateTime = dt => {
    // let d = dt.replace(' klo ',' ')
    // dt.padEnd(15, ' 00:00');
    console.log('dt:',dt)
    if (dt.length > 10)
    return new Date(dt).toLocaleString(undefined, {
        day:    'numeric',
        month:  'numeric',
        year:   'numeric',
        hour:   '2-digit',
        minute: '2-digit'
    })
    else 
    return new Date(dt).toLocaleString(undefined, {
        day:    'numeric',
        month:  'numeric',
        year:   'numeric'
    })}

  const dateComparator = (date1,date2,dateA,dateB,isInverted) => {
      /* Huom. nousevan ja laskevan välissä ei valintaa */
      // console.log(`${dateB.data.date} > ${dateA.data.date}?`)
      return dateA.data.date > dateB.data.date ? 1 : -1
      }   

  return (
    <div style={{ minWidth:725 }}>
    <AddTodo addTodo={addTodo}/>
    <ChangeTodo open={open} handleClose={handleClose}
        todo={todo} changeTodo={changeTodo}/> 
      {/*<div className="ag-theme-material" style={ { height: 400, width: 800, margin: 'auto' } }>*/}
    <div className="ag-theme-material" style={{width:'100%'}}>
        <AgGridReact 
            rowData={todos}  
            domLayout={'autoHeight'}
            //suppressHorizontalScroll={true}
          >
          <AgGridColumn sortable={true} filter={true} field='description' />
          <AgGridColumn 
          sortable={true} 
          filter={true} 
          field='date'
          valueGetter={p => localDateTime(p.data.date)}
          comparator={dateComparator}

           />
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