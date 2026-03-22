import { Link, useLoaderData, useNavigate } from "react-router-dom";
import "./userCard.scss"
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import apiRequest from "../../lib/apiRequest";

function UserCard({ item }) {
    
    
   // Get isAdmin from localStorage

  

  
  const navigate= useNavigate();
  
  const {currentUser} = useContext(AuthContext)
 const handleDelete= async(id)=>{
      if(confirm("Seguro que quieres borrar este usuario?")){
        await apiRequest.delete("/users/"+id);
      navigate("/listUsers")
      }
      
  }
  const handleDetail = (id)=>{
    navigate("/profile/"+id)
  }
  const handleNewUser =()=>{
    navigate("/register")
  }
  return (
    <div className="Users">
       <div className="header"> <h1> Usuarios</h1>
        <button onClick={handleNewUser}>Crear Usuario</button></div>
        <div className="userCards">
            {item.map((user)=>(
                <div className="userCard" key={user.id}>
                  <img src={user.avatar|| "/noavatar.png"}/>
                  <div className="userInfo">
                    <h3>{user.username}</h3>
                    <p>{user.email}</p>
                  </div>
                  <div className="userActions">
                    <button onClick={() => handleDetail(user.id)}>Editar</button>
                    <button onClick={() => handleDelete(user.id)}>Borrar</button>
                    
                  </div>
                </div>
            ))
            }
        </div>
    </div>
  );
}



export default UserCard;
