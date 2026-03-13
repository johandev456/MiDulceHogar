import SearchBar from "../../components/searchBar/SearchBar";
import { AuthContext } from "../../context/AuthContext";

import { useContext } from "react";
import "./homePage.scss";
function HomePage() {

  const {currentUser} = useContext(AuthContext)

  console.log(currentUser)
  return (
    <div className="homePage">
      <div className="textContainer">
        <div className="wrapper">
          <h1 className="title">Encuentra Inmuebles y Obtén Tu Hogar Ideal</h1>
          <p>
            Explora nuestra amplia selección de propiedades en las mejores
            ubicaciones. Ya sea que busques comprar o rentar, tenemos la opción
            perfecta para ti. Tu hogar soñado está a solo un paso de distancia.
          </p>
          <SearchBar />
          <div className="boxes">
            <div className="box">
              <h1>16+</h1>
              <h2>Años de Experiencia</h2>
            </div>
            <div className="box">
              <h1>200</h1>
              <h2>Premios Obtenidos</h2>
            </div>
            <div className="box">
              <h1>2000+</h1>
              <h2>Propiedades Disponibles</h2>
            </div>
          </div>
        </div>
      </div>
      <div className="imgContainer">
        <img src="/bg.png" alt="" />
      </div>
    </div>
  );
}

export default HomePage;
