import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import StudentHealthStats from "../components/StudentHealthStats";
import StudentHealthCharts from "../components/StudentHealthCharts";

export default function StudentDashboard() {
  return (
    <div className="flex-1">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">
            Student Dashboard
          </h2>
        </div>
        <Tabs defaultValue="health" className="space-y-4">
          <TabsList>
            <TabsTrigger value="health">My Health</TabsTrigger>
            <TabsTrigger value="reports">My Reports</TabsTrigger>
            <TabsTrigger value="records">Medical Records</TabsTrigger>
            <TabsTrigger value="chat">Mental Health Chat</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
          </TabsList>
          <TabsContent value="health" className="space-y-4">
            <StudentHealthStats />
            <StudentHealthCharts />
          </TabsContent>
          <TabsContent value="reports" className="space-y-4">
            {/* <HealthReports showTable={true} /> */}
          </TabsContent>
          <TabsContent value="records" className="space-y-4">
            {/* <MedicalRecords /> */}
          </TabsContent>
          <TabsContent value="chat" className="space-y-4">
            {/* <MentalHealthChat /> */}
          </TabsContent>
          <TabsContent value="profile" className="space-y-4">
            {/* <StudentProfile /> */}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
