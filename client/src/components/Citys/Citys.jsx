import { useState } from "react"


function Citys ({value,onSelect}){
    const citys=[
    {value:"Santo-Domingo",label:"Santo Domingo"},
    {value:"Santo-Domingo-Este",label:"Santo Domingo Este"},
    {value:"Santo-Domingo-Norte",label:"Santo Domingo Norte"},
    {value:"Santo-Domingo-Oeste",label:"Santo Domingo Oeste"},
    {value:"Punta-Cana",label:"Punta Cana"},
    {value:"Santiago",label:"Santiago"},
    
]
const handleChange =(e) =>{
    onSelect(e.target.value);
}
    return(
        <select className="citySelect" name="city" value={value} onChange={handleChange}>
      <option value="">Seleccione la ciudad</option>
      {citys.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
    )
}
export default Citys;