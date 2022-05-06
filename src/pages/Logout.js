import React from "react";
import { Button } from "../components/AuthForm";
import { useAuth } from "../context/Auth";

function Admin(props) {
  const { setAuthTokens } = useAuth();

  function logOut() {
    //alert('logOut');
    setAuthTokens();
  }

  return (
    <div>
      <div>Admin Page</div>
      <Button onClick={logOut}>Log out</Button>
    </div>
  );
}

export default Admin;