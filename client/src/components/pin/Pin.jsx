import { Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "./pin.scss";
import { Link } from "react-router-dom";

const bluePinSvg = encodeURIComponent(`
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <path fill="#2f80ed" d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
    <circle cx="12" cy="9" r="2.5" fill="#ffffff"/>
  </svg>
`);

const bluePinIcon = new L.Icon({
  iconUrl: `data:image/svg+xml;charset=UTF-8,${bluePinSvg}`,
  iconSize: [28, 42],
  iconAnchor: [14, 42],
  popupAnchor: [0, -36],
});

function Pin({ item }) {
  return (
    <Marker position={[item.latitude, item.longitude]} icon={bluePinIcon}>
      <Popup>
        <div className="popupContainer">
          <img src={item.images?.[0] || "/noavatar.png"} alt="" />
          <div className="textContainer">
            <Link to={`/${item.id}`}>{item.title}</Link>
            <span>{item.bedroom} bedroom</span>
            <b>$ {item.price}</b>
          </div>
        </div>
      </Popup>
    </Marker>
  );
}

export default Pin;
