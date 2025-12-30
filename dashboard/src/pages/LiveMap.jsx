import { useEffect, useState } from "react";
import MainLayout from "../layout/MainLayout";
import MapView from "../components/MapView";
import api from "../api/apiClient";

export default function LiveMap() {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    fetchAlerts();
  }, []);

  const fetchAlerts = async () => {
    const res = await api.get("/alerts");
    setAlerts(res.data);
  };

  return (
    <MainLayout>
      <MapView alerts={alerts} />
    </MainLayout>
  );
}
