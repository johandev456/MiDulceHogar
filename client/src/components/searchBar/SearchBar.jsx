import { useState } from "react";
import "./searchBar.scss";
import { Link } from "react-router-dom";
import Citys from "../Citys/Citys"
const types = ["compra", "renta"];
function SearchBar() {
  const[cityf,setCityf]=useState("")
  const [query, setQuery] = useState({
    type: "compra",
    location: "",
    minPrice: 0,
    maxPrice: 0,
  });

  const switchType = (val) => {
    setQuery((prev) => ({ ...prev, type: val }));
  };

  const handleChange= async (e)=>{
    
    setQuery((prev) => ({ ...prev, [e.target.name] :e.target.value }));
  };

  return (
    <div className="searchBar">
      <div className="type">
        {types.map((type) => (
          <button
            key={type}
            onClick={() => switchType(type)}
            className={query.type === type ? "active" : ""}
          >
            {type}
          </button>
        ))}
      </div>
      <form>
        <Citys value={cityf} onSelect={setCityf}/>
        <input
          type="number"
          name="minPrice"
          min={0}
          max={10000000}
          placeholder="Precio Mínimo"
          onChange={handleChange}
        />
        <input
          type="number"
          name="maxPrice"
          min={0}
          max={10000000}
          placeholder="Precio Máximo"
          onChange={handleChange}
        />
        <Link 

      to={`/list?type=${query.type==="compra"?"venta":"renta"}&city=${cityf }&minPrice=${query.minPrice||1}&maxPrice=${query.maxPrice || 200000000  }`}
>
        <button>
          <img src="/search.png" alt="" />
        </button>
        </Link>
        
      </form>
    </div>
  );
}

export default SearchBar;
