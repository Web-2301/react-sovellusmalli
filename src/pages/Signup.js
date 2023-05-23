import React, { useState,useRef,useEffect } from "react";
import { Link, Navigate } from 'react-router-dom';
// import logoImg from "../img/omnia_logo.png";
import { Card, Otsikko, Logo, Form, Input, Button, Error } from '../components/AuthForm';
import { useForm } from "react-hook-form";
import { baseUrl,csrfFetch } from '../connections/yhteydet';

// import axios from 'axios';


function Signup() {
  const [signedUp, setSignedUp] = useState(false);
  // const { register, handleSubmit, reset, watch, formState: { errors } } = useForm({reValidateMode: 'onBlur'});
  const { register, handleSubmit, setError, reset, watch, formState: { errors } } = useForm();
  const password = useRef({});
  password.current = watch("password", "");
  const csrfToken = useRef('');
  // const baseUrl = "http://localhost:5000/reactapi/"
  // const csrfUrl = baseUrl + 'getcsrf'
  const signupUrl = baseUrl + "/signup"
  console.log("Signup renderöidään...")

  const csrf = () => {
    csrfFetch()
    .then((response) => {
      //response.headers.forEach((v,i) => console.log(i));
      //console.log(...response.headers);
      csrfToken.current = response.headers.get("X-CSRFToken");
    })
    .catch((err) => {
      console.log(err);
    });
  }
  
useEffect(() => {
    console.log(`useEffect`)
    csrf()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

console.log('Signup,csrfToken:',csrfToken.current);

  /*function postSignup(data) {
    console.log("data:",data)
    axios.post(url,data)
      //.then(result => result.json())
      .then(result => {         
        if (result.status === 200 && result.data === "OK") {
          setSignedUp(true);
        } else {
          //let x = Object.entries(result.data) 
          //console.log('virheellinen tulos:',x)  
                      
          Object.entries(result.data).map(([key,arvo]) =>           
          setError(
            key,
            {type: "palvelinvirhe",
            message: arvo}
            ))
        }
    }).catch(e => {setError('apiError',{ message:e })})
  }*/
  
function fetchSignup(data) {
    console.log("fetchSignup,csfrToken:",csrfToken.current)    
    console.log("data:",data)
    const formData = new FormData();
    Object.keys(data).forEach(key => formData.append(key, data[key]));
    //formData.append("csrf_token", '')
    fetch(signupUrl,{
      method:'POST',
      headers: {"X-CSRFToken": csrfToken.current},
      credentials:'include',
      body:formData})
    .then(response => response.text())  
    .then(data => {
    console.log(`data palvelimelta:${data}`)
    if (data === 'OK') {
      setSignedUp(true);
      } 
    else {
      const dataObj = JSON.parse(data)
      console.log("dataObj:",dataObj)
      /* Huom. Palvelinvirheissä on virhe:, lomakkeen validointivirheissä ei.*/
      if (dataObj.virhe?.includes('csrf'))
        setError('password2',{type: "palvelinvirhe",message:'csfr-virhe' })
      else 
        setError('password2',{type: "tunnusvirhe",message:'Tunnukset ovat jo käytössä'})
      }
  }).catch(e => {setError('apiError',{ message:e })})
}

if (signedUp) {
    return <Navigate to='/login'/>;
  }

return (
    <Card>
      {/*<Logo src={logoImg} />*/}
      <Otsikko>Rekisteröityminen</Otsikko>
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
      {errors.username?.type === 'required' && <Error>Anna sähköpostiosoite</Error>} 
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
      {errors.password2?.type === 'tunnusvirhe' && <Error>{errors.password2.message}</Error>} 

      <Button onClick={handleSubmit(data => fetchSignup(data))}>Tallenna</Button>
      </Form>
      <Link to="/login">Already have an account?</Link>
    </Card>
  );
}

export default Signup;