import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix Leaflet marker issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

export default function MapView({ alerts, onSelect }) {
  return (
    <MapContainer
      center={[27.1767, 78.0081]}
      zoom={6}
      style={{ height: "100vh", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {alerts.map((alert) => (
        <Marker
          key={alert.id}
          position={[alert.latitude, alert.longitude]}
          eventHandlers={{
            click: () => onSelect(alert),
          }}
        >
          <Popup>
            <b>{alert.type}</b><br />
            Status: {alert.status}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
