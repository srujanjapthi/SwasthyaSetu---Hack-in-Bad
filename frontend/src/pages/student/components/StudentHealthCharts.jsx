import React from "react";
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
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ChartContainer } from "@/components/ui/chart";
import { motion } from "framer-motion";

const sampleData = [
  {
    date: "Apr 17",
    body_temp: 98.4,
    shuttle_run: 10,
    plank_time: 30,
    squats: 15,
    bmi: 21,
  },
  {
    date: "Apr 18",
    body_temp: 98.6,
    shuttle_run: 12,
    plank_time: 35,
    squats: 18,
    bmi: 21.2,
  },
  {
    date: "Apr 19",
    body_temp: 99.1,
    shuttle_run: 11,
    plank_time: 28,
    squats: 17,
    bmi: 21.1,
  },
  {
    date: "Apr 20",
    body_temp: 98.9,
    shuttle_run: 13,
    plank_time: 36,
    squats: 19,
    bmi: 21.3,
  },
  {
    date: "Apr 21",
    body_temp: 98.7,
    shuttle_run: 12,
    plank_time: 33,
    squats: 18,
    bmi: 21.2,
  },
  {
    date: "Apr 22",
    body_temp: 98.5,
    shuttle_run: 11,
    plank_time: 30,
    squats: 16,
    bmi: 21.0,
  },
  {
    date: "Apr 23",
    body_temp: 98.3,
    shuttle_run: 10,
    plank_time: 29,
    squats: 15,
    bmi: 20.9,
  },
];

const chartConfig = {
  body_temp: { label: "Body Temperature", color: "#f97316" },
  shuttle_run: { label: "Shuttle Run", color: "#6366f1" },
  plank_time: { label: "Plank Time", color: "#06b6d4" },
  squats: { label: "Squats", color: "#ec4899" },
  bmi: { label: "BMI", color: "#22c55e" },
};

export default function StudentHealthCharts() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4"
    >
      {/* Body Temperature Chart */}
      <motion.div whileHover={{ scale: 1.01 }}>
        <Card className="rounded-2xl shadow-md">
          <CardHeader>
            <CardTitle>Body Temperature (°F)</CardTitle>
          </CardHeader>
          <CardContent className="h-[250px]">
            <ChartContainer config={chartConfig} className="h-full w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={sampleData}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.5} />
                  <XAxis dataKey="date" />
                  <YAxis domain={[97, 100]} />
                  <Tooltip />
                  <Legend
                    layout="horizontal"
                    verticalAlign="bottom"
                    height={36}
                  />
                  <Line
                    type="monotone"
                    dataKey="body_temp"
                    stroke={`var(--color-body_temp)`}
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6, strokeWidth: 0 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </motion.div>

      {/* Shuttle Run Chart */}
      <motion.div whileHover={{ scale: 1.01 }}>
        <Card className="rounded-2xl shadow-md">
          <CardHeader>
            <CardTitle>Shuttle Run</CardTitle>
          </CardHeader>
          <CardContent className="h-[250px]">
            <ChartContainer config={chartConfig} className="h-full w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={sampleData}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.5} />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend
                    layout="horizontal"
                    verticalAlign="bottom"
                    height={36}
                  />
                  <Bar
                    dataKey="shuttle_run"
                    fill={`var(--color-shuttle_run)`}
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </motion.div>

      {/* Plank Time Chart */}
      <motion.div whileHover={{ scale: 1.01 }}>
        <Card className="rounded-2xl shadow-md">
          <CardHeader>
            <CardTitle>Plank Time (seconds)</CardTitle>
          </CardHeader>
          <CardContent className="h-[250px]">
            <ChartContainer config={chartConfig} className="h-full w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={sampleData}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.5} />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend
                    layout="horizontal"
                    verticalAlign="bottom"
                    height={36}
                  />
                  <Line
                    type="monotone"
                    dataKey="plank_time"
                    stroke={`var(--color-plank_time)`}
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6, strokeWidth: 0 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </motion.div>

      {/* Squats Count Chart */}
      <motion.div whileHover={{ scale: 1.01 }}>
        <Card className="rounded-2xl shadow-md">
          <CardHeader>
            <CardTitle>Squats Count</CardTitle>
          </CardHeader>
          <CardContent className="h-[250px]">
            <ChartContainer config={chartConfig} className="h-full w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={sampleData}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.5} />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend
                    layout="horizontal"
                    verticalAlign="bottom"
                    height={36}
                  />
                  <Bar
                    dataKey="squats"
                    fill={`var(--color-squats)`}
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </motion.div>

      {/* BMI Chart (Full Width) */}
      <motion.div
        whileHover={{ scale: 1.01 }}
        className="col-span-1 sm:col-span-2"
      >
        <Card className="rounded-2xl shadow-md">
          <CardHeader>
            <CardTitle>BMI</CardTitle>
          </CardHeader>
          <CardContent className="h-[250px]">
            <ChartContainer config={chartConfig} className="h-full w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={sampleData}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.5} />
                  <XAxis dataKey="date" />
                  <YAxis domain={[20, 22]} />
                  <Tooltip />
                  <Legend
                    layout="horizontal"
                    verticalAlign="bottom"
                    height={36}
                  />
                  <Line
                    type="monotone"
                    dataKey="bmi"
                    stroke={`var(--color-bmi)`}
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6, strokeWidth: 0 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}
