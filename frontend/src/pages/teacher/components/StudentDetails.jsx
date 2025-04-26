import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { motion } from "framer-motion";
import { useTheme } from "@/context/ThemeStore";
import { Bot, Scale } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useGetStudentHealthDetails } from "@/api/TeacherApi";

const StudentDetails = ({ isAIDialogOpen, setIsAIDialogOpen, setAiQuery }) => {
  const { theme } = useTheme();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  const {
    data: students = [],
    isLoading,
    isError,
  } = useGetStudentHealthDetails();

  const fitnessColor = {
    Fit: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
    Average: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
    Underweight:
      "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300",
    Overweight:
      "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300",
    Obese: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
  };

  const statusColor = {
    Healthy:
      "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
    Normal: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
    "Needs Attention":
      "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300",
    "At Risk": "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
  };

  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.grade.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesTab =
      activeTab === "all" ||
      (activeTab === "healthy" && student.status === "Healthy") ||
      (activeTab === "atRisk" &&
        (student.status === "At Risk" || student.status === "Needs Attention"));

    return matchesSearch && matchesTab;
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-red-500">Failed to load student data</div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <Card className="border border-gray-200 dark:border-gray-800">
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <CardTitle
                className={theme === "light" ? "text-gray-900" : "text-white"}
              >
                Student Management
              </CardTitle>
              <CardDescription>
                View and manage all students in your class
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <motion.div className="relative" whileHover={{ scale: 1.02 }}>
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search students..."
                  className="pl-10 w-full sm:w-[200px]"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </motion.div>
              <motion.div
                className="flex border rounded-md overflow-hidden"
                whileHover={{ scale: 1.02 }}
              >
                <button
                  className={`px-3 py-1 text-sm transition-colors ${activeTab === "all" ? "bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200" : "bg-transparent"}`}
                  onClick={() => setActiveTab("all")}
                >
                  All
                </button>
                <button
                  className={`px-3 py-1 text-sm transition-colors ${activeTab === "healthy" ? "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200" : "bg-transparent"}`}
                  onClick={() => setActiveTab("healthy")}
                >
                  Healthy
                </button>
                <button
                  className={`px-3 py-1 text-sm transition-colors ${activeTab === "atRisk" ? "bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200" : "bg-transparent"}`}
                  onClick={() => setActiveTab("atRisk")}
                >
                  At Risk
                </button>
              </motion.div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border overflow-hidden">
            <Table className="overflow-hidden">
              <TableHeader>
                <TableRow>
                  <TableHead>Student</TableHead>
                  <TableHead>Grade</TableHead>
                  <TableHead>BMI</TableHead>
                  <TableHead>Fitness</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStudents.map((student) => (
                  <motion.tr
                    key={student.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                    className="hover:bg-gray-100 dark:hover:bg-gray-800 group"
                    whileHover={{ scale: 1.005 }}
                  >
                    <TableCell className="font-medium">
                      <div className="flex items-center">
                        <motion.div
                          className={`h-8 w-8 rounded-full flex items-center justify-center mr-3 ${
                            theme === "light" ? "bg-gray-200" : "bg-gray-700"
                          }`}
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.5 }}
                        >
                          <span className="text-sm">
                            {student.name.charAt(0)}
                          </span>
                        </motion.div>
                        {student.name}
                      </div>
                    </TableCell>
                    <TableCell>{student.grade}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Scale className="h-4 w-4 text-muted-foreground" />
                        {student.bmi}
                      </div>
                    </TableCell>
                    <TableCell>
                      <motion.span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          fitnessColor[student.fitnessLevel]
                        }`}
                        whileHover={{ scale: 1.05 }}
                      >
                        {student.fitnessLevel}
                      </motion.span>
                    </TableCell>
                    <TableCell>
                      <motion.span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          statusColor[student.status]
                        }`}
                        whileHover={{ scale: 1.05 }}
                      >
                        {student.status}
                      </motion.span>
                    </TableCell>
                    <TableCell className="text-right">
                      <motion.div whileHover={{ x: 3 }}>
                        <Button
                          variant="outline"
                          size="sm"
                          className="gap-1"
                          onClick={() => {
                            setAiQuery(
                              `Analyze ${student.name}'s health metrics`,
                            );
                            setIsAIDialogOpen(true);
                          }}
                        >
                          <Bot className="h-4 w-4" />
                          Analyze
                        </Button>
                      </motion.div>
                    </TableCell>
                  </motion.tr>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default StudentDetails;
