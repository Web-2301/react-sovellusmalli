/*
Tehtävät voidaan aktivoida tai deaktivoida checkboxilla,
tehtävien aktivointitila tallennetaan tietokantaan activated-kenttään. 
Checkboxin checked-tilan alustaminen tietokannan activated-kentän
arvoon tehdään asettamalla defaultChecked-arvo siihen,
kun tietokannasta haetaan tiedot ensimmäistä kertaa, ja
arvoon null muulloin.  

Ilman tätä menettelyä tyhjäksi vaihdettu checkbox
päivittyisi heti takaisin ruksatuksi tallennuksen yhteydessä, vaikka
valinta tallentuisi tietokantaan oikein. Tämä selittyy
mahdollisesti sillä, että react-hook-form tai ag-grid renderöi
checkboxin käyttäen sen defaultChecked-arvoa, ellei se ole null tai
false.

Tässä tietokantahaun jälkeen toinen renderöinti listaa checkboxit.
*/
import React, { useState, useEffect, useRef } from 'react';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import AddTodo from './AddTodo';
import ChangeTodo from './ChangeTodo';
import moment from 'moment'
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { Box,Checkbox,Button } from "@material-ui/core";
import { CheckboxS } from './Styled';
import { useForm,useFieldArray } from "react-hook-form";

const url = 'https://react-bookstore-omnia-default-rtdb.europe-west1.firebasedatabase.app/items/';
const initialValue = { description: '', date: '', priority: '', active: false }

function Todolist() {
  const { register, handleSubmit, reset, setValue, getValues,watch, control, formState: { errors } } = useForm();
  //const { fields } = useFieldArray({ name: "lista" });
  //const { fields } = useFieldArray({ control,name: "checkboxes" });

  const [todos, setTodos] = useState([]);
  /* Muutoslomakkeet tilamuuttujat */
  const [open, setOpen] = useState(false);
  const [todo, setTodo] = useState(initialValue);
  const dc = useRef(true);
  // const dci = useRef(0);

  useEffect(() => {
    fetchItems();
    console.log(`useEffect,dc:${dc.current}`)
  }, [])

 // if (Array.isArray(todos) && todos.length) {
   // dci.current += 1;
   // if (dc.current !== false) dc.current = true
   // console.log(`todos,dci:${dci.current}`)
 // }
 // else dci.current += 1;

 // console.log(`todolist,dc:${dc.current}`)
 // let dcset = dci.current == 2
 // let dcset = dc.current 
 
 /*function Checkbox({checked,i}) {
   console.log(`Checkbox[${i}]:${dc.current},${checked}`)
   return (
      <input type='checkbox' 
      {...register(`checkboxes.${i}`)}
       defaultChecked={ dc.current ? checked : null }
       size='small'>
      </input>
      )
    }*/
      
  const addKeys = (data) => {
    //console.log('data I:',data)
    const keys = Object.keys(data);
    //console.log('data I, keys:',keys)
    //console.log('data I, values:',Object.values(data))
    const valueKeys = Object.values(data).map(
      (item, index) => Object.defineProperty(item, 'id', {value: keys[index]})
      );
    console.log('addKeys:',valueKeys)
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
    // console.log('dt:',dt)
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

  const activateTodo = (id,data) => {
        /* Päivitä tietokannan todo */
        // console.log(`activateTodo:${id}:${activate}`) 
        // let data = todos.find(e => e.id === id);
        // let data = todos[i];
        // const data = {...data, activate:activate};
        // data.activate = activate;
        // console.log('activateTodo,todo:',data)
        //if (true) return;
        fetch(url + `${data.id}.json`,{
          method: 'PUT',
          body: JSON.stringify(data)
          })
        .catch(err => console.error(err))
      }

    const handleSave = (data,e) => {
        // dc.current = false
        // e.preventDefault();
        console.log("handleSave,e:",e)
        console.log("handleSave,getValues:",JSON.stringify(getValues()))
        // let uusiTodos = { ...todos }
        data.lista.map((t,i) => {
            // console.log("handleSave,t:",t,"i:",i)
            let todo = todos[i];
            todo.activate = data.checkboxes[i];
            // activateTodo(t,data.checkboxes[i],i);
            activateTodo(t,todo);
            // uusiTodos[i] = todo;
            }) 
        // console.log("uusiTodos:",uusiTodos)
        // setTodos(uusiTodos)
        }    

    const handleClick = e => {
        dc.current = false
        console.log("handleClick:",dc.current)
        }        

    const handleOnClick = e => {
        console.log("handleOnClick:",e.target.checked)
        }         


    const check = c => {
      console.log(`checkbox[${c.id}]:${c.data.activate}`)
      return c.value
      }      

 return (
    <div style={{ minWidth:725,display:'table' }}>
    <AddTodo addTodo={addTodo}/>
    <ChangeTodo open={open} handleClose={handleClose}
        todo={todo} changeTodo={changeTodo}/>
    {/* <div className="ag-theme-material" style={ { height: 400, width: 800, margin: 'auto' } }>*/}
    <div className="ag-theme-material" style={{width:'100%'}}>
    <form onSubmit={handleSubmit(handleSave)}>
        <AgGridReact 
            rowData={todos}  
            domLayout={'autoHeight'}
            suppressHorizontalScroll={true}
          >
          <AgGridColumn sortable={true} filter={true} field='description' />
          <AgGridColumn 
          sortable={true} 
          filter={true} 
          field='date'
          valueGetter={p => localDateTime(p.data.date)}
          comparator={dateComparator}

           />
          <AgGridColumn 
            sortable={true} 
            filter={true} 
            field='priority' 
            width={120}
            /> 
          <AgGridColumn 
            sortable={true} 
            filter={true} 
            field='activate' 
            headerName='Active'
            width={110}
            cellRendererFramework={ p => 
            
            /* raaka */  
            /*<input type='checkbox' 
             {...register(`checkboxes.${p.node.id}`)}
             defaultChecked={ dc.current ? p.value : null }
            size='small'
            onClick={handleOnClick}
            >
            </input>*/

            /* oma komponentti */  
            /* <Checkbox checked={p.value} i={p.node.id}></Checkbox> */

            /* styled component */  
            /*<CheckboxS 
              {...register(`checkboxes.${p.node.id}`)}
              defaultChecked={ dc.current ? p.value : null }
              >
            </Checkbox>*/

            /* Material-UI-komponentti */  
            <Checkbox 
            {...register(`checkboxes.${p.node.id}`)}
            defaultChecked={ p.value }
            >
          </Checkbox>
            }
            />     
          <AgGridColumn 
            headerName=''
            field='id' 
            width={120}
            cellRendererFramework={p => 
            <>
              <input 
                type='hidden' 
                value={p.value}
                {...register(`lista.${p.node.id}`)} 
              />
              <IconButton onClick={() => handleUpdate(p.data,p.value)} size="small" color="secondary">
                <EditIcon/>
              </IconButton>
              <IconButton onClick={() => deleteTodo(p.value)} size="small" color="secondary">
                <DeleteIcon/>
              </IconButton>
            </>
            }
          />      
        </AgGridReact>

        <Box display="flex" justifyContent="flex-end">
        <Button 
          onClick={handleClick}
          type="submit"
          style={{margin:10}} 
          variant="contained" 
          color="primary">Tallenna</Button>
        </Box>
      </form> 
      </div>
    </div>
  )
}

export default Todolist;