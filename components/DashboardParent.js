import React from "react";

import Dashboard from "./Dashboard";
import { apiClient } from "@/app/api";

export default async function DashboardParent({
  detailsBit,
  setDetailsBit,
  session,
}) {
  const id = session?.user?.email;
  const token = session?.user?.token;
  let data;
  try {
    const response = await apiClient(
      `${process.env.NEXT_PUBLIC_API_URL}/api/Dashboard/GetBatchDetails?providerID=${id}`,
      {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`, // Fixed spacing
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    data = await response.json();
  } catch (error) {
    console.error("Failed to fetch data:", error);
    return <div>Error fetching data</div>;
  }

  return (
    <Dashboard
      setDetailsBit={setDetailsBit}
      detailsBit={detailsBit}
      data={data}
    />
  );
}
