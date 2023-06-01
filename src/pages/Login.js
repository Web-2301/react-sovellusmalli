import React, { useState,useEffect,useRef } from "react";
import { Link, Navigate, useLocation } from "react-router-dom";
// import axios from 'axios';
// import logoImg from "../img/omnia_logo.png";
import { Card, Otsikko, Form, Input, Button, Error } from "../components/AuthForm";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/Auth";
import { csrfUrl,loginFetch } from "../connections/yhteydet"

function Login(props) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [ilmoitus, setIlmoitus] = useState({});
  const { setAuthTokens,setAuthConfirm } = useAuth();
  const { register, handleSubmit, setError, formState: { errors } } = useForm();
 
  /* var referer = '/';
   if (props && props.location.state){
     referer = props.location.state.referer || '/';
  }  */
   
  const { state } = useLocation()
  
  let csrfToken = useRef('')

  useEffect(() => {
    console.log(`useEffect`)
    csrf()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

    
  const csrf = () => {
    console.log("csrf,csrfUrl:"+csrfUrl)
    fetch(csrfUrl, {credentials: "include"})
      .then((response) => {
        //response.headers.forEach((v,i) => console.log(i));
        //console.log(...response.headers);
        csrfToken.current = response.headers.get("X-CSRFToken");
        console.log('csrf,csrfToken:',csrfToken.current);
      })
      .catch((err) => {
        console.log(err);
        setError('apiError',{ message:String(err) })
      });
    }  

  function fetchLogin(data) {
      console.log("fetchLogin,csfrToken:",csrfToken.current)    
      console.log("fetchLogin,data:",data)
      const formData = new FormData();
      Object.keys(data).forEach(key => formData.append(key, data[key]));

      const searchParams = new URLSearchParams(window.location.search)
      const next = searchParams.get('next') 
      loginFetch(formData,csrfToken.current,next)
      .then(data => {
        const dataObj = JSON.parse(data)
        console.log(`fetchLogin,response data:`,dataObj)
        if (dataObj.ok) {
          setAuthTokens('OK');
          setLoggedIn(true);
          if (dataObj.confirmed) setAuthConfirm('CONFIRMED')
          else setAuthConfirm()  
          if (!!next && dataObj.message){
            console.log("next:",next,"dataObj:",dataObj)
            // setAuthConfirm('CONFIRMED')
            setIlmoitus(dataObj)
            }
          } 
        else {
          if (dataObj.virhe?.includes('csrf'))
            setError('password',{type: "palvelinvirhe"})
          else 
            setError('password',{type: "tunnusvirhe",message:dataObj.virhe})
          }})
      .catch(e => {
        //e: TypeError: Failed to fetch
        console.log('fetchLogin,e:',e)
        setError('apiError',{ message:String(e) })
      })
  }

 
  /*
  function axiosLogin(data) {
      axios.post("http://localhost:5000/reactapi/signin",data).then(result => {
      console.log(`result.status:${result.status}`)
      if (result.status === 200 && result.data === 'OK') {
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
  */
  console.log(`Login,message:${ilmoitus.message},loggedIn:${loggedIn}`)
  if (loggedIn && !ilmoitus.message) {
    const referer = state?.location.pathname || '/' 
    //alert(`loggedIn:${loggedIn},referer:${referer}`)
    console.log(`Login,referer:${referer}`)
    return <Navigate to={referer} />;
  }

  if (ilmoitus.ok === 'OK' && ilmoitus.message) return (
    <div>
    <h2>Rekisteröityminen onnistui.</h2>
    <p>{ilmoitus.message}</p>
    </div>
    )

  /* Huom. Tässä tarvitaan joko painike tai ohjaus vahvistussivulle */  
  if (ilmoitus.ok === 'Virhe') return (
    <div>
    <h2>Sähköpostiosoitteen vahvistaminen epäonnistui.</h2>
    <p>{ilmoitus.message}</p>
    </div>
    )    

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
          pattern: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
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
      {errors.password?.type === 'tunnusvirhe' && <Error>Väärä käyttäjätunnus tai salasana!</Error> }
      {errors.password?.type === 'palvelinvirhe' && <Error>Kirjautuminen epäonnistui!</Error> }
       <Button onClick={handleSubmit(data => fetchLogin(data))}>Kirjaudu</Button>
      </Form>
      <Link to="/signup">Et ole rekisteröitynyt vielä?</Link>    
    </Card>
  )
}

export default Login