import { useState } from "react";
import MainLayout from "../layout/MainLayout";
import AlertStats from "../components/AlertStats";
import AlertFilters from "../components/AlertFilters";
import AlertTable from "../components/AlertTable";
import AlertDetails from "../components/AlertDetails";
import { alerts as mockAlerts } from "../data/mockAlerts";
import "../styles/alerts.css";

export default function AlertsIncidents() {
  const [alerts, setAlerts] = useState(mockAlerts);
  const [selectedAlert, setSelectedAlert] = useState(null);

  return (
    <MainLayout>
      <div className="alerts-page">
        {/* 🔷 TOP STATS */}
        <AlertStats alerts={alerts} />

        {/* 🔷 FILTERS */}
        <AlertFilters />

        {/* 🔷 MAIN CONTENT */}
        <div className="alerts-content">
          <AlertTable
            alerts={alerts}
            onSelect={setSelectedAlert}
          />

          {selectedAlert && (
            <AlertDetails
              alert={selectedAlert}
              onClose={() => setSelectedAlert(null)}
            />
          )}
        </div>
      </div>
    </MainLayout>
  );
}

