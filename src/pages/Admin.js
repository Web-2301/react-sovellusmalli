import React from "react";
import { Button } from "../components/AuthForm";
import { useAuth } from "../context/Auth";

function Admin(props) {
  const { setAuthTokens } = useAuth();
  console.log("Renderin Admin")

  return (
    <div>
      <div>Admin Page</div>
    </div>
  );
}

export default Admin;