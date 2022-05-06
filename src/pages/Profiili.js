import React from "react";
import { Button } from "../components/AuthForm";
import { useAuth } from "../context/Auth";

function Profiili(props) {
  const { setAuthTokens } = useAuth();

  function logOut() {
    //alert('logOut');
    setAuthTokens();
  }

  return (
    <div>
      <div>Profiili</div>
      <Button onClick={logOut}>Log out</Button>
    </div>
  );
}

export default Profiili;