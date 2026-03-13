import "./register.scss";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState  } from "react";
import { useNavigate } from "react-router-dom";
function Register() {
  const [error,setError] = useState("")
  const navigate = useNavigate();
  const [IsLoading, setIsLoading] = useState(false);
  const handleSubmit = async (e) =>{

    e.preventDefault()
    setIsLoading(true);
    setError("");
    const formData = new FormData(e.target);

    const username = formData.get("username");
    const email = formData.get("email");
    const password = formData.get("password");

    try
    {const res = await apiRequest.post("/auth/register",{
      username, email, password
    })
  
    navigate("/login");
  }
    catch (error) {
      console.log("Error during registration:", error);
      setError(error.response.data.message);
    }
    finally{
      setIsLoading(false);
    }
  }
  return (
    <div className="register">
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <h1>Crear una Cuenta</h1>
          <input name="username" type="text" placeholder="Usuario" />
          <input name="email" type="text" placeholder="Correo electrónico" />
          <input name="password" type="password" placeholder="Contraseña" />
          {IsLoading? <button disabled>Cargando...</button> : <button >Registrarse</button>}
          {error &&<span>{error}</span>}
          <Link to="/login">¿Ya tienes una cuenta?</Link>
        </form>
      </div>
      <div className="imgContainer">
        <img src="/bg.png" alt="" />
      </div>
    </div>
  );
}

export default Register;
