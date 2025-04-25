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
    date: "Week 1",
    body_temp: 98.4,
    blood_pressure: 120,
    pulse: 70,
    waist_circumference: 30,
    bmi: 21,
  },
  {
    date: "Week 2",
    body_temp: 98.6,
    blood_pressure: 122,
    pulse: 72,
    waist_circumference: 32,
    bmi: 21.2,
  },
  {
    date: "Week 3",
    body_temp: 99.1,
    blood_pressure: 124,
    pulse: 74,
    waist_circumference: 34,
    bmi: 21.1,
  },
  {
    date: "Week 4",
    body_temp: 98.9,
    blood_pressure: 126,
    pulse: 76,
    waist_circumference: 36,
    bmi: 21.3,
  },
  {
    date: "Week 5",
    body_temp: 98.7,
    blood_pressure: 128,
    pulse: 78,
    waist_circumference: 38,
    bmi: 21.4,
  },
  {
    date: "Week 6",
    body_temp: 98.5,
    blood_pressure: 130,
    pulse: 80,
    waist_circumference: 40,
    bmi: 21.5,
  },
  {
    date: "Week 7",
    body_temp: 98.3,
    blood_pressure: 132,
    pulse: 82,
    waist_circumference: 42,
    bmi: 21.6,
  },
];

const chartConfig = {
  body_temp: { label: "Body Temperature", color: "#f97316" },
  blood_pressure: { label: "Blood Pressure", color: "#06b6d4" },
  pulse: { label: "Pulse", color: "#ec4899" },
  waist_circumference: { label: "Waist Circumference", color: "#22c55e" },
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
            <CardTitle>Blood Pressure</CardTitle>
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
                    dataKey="blood_pressure"
                    fill={`var(--color-blood_pressure)`}
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
            <CardTitle>Pulse</CardTitle>
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
                    dataKey="pulse"
                    stroke={`var(--color-pulse)`}
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
            <CardTitle>Waist Circumference</CardTitle>
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
                    dataKey="waist_circumference"
                    fill={`var(--color-waist_circumference)`}
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
