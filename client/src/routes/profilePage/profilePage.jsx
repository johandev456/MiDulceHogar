import { Await, useLoaderData, useNavigate } from "react-router-dom";
import Chat from "../../components/chat/Chat";
import List from "../../components/list/List";
import apiRequest from "../../lib/apiRequest";
import "./profilePage.scss";
import { Suspense, useContext,useEffect, } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";

function ProfilePage() {
    const data = useLoaderData();
  const {currentUser, updateUser} = useContext(AuthContext);
  const navigate = useNavigate();
  
  console.log(data)


  const handleLogout = async ()=>{
    try{
      await apiRequest.post("/auth/logout");
      updateUser(null);
      navigate("/");
    }catch (error) {
      console.log(error);
    }
  }

  return (
 <div className="profilePage">
      <div className="details">
        <div className="wrapper">
          <div className="title">
            <h1>Información del Usuario</h1>
            <Link to="/profileUpdate">
              <button>Actualizar Perfil</button>
            </Link>
            
          </div>
          <div className="info">
            <span>
              Avatar:
              <img
                src={currentUser.avatar || "/noavatar.png"}
                alt=""
              />
            </span>
            <span>
              Usuario: <b>{currentUser.username}</b>
            </span>
            <span>
              Correo: <b>{currentUser.email}</b>
            </span>
            <button onClick={handleLogout}>Cerrar Sesión</button>
          </div>
          <div className="title">
            <h1>Mis Publicaciones</h1>
            <Link to="/add">
            <button>Crear Nueva Publicación</button>
            </Link>
            
            <Link to={"/userContact/"+currentUser.id}>
            <button>Información de contacto</button>
            </Link>
            
          </div>
          <Suspense fallback={<p>Cargando...</p>}>
    <Await
          resolve={data.postResponse}
          errorElement={
            <p>Error cargando propiedades!</p>
          }
        >
          {(postResponse) => <List prof={true} posts={postResponse.data.userPosts}/>}
        </Await>
        </Suspense>

          
          <div className="title">
            <h1>Lista Guardada</h1>
          </div>
          <Suspense fallback={<p>Cargando...</p>}>
    <Await
          resolve={data.postResponse}
          errorElement={
            <p>Error cargando propiedades!</p>
          }
        >
          {(postResponse) => <List prof={false}  posts={postResponse.data.savedPosts}/>}
        </Await>
        </Suspense>
        </div>
      </div>
      <div className="chatContainer">
        <div className="wrapper">
          <Suspense fallback={<p>Cargando...</p>}>
    <Await
          resolve={data.chatResponse}
          errorElement={
            <p>Error cargando chats!</p>
          }
        >
          {(chatResponse) =><Chat chats={chatResponse.data}/>}
        </Await>
        </Suspense>
          
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
