import React, { useState, createContext } from "react";
const AuthContext = createContext();
const AuthProvider = (props) => {
    const [idConnexion, setIdConnexion] = useState({});
    return (    
        <AuthContext.Provider value={[idConnexion, setIdConnexion]}>      
            {props.children}
        </AuthContext.Provider>
    );
};
export { AuthContext, AuthProvider };