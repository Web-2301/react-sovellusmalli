/* Sähköpostiosoitevahvistuslinkin uudelleen lähetys */
import React, { useState,useEffect } from "react";
import { Navigate } from "react-router-dom";
import { confirmFetch } from "../connections/yhteydet"
// import { Button } from "../components/AuthForm";
import { useAuth } from "../context/Auth";

function Confirm(props) {
const { authTokens } = useAuth();
const [ilmoitus, setIlmoitus] = useState();
console.log("Rendering Confirm")

useEffect(() => {
    console.log(`Confirm,useEffect`)
    confirmFetch()
    .then(data => {
        const dataObj = JSON.parse(data)
        console.log(`confirmFetch,response data:`,dataObj)
        if (dataObj.ok) {
          setIlmoitus(dataObj.message);
          } 
         })
    }, [])


if (ilmoitus) return (
    <div>
    <h2>Sähköpostiosoitteen vahvistuspyyntö on lähetetty.</h2>
    <p>{ilmoitus}</p>
    </div>
    )    
}

export default Confirm;