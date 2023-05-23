import React, { useState,useRef,useEffect } from "react";
import { Card, Otsikko, Logo, Form, Input, Button, Error } from '../components/AuthForm';
//import { Error } from './Styled';
import { useForm } from "react-hook-form";
import { baseUrl,csrfFetch } from '../connections/yhteydet';


const initialValue = { email: '', username: '', password: '', password2: '' }
// const baseUrl = "http://localhost:5000/reactapi/"
const urlTallenna = baseUrl + "/tallennaProfiili"
const urlHae = baseUrl + "/haeProfiili"
// const csfrUrl = baseUrl + 'getcsrf'

function Profiili(props) {
  const [tallennusOK, setTallennusOK] = useState(false);
  const { register, handleSubmit, setValue, setError, reset, watch, formState: { errors } } = useForm(initialValue);
  const password = useRef({});
  password.current = watch("password", "");
  const csrfToken = useRef('');
  
  console.log(`Profiili renderöidään,tallennusOK:${tallennusOK}`)

  const csrf = () => {
    csrfFetch()
    .then((response) => {
      csrfToken.current = response.headers.get("X-CSRFToken");
    })
    .catch((err) => {
      console.log('csfr:',err);
    });
  }
  
  useEffect(() => {
    console.log(`Profiili,useEffect,csrf`)
    csrf()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    console.log("Profiili,useEffect,haeProfiili")
    haeFetch()
    },[]);
  
  console.log('Profiili,csrfToken:',csrfToken.current);

  const haeFetch = () => {
    console.log("haeFetch")
    return fetch(urlHae, {credentials: 'include'})  
      .then(response => {
        if(response.status !== 200) throw response.status
        else return response.json()
        })  
      .then(data => {  
        console.log("haeFetch",data);
        if (data.virhe) throw data.virhe
        Object.keys(data).forEach(key => setValue(key, data[key]));
      })  
      .catch(e => {setError('apiError',{ message:'Virhe: ' + e })})
  };  

  function tallennaFetch(data) {
    console.log("tallennaFetch,csfrToken:",csrfToken.current)    
    console.log("data:",data)
    const formData = new FormData();
    Object.keys(data).forEach(key => formData.append(key, data[key]));
    //formData.append("csrf_token", '')
    fetch(urlTallenna,{
      method:'POST',
      headers: {"X-CSRFToken": csrfToken.current},
      credentials:'include',
      body:formData})
    .then(response => response.text())  
    .then(data => {
    console.log(`data palvelimelta:${data}`)
    if (data === 'OK') {
      setTallennusOK(true);
      } 
    else {
      setTallennusOK(false);
      const dataObj = JSON.parse(data)
      console.log("dataObj:",dataObj)
      /* Huom. Palvelinvirheissä on virhe:, lomakkeen validointivirheissä ei.*/
      if (dataObj.virhe?.includes('csrf'))
        setError('password2',{type: "palvelinvirhe",message:'csfr-virhe' })
      else {

        Object.entries(dataObj).map(([key,arvo]) =>           
        arvo.forEach(virhe => 
          setError(
            key,
            {type: "palvelinvirhe",
            message: virhe}
            )))
      
        //setError('password2',{type: "tunnusvirhe",message:'Tunnukset jo käytössä'})
        }
      }
  }).catch(e => {setError('apiError',{ message:e })})
}

/*
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
*/

  /*
  function tallenna(data) {
    console.log("data:",data)
    axios.post(urlTallenna,data)
      //.then(result => result.json())
      .then(result => {         
        if (result.status === 200 && result.data === "OK") {
          //setOk(true);
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
  */

  return (
    <Card>
    {/*<Logo src={logoImg} />*/}
    <Otsikko>Oma profiili</Otsikko>
    <Form>
    {tallennusOK && <div className="alert alert-success" role="alert">Profiili on tallennettu.</div>}  
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
    {errors.password2?.type === 'palvelinvirhe' && <Error>{errors.password2.message}</Error>} 
    <Button onClick={handleSubmit(data => tallennaFetch(data))}>Tallenna</Button>
    </Form>
  </Card>
  );
}

export default Profiili;