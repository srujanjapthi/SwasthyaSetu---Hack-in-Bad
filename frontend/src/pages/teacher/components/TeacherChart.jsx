import React from "react";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ChartContainer } from "@/components/ui/chart";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const TeacherChart = ({ theme }) => {
  // Chart configuration
  const chartConfig = {
    bmi: {
      label: "Class Average BMI",
      color: theme === "light" ? "#10b981" : "#10b981",
    },
    plank: {
      label: "Plank Time (seconds)",
      color: theme === "light" ? "#3b82f6" : "#3b82f6",
    },
    shuttle: {
      label: "Shuttle Run",
      color: theme === "light" ? "#10b981" : "#10b981",
    },
    squats: {
      label: "Squats",
      color: theme === "light" ? "#f59e0b" : "#f59e0b",
    },
    weight: {
      label: "Weight",
      color: theme === "light" ? "#8b5cf6" : "#8b5cf6",
    },
    height: {
      label: "Height",
      color: theme === "light" ? "#ec4899" : "#ec4899",
    },
  };

  // Sample data
  const weeklyHealthData = [
    { week: "Week 1", bmi: 18.5, plank: 45 },
    { week: "Week 2", bmi: 18.7, plank: 48 },
    { week: "Week 3", bmi: 18.6, plank: 50 },
    { week: "Week 4", bmi: 18.8, plank: 52 },
    { week: "Week 5", bmi: 18.9, plank: 55 },
    { week: "Week 6", bmi: 19.0, plank: 58 },
    { week: "Week 7", bmi: 19.1, plank: 60 },
    { week: "Week 8", bmi: 19.2, plank: 62 },
  ];

  const activityParticipationData = [
    { activity: "Shuttle Run", value: 12.5 },
    { activity: "Plank", value: 55 },
    { activity: "Squats", value: 30 },
    { activity: "Weight", value: 45 },
    { activity: "Height", value: 160 },
    { activity: "BMI", value: 18.5 },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      {/* Weekly Health Progress */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle
              className={theme === "light" ? "text-gray-900" : "text-white"}
            >
              Weekly Health Progress
            </CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <ChartContainer config={chartConfig}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={weeklyHealthData}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    opacity={0.3}
                    stroke={theme === "light" ? "#e5e7eb" : "#374151"}
                  />
                  <XAxis
                    dataKey="week"
                    stroke={theme === "light" ? "#6b7280" : "#9ca3af"}
                  />
                  <YAxis stroke={theme === "light" ? "#6b7280" : "#9ca3af"} />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="bmi"
                    stroke={chartConfig.bmi.color}
                    strokeWidth={2}
                    activeDot={{ r: 6 }}
                    dot={{ r: 4 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="plank"
                    stroke={chartConfig.plank.color}
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    activeDot={{ r: 6 }}
                    dot={{ r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </motion.div>

      {/* Activity Participation */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle
              className={theme === "light" ? "text-gray-900" : "text-white"}
            >
              Average Score
            </CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <ChartContainer config={chartConfig}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={activityParticipationData}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    opacity={0.3}
                    stroke={theme === "light" ? "#e5e7eb" : "#374151"}
                  />
                  <XAxis
                    dataKey="activity"
                    stroke={theme === "light" ? "#6b7280" : "#9ca3af"}
                  />
                  <YAxis stroke={theme === "light" ? "#6b7280" : "#9ca3af"} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="value" fill="#8884d8" radius={[4, 4, 0, 0]}>
                    {activityParticipationData.map((entry, index) => (
                      <Bar
                        key={`bar-${index}`}
                        dataKey="value"
                        fill={
                          Object.values(chartConfig)[
                            index % Object.values(chartConfig).length
                          ].color
                        }
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default TeacherChart;
