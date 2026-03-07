import "./login.scss";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState  } from "react";
import { useNavigate } from "react-router-dom";
import apiRequest from "../../lib/apiRequest";

function Login() {
  const [error,setError] = useState("")
  const [IsLoading, setIsLoading] = useState(false);

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
      username, password
    });

    localStorage.setItem("user", JSON.stringify(res.data));
  
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
          <h1>Welcome back</h1>
          <input name="username" required minLength={3} maxLength={20} min type="text" placeholder="Username" />
          <input name="password" required type="password" placeholder="Password" />
          {IsLoading? <button disabled>Loading</button> : <button >Login</button>}
          {error &&<span>{error}</span>}
          <Link to="/register">{"Don't"} you have an account?</Link>
        </form>
      </div>
      <div className="imgContainer">
        <img src="/bg.png" alt="" />
      </div>
    </div>
  );
}

export default Login;
