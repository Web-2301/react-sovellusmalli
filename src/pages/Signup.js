import React, { useState,useRef } from "react";
import { Link, Navigate } from 'react-router-dom';
import logoImg from "../img/omnia_logo.png";
import { Card, Logo, Form, Input, Button, Error } from '../components/AuthForm';
import { useForm } from "react-hook-form";
import axios from 'axios';

function Signup() {
  const [signedUp, setSignedUp] = useState(false);
  const [error, setError] = useState(false);
  const { register, handleSubmit, reset, watch, formState: { errors } } = useForm();
  const password = useRef({});
  password.current = watch("password", "");
  
  function postSignup(data) {
    console.log("data:",data)
    const url = "http://localhost:5000/reactapi/signup" 
    axios.post(url,{data})
      .then(result => {
      console.log(result.data)  
      if (result.status === 200 && result.data === "OK") {
        setSignedUp(true);
      } else {
        setError(true);
      }
    }).catch(e => {
      setError(true);
    });
  }
  
  if (signedUp) {
    return <Navigate to='/login'/>;
  }


  return (
    <Card>
      <Logo src={logoImg} />
      <Form>
      <Input 
        type="email" 
        placeholder="sähköpostiosoite"
        {...register("username", { required: true })}
      /> 
      {errors.username && <Error>Anna sähköpostiosoite</Error>} 
      <Input 
        type="password" 
        placeholder="salasana" 
        {...register("password", { required: true })}
      />
      {errors.password && <Error>Anna salasana</Error>} 
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