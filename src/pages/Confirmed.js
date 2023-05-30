/* Vahvistuslinkin saapumiskuittaus sähköpostiosoitteen aikaisemmasta vahvistuksesta. */
import React from "react";
// import { Button } from "../components/AuthForm";
// import { useAuth } from "../context/Auth";

function Confirmed(props) {
// const { setAuthTokens } = useAuth();
console.log("Rendering Confirmed")

return (
    <div>
    <h2>Sähköpostiosoite on jo vahvistettu.</h2>
    <p>Voit sulkea tämän ikkunan.</p>
    </div>
    )
}

export default Confirmed;