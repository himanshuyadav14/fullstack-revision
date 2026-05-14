import { lazy, default as React } from "react";
import { SectionWrapper } from "../components/SectionWrapper";

const Analytics = lazy(() => import("../components/Analytics"));
const Revenue = lazy(() => import("../components/Revenue"));
const Users = lazy(() => import("../components/Users"));
const Activity = lazy(() => import("../components/Activity"));

function Dashboard() {
  return (
    <div style={{ padding: 20 }}>
      <h2>Dashboard</h2>

      <SectionWrapper Component={Analytics} />
      <SectionWrapper Component={Revenue} />
      <SectionWrapper Component={Users} />
      <SectionWrapper Component={Activity} />
    </div>
  );
}

export default Dashboard;
