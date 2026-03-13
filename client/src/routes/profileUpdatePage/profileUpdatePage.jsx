import "./profileUpdatePage.scss";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";
import { useState } from "react";
import apiRequest from "../../lib/apiRequest"
import { useNavigate } from "react-router-dom";
import UploadWidget from "../../components/uploadWidget/uploadWidget";

function ProfileUpdatePage() {
  const {updateUser,currentUser} =useContext(AuthContext);
  const [error,setError]= useState("");
  const [avatar,setAvatar]=useState([])
  

  const navigate = useNavigate()

  const handleSubmit = async (e)=>{
    e.preventDefault()
    const formData = new FormData(e.target)
    const {username, email,password} = Object.fromEntries(formData)

    try{
      const res= await apiRequest.put(`/users/${currentUser.id}`,{username,email,password,avatar:avatar[0]})
      updateUser(res.data);
      navigate("/profile")
    }catch(error){
      console.log(error)
      setError(error.response.data.message)
    }
  }
  
  return (
    <div className="profileUpdatePage">
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <h1>Actualizar Perfil</h1>
          <div className="item">
            <label htmlFor="username">Usuario</label>
            <input
              id="username"
              name="username"
              type="text"
              defaultValue={currentUser.username}
            />
          </div>
          <div className="item">
            <label htmlFor="email">Correo electrónico</label>
            <input
              id="email"
              name="email"
              type="email"
              defaultValue={currentUser.email}
            />
          </div>
          <div className="item">
            <label htmlFor="password">Contraseña</label>
            <input id="password" name="password" type="password" />
          </div>
          
          <button>Actualizar</button>
          {error && <span>{error}</span>}
        </form>
      </div>
      <div className="sideContainer">
        <img src={avatar[0] || currentUser.avatar|| "/noavatar.png"} alt="" className="avatar" />
        <UploadWidget uwConfig={{
          cloudName:"midulcehogar",
          uploadPreset:"Midulcehogar",
          multiple:false,
          maxImageFileSize:2000000,
          folder:"avatars"
        }}
        setState ={setAvatar}
        />
      </div>
    </div>
  );
}

export default ProfileUpdatePage;
