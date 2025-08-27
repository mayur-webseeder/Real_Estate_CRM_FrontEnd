import React, { useEffect, useState } from "react";
import { LineChart, PieChart } from "@mui/x-charts";
import { Card, Typography, CircularProgress } from "@mui/material";
import { useSelector } from "react-redux";

export default function Analytics() {
  const followUpsAnalytic = useSelector(
    (state) => state.followups.followUpsAnalytic
  );
  const isFollowupsLoading = useSelector(
    (state) => state.followups.isFollowupsLoading
  );
  if (isFollowupsLoading)
    return (
      <div className="flex justify-center">
        <CircularProgress />
      </div>
    );

  return (
    <div className="">
      {/* Pie Chart for Status Distribution */}
      <Card style={{ marginBottom: 24, padding: 16 }}>
        <Typography variant="h6" gutterBottom>
          Follow-ups Status Distribution
        </Typography>
        <PieChart
          series={[
            {
              data: [
                {
                  id: 0,
                  value: followUpsAnalytic?.completed,
                  label: "Completed",
                },
                { id: 1, value: followUpsAnalytic?.pending, label: "Pending" },
                { id: 2, value: followUpsAnalytic?.overdue, label: "Overdue" },
              ],
              innerRadius: 60, // makes it a donut chart
              outerRadius: 120,
              paddingAngle: 4,
            },
          ]}
          height={300}
        />
      </Card>

      {/* Line Chart Trend */}
      <Card style={{ marginTop: 24, padding: 16 }}>
        <Typography variant="h6" gutterBottom>
          Follow-ups Trend (Last 7 days)
        </Typography>
        <LineChart
          dataset={followUpsAnalytic?.last7Days || []}
          xAxis={[{ scaleType: "point", dataKey: "_id" }]}
          series={[{ dataKey: "count", label: "Follow-ups" }]}
          height={300}
        />
      </Card>
    </div>
  );
}
