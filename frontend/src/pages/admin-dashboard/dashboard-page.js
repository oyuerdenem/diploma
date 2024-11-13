import React from "react";
import MainLayout from "../../layout/main-layout/main-layout";
import Dashboard from "./dashboard";

export default function DashboardPage() {
  return (
    <MainLayout className="overflow-hidden h-screen">
      <Dashboard />
    </MainLayout>
  );
}
