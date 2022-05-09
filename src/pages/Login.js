import React, { useState } from "react";
import { Link, Navigate, useLocation } from "react-router-dom";
import axios from 'axios';
import logoImg from "../img/omnia_logo.png";
import { Card, Otsikko, Logo, Form, Input, Button, Error } from "../components/AuthForm";
import { useAuth } from "../context/Auth";

function Login(props) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [isError, setIsError] = useState(false);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const { setAuthTokens } = useAuth();

  /* var referer = '/';
   if (props && props.location.state){
     referer = props.location.state.referer || '/';
  }  */
   
  const { state } = useLocation()
  /* if (state) {
    console.log("Login,state:",state)
    alert(state.location.pathname)
    } */
  const referer = (state) ? state.location.pathname : '/' 

  function postLogin() {
    let email = userName;
    axios.post("http://localhost:5000/reactapi/signin", {
      email,
      password
    }).then(result => {
      console.log(`result.status:${result.status}`)
      if (result.status === 200) {
        //alert(`post result:${result.data}`)
        setAuthTokens(result.data);
        setLoggedIn(true);
      } else {
        //alert(result.data)
        setIsError(true);
      }
    }).catch(e => {
      setIsError(true);
    });
  }

  if (loggedIn) {
    //alert(`loggedIn:${loggedIn},referer:${referer}`)
    return <Navigate to={referer} />;
  }

  return (
    <Card>
      {/*<Logo src={logoImg} />*/}
      <Otsikko>Kirjautuminen</Otsikko>
      <Form>
        <Input
          type="username"
          value={userName}
          onChange={e => {
            setUserName(e.target.value);
          }}
          placeholder="email"
        />
        <Input
          type="password"
          value={password}
          onChange={e => {
            setPassword(e.target.value);
          }}
          placeholder="password"
        />
        <Button onClick={postLogin}>Kirjaudu</Button>
      </Form>
      <Link to="/signup">Et ole rekisteröitynyt vielä?</Link>
      { isError && <Error>The username or password provided were incorrect!</Error> }
    </Card>
  );
}

export default Login;