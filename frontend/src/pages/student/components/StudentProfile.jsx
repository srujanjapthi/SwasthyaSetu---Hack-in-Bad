import { motion } from "framer-motion";
import { User, Mail, Calendar, School, Award } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useGetUser } from "@/api/StudentApi";
import { useEffect, useState } from "react";
import { format } from "date-fns";

export default function StudentProfile() {
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({});
  const { isLoading, user: profile } = useGetUser();

  // Initialize form data when profile is loaded
  useEffect(() => {
    if (profile) {
      setFormData({
        name: profile.name || "",
        email: profile.email || "",
        dob: profile.dob ? format(new Date(profile.dob), "yyyy-MM-dd") : "",
        gender: profile.gender || "",
        class: profile.class || "",
        section: profile.section || "",
      });
    }
  }, [profile]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    // Here you would typically make an API call to update the profile
    // For now, we'll just exit edit mode
    setEditMode(false);
  };

  if (isLoading && !profile) {
    return (
      <div className="space-y-6">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card className="p-6 h-40 animate-pulse bg-muted/50" />
          </motion.div>
        ))}
      </div>
    );
  }

  if (!profile) {
    return <div>No profile data available</div>;
  }

  return (
    <div className="space-y-8">
      {/* Header with edit button */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-between items-center"
      >
        <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
          Student Profile
        </h2>
        <Button
          onClick={() => setEditMode(!editMode)}
          variant={editMode ? "secondary" : "outline"}
          className="gap-2"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {editMode ? "Cancel" : "Edit Profile"}
        </Button>
      </motion.div>

      {/* Profile Grid */}
      <div className="grid gap-6 md:grid-cols-3">
        {/* Personal Info Card */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="md:col-span-2"
        >
          <Card className="p-6 border-l-4 border-primary hover:shadow-lg transition-shadow">
            <div className="flex items-start gap-6">
              <motion.div
                className="relative"
                whileHover={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 0.6 }}
              >
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/50 dark:to-blue-800/50 flex items-center justify-center text-3xl font-bold text-blue-600 dark:text-blue-300">
                  {profile?.name
                    ?.split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                {editMode && (
                  <motion.div
                    className="absolute bottom-0 right-0 bg-background p-2 rounded-full shadow-sm cursor-pointer"
                    whileHover={{ scale: 1.1 }}
                  >
                    <User className="h-4 w-4" />
                  </motion.div>
                )}
              </motion.div>

              <div className="flex-1 space-y-4">
                {editMode ? (
                  <>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Full Name</label>
                      <Input
                        name="name"
                        value={formData.name || ""}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Email</label>
                      <Input
                        name="email"
                        value={formData.email || ""}
                        onChange={handleInputChange}
                        disabled // Email typically shouldn't be editable
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Class</label>
                        <Input
                          name="class"
                          value={formData.class || ""}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Section</label>
                        <Input
                          name="section"
                          value={formData.section || ""}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <motion.h3
                      className="text-2xl font-bold"
                      whileHover={{ x: 5 }}
                    >
                      {profile?.name}
                    </motion.h3>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Mail className="h-4 w-4" />
                      <span>{profile?.email}</span>
                    </div>
                    <div className="flex gap-4">
                      <div className="flex items-center gap-2">
                        <div className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 rounded-full text-sm">
                          Class {profile?.class}
                        </div>
                        <div className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-300 rounded-full text-sm">
                          Sec {profile?.section}
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Date of Birth
                </label>
                {editMode ? (
                  <Input
                    type="date"
                    name="dob"
                    value={formData.dob || ""}
                    onChange={handleInputChange}
                  />
                ) : (
                  <div className="p-2 rounded bg-muted/50">
                    {profile?.dob
                      ? format(new Date(profile.dob), "MMMM d, yyyy")
                      : "N/A"}
                  </div>
                )}
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Gender</label>
                {editMode ? (
                  <Select
                    value={formData.gender || ""}
                    onValueChange={(value) =>
                      setFormData({ ...formData, gender: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                ) : (
                  <div className="p-2 rounded bg-muted/50 capitalize">
                    {profile?.gender || "N/A"}
                  </div>
                )}
              </div>
            </div>

            {editMode && (
              <motion.div
                className="flex justify-end mt-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <Button
                  onClick={handleSave}
                  className="gap-2"
                  whileHover={{ scale: 1.05 }}
                >
                  Save Changes
                </Button>
              </motion.div>
            )}
          </Card>
        </motion.div>

        {/* Achievements Card - Removed since not in backend data */}
        {/* You can add this back if you implement achievements later */}

        {/* School Info Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="md:col-span-2"
        >
          <Card className="p-6 border-l-4 border-blue-400 hover:shadow-lg transition-shadow">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <School className="text-blue-500" />
              School Information
            </h3>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-sm font-medium text-muted-foreground">
                  Name
                </label>
                <p className="font-medium">{profile?.school?.name}</p>
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium text-muted-foreground">
                  District
                </label>
                <p className="font-medium">{profile?.school?.district}</p>
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium text-muted-foreground">
                  State
                </label>
                <p className="font-medium">{profile?.school?.state}</p>
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium text-muted-foreground">
                  Address
                </label>
                <p className="font-medium">
                  {profile?.school?.address || "N/A"}
                </p>
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium text-muted-foreground">
                  Principal
                </label>
                <p className="font-medium">
                  {profile?.school?.head_name || "N/A"}
                </p>
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium text-muted-foreground">
                  Contact
                </label>
                <p className="font-medium">{profile?.school?.phone || "N/A"}</p>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Mentor Info Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="p-6 border-l-4 border-purple-400 hover:shadow-lg transition-shadow h-full">
            <h3 className="text-xl font-bold mb-6">Mentor Details</h3>

            {profile?.mentor ? (
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-300">
                    <User className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-medium">{profile.mentor.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      {profile.mentor.email}
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-muted-foreground">
                      Contact
                    </label>
                    <p className="font-medium">
                      {profile.mentor.phone || "Not provided"}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-muted-foreground">
                      Gender
                    </label>
                    <p className="font-medium capitalize">
                      {profile.mentor.gender || "Not specified"}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-muted-foreground">No mentor assigned</p>
            )}
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
