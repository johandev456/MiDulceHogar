import { useEffect } from "react";
import { useState } from "react";
import {createContext} from "react";

export const AuthContext=createContext();

export const AuthContextProvider = ({children})=>{
    const [currentUser, setCurrent] = useState(
        JSON.parse(localStorage.getItem("user")) || null
    );

    const updateUser = (data)=>{
        setCurrent(data);
    }
    useEffect(()=>{
        localStorage.setItem("user",JSON.stringify(currentUser))
    },[currentUser])
    return (
        <AuthContext.Provider value={{currentUser,updateUser}}>
            {children}
            </AuthContext.Provider>
    )
}
