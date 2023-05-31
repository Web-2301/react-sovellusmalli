/* Vahvistuslinkin saapumiskuittaus sähköpostiosoitteen aikaisemmasta 
   tai tuoreesta vahvistuksesta. */
import React from "react";
import { useAuth } from "../context/Auth";


function Confirmed (props) {
const { authConfirm,setAuthConfirm } = useAuth();
console.log("Rendering Confirmed, window.location.search:",window.location.search)

/* ?jo=jo */
let jo = window.location.search ? "jo " : ""
if (!authConfirm) setAuthConfirm('CONFIRMED')

return (
    <div>
    <h2>Sähköpostiosoite on {jo}vahvistettu.</h2>
    <p>Voit sulkea tämän ikkunan.</p>
    </div>
    )
}

export default Confirmed;