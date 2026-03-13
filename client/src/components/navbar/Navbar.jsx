import { useState } from "react";
import "./navbar.scss";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

import { useContext } from "react";
import { useNotificationStore } from "../../lib/notificationStore";
function Navbar() {
  const [open, setOpen] = useState(false);
  const {currentUser} = useContext(AuthContext)
  const fetch = useNotificationStore(state=>state.fetch)
  const number = useNotificationStore(state=>state.number)
  
  if(currentUser) fetch()
  return (
    <nav>
      <div className="left">
        <a href="/" className="logo">
          <img src="/logocortado.png" alt="" />
          <span>Mi Dulce Hogar</span>
        </a>
        <a href="/">Inicio</a>
        <Link to={"/list"}><a href="/">Propiedades</a></Link>
     
        <a href="/">Acerca de</a>
        <a href="/">Contacto</a>
       
      </div>
      <div className="right">
        {currentUser ? (
          <div className="user">
            <img
              src={currentUser.avatar || "/noavatar.png"}
              alt=""
            />
            <span>{currentUser.username}</span>
            <Link to="/profile" className="profile">
              {number > 0 && <div className="notification">{number}</div>}
              <span>Perfil</span>
            </Link>
          </div>
        ) : (
          <>
            <a href="/login">Iniciar sesión</a>
            <a href="/register" className="registernav">Registrarse</a>
          </>
        )}
        <div className="menuIcon">
          <img
            src="/menu.png"
            alt=""
            onClick={() => setOpen((prev) => !prev)}
          />
        </div>
        <div className={open ? "menu active" : "menu"}>
          <a href="/">Inicio</a>
          <a href="/">Acerca de</a>
          <a href="/">Contacto</a>
          <a href="/">Agentes</a>
          <a href="/login">Iniciar sesión</a>
          <a href="/register">Registrarse</a>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
