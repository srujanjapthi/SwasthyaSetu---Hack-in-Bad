import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlusCircle, School, BarChart3, LayoutDashboard } from "lucide-react";
import { motion } from "framer-motion";
import SchoolsTable from "../components/SchoolTable";
import { AddSchool } from "../components/AddSchool";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import AdminStats from "../components/AdminStats";
import AdminCharts from "../components/AdminCharts";

export default function AdminDashboard() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-gray-50/50 to-white dark:from-gray-900/50 dark:to-gray-950">
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
              Admin Dashboard
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              Comprehensive management and analytics platform
            </p>
          </div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button className="shadow-md hover:shadow-lg transition-shadow">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Add School
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[625px]">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                    Add New School
                  </DialogTitle>
                </DialogHeader>
                <AddSchool onSuccess={() => setOpen(false)} />
              </DialogContent>
            </Dialog>
          </motion.div>
        </motion.div>

        {/* Enhanced Tabs with icons */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="bg-transparent p-0 h-auto gap-2">
            {[
              { value: "overview", icon: LayoutDashboard, label: "Overview" },
              { value: "schools", icon: School, label: "Schools" },
              { value: "analytics", icon: BarChart3, label: "Analytics" },
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

          {/* Tab contents with animations */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <TabsContent value="overview" className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <AdminStats />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <AdminCharts />
              </motion.div>
            </TabsContent>

            <TabsContent value="schools" className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Card className="border-l-4 border-primary hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <School className="h-5 w-5 text-primary" />
                      All Schools
                    </CardTitle>
                    <CardDescription>
                      Manage all registered schools in the system
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <SchoolsTable />
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Card className="border-l-4 border-blue-400 hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart3 className="h-5 w-5 text-blue-500" />
                      Advanced Analytics
                    </CardTitle>
                    <CardDescription>
                      Detailed insights and data visualizations
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <AdminCharts />
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>
          </motion.div>
        </Tabs>
      </div>
    </div>
  );
}
