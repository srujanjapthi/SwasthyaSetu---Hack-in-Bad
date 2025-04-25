import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";
import { ChartContainer } from "@/components/ui/chart";
import axiosInstance from "@/lib/axios";

export default function AdminCharts() {
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(null);
  const [chartData, setChartData] = useState({
    schoolsByDistrict: [],
    healthTrends: [],
    studentDemographics: [],
    fitnessProgress: [],
  });

  const chartConfig = {
    boys: { label: "Boys", color: "#3b82f6" },
    girls: { label: "Girls", color: "#f472b6" },
    bmi: { label: "BMI", color: "#60a5fa" },
    healthy: { label: "Healthy %", color: "#10b981" },
    shuttle: { label: "Shuttle Run", color: "#f59e0b" },
    plank: { label: "Plank Hold", color: "#6366f1" },
  };

  const pieColors = ["#3b82f6", "#10b981", "#f59e0b", "#8b5cf6", "#f43f5e"];

  const schoolsByDistrict = async () => {
    try {
      const response = await axiosInstance.get("/admin/districts");
      // console.log(response.data);

      // Assuming the response.data is an array with the district objects
      const data = response.data.schools.map((item) => ({
        name: item._id, // District name
        value: item.schools.length, // Number of schools
      }));

      // console.log(data);
      return data;
    } catch (error) {
      console.error("Error fetching schools by district:", error);
      // Optionally, return a default value or empty array if there's an error
      return [];
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 800));
      const mockData = {
        healthTrends: [
          { month: "Jan", bmi: 20.1, healthy: 78 },
          { month: "Feb", bmi: 20.3, healthy: 79 },
          { month: "Mar", bmi: 20.5, healthy: 82 },
          { month: "Apr", bmi: 20.2, healthy: 81 },
          { month: "May", bmi: 20.4, healthy: 83 },
          { month: "Jun", bmi: 20.6, healthy: 85 },
        ],
        studentDemographics: [
          { class: "Class 6", boys: 120, girls: 115 },
          { class: "Class 7", boys: 135, girls: 125 },
          { class: "Class 8", boys: 110, girls: 105 },
          { class: "Class 9", boys: 125, girls: 120 },
          { class: "Class 10", boys: 130, girls: 125 },
        ],
        fitnessProgress: [
          { month: "Jan", shuttle: 12.5, plank: 45 },
          { month: "Feb", shuttle: 12.2, plank: 48 },
          { month: "Mar", shuttle: 11.9, plank: 52 },
          { month: "Apr", shuttle: 11.7, plank: 55 },
          { month: "May", shuttle: 11.5, plank: 58 },
        ],
      };
      setChartData(mockData);

      const schoolData = await schoolsByDistrict();
      setChartData({
        ...mockData,
        schoolsByDistrict: schoolData,
      });
      setLoading(false);
    };
    fetchData();
  }, []);

  const handlePieEnter = (_, index) => {
    setActiveIndex(index);
  };

  const handlePieLeave = () => {
    setActiveIndex(null);
  };

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="grid gap-4 md:grid-cols-2 lg:grid-cols-2"
      >
        {[...Array(4)].map((_, i) => (
          <Card key={i}>
            <CardHeader>
              <Skeleton className="h-6 w-3/4" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-[300px] w-full" />
            </CardContent>
          </Card>
        ))}
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="grid gap-4 md:grid-cols-2 lg:grid-cols-2"
    >
      {/* Schools by District */}
      <motion.div whileHover={{ scale: 1.01 }}>
        <Card>
          <CardHeader>
            <CardTitle>Schools by District</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ChartContainer config={chartConfig} className="h-full w-full">
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={chartData.schoolsByDistrict}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={activeIndex === null ? 100 : 110}
                    innerRadius={60}
                    paddingAngle={2}
                    label
                    onMouseEnter={handlePieEnter}
                    onMouseLeave={handlePieLeave}
                  >
                    {chartData.schoolsByDistrict.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={pieColors[index % pieColors.length]}
                        strokeWidth={activeIndex === index ? 3 : 1}
                        style={{
                          filter:
                            activeIndex === index
                              ? `drop-shadow(0px 0px 6px ${
                                  pieColors[index % pieColors.length]
                                }80)`
                              : "none",
                          transition: "all 0.3s ease",
                        }}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend
                    layout="horizontal"
                    verticalAlign="bottom"
                    height={36}
                  />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </motion.div>

      {/* Health Trends */}
      <motion.div whileHover={{ scale: 1.01 }}>
        <Card>
          <CardHeader>
            <CardTitle>Health Trends</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ChartContainer config={chartConfig} className="h-full w-full">
              <ResponsiveContainer>
                <LineChart data={chartData.healthTrends}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.5} />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend
                    layout="horizontal"
                    verticalAlign="bottom"
                    height={36}
                  />
                  <Line
                    type="monotone"
                    dataKey="bmi"
                    stroke={chartConfig.bmi.color}
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6, strokeWidth: 0 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="healthy"
                    stroke={chartConfig.healthy.color}
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

      {/* Student Demographics */}
      <motion.div whileHover={{ scale: 1.01 }}>
        <Card>
          <CardHeader>
            <CardTitle>Student Demographics</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ChartContainer config={chartConfig} className="h-full w-full">
              <ResponsiveContainer>
                <BarChart data={chartData.studentDemographics}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.5} />
                  <XAxis dataKey="class" />
                  <YAxis />
                  <Tooltip />
                  <Legend
                    layout="horizontal"
                    verticalAlign="bottom"
                    height={36}
                  />
                  <Bar
                    dataKey="boys"
                    fill={chartConfig.boys.color}
                    radius={[4, 4, 0, 0]}
                  />
                  <Bar
                    dataKey="girls"
                    fill={chartConfig.girls.color}
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </motion.div>

      {/* Fitness Progress */}
      <motion.div whileHover={{ scale: 1.01 }}>
        <Card>
          <CardHeader>
            <CardTitle>Fitness Progress</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ChartContainer config={chartConfig} className="h-full w-full">
              <ResponsiveContainer>
                <BarChart data={chartData.fitnessProgress}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.5} />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend
                    layout="horizontal"
                    verticalAlign="bottom"
                    height={36}
                  />
                  <Bar
                    dataKey="shuttle"
                    fill={chartConfig.shuttle.color}
                    radius={[4, 4, 0, 0]}
                  />
                  <Bar
                    dataKey="plank"
                    fill={chartConfig.plank.color}
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}
