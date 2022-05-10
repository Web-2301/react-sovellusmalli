import React, { useState } from "react";
import { Link, Navigate, useLocation } from "react-router-dom";
import axios from 'axios';
import logoImg from "../img/omnia_logo.png";
import { Card, Otsikko, Logo, Form, Input, Button, Error } from "../components/AuthForm";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/Auth";

function Login(props) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [isError, setIsError] = useState(false);
  const { setAuthTokens } = useAuth();
  const { register, handleSubmit, setError, reset, watch, formState: { errors } } = useForm();
 
  /* var referer = '/';
   if (props && props.location.state){
     referer = props.location.state.referer || '/';
  }  */
   
  const { state } = useLocation()
  /* if (state) {
    console.log("Login,state:",state)
    alert(state.location.pathname)
    } */
 

  function postLogin(data) {
      axios.post("http://localhost:5000/reactapi/signin",data).then(result => {
      console.log(`result.status:${result.status}`)
      if (result.status === 200 && result.data == 'OK') {
        console.log('post result:',result.data)
        setAuthTokens(result.data);
        setLoggedIn(true);
      } else {
          setError(
          'password',
          {type: "palvelinvirhe"}
          )
      }
    }).catch(e => {setError('apiError',{ message:e })})
  }

  if (loggedIn) {
    const referer = state?.location.pathname || '/' 
    //alert(`loggedIn:${loggedIn},referer:${referer}`)
    return <Navigate to={referer} />;
  }

  return (
    <Card>
      {/*<Logo src={logoImg} />*/}
      <Otsikko>Kirjautuminen</Otsikko>
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
      <Input 
        type="password" 
        placeholder="salasana" 
        {...register("password", { 
          required: true
         })}
      />
      {errors.password?.type === 'required' && <Error>Anna salasana</Error>} 
      {errors.password?.type === 'palvelinvirhe' && <Error>Väärä käyttäjätunnus tai salasana!</Error> }
      <Button onClick={handleSubmit(data => postLogin(data))}>Kirjaudu</Button>
      </Form>
      <Link to="/signup">Et ole rekisteröitynyt vielä?</Link>
     
    </Card>
  );
}

export default Login;