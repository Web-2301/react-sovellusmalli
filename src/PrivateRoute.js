import React from "react";
import { Navigate,useLocation } from "react-router-dom";
import { useAuth } from "./context/Auth";

const Private = ({ children }) => {
    const { authTokens } = useAuth();
    const location = useLocation();
    console.log("Private,authTokens:",authTokens)
    return authTokens ? children : <Navigate to="/login" state={{ location }} replace={true}/>;
    }

export default Private;