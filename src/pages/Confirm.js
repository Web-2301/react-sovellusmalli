/* Sähköpostiosoitevahvistuslinkin uudelleen lähetys */
import React, { useState,useEffect } from "react";
import { useAuth } from "../context/Auth";
import { confirmFetch } from "../connections/yhteydet"

function Confirm(props) {
const { setAuthConfirm } = useAuth();    
const [ilmoitus, setIlmoitus] = useState();
console.log("Rendering Confirm")

useEffect(() => {
const handleStorageChange = event => {
    if (event.key === 'confirm') {
      setAuthConfirm(event.newValue)
      console.log('localStorage item confirm has changed:', event.newValue);
      }
    }
window.addEventListener('storage', handleStorageChange);
return () => window.removeEventListener('storage', handleStorageChange);
// eslint-disable-next-line react-hooks/exhaustive-deps
}, []);


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