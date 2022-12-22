import React, { useState,useRef,useEffect } from "react";
import { Card, Otsikko, Logo, Form, Input, Button, Error } from '../components/AuthForm';
import { useForm } from "react-hook-form";
import axios from 'axios';

const initialValue = { email: '', username: '', password: '', password2: '' }
const urlHae = "http://localhost:5000/reactapi/haeProfiili" 
const urlTallenna = "http://localhost:5000/reactapi/tallennaProfiili" 


function Profiili(props) {

  const { register, handleSubmit, setValue, setError, reset, watch, formState: { errors } } = useForm(initialValue);
  const password = useRef({});
  password.current = watch("password", "");
  /*useEffect(()=>{
    let fields = {'email':'jukka.aula@kolumbus.fi','username':'Jukka A'}
    let fieldsArr = Object.entries(fields).map(([key, value]) => setValue(key,value))
    },[])*/

  const haeFetch = () => {
    return fetch(urlHae, {  
      credentials: 'include'
    })  
      .then(response => response.json())  
      .then(data => {  
        console.log(data);
        Object.keys(data).forEach(key => setValue(key, data[key]));
      })  
      .catch((error) => {  
        console.error(error);  
      });  
  };  

  const haeAxios = () => {
    axios.get(urlHae,{withCredentials:true})
    .then(result => {         
      if (result.status === 200 && result.data) {
        console.log('result.data',result.data);
      } else {
        Object.entries(result.data).map(([key,arvo]) =>           
        setError(
          key,
          {type: "palvelinvirhe",
          message: arvo}
          ))
      }
  }).catch(e => {setError('apiError',{ message:e })})
}

  useEffect(() => {
    haeFetch()
    },[]);
  

  function tallenna(data) {
    console.log("data:",data)
    axios.post(urlTallenna,data)
      //.then(result => result.json())
      .then(result => {         
        if (result.status === 200 && result.data === "OK") {
          //setSignedUp(true);
        } else {
                      
          Object.entries(result.data).map(([key,arvo]) =>           
          setError(
            key,
            {type: "palvelinvirhe",
            message: arvo}
            ))
        }
    }).catch(e => {setError('apiError',{ message:e })})
  }
  

  return (
    <Card>
    {/*<Logo src={logoImg} />*/}
    <Otsikko>Oma profiili</Otsikko>
    <Form>
    {errors.apiError && <Error>{errors.apiError.message}</Error>}  
    <Input 
      placeholder="sähköpostiosoite"
      {...register("email", { 
        required: true,
        pattern: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
       })}
    /> 
    {errors.email?.type === 'required' && <Error>Anna sähköpostiosoite</Error>}
    {errors.email?.type === 'pattern'  && <Error>Virheellinen sähköpostiosoite</Error>}
    {errors.email?.type === 'palvelinvirhe' && <Error>{errors.email.message}</Error>} 
    <Input 
      placeholder="käyttäjätunnus"
      {...register("username", { 
        required: true,
        minLength: 3
       })}
    /> 
    {errors.username?.type === 'required' && <Error>Anna käyttäjätunnus</Error>} 
    {errors.username?.type === 'minLength'  && <Error>Vähintään kolme merkkiä</Error>} 
    {errors.username?.type === 'palvelinvirhe' && <Error>{errors.username.message}</Error>} 
    <Input 
      type="password" 
      placeholder="salasana" 
      {...register("password", { 
        required: true,
        pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/
       })}
    />
    {errors.password?.type === 'required' && <Error>Anna salasana</Error>} 
    {errors.password?.type === 'pattern'  && <Error>Vähintään 6 merkkiä, ainakin yksi numero ja kirjain</Error>} 
    {errors.password?.type === 'palvelinvirhe' && <Error>{errors.password.message}</Error>} 
    <Input 
      type="password" 
      placeholder="salasana uudestaan" 
      {...register("password2", { 
        required: true,
        validate: value => value === password.current 
      })}
    />
    {errors.password2?.type === 'required' && <Error>Anna salasana</Error>}
    {errors.password2?.type === 'validate' && <Error>Salasanat eivät täsmää</Error>}
    <Button onClick={handleSubmit(data => tallenna(data))}>Tallenna</Button>
    </Form>
  </Card>
  );
}

export default Profiili;