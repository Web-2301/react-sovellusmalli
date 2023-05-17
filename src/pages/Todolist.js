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
mahdollisesti sillä, että react-hook-form renderöi
checkboxin käyttäen sen defaultChecked-arvoa, ellei se ole null tai
false.

Huom. React-hook-form renderöi komponentin ennen ja jälkeen lomakkeen
handleSubmit-kutsun. 

Huom. React.StrictMode aiheuttaa renderöimisen kahteen kertaan.
*/
import React, { useState, useEffect, useRef } from 'react';
import AddTodo from './AddTodo';
import ChangeTodo from './ChangeTodo';
// import moment from 'moment'
import { AgGridReact,AgGridColumn } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
/*
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { Box,Checkbox,Button } from "@material-ui/core";*/
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Button,Checkbox,Box } from '@mui/material';

// import { CheckboxS } from './Styled';
import { useForm } from "react-hook-form";
//import 'bootstrap/dist/css/bootstrap.min.css';
import { Input } from 'reactstrap';


const url = 'https://react-bookstore-omnia-default-rtdb.europe-west1.firebasedatabase.app/items/';
const initialValue = { description: '', date: '', priority: '', active: false }

function Todolist() {
  console.log('rendering Todolist')
  const { register, handleSubmit, getValues } = useForm();
  //const { fields } = useFieldArray({ control,name: "checkboxes" });
  const [todos, setTodos] = useState([]);
  /* Muutoslomakkeet tilamuuttujat */
  const [open, setOpen] = useState(false);
  const [todo, setTodo] = useState(initialValue);
  /* Checkboxien alustukseen tarvittaessa */
  const dc = useRef(true);
  // const dci = useRef(0);

  useEffect(() => {
    console.log(`useEffect,dc:${dc.current}`)
    fetchItems();
  }, [])

  const registerInnerRef = (n,...loput) => {
    /* Reactstrapin innerRef-määritys */
    let {ref:innerRef,...rest} = register(n,...loput);
    //console.log('innerRef:',innerRef,'rest:',rest);
    return {innerRef,...rest}
    }

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

  const close = () => {
    setOpen(false);
    }

 const fetchItems = () => {
   console.log('fetchItems')
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
    console.log('changeTodo,todo:',todo,'data:',data)
    data.date = data.date.replace('T',' ')
    const confirm = window.confirm("Are you sure, you want to update this row?");
    confirm && fetch(url + `${data.id}.json`,{
      method: 'PUT',
      body: JSON.stringify(data)
      })
    .then( response => { 
        fetchItems();
        close();
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


  const localDateTime = dt => {
    // let d = dt.replace(' klo ',' ')
    // dt.padEnd(15, ' 00:00');
    // console.log('dt:',dt)
    if (dt && dt.length > 10)
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
            return null
            }) 
        // console.log("uusiTodos:",uusiTodos)
        // setTodos(uusiTodos)
        }    

    const handleClick = () => {
        dc.current = false
        console.log("handleClick:",dc.current)
        }        

    /* const handleOnClick = e => {
        console.log("handleOnClick:",e.target.checked)
        } */        


    /* const check = c => {
      console.log(`checkbox[${c.id}]:${c.data.activate}`)
      return c.value
      } */     

  const [columnDefs] = useState([{ field: 'description', 
  sortable: true, 
  filter: true,
  cellStyle: { 'padding-left': 0 } 
  },
{ field: 'date', 
  sortable: true, 
  filter: true,
  width: 150,
  cellStyle: { 'padding-left': 0 },
  valueGetter: p => localDateTime(p.data.date),
  comparator: dateComparator 
  },
{ field: 'priority', 
  sortable: true,
  filter: true,
  width: 110,
  cellStyle: { 'padding-left': 0 }, 
  },
{ field: 'activate', 
  sortable:true,
  filter:true, 
  headerName: 'Active',
  width: 110,
  cellStyle: { 'padding-left': 0 },
  cellRenderer: p => 

    <Checkbox {...register(`checkboxes.${p.node.id}`)} defaultChecked={ p.value }>
    </Checkbox>

  },
  { field:'id', 
  headerName: '',
  width: 100,
  cellStyle: { 'padding-left': 0 },
  cellRenderer: p => 
    <>
    <input type='hidden' value={p.value}
    {...register(`lista.${p.node.id}`)} />
    <IconButton onClick={() => handleUpdate(p.data,p.value)} size="small" color="secondary">
    <EditIcon/></IconButton>
    <IconButton onClick={() => deleteTodo(p.value)} size="small" color="secondary">
    <DeleteIcon/></IconButton>
    </>
    }

        ]);

 return(
    <div style={{ minWidth:725,display:'table' }}>
    <AddTodo addTodo={addTodo}/>
    <ChangeTodo open={open} close={close}
        todo={todo} changeTodo={changeTodo}/>
    {/* <div className="ag-theme-material" style={ { height: 400, width: 800, margin: 'auto' } }>*/}
    <div className="ag-theme-material" style={{width:700}}>
    <form onSubmit={handleSubmit(handleSave)}>
        <AgGridReact 
          rowData={todos}  
          domLayout={'autoHeight'}
          suppressHorizontalScroll={false}
          columnDefs={columnDefs}
          >
          
        </AgGridReact>

        <Box align="right">
        <Button 
          onClick={handleClick}
          type="submit"
          style={{margin:10,right:50}} 
          variant="contained"
          color="primary">Tallenna</Button>
        </Box>
      </form> 
      </div>
    </div>
  )
}

export default Todolist;