/* Vahvistuslinkin saapumiskuittaus sähköpostiosoitteen aikaisemmasta 
   tai tuoreesta vahvistuksesta. */
import React from "react";
// import { Button } from "../components/AuthForm";
import { useAuth } from "../context/Auth";
const { authConfirm,setAuthConfirm } = useAuth();

function Confirmed ({ location }) {
// const { setAuthTokens } = useAuth();
console.log("Rendering Confirmed")

/* ?jo=jo */
let jo = location.search ? "jo " : ""
if (!authConfirm) setAuthConfirm('CONFIRMED')

return (
    <div>
    <h2>Sähköpostiosoite on {jo}vahvistettu.</h2>
    <p>Voit sulkea tämän ikkunan.</p>
    </div>
    )
}

export default Confirmed;