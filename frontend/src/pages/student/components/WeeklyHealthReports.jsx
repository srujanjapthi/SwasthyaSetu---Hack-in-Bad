import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { format } from "date-fns";

const WeeklyHealthReports = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Dummy data - will be replaced with API call
  const dummyReports = [
    {
      _id: "1",
      student_id: "student123",
      body_temp: 98.6,
      shuttle_run: 12.5,
      plank_time: 120,
      squats: 25,
      weight: 132,
      height: 65,
      bmi: 22,
      createdAt: "2023-06-01T10:00:00Z",
    },
    {
      _id: "2",
      student_id: "student123",
      body_temp: 98.4,
      shuttle_run: 11.8,
      plank_time: 135,
      squats: 28,
      weight: 131,
      height: 65,
      bmi: 21.8,
      createdAt: "2023-06-08T10:00:00Z",
    },
    {
      _id: "3",
      student_id: "student123",
      body_temp: 98.7,
      shuttle_run: 11.2,
      plank_time: 145,
      squats: 30,
      weight: 130,
      height: 65.2,
      bmi: 41.5,
      createdAt: "2023-06-15T10:00:00Z",
    },
  ];

  // Mock API fetch function
  const fetchHealthReports = async () => {
    setLoading(true);
    setError(null);

    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 800));

      // In real implementation, this would be:
      // const response = await fetch('/api/weekly-health-records')
      // const data = await response.json()
      // setReports(data)

      setReports(dummyReports);
    } catch (err) {
      console.error("Failed to fetch health reports:", err);
      setError("Failed to load health reports. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchHealthReports();
  }, []);

  // Calculate BMI category
  const getBMICategory = (bmi) => {
    if (bmi < 18.5)
      return { label: "Underweight", class: "bg-yellow-100 text-yellow-800" };
    if (bmi < 25)
      return { label: "Normal", class: "bg-green-100 text-green-800" };
    if (bmi < 30)
      return { label: "Overweight", class: "bg-orange-100 text-orange-800" };
    return { label: "Obese", class: "bg-red-100 text-red-800" };
  };

  // Format time in minutes:seconds
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold tracking-tight">
          Weekly Health Reports
        </h2>
        <Button
          variant="outline"
          onClick={fetchHealthReports}
          disabled={loading}
        >
          {loading ? "Refreshing..." : "Refresh Data"}
        </Button>
      </div>

      {error && (
        <div className="rounded-md bg-red-50 p-4">
          <div className="flex">
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">Error</h3>
              <div className="mt-2 text-sm text-red-700">
                <p>{error}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {loading ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-[200px] w-full rounded-xl" />
          ))}
        </div>
      ) : reports.length === 0 ? (
        <div className="flex flex-col items-center justify-center space-y-4 py-12">
          <div className="text-muted-foreground">
            No health reports available
          </div>
          <Button onClick={fetchHealthReports}>Try Again</Button>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {reports.map((report, index) => (
            <motion.div
              key={report._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="flex justify-between items-start">
                    <span>Week {reports.length - index}</span>
                    <span className="text-sm font-normal text-muted-foreground">
                      {format(new Date(report.createdAt), "MMM d, yyyy")}
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <StatItem
                      label="Body Temp"
                      value={`${report.body_temp}°F`}
                      icon="🌡️"
                    />
                    <StatItem
                      label="Shuttle Run"
                      value={`${report.shuttle_run}s`}
                      icon="🏃"
                    />
                    <StatItem
                      label="Plank Time"
                      value={formatTime(report.plank_time)}
                      icon="⏱️"
                    />
                    <StatItem label="Squats" value={report.squats} icon="🦵" />
                  </div>

                  <div className="pt-3 border-t">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">BMI</span>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold">
                          {report.bmi.toFixed(1)}
                        </span>
                        <span
                          className={`text-xs px-2 py-1 rounded-full ${getBMICategory(report.bmi).class}`}
                        >
                          {getBMICategory(report.bmi).label}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-sm font-medium">Weight/Height</span>
                      <span className="text-sm">
                        {report.weight}kg / {report.height}cm
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

const StatItem = ({ label, value, icon }) => (
  <div>
    <p className="text-sm text-muted-foreground">{label}</p>
    <div className="flex items-center gap-2">
      <span className="text-lg">{icon}</span>
      <p className="font-medium">{value}</p>
    </div>
  </div>
);

export default WeeklyHealthReports;
