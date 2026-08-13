import { useContext } from "react";
import { createContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { AuthContext } from "./AuthContext";
export const SocketContext=createContext();

export const SocketContextProvider = ({children})=>{
    const {currentUser} = useContext(AuthContext)
    const [socket, setSocket] = useState(null);

    
    useEffect(()=>{
        const socketUrl = import.meta.env.VITE_SOCKET_URL || undefined;
        const socketInstance = io(socketUrl, {
            transports: ["websocket"],
        });

        setSocket(socketInstance);

        return () => {
            socketInstance.disconnect();
        };
    },[])

    useEffect(()=>{
        currentUser && socket?.emit("newUser",currentUser.id) //Le envia el usuario al servidor socket
    },[currentUser,socket ])

    return (
        <SocketContext.Provider value={{socket}}>
            {children}
            </SocketContext.Provider>
    )
}
