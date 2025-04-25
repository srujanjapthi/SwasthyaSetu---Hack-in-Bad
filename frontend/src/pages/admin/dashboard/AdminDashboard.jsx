import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { SchoolsTable } from "@/components/admin/schools-table";
import { PlusCircle } from "lucide-react";
import { Link } from "react-router-dom";
import AdminStats from "../components/AdminStats";
import AdminCharts from "../components/AdminCharts";
import SchoolsTable from "../components/SchoolTable";
import { AddSchool } from "../components/AddSchool";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";

export default function AdminDashboard() {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Admin Dashboard</h2>
          <div className="flex items-center space-x-2">
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button variant="outline">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Add School
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[625px]">
                <DialogHeader>
                  <DialogTitle>Add New School</DialogTitle>
                </DialogHeader>
                <AddSchool onSuccess={() => setOpen(false)} />
              </DialogContent>
            </Dialog>
          </div>
        </div>
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="schools">Manage Schools</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-4">
            <AdminStats />
            <AdminCharts />
          </TabsContent>
          <TabsContent value="schools" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>All Schools</CardTitle>
                <CardDescription>
                  Manage all registered schools in the system.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <SchoolsTable />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="analytics" className="space-y-4">
            <AdminCharts />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
