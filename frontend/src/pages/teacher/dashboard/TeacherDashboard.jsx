import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AiAssistant from "../components/AiAssistant";
import UploadData from "../components/uploadData";
import {
  Users,
  FileBarChart,
  AlertTriangle,
  ChevronRight,
  HeartPulse,
  TrendingUp,
  Plus,
  Search,
  UserPlus,
  Activity,
  Scale,
  Upload,
  Bot,
} from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import TeacherChart from "../components/TeacherChart";
import { useTheme } from "@/context/ThemeStore";
import AddStudent from "../components/AddStudent";
import StatsCards from "../components/StatsCards";
import StudentDetails from "../components/StudentDetails";
const TeacherDashboard = () => {
  const { theme } = useTheme();
  const [searchTerm, setSearchTerm] = useState("");
  const [isAIDialogOpen, setIsAIDialogOpen] = useState(false);
  const [newStudent, setNewStudent] = useState({
    name: "",
    grade: "9th",
    bmi: "",
    fitnessLevel: "",
  });
  const [activeTab, setActiveTab] = useState("all");
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [file, setFile] = useState(null);
  const [handleFileUpload, setHandleFileUpload] = useState(false);
  const [aiQuery, setAiQuery] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  const [addStudent, handleAddStudent] = useState(false);
  const [handleUpload, setHandleUpload] = useState(false);

  // Sample data
  const allStudentsData = [
    {
      id: "1",
      name: "Emma Thompson",
      grade: "10th",
      bmi: 22.1,
      fitnessLevel: "Good",
      status: "Healthy",
      reason: "",
    },
    {
      id: "2",
      name: "James Wilson",
      grade: "9th",
      bmi: 18.5,
      fitnessLevel: "Average",
      status: "Monitor",
      reason: "Low BMI",
    },
    {
      id: "3",
      name: "Sofia Rodriguez",
      grade: "10th",
      bmi: 24.8,
      fitnessLevel: "Excellent",
      status: "Healthy",
      reason: "",
    },
    {
      id: "4",
      name: "Ethan Johnson",
      grade: "9th",
      bmi: 16.2,
      fitnessLevel: "Poor",
      status: "At Risk",
      reason: "Nutritional deficiency",
    },
    {
      id: "5",
      name: "Olivia Chen",
      grade: "11th",
      bmi: 21.3,
      fitnessLevel: "Good",
      status: "Healthy",
      reason: "",
    },
  ];

  const atRiskStudentsData = allStudentsData.filter(
    (student) => student.status === "At Risk" || student.status === "Monitor",
  );

  const statusColor = {
    Healthy: "bg-teal-100 text-teal-800 dark:bg-teal-900/30 dark:text-teal-300",
    Monitor:
      "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300",
    "At Risk": "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
  };

  const fitnessColor = {
    Excellent:
      "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300",
    Good: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
    Average:
      "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300",
    Poor: "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300",
  };

  const filteredStudents = allStudentsData
    .filter(
      (student) =>
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.grade.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    .filter((student) =>
      activeTab === "all"
        ? true
        : student.status === (activeTab === "atRisk" ? "At Risk" : "Healthy"),
    );

    const handleAIQuery = () => {
      // Simulate AI response
      const responses = [
        "Based on the data, I recommend focusing on nutritional education for students with low BMI.",
        "The fitness levels are improving overall, but 3 students need targeted exercise programs.",
        "Alert: Ethan Johnson's BMI is critically low. Please consult with the school nutritionist.",
        "Your class's average fitness score is 78, which is above the school average of 72.",
        "Consider implementing weekly fitness challenges to maintain student engagement.",
      ];
      setAiResponse(responses[Math.floor(Math.random() * responses.length)]);
    };

  

  return (
    <div
      className={`p-6 min-h-screen transition-colors duration-300 ${theme === "light" ? "bg-gray-50" : "bg-gray-950"} overflow-hidden`}
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <motion.h1
              className={`text-3xl font-bold ${theme === "light" ? "text-gray-900" : "text-white"}`}
              whileHover={{ scale: 1.01 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              Teacher Dashboard
            </motion.h1>
            <p
              className={`mt-2 ${theme === "light" ? "text-gray-600" : "text-gray-400"}`}
            >
              Monitor and manage your students' health metrics with AI insights
            </p>
          </div>
          <div className="flex gap-3">
            <AiAssistant isAIDialogOpen={isAIDialogOpen} setIsAIDialogOpen={setIsAIDialogOpen} aiQuery={aiQuery} setAiQuery={setAiQuery} aiResponse={aiResponse} handleAIQuery={handleAIQuery}/>
            <UploadData isUploadDialogOpen={isUploadDialogOpen} setIsUploadDialogOpen={setIsUploadDialogOpen} handleFileUpload={handleFileUpload} handleUpload={handleUpload} file={file}/>
            <AddStudent isAddDialogOpen={isAddDialogOpen} setIsAddDialogOpen={setIsAddDialogOpen} newStudent={newStudent} setNewStudent={setNewStudent} handleAddStudent={handleAddStudent}/>
          </div>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <StatsCards isAIDialogOpen={isAIDialogOpen} setIsAIDialogOpen={setIsAIDialogOpen} aiQuery={aiQuery} setAiQuery={setAiQuery} aiResponse={aiResponse} handleAIQuery={handleAIQuery}/>

      {/* Student Management Section */}
      <StudentDetails isAIDialogOpen={isAIDialogOpen} setIsAIDialogOpen={setIsAIDialogOpen} setAiQuery={setAiQuery} allStudentsData={allStudentsData} fitnessColor={fitnessColor} statusColor={statusColor} setActiveTab={setActiveTab} activeTab={activeTab} filteredStudents={filteredStudents} />

      Health Chart
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <TeacherChart theme={theme} />
      </motion.div>

      
    </div>
  );
};

export default TeacherDashboard;
