import { useState } from "react";
import "./filter.scss";
import { useSearchParams } from "react-router-dom";
import Citys from "../Citys/Citys";

function Filter() {
  const [searchParams, setSearchParams]=useSearchParams()
  const [cityf,setCityf]=useState(searchParams.get("city") || "")
  const [query,setQuery]= useState({
    type:searchParams.get("type") || "",
    city:searchParams.get("city") || "",
    min:searchParams.get("minPrice") || 1,
    max:searchParams.get("maxPrice") || 20000000000,
    bedroom: searchParams.get("bedroom")|| 0,
    property: searchParams.get("property")|| "apartment"
  })

  const handleChange = e =>{
    setQuery((prev) => ({
      ...prev,
      city: cityf,
      [e.target.name]: e.target.value,
    }))
  }

  const handleCitySelect = (city) => {
    setCityf(city)
    setQuery((prev) => ({
      ...prev,
      city,
    }))
  }

  const handleFilter = ()=>{
    setSearchParams({ ...query, city: cityf });
  }
  console.log(searchParams.get("city"))

  return (
    <div className="filter">
             { searchParams.get("city")? <><h1>Resultados para  <b>{query.city.replace(/\-/g," ")}</b></h1></>:""}

      <div className="top">
        <div className="item">
          <label htmlFor="city">Ubicación</label>
          
          <Citys value={cityf} onSelect={handleCitySelect} />
        </div>
      </div>
      <div className="bottom">
        <div className="item">
          <label htmlFor="type">Tipo</label>
          <select name="type" id="type" onChange={handleChange} defaultValue={query.type}>
            <option value="">cualquiera</option>
            <option value="venta">Comprar</option>
            <option value="renta">Rentar</option>
          </select>
        </div>
        <div className="item">
          <label htmlFor="property">Propiedad</label>
          <select name="property" id="property" onChange={handleChange} defaultValue={query.property}>
            <option value="">cualquiera</option>
            <option value="apartment">Apartmento</option>
            <option value="house">Casa</option>
            <option value="condo">Condo</option>
            <option value="land">Terreno</option>
          </select>
        </div>
        <div className="item">
          <label htmlFor="minPrice">Precio Mínimo</label>
          <input
            type="number"
            id="minPrice"
            name="minPrice"
            placeholder="cualquiera"
            onChange={handleChange}
            defaultValue={query.min}
          />
        </div>
        <div className="item">
          <label htmlFor="maxPrice">Precio Máximo</label>
          <input
            type="text"
            id="maxPrice"
            name="maxPrice"
            placeholder="cualquiera"
            onChange={handleChange}
            defaultValue={query.max}
          />
        </div>
        <div className="item">
          <label htmlFor="bedroom">Habitaciones</label>
          <input
            type="text"
            id="bedroom"
            name="bedroom"
            placeholder="cualquiera"
            onChange={handleChange}
            defaultValue={query.bedroom}
          />
        </div>
        <button onClick={handleFilter}>
          <img src="/search.png" alt="" />
        </button>
      </div>
    </div>
  );
}

export default Filter;
