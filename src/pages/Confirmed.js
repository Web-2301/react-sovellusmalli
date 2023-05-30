/* Vahvistuslinkin saapumiskuittaus sähköpostiosoitteen aikaisemmasta 
   tai tuoreesta vahvistuksesta. */
import React from "react";
// import { Button } from "../components/AuthForm";
// import { useAuth } from "../context/Auth";

function Confirmed ({ location }) {
// const { setAuthTokens } = useAuth();
console.log("Rendering Confirmed")

let jo = location.search ? "jo " : ""
return (
    <div>
    <h2>Sähköpostiosoite on {jo}vahvistettu.</h2>
    <p>Voit sulkea tämän ikkunan.</p>
    </div>
    )
}

export default Confirmed;