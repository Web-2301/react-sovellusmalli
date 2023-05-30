/* Suojatulle sivulle yrityksestä vahvistamattomalle käyttäjälle mahdollisuus 
   sähköpostiosoitevahvistuslinkin uudelleen lähetykseen. */
import React from "react";
import { Link } from "react-router-dom";
// import { Button } from "../components/AuthForm";
// import { useAuth } from "../context/Auth";

function Unconfirmed(props) {
// const { setAuthTokens } = useAuth();
console.log("Rendering Unconfirmed")

return (
    <div className="page-header">
    <h1>Hello!</h1>
    <h3>You have not confirmed your account yet.</h3>
    <p>
        Before you can access this site you need to confirm your account.
        Check your inbox, you should have received an email with a confirmation link.
    </p>
    <p>
        Need another confirmation email?
    </p>    
    <Link to="/confirm">Lähetä uusi sähköpostiosoitteen vahvistuslinkki</Link>
    
</div>
)
}

export default Unconfirmed;