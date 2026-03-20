import { Link, useLoaderData, useNavigate } from "react-router-dom";
import "./userCard.scss"
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import apiRequest from "../../lib/apiRequest";

function UserCard({ item }) {
    
    
   // Get isAdmin from localStorage

  console.log(item)

  
  const navigate= useNavigate();
  
  const {currentUser} = useContext(AuthContext)
 

  return (
    <div className="Users">
        <h1> Usuarios</h1>
        <div className="userCards">
            {item.map((user)=>(
                <div className="userCard" key={user.id}>
                  <img src={user.avatar|| "/noavatar.png"}/>
                  <div className="userInfo">
                    <h3>{user.username}</h3>
                    <p>{user.email}</p>
                  </div>
                </div>
            ))
            }
        </div>
    </div>
  );
}



export default UserCard;
