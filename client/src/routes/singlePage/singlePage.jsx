import "./singlePage.scss";
import Slider from "../../components/slider/Slider";
import Map from "../../components/map/Map";
import { singlePostData, userData } from "../../lib/dummydata";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import DOMPurify from "dompurify";
import { useContext, useState } from "react";
import {AuthContext,} from "../../context/AuthContext"
import apiRequest from "../../lib/apiRequest";
function SinglePage() {
  const data = useLoaderData();
  const post = data.res.data;
  const postUser = data.res1.data.userContact || data.res1.data; // Si no hay información de contacto, usar la información del usuario
  
  const postUserId= postUser.userId || postUser.id
  console.log(postUserId)
  const [saved,setSaved] = useState(post.isSaved)
  const navigate= useNavigate();
  const {currentUser} = useContext(AuthContext)
  const handleChat = async ()=>{
    const body={
      userIDs:[currentUser.id,postUserId],
      seenBy:[currentUser.id]
    }
    try{
      await apiRequest.post("/chats/",body)
      navigate("/profile")
    }catch(err){
      console.log(err)
    }
    
  }
  const handleSave=async()=>{
    // Usar optimistic hook si se actualiza despues de react 19
    setSaved((prev)=> !prev);

    if(!currentUser){
      navigate("/login")
    }
    try{
      console.log(post.isSaved)
      await apiRequest.post("/users/save",{postId: post.id})
    }catch(error){
      console.log(error)
      setSaved((prev)=> !prev)
    }
  }
  return (
    <div className="singlePage">
      <div className="details">
        <div className="wrapper">
          <Slider images={post.images} />
          <div className="info">
            <div className="top">
              <div className="post">
                <h1>{post.title}</h1>
                <div className="address">
                  <img src="/pin.png" alt="" />
                  <span>{post.address}, {post.city.replace(/\-/g, " ")}</span>
                </div>
                <div className="price">$ {post.price}</div>
              </div>
              <div className="user">
                <img src={post.user.avatar} alt="" />
                <span>{post.user.username}</span>
              </div>
            </div>
            <div className="bottom" dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(post.postDetail.desc)}}></div>
          </div>
        </div>
      </div>
      
      <div className="features">
        
        <div className="wrapper">
          <div className="contactModule">
            <p className="contactTitle">Contactar Vendedor</p>
            <div className="contactHeader">
              <img src={post.user.avatar || "/noavatar.png"} alt="Vendedor" />
              <span>{postUser.name}</span>
              
            </div>
            <span>Telefono: {postUser.phone || ""}</span>
            <span>Email: {postUser.emailc || ""}</span>
             <div className="contactActions">
              {postUser.whatsapp && (
                <button
                  onClick={() => window.open(`https://wa.me/${postUser.whatsapp}`, "_blank")}
                  type="button"
                >
                  <img src="/ws.png" alt="WhatsApp" />
                  <span>Whatsapp</span>
                </button>
              )}

              {postUser.facebook && (
                <button
                  onClick={() => window.open(`https://www.facebook.com/${postUser.facebook}`, "_blank")}
                  type="button"
                >
                  <img src="/fb.png" alt="Facebook" />
                  <span>Facebook</span>
                </button>
              )}

              {postUser.instagram && (
                <button
                  onClick={() => window.open(`https://www.instagram.com/${postUser.instagram}`, "_blank")}
                  type="button"
                >
                  <img src="/insta.png" alt="Instagram" />
                  <span>Instagram</span>
                </button>
              )}

              {postUser.website && (
                <button
                  onClick={() => window.open(`https://${postUser.website}`, "_blank")}
                  type="button"
                >
                  <img src="/web.png" alt="Sitio web" />
                  <span>Sitio Web</span>
                </button>
              )}
            </div>
          </div>
          <p className="title">General</p>
          <div className="listVertical">
            <div className="feature">
              <img src="/utility.png" alt="" />
              <div className="featureText">
                <span>Servicios</span>
                
                 <p>{post.postDetail.utilities} </p> 

                
              </div>
            </div>
            <div className="feature">
              <img src="/pet.png" alt="" />
              <div className="featureText">
                <span>Política de Mascotas</span>
                {
                  post.postDetail.pet === "Permitido"?
                  (<p>Permitido</p>):
                  (<p>Prohibido</p>)

                }
              </div>
            </div>
            <div className="feature">
              <img src="/fee.png" alt="" />
              <div className="featureText">
                <span>Politica de adelanto</span>
                <p>{post.postDetail.income}</p>
              </div>
            </div>
          </div>
          <p className="title">Dimensiones</p>
          <div className="sizes">
            <div className="size">
              <img src="/size.png" alt="" />
              <span>{post.postDetail.size}mts2</span>
            </div>
            <div className="size">
              <img src="/bed.png" alt="" />
              <span>{post.bedroom} habitaciones</span>
            </div>
            <div className="size">
              <img src="/bath.png" alt="" />
              <span>{post.bathroom} baños</span>
            </div>
          </div>
          <p className="title">Lugares Cercanos</p>
          <div className="listHorizontal">
            <div className="feature">
              <img src="/school.png" alt="" />
              <div className="featureText">
                <span>Escuela</span>
                <p>{post.postDetail.school > 999
                    ? post.postDetail.school / 1000 + "km"
                    : post.postDetail.school + "m"}{" "}
                  de distancia</p>
              </div>
            </div>
            <div className="feature">
              <img src="/pet.png" alt="" />
              <div className="featureText">
                <span>Parada de transporte</span>
                <p>{post.postDetail.bus}m de distancia</p>
              </div>
            </div>
            <div className="feature">
              <img src="/fee.png" alt="" />
              <div className="featureText">
                <span>Restaurantes</span>
                <p>{post.postDetail.restaurant}m de distancia</p>
              </div>
            </div>
          </div>
          <p className="title">Ubicación</p>
          <div className="mapContainer">
            <Map items={[post]} />
          </div>
          <div className="buttons">
           { (currentUser.id !== post.userId) && (
              <button onClick={handleChat}>
                <img src="/chat.png" alt="" />
                Enviar Mensaje
              </button>
            )}
            <button onClick={handleSave} 
              style={{
                backgroundColor: saved ? "#fece51":"white"
              }}
            >
              <img src="/save.png" alt="" />
              {saved? "Guardado":"Guardar publicación"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SinglePage;
