import React from "react";
import { Navigate,useLocation } from "react-router-dom";
import { useAuth } from "../context/Auth";

const Private = ({ children }) => {
    const { authTokens,authConfirm } = useAuth();
    const location = useLocation();
    console.log("Private,authTokens:",authTokens,"location:",location)
    /* Kirjautumatta mutta vahvistettu => login
       Kirjautumatta ei vahvistettu => vahvistussivulle kirjautumisen kautta
       Kirjautunut vahvistettu => sivulle
       Kirjautunut ei vahvistettu => vahvistussivulle 
    */
    const confirmPath = 
        location?.pathname === '/confirm' ||
        location?.pathname === '/unconfirmed'
    
    if (authTokens && authConfirm && !confirmPath) {
        /* Kirjautunut vahvistettu */
        return children
        }

    else if (authTokens && !authConfirm && confirmPath) {
        /* Kirjautuneena vahvistamaan, confirm ja unconfirmed ovat suojattuja */
        return children
        }    

    else if (authTokens && !authConfirm) {
        /* Kirjautunut ei-vahvistettu, unconfirmed vaatii kirjautumisen */
        //return <Navigate to="/unconfirmed" state={{ location }} replace={true}/>
        return <Navigate to="/unconfirmed" state={{ location }} replace={true}/>
     }
        
    else if (!authTokens) {
        /* Kirjautumisen kautta kohteeseen tai sen kautta edelleen vahvistussivulle.
           Huom. Jos viimeksi on oltu unconfirmed-sivulla, se säilyisi
           location-objektissa, vaikka sen jälkeen olisi poistuttu Poistu-painikkeesta,
           ellei tällöin setToken-funktiossa olisi tyhjennetty locationin state. */
          return <Navigate to="/login" state={{ location }} replace={true}/>
        }       
    }

export default Private;