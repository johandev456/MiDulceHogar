import "./singlePage.scss";
import Slider from "../../components/slider/Slider";
import Map from "../../components/map/Map";
import { singlePostData, userData } from "../../lib/dummydata";
import { useLoaderData, useNavigate } from "react-router-dom";
import DOMPurify from "dompurify";
import { useContext, useState } from "react";
import {AuthContext,} from "../../context/AuthContext"
import apiRequest from "../../lib/apiRequest";
function SinglePage() {
  const post = useLoaderData();
  const [saved,setSaved] = useState(post.isSaved)
  const navigate= useNavigate();
  const {currentUser} = useContext(AuthContext)
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
          <p className="title">General</p>
          <div className="listVertical">
            <div className="feature">
              <img src="/utility.png" alt="" />
              <div className="featureText">
                <span>Servicios</span>
                {
                  post.postDetail.utilities === "owner"?
                  (<p>El propietario es responsable</p>):
                  (<p>El inquilino es responsable</p>)

                }
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
            <button>
              <img src="/chat.png" alt="" />
              Enviar Mensaje
            </button>
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
