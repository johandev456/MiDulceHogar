import { useContext, useState } from "react";
import "./chat.scss";
import { AuthContext } from "../../context/AuthContext";
import apiRequest from "../../lib/apiRequest";
import {format} from "timeago.js"
import { SocketContext } from "../../context/SocketContext";
import { useEffect } from "react";
import { useRef } from "react";
import { useNotificationStore } from "../../lib/notificationStore";
import { Navigate, useNavigate } from "react-router-dom";
function Chat({chats}) {
  const[chat,setChat]=useState(null)
  const {currentUser} =useContext(AuthContext);
  const {socket} = useContext(SocketContext);
  const messageEndRef = useRef()
  const navigate= useNavigate()
  const decrease = useNotificationStore(state=>state.decrease)
  useEffect(()=>{ //Se encarga de hacer scroll al ultimo mensaje.
      messageEndRef.current?.scrollIntoView({behavior:"smooth"});
    },[chat])
  const handleOpenChat = async (id,receiver)=>{
    

    
    try{
      const res = await apiRequest("/chats/"+id);
      if(!res.data.seenBy.includes(currentUser.id)){ // Cuando se abre el chat de un mensaje no visto se reduce la notifciacion de mensajes no vistos
        decrease()
      }
      setChat({...res.data, receiver})
    
  }catch(error){
    console.log(error)
  }
}
const handleDelete = async (chatIdf)=>{
  try{
   
    await apiRequest.delete("/chats/"+chatIdf)
    window.location.reload()
  }
  catch(err){
    console.log(err)
  }
}
const handleSubmit=async e=>{
  e.preventDefault();
  const formData = new FormData(e.target)
  const text=formData.get("text")
  if(!text) return;
  try{
    
    const addition = await apiRequest.post("/messages/"+chat.id,{text})
    setChat((prev)=>({...prev,messages:[...prev.messages, addition.data]}))
    e.target.reset()
    socket.emit("sendMessage",{
      receiverId: chat.receiver.id,
      data: addition.data,
    })
  }catch(error){

    console.log(error)
  }
  
}

useEffect(()=>{
  if(!socket || !chat?.id) return;

  const read = async ()=>{
    try{
      await apiRequest.put("/chats/read/"+chat.id)
    }catch(error){
      console.log(error)
    }
  }

  const handleGetMessage = (data)=>{
    if(chat.id === data.chatId){
      setChat(prev=>({...prev,messages:[...prev.messages,data]}))
      read()
    }
  }

  socket.on("getMessage", handleGetMessage)

  return ()=>{
    socket.off("getMessage", handleGetMessage)
  }
},[socket,chat?.id])

  return (
    <div className="chat">
      
      <div className="messages">
        <h1>Mensajes</h1>
        {
          chats.map(chatf=>(
            <>
            <button onClick={()=>handleDelete(chatf.id)} className="deleteButton">
                Borrar chat
                <img  src="/del.png" alt="" />
            </button>
            <div className="message" key={chatf.id} style={{
                backgroundColor: chatf.seenBy.includes(currentUser.id) || chat?.id === chatf.id ? "white" : "#5b6f904e",
              }}
              onClick={()=>handleOpenChat(chatf.id,chatf.receiver)}
              >
              
              <img
                src={chatf.receiver.avatar || "/noavatar.png"}
                alt=""
              />
              <span>{chatf.receiver.username}</span>
              <p>{chatf.lastMessage}</p>
              
            </div>
            </>
          ))
        }
        
      </div>
      {chat && (
        <div className="chatBox">
          <div className="top">
            <div className="user">
              <img
                src={chat.receiver.avatar || "noavatar.png"}
                alt=""
              />
              {chat.receiver.username}
            </div>
            <span className="close" onClick={()=>setChat(null)}>X</span>
          </div>
          <div className="center">
            {chat.messages.map(msg=> (
               <div className="chatMessage"
               style={{
                  alignSelf: msg.userId === currentUser.id ? "flex-end" : "flex-start",
                  textAlign: msg.userId === currentUser.id ? "right" : "left",}}
               >
              <p>{msg.text}</p>
              <span>{format(msg.createdAt)}</span>
            </div>
            ))}
            <div ref={messageEndRef}></div>
          </div>
          <form className="bottom" onSubmit={handleSubmit}>
            <textarea name="text"></textarea>
            <button>Enviar</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default Chat;
