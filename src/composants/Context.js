import React, { useState, createContext } from "react";
const AuthContext = createContext();
const AuthProvider = (props) => {
    const [tabRechercheChaussures, setTabRechercheChaussures] = useState([]);
    return (    
        <AuthContext.Provider value={[tabRechercheChaussures, setTabRechercheChaussures]}>      
            {props.children}
        </AuthContext.Provider>
    );
};
export { AuthContext, AuthProvider };