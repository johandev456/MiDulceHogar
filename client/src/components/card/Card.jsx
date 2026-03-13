import { Link, useNavigate } from "react-router-dom";
import "./card.scss";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import apiRequest from "../../lib/apiRequest";

function Card({ item ,prof}) {
    
    const [saved,setSaved] = useState(item.isSaved||false)
   
  

  const navigate= useNavigate();
  const {currentUser} = useContext(AuthContext)
  const handleDelete= async()=>{
      if(confirm("Seguro que quieres borrar esta publicación?")){
        await apiRequest.delete("/posts/"+item.id);
      navigate("/profile")
      }
      
  }
  const handleSave=async()=>{
    if(!currentUser){
      navigate("/login")
      return;
    }

    // Usar optimistic hook si se actualiza despues de react 19
    setSaved((prev)=> !prev);

    try{
      await apiRequest.post("/users/save",{postId: item.id})

    }catch(error){
      console.log(error)
      setSaved((prev)=> !prev)
    }
  }
  const handleMod= async()=>{
    navigate("/mod/"+item.id)
  }
  return (
    <div className="card">
      <Link to={`/${item.id}`} className="imageContainer">
        <img src={item.images[0]} alt="" />
      </Link>
      <div className="textContainer">
        <h2 className="title">
          <Link to={`/${item.id}`}>{item.title}</Link>
        </h2>
        <p className="address">
          <img src="/pin.png" alt="" />
          <span>{item.address}</span>
        </p>
        <p className="price">$ {item.price}</p>
        <div className="bottom">
          <div className="features">
            <div className="feature">
              <img src="/bed.png" alt="" />
              <span>{item.bedroom} habitación(es)</span>
            </div>
            <div className="feature">
              <img src="/bath.png" alt="" />
              <span>{item.bathroom} baño(s)</span>
            </div>
          </div>
          <div className="icons">
            <div onClick={handleSave} className="icon">
              
                <img  src={saved ? "/saved.png":"/save.png"} alt="" />
            </div>
            {prof && <div onClick={handleDelete} className="icon">
              
                <img  src="/del.png" alt="" />
            </div>}
            {prof && <div onClick={handleMod} className="icon">
              
                <img  src="/edit.png" alt="" />
            </div>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
