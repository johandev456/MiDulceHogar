import "./profileUpdatePage.scss";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";
import { useState } from "react";
import apiRequest from "../../lib/apiRequest"
import { Navigate, useLoaderData, useNavigate } from "react-router-dom";
import UploadWidget from "../../components/uploadWidget/uploadWidget";

function ProfileUpdatePage() {
  const navigate = useNavigate()
  const data = useLoaderData();
  const {updateUser,currentUser} =useContext(AuthContext);
  if (!currentUser?.isAdmin && currentUser?.id !== data.id) {
    return <Navigate to="/profile" replace />;
  }
  
  
  const [error,setError]= useState("");
  const [avatar,setAvatar]=useState([])
   

  

  const handleSubmit = async (e)=>{
    e.preventDefault()
    const formData = new FormData(e.target)
    const {username, email,password} = Object.fromEntries(formData)

    try{
      
      const res= await apiRequest.put(`/users/${data.id}`,{username,email,password,avatar:avatar[0]})
      //Ponerle una condicion para que se actualize solo si es el mismo usuario si es admin no se actualiza el contexto porque no es su perfil
      if(!currentUser.isAdmin) updateUser(res.data);
      
      navigate("/profile/"+data.id)
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
              defaultValue={data.username}
            />
          </div>
          <div className="item">
            <label htmlFor="email">Correo electrónico</label>
            <input
              id="email"
              name="email"
              type="email"
              defaultValue={data.email}
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
        <img src={avatar[0] || data.avatar|| "/noavatar.png"} alt="" className="avatar" />
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
