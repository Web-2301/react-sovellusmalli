import React, { useState,useRef } from "react";
import { Link, Navigate } from 'react-router-dom';
// import logoImg from "../img/omnia_logo.png";
import { Card, Otsikko, Logo, Form, Input, Button, Error } from '../components/AuthForm';
import { useForm } from "react-hook-form";
import axios from 'axios';

function Signup() {
  const [signedUp, setSignedUp] = useState(false);
  // const { register, handleSubmit, reset, watch, formState: { errors } } = useForm({reValidateMode: 'onBlur'});
  const { register, handleSubmit, setError, reset, watch, formState: { errors } } = useForm();
  const password = useRef({});
  password.current = watch("password", "");
  
  function postSignup(data) {
    console.log("data:",data)
    const url = "http://localhost:5000/reactapi/signup" 
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
          pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
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
      <Button onClick={handleSubmit(data => postSignup(data))}>Tallenna</Button>
      </Form>
      <Link to="/login">Already have an account?</Link>
    </Card>
  );
}

export default Signup;