import "./loginAdmin.scss";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState  } from "react";
import { useNavigate } from "react-router-dom";
import apiRequest from "../../lib/apiRequest";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";


function LoginAdmin() {
  const [error,setError] = useState("")
  const [IsLoading, setIsLoading] = useState(false);
  const {updateUser} = useContext(AuthContext);
  const navigate = useNavigate();
  const handleSubmit = async (e) =>{

    e.preventDefault()
    setIsLoading(true);
    setError("");
    const formData = new FormData(e.target);

    const username = formData.get("username");
    const password = formData.get("password");

    try
    {const res = await apiRequest.post("/auth/login",{
      username, password, isAdmin:true
      
    });

  updateUser(res.data)
  
    navigate("/");
  }
    catch (error) {
      console.log("Error during registration:", error);
      setError(error.response.data.message);
    }finally{
      setIsLoading(false);
    }
  }
  return (
    <div className="login">
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <h1>Bienvenido Admin</h1>
          <input name="username" required minLength={3} maxLength={20} min type="text" placeholder="Usuario" />
          <input name="password" required type="password" placeholder="Contraseña" />
          {IsLoading? <button disabled>Cargando...</button> : <button >Iniciar Sesión</button>}
          {error &&<span>{error}</span>}
         
        </form>
      </div>
      <div className="imgContainer">
        <img src="/bg.png" alt="" />
      </div>
    </div>
  );
}

export default LoginAdmin;
