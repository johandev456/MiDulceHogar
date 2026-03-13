import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from "react-leaflet";
import { useEffect, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-control-geocoder/dist/Control.Geocoder.css";
import "leaflet-control-geocoder";

function SearchControl({ setCoords, setPosition }) {
  const map = useMap();

  useEffect(() => {
    const geocoder = L.Control.geocoder({
        defaultMarkGeocode: true,
        collapsed: false, // hace visible el input siempre
        placeholder: "Buscar direccion..."
        })
      .on("markgeocode", function (e) {
        const latlng = e.geocode.center;

        map.setView(latlng, 16);

        setCoords({
          latitude: latlng.lat,
          longitude: latlng.lng,
        });

        setPosition([latlng.lat, latlng.lng]);
      })
      .addTo(map);

    return () => map.removeControl(geocoder);
  }, [map]);

  return null;
}

function LocationMarker({ setCoords, position, setPosition }) {
  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;

      setPosition([lat, lng]);

      setCoords({
        latitude: lat,
        longitude: lng,
      });
    },
  });

  return position ? <Marker position={position} /> : null;
}

export default function LocationPicker({ setCoords }) {
  const [position, setPosition] = useState(null);

  return (
    <MapContainer
      center={[18.4861, -69.9312]}
      zoom={13}
      style={{ height: "300px", width: "100%" }}
    >
      <TileLayer
        attribution="&copy; OpenStreetMap"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <SearchControl setCoords={setCoords} setPosition={setPosition} />

      <LocationMarker
        setCoords={setCoords}
        position={position}
        setPosition={setPosition}
      />
    </MapContainer>
  );
}