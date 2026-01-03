import MainLayout from "../layout/MainLayout";
import StatCard from "../components/StatCard";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const incidentData = [
  { day: "Mon", incidents: 2 },
  { day: "Tue", incidents: 4 },
  { day: "Wed", incidents: 1 },
  { day: "Thu", incidents: 5 },
  { day: "Fri", incidents: 3 },
];

const alertData = [
  { name: "Panic", value: 3 },
  { name: "Geo-fence", value: 2 },
  { name: "Inactivity", value: 1 },
];

const COLORS = ["#ff4d4f", "#faad14", "#1890ff"];

export default function Dashboard() {
  return (
    <MainLayout>
      <div style={styles.container}>
        <h1 style={styles.heading}>Dashboard Overview</h1>

        {/* 🔹 STAT CARDS */}
        <div style={styles.grid}>
          <StatCard title="Active Tourists" value="128" subtitle="Currently tracked" />
          <StatCard title="Ongoing Alerts" value="5" subtitle="Need attention" />
          <StatCard title="High-Risk Zones" value="3" subtitle="Sensitive areas" />
          <StatCard title="Today’s Incidents" value="2" subtitle="Reported today" />
        </div>

        {/* 🔹 CHARTS */}
        <div style={styles.chartGrid}>
          {/* Line Chart */}
          <div style={styles.chartCard}>
            <h3 style={styles.chartTitle}>Incidents This Week</h3>
            <ResponsiveContainer width="100%" height={260}>
              <LineChart data={incidentData}>
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="incidents"
                  stroke="#1e90ff"
                  strokeWidth={3}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Pie Chart */}
          <div style={styles.chartCard}>
            <h3 style={styles.chartTitle}>Alert Types</h3>
            <ResponsiveContainer width="100%" height={260}>
              <PieChart>
                <Pie
                  data={alertData}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={90}
                  label
                >
                  {alertData.map((_, index) => (
                    <Cell key={index} fill={COLORS[index]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

/* ================= STYLES ================= */

const styles = {
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "0 32px",
  },

  heading: {
    fontSize: "36px",
    fontWeight: "700",
    marginBottom: "40px",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, minmax(280px, 1fr))",
    gap: "24px",
    marginBottom: "36px",
  },

  chartGrid: {
    display: "grid",
    gridTemplateColumns: "1fr",
    gap: "32px",
  },

  chartCard: {
    background: "#ffffff",
    padding: "24px",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
  },

  chartTitle: {
    marginBottom: "16px",
    fontSize: "18px",
    fontWeight: "600",
  },
};
