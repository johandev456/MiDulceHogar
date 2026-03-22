import "./layout.scss";
import Navbar from "../../components/navbar/Navbar"
import { Outlet } from "react-router-dom";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import Footer from "../../components/footer/Footer";

function Layout() {
  return (
    <div className="layout">
      <div className="navbar">
        <Navbar />
      </div>
      <div className="content">
        <Outlet/>
      </div>
      <Footer/>
    </div>
  );
}

function RequireAuth() {

  const {currentUser} = useContext(AuthContext)

  
  return (
    !currentUser ?(<Navigate to="/login" />) :
    (<div className="layout">
      <div className="navbar">
        <Navbar />
      </div>
      <div className="content">
        <Outlet/>
      </div>
      <Footer/>
    </div>)
  );
}
function RequireAdminAuth() {

  const {currentUser} = useContext(AuthContext)

  
  return (
    !currentUser?.isAdmin ?(<Navigate to="/" />) :
    (<div className="layout">
      <div className="navbar">
        <Navbar />
      </div>
      <div className="content">
        <Outlet/>
      </div>
      <Footer/>
    </div>)
  );
}



export {Layout, RequireAuth, RequireAdminAuth};
