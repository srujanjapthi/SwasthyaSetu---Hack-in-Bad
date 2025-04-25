import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import StudentHealthStats from "../components/StudentHealthStats";
import StudentHealthCharts from "../components/StudentHealthCharts";
import BadgesAndActivities from "../components/BadgesAndActivities";
import WeeklyHealthReports from "../components/WeeklyHealthReports";
import MedicalRecordsSection from "../components/MedicalRecordsSection";
import StudentProfile from "../components/StudentProfile";
import AISuggestion from "../components/AISuggestion";
import { motion } from "framer-motion";
import {
  Activity,
  ClipboardList,
  FileText,
  MessageSquare,
  User,
} from "lucide-react";

export default function StudentDashboard() {
  return (
    <div className="flex-1 bg-gradient-to-b from-gray-50/50 to-white dark:from-gray-900/50 dark:to-gray-950">
      <div className="flex-1 space-y-6 p-6 md:p-8 pt-6">
        {/* Header with animated gradient */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-between"
        >
          <div>
            <h2 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
              Student Dashboard
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              Your comprehensive health and wellness overview
            </p>
          </div>
        </motion.div>

        {/* Enhanced Tabs with icons and animations */}
        <Tabs defaultValue="health" className="space-y-6">
          <TabsList className="bg-transparent p-0 h-auto gap-2">
            {[
              { value: "health", icon: Activity, label: "My Health" },
              { value: "reports", icon: ClipboardList, label: "My Reports" },
              { value: "records", icon: FileText, label: "Medical Records" },
              { value: "chat", icon: MessageSquare, label: "AI Insights" },
              { value: "profile", icon: User, label: "Profile" },
            ].map((tab) => (
              <motion.div
                key={tab.value}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <TabsTrigger
                  value={tab.value}
                  className="px-4 py-2 rounded-lg data-[state=active]:shadow-sm data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary/10 data-[state=active]:to-blue-600/10 data-[state=active]:border data-[state=active]:border-primary/20"
                >
                  <tab.icon className="h-4 w-4 mr-2" />
                  {tab.label}
                </TabsTrigger>
              </motion.div>
            ))}
          </TabsList>

          {/* Tab contents with subtle animations */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <TabsContent value="health" className="space-y-6">
              <StudentHealthStats />
              <StudentHealthCharts />
              <BadgesAndActivities />
            </TabsContent>

            <TabsContent value="reports" className="space-y-6">
              <WeeklyHealthReports />
            </TabsContent>

            <TabsContent value="records" className="space-y-6">
              <MedicalRecordsSection />
            </TabsContent>

            <TabsContent value="chat" className="space-y-6">
              <AISuggestion />
            </TabsContent>

            <TabsContent value="profile" className="space-y-6">
              <StudentProfile />
            </TabsContent>
          </motion.div>
        </Tabs>
      </div>
    </div>
  );
}
