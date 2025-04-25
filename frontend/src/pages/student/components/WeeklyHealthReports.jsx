import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { useGetAllWeeklyHealthRecords } from "@/api/StudentApi";

const WeeklyHealthReports = () => {
  const {
    weeklyHealthRecords: reports,
    isLoading: loading,
    isError,
    error,
    refetch,
  } = useGetAllWeeklyHealthRecords();

  // Dummy data - will be replaced with API call
  const dummyReports = [
    {
      _id: "1",
      student_id: "student123",
      body_temp: 98.6,
      blood_pressure: 120,
      pulse: 70,
      waist_circumference: 30,
      weight: 132,
      height: 65,
      bmi: 22,
      createdAt: "2023-06-01T10:00:00Z",
    },
    {
      _id: "2",
      student_id: "student123",
      body_temp: 98.4,
      blood_pressure: 122,
      pulse: 72,
      waist_circumference: 32,
      weight: 131,
      height: 65,
      bmi: 21.8,
      createdAt: "2023-06-08T10:00:00Z",
    },
    {
      _id: "3",
      student_id: "student123",
      body_temp: 98.7,
      blood_pressure: 124,
      pulse: 74,
      waist_circumference: 34,
      weight: 130,
      height: 65.2,
      bmi: 21.1,
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
      return {
        label: "Underweight",
        class:
          "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300",
      };
    if (bmi < 25)
      return {
        label: "Normal",
        class:
          "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
      };
    if (bmi < 30)
      return {
        label: "Overweight",
        class:
          "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300",
      };
    return {
      label: "Obese",
      class: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
    };
  };

  // Format time in minutes:seconds
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  // Convert Celsius to Fahrenheit for display
  const celsiusToFahrenheit = (celsius) => {
    return ((celsius * 9) / 5 + 32).toFixed(1);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
          Weekly Health Reports
        </h2>
        <Button
          variant="outline"
          onClick={refetch}
          disabled={loading}
          className="transition-all hover:scale-[1.02]"
        >
          {loading ? "Refreshing..." : "Refresh Data"}
        </Button>
      </div>

      {isError && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="rounded-md bg-red-50 dark:bg-red-900/20 p-4"
        >
          <div className="flex">
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800 dark:text-red-300">
                Error
              </h3>
              <div className="mt-2 text-sm text-red-700 dark:text-red-200">
                <p>{error?.message || "Failed to load health reports"}</p>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {loading ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.1 }}
            >
              <Skeleton className="h-[200px] w-full rounded-xl" />
            </motion.div>
          ))}
        </div>
      ) : !reports || reports.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center justify-center space-y-4 py-12"
        >
          <div className="text-muted-foreground">
            No health reports available
          </div>
          <Button onClick={refetch}>Try Again</Button>
        </motion.div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {reports.map((report, index) => (
            <motion.div
              key={report._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <Card className="h-full hover:shadow-md transition-shadow border-l-4 border-primary">
                <CardHeader>
                  <CardTitle className="flex justify-between items-start">
                    <span>Report {reports.length - index}</span>
                    <span className="text-sm font-normal text-muted-foreground">
                      {format(new Date(report.createdAt), "MMM d, yyyy")}
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <StatItem
                      label="Body Temp"
                      value={`${celsiusToFahrenheit(report.body_temp)}°F`}
                      icon="🌡️"
                    />
                    <StatItem
                      label="Waist Circumference"
                      value={`${report.waist_circumference}cm`}
                      icon="🏃"
                    />
                    <StatItem
                      label="Blood Pressure"
                      value={`${report.blood_pressure}mmHg`}
                      icon="⏱️"
                    />
                    <StatItem label="Pulse" value={report.pulse} icon="🦵" />
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
  <motion.div
    whileHover={{ scale: 1.03 }}
    transition={{ type: "spring", stiffness: 400 }}
  >
    <div>
      <p className="text-sm text-muted-foreground">{label}</p>
      <div className="flex items-center gap-2">
        <span className="text-lg">{icon}</span>
        <p className="font-medium">{value}</p>
      </div>
    </div>
  </motion.div>
);

export default WeeklyHealthReports;
