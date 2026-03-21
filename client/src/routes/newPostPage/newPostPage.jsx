import { useState } from "react";
import "./newPostPage.scss";
import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css"
import apiRequest from "../../lib/apiRequest";
import UploadWidget from "../../components/uploadWidget/uploadWidget";
import { useLoaderData, useNavigate } from "react-router-dom";
import LocationPicker from "../../components/locationPicker/locationPicker";
import Citys from "../../components/Citys/Citys";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

function NewPostPage() {
  
  const { currentUser } = useContext(AuthContext);
  let userId = currentUser.id;
  if(currentUser.isAdmin) {const data = useLoaderData();
    
    userId = data.id;}
  const [value,setValue] = useState(""); // Se toma la entrada de desc aparte porque se esta usando reactquill.
 const [error,setError]= useState("");
 const[cityf,setCityf]=useState("");
 const [images, setImages]=useState([]);
 const [coords,setCoords]= useState({
  latitude: "",
  longitude: ""
});
 const navigate = useNavigate();
  const handleSubmit = async (e)=>{
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const inputs= Object.fromEntries(formData);
    
    
    try{
      console.log(userId)
      const res = await apiRequest.post('/posts',{
       dataUser: {
        userId: userId
       },
       postData: {
        title: inputs.title,
        price: parseInt(inputs.price),
        address: inputs.address,
        city: cityf,
        bedroom: parseInt(inputs.bedroom),
        bathroom: parseInt(inputs.bathroom),
        type: inputs.type,
        property: inputs.property,
        latitude: String(coords.latitude),
        longitude: String(coords.longitude),
        images: images,
        

       },
       postDetail:{
        desc: value,//aqui esta su uso de lo que mencione mas arriba.
        utilities: inputs.utilities,
        pet: inputs.pet,
        income: inputs.income,
        size: parseInt(inputs.size),
        school: parseInt(inputs.school),
        bus: parseInt(inputs.bus),
        restaurant: parseInt (inputs. restaurant),
       }
      
      })
      // console.log(res.data.id)
      navigate("/userContact/"+userId)
    }catch(error){
      console.log(error)
      setError(error.response.data.message)
    }
  }

  return (
    <div className="newPostPage">
      <div className="formContainer">
        <h1>Agregar Nueva Publicación</h1>
        <div className="wrapper">
          <form onSubmit={handleSubmit}>
            <div className="item">
              <label htmlFor="title">Título</label>
              <input id="title" name="title" type="text" />
            </div>
            <div className="item">
              <label htmlFor="price">Precio</label>
              <input id="price" name="price" type="number" />
            </div>
            <div className="item">
              <label htmlFor="address">Dirección</label>
              <input id="address" name="address" type="text" />
            </div>
            <div className="item description">
              <label htmlFor="desc">Descripción</label>
              <ReactQuill theme="snow" onChange={setValue} value={value}/>
            </div>
            <div className="item">
              <label htmlFor="city">Ciudad</label>
              <Citys value={cityf} onSelect={setCityf} />
            </div>
            <div className="item">
              <label htmlFor="bedroom">Número de Habitaciones</label>
              <input min={1} id="bedroom" name="bedroom" type="number" />
            </div>
            <div className="item">
              <label htmlFor="bathroom">Número de Baños</label>
              <input min={1} id="bathroom" name="bathroom" type="number" />
            </div>
            <div className="item mapItem">
              <label>Seleccione la ubicacion de la propiedad</label>
              <LocationPicker setCoords={setCoords} />
            </div>
            
            <div className="item">
              <label htmlFor="type">Tipo</label>
              <select name="type">
                <option value="renta" defaultChecked>
                  Renta
                </option>
                <option value="venta">Venta</option>
              </select>
            </div>
            <div className="item">
              <label htmlFor="type">Propiedad</label>
              <select name="property">
                <option value="apartamento">Apartmento</option>
                <option value="casa">Casa</option>
                <option value="condo">Condo</option>
                <option value="terreno">Terreno</option>
              </select>
            </div>
            <div className="item">
              <label htmlFor="utilities">Política de Servicios</label>
              <select name="utilities">
                <option value="owner">El propietario es responsable</option>
                <option value="tenant">El inquilino es responsable</option>
                <option value="shared">Compartido</option>
              </select>
            </div>
            <div className="item">
              <label htmlFor="pet">Política de Mascotas</label>
              <select name="pet">
                <option value="allowed">Permitido</option>
                <option value="not-allowed">Prohibido</option>
              </select>
            </div>
            <div className="item">
              <label htmlFor="income">Política de Ingresos</label>
              <input
                id="income"
                name="income"
                type="text"
                placeholder="Política de ingresos"
              />
            </div>
            <div className="item">
              <label htmlFor="size">Total Size (mts2)</label>
              <input min={0} id="size" name="size" type="number" />
            </div>
            <div className="item">
              <label htmlFor="school">Escuela (metros)</label>
              <input min={0} id="school" name="school" type="number" />
            </div>
            <div className="item">
              <label htmlFor="bus">Transporte (metros)</label>
              <input min={0} id="bus" name="bus" type="number" />
            </div>
            <div className="item">
              <label htmlFor="restaurant">Restaurante (metros)</label>
              <input min={0} id="restaurant" name="restaurant" type="number" />
            </div>
            <button className="sendButton">Crear</button>
            {error && <span>{error}</span>}
          </form>
        </div>
      </div>
      <div className="sideContainer">
        {images.map((image,index)=>(
          <img src={image} key={index} alt="" />
        ))}
        <UploadWidget uwConfig={{
           cloudName:"midulcehogar",
          uploadPreset:"Midulcehogar",
          multiple:true,
          folder:"posts"
        }}
        setState={setImages}
        />
      </div>
    </div>
  );
}

export default NewPostPage;
