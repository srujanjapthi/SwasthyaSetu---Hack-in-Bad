import { useState } from "react";
import {
  Plus,
  Search,
  Edit,
  Trash,
  Eye,
  School,
  MapPin,
  Users,
  User,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const SchoolManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddingSchool, setIsAddingSchool] = useState(false);
  const [newSchool, setNewSchool] = useState({
    name: "",
    district: "",
    state: "",
    studentCount: "",
    staffCount: "",
  });

  const [schools, setSchools] = useState([
    {
      id: "1",
      name: "North High School",
      district: "North District",
      state: "California",
      studentCount: 1245,
      staffCount: 87,
      location: { latitude: 37.7749, longitude: -122.4194 },
      status: "active",
    },
    {
      id: "2",
      name: "East Elementary School",
      district: "East District",
      state: "New York",
      studentCount: 732,
      staffCount: 42,
      location: { latitude: 40.7128, longitude: -74.006 },
      status: "active",
    },
    {
      id: "3",
      name: "South Middle School",
      district: "South District",
      state: "Texas",
      studentCount: 895,
      staffCount: 56,
      location: { latitude: 29.7604, longitude: -95.3698 },
      status: "pending",
    },
    {
      id: "4",
      name: "West High School",
      district: "West District",
      state: "Washington",
      studentCount: 1087,
      staffCount: 76,
      location: { latitude: 47.6062, longitude: -122.3321 },
      status: "active",
    },
    {
      id: "5",
      name: "Central Academy",
      district: "Central District",
      state: "Illinois",
      studentCount: 1532,
      staffCount: 98,
      location: { latitude: 41.8781, longitude: -87.6298 },
      status: "active",
    },
  ]);

  const filteredSchools = schools.filter(
    (school) =>
      school.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      school.district.toLowerCase().includes(searchTerm.toLowerCase()) ||
      school.state.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleAddSchool = () => setIsAddingSchool(true);
  const handleCancelAdd = () => setIsAddingSchool(false);

  const handleSaveSchool = () => {
    const school = {
      id: (schools.length + 1).toString(),
      ...newSchool,
      studentCount: parseInt(newSchool.studentCount),
      staffCount: parseInt(newSchool.staffCount),
      location: { latitude: 0, longitude: 0 },
      status: "pending",
    };
    setSchools([...schools, school]);
    setNewSchool({
      name: "",
      district: "",
      state: "",
      studentCount: "",
      staffCount: "",
    });
    setIsAddingSchool(false);
  };

  const handleDeleteSchool = (id) => {
    if (window.confirm("Are you sure you want to delete this school?")) {
      setSchools(schools.filter((school) => school.id !== id));
    }
  };
  const handleEditSchool = (id) => alert(`Edit School ${id} form opens here.`);
  const handleViewSchool = (id) => alert(`View School ${id} details here.`);

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300";
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300";
      case "inactive":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            School Management
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage all registered schools in the system
          </p>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleAddSchool}
            className="flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-4 py-2.5 rounded-lg shadow-lg transition-all"
          >
            <Plus size={18} />
            Add School
          </motion.button>
        </div>
      </motion.div>

      {/* Search and Filters */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="flex flex-col md:flex-row gap-4 mb-8"
      >
        <div className="relative flex-1">
          <Search
            size={20}
            className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400 dark:text-gray-500 pointer-events-none"
          />
          <input
            type="text"
            placeholder="Search schools by name, district or state..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:focus:ring-indigo-500 focus:border-indigo-400 dark:focus:border-indigo-500 transition bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm"
          />
        </div>
      </motion.div>

      {/* Add School Form */}
      <AnimatePresence>
        {isAddingSchool && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-6 overflow-hidden"
          >
            <Card className="border-l-4 border-indigo-500 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <School className="h-5 w-5 text-indigo-500" />
                  Add New School
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      School Name
                    </label>
                    <input
                      type="text"
                      value={newSchool.name}
                      onChange={(e) =>
                        setNewSchool({ ...newSchool, name: e.target.value })
                      }
                      className="w-full px-3 py-2 border rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      District
                    </label>
                    <input
                      type="text"
                      value={newSchool.district}
                      onChange={(e) =>
                        setNewSchool({ ...newSchool, district: e.target.value })
                      }
                      className="w-full px-3 py-2 border rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      State
                    </label>
                    <input
                      type="text"
                      value={newSchool.state}
                      onChange={(e) =>
                        setNewSchool({ ...newSchool, state: e.target.value })
                      }
                      className="w-full px-3 py-2 border rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Student Count
                    </label>
                    <input
                      type="number"
                      value={newSchool.studentCount}
                      onChange={(e) =>
                        setNewSchool({
                          ...newSchool,
                          studentCount: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Staff Count
                    </label>
                    <input
                      type="number"
                      value={newSchool.staffCount}
                      onChange={(e) =>
                        setNewSchool({
                          ...newSchool,
                          staffCount: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border rounded-lg"
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-3 mt-4">
                  <Button variant="outline" onClick={handleCancelAdd}>
                    Cancel
                  </Button>
                  <Button onClick={handleSaveSchool}>Save School</Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Schools Table */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700"
      >
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                {[
                  { name: "Name", icon: School },
                  { name: "District", icon: MapPin },
                  { name: "State" },
                  { name: "Students", icon: Users },
                  { name: "Staff", icon: User },
                  { name: "Status" },
                  { name: "Actions" },
                ].map((heading) => (
                  <th
                    key={heading.name}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                  >
                    <div className="flex items-center gap-2">
                      {heading.icon && <heading.icon className="h-4 w-4" />}
                      {heading.name}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              <AnimatePresence>
                {filteredSchools.length > 0 ? (
                  filteredSchools.map((school) => (
                    <motion.tr
                      key={school.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      layout
                      className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-300">
                            <School className="h-5 w-5" />
                          </div>
                          <div className="ml-4">
                            <div className="font-medium text-gray-900 dark:text-white">
                              {school.name}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-700 dark:text-gray-300">
                        {school.district}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-700 dark:text-gray-300">
                        {school.state}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-700 dark:text-gray-300">
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-indigo-500" />
                          {school.studentCount.toLocaleString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-700 dark:text-gray-300">
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4 text-indigo-500" />
                          {school.staffCount.toLocaleString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 py-1 text-xs rounded-full ${getStatusColor(school.status)}`}
                        >
                          {school.status.charAt(0).toUpperCase() +
                            school.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap space-x-2">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleViewSchool(school.id)}
                          className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300 p-2 rounded-full hover:bg-indigo-50 dark:hover:bg-indigo-900/20"
                          aria-label="View"
                          title="View School"
                        >
                          <Eye size={18} />
                        </motion.button>

                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleEditSchool(school.id)}
                          className="text-yellow-500 hover:text-yellow-700 dark:text-yellow-400 dark:hover:text-yellow-300 p-2 rounded-full hover:bg-yellow-50 dark:hover:bg-yellow-900/20"
                          aria-label="Edit"
                          title="Edit School"
                        >
                          <Edit size={18} />
                        </motion.button>

                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleDeleteSchool(school.id)}
                          className="text-red-600 hover:text-red-800 dark:text-red-500 dark:hover:text-red-400 p-2 rounded-full hover:bg-red-50 dark:hover:bg-red-900/20"
                          aria-label="Delete"
                          title="Delete School"
                        >
                          <Trash size={18} />
                        </motion.button>
                      </td>
                    </motion.tr>
                  ))
                ) : (
                  <motion.tr
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <td
                      colSpan={7}
                      className="text-center py-12 text-gray-500 dark:text-gray-400"
                    >
                      <div className="flex flex-col items-center justify-center gap-2">
                        <Search
                          size={40}
                          className="text-gray-300 dark:text-gray-600"
                        />
                        <p className="text-lg font-medium">
                          No schools found matching "{searchTerm}"
                        </p>
                        <p className="text-sm">
                          Try adjusting your search or add a new school
                        </p>
                      </div>
                    </td>
                  </motion.tr>
                )}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
};

export default SchoolManagement;

// Helper components
const Card = ({ children, className = "" }) => (
  <div
    className={`bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 ${className}`}
  >
    {children}
  </div>
);

const CardHeader = ({ children }) => (
  <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
    {children}
  </div>
);

const CardContent = ({ children }) => <div className="p-6">{children}</div>;

const Button = ({ children, onClick, variant = "default", className = "" }) => {
  const baseClasses = "px-4 py-2 rounded-lg font-medium transition-all";
  const variantClasses = {
    default:
      "bg-indigo-600 hover:bg-indigo-700 text-white shadow hover:shadow-md",
    outline:
      "border border-gray-300 dark:border-gray-600 hover:border-indigo-500 text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400",
  };

  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
    >
      {children}
    </button>
  );
};
