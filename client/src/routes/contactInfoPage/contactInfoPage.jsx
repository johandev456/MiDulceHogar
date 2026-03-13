import "./contactInfoPage.scss";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";
import { useState } from "react";
import apiRequest from "../../lib/apiRequest"
import { useLoaderData, useNavigate } from "react-router-dom";
import UploadWidget from "../../components/uploadWidget/uploadWidget";

function ContactInfoPage() {
const {currentUser} =useContext(AuthContext);
  const userdata = useLoaderData();
  
  const [contactinfo,setContactInfo]=useState({userContact: userdata || ""});
  console.log(contactinfo)
  const [error,setError]= useState("");
  
  

  const navigate = useNavigate()
  
  const handleSubmit = async (e)=>{
    e.preventDefault()
    const formData = new FormData(e.target)
    const data = Object.fromEntries(formData)

    try{
      const res= await apiRequest.put(`/users/${currentUser.id}`, {data, contact:true})
      // updateUser(res.data);
      navigate(`/userContact/${currentUser.id}`)
    }catch(error){
      console.log(error)
      setError(error.response.data.message)
    }
  }
  
  return (
    <div className="profileUpdatePage">
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <h1>Actualizar información de contacto</h1>
          <div className="item">
            <label htmlFor="name">Nombre Completo</label>
            <input
              required
              id="name"
              name="name"
              type="text"
              defaultValue={contactinfo.userContact?.name}
            />
          </div>
          <div className="item">
            <label htmlFor="email">Correo electrónico Comercial</label>
            <input
              required
              id="emailc"
              name="emailc"
              type="email"
              defaultValue={contactinfo.userContact?.emailc}
            />
          </div>
          <div className="item">
            <label htmlFor="name">Whatsapp</label>
            <input
              id="whatsapp"
              name="whatsapp"
              type="text"
              defaultValue={contactinfo.userContact?.whatsapp}
            />
          </div>
          <div className="item">
            <label htmlFor="name">Instagram</label>
            <input
              id="instagram"
              name="instagram"
              type="text"
              defaultValue={contactinfo.userContact?.instagram}
            />
          </div>
          <div className="item">
            <label htmlFor="name">Facebook</label>
            <input
              id="facebook"
              name="facebook"
              type="text"
              defaultValue={contactinfo.userContact?.facebook}
            />
          </div>
          <div className="item">
            <label htmlFor="name">Sitio Web</label>
            <input
              id="website"
              name="website"
              type="text"
              defaultValue={contactinfo.userContact?.website}
            />
          </div>
          
          
          <button>Actualizar</button>
          {error && <span>{error}</span>}
        </form>
      </div>
      
    </div>
  );
}

export default ContactInfoPage;
