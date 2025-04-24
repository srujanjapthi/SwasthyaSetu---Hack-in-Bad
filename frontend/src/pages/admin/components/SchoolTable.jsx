import { useState } from "react";
import { Plus, Download, Upload, Search, Edit, Trash, Eye } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const SchoolManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const [schools, setSchools] = useState([
    {
      id: "1",
      name: "North High School",
      district: "North District",
      state: "California",
      studentCount: 1245,
      staffCount: 87,
      location: { latitude: 37.7749, longitude: -122.4194 },
    },
    {
      id: "2",
      name: "East Elementary School",
      district: "East District",
      state: "New York",
      studentCount: 732,
      staffCount: 42,
      location: { latitude: 40.7128, longitude: -74.006 },
    },
    {
      id: "3",
      name: "South Middle School",
      district: "South District",
      state: "Texas",
      studentCount: 895,
      staffCount: 56,
      location: { latitude: 29.7604, longitude: -95.3698 },
    },
    {
      id: "4",
      name: "West High School",
      district: "West District",
      state: "Washington",
      studentCount: 1087,
      staffCount: 76,
      location: { latitude: 47.6062, longitude: -122.3321 },
    },
    {
      id: "5",
      name: "Central Academy",
      district: "Central District",
      state: "Illinois",
      studentCount: 1532,
      staffCount: 98,
      location: { latitude: 41.8781, longitude: -87.6298 },
    },
  ]);

  const filteredSchools = schools.filter(
    (school) =>
      school.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      school.district.toLowerCase().includes(searchTerm.toLowerCase()) ||
      school.state.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddSchool = () => alert("Add School form opens here.");
  const handleDeleteSchool = (id) => {
    if (window.confirm("Are you sure you want to delete this school?")) {
      setSchools(schools.filter((school) => school.id !== id));
    }
  };
  const handleEditSchool = (id) => alert(`Edit School ${id} form opens here.`);
  const handleViewSchool = (id) => alert(`View School ${id} details here.`);
  const handleImport = () => alert("Import file dialog here.");
  const handleExport = () => alert("Export CSV/Excel here.");

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
        <h1 className="text-3xl font-semibold text-gray-900">
          School Management
        </h1>

        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          <button
            onClick={handleAddSchool}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg shadow-md transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          >
            <Plus size={18} />
            Add School
          </button>

          <div className="flex gap-2">
            <button
              onClick={handleImport}
              className="flex items-center gap-1 border border-gray-300 hover:border-indigo-600 text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-300"
              aria-label="Import"
            >
              <Upload size={16} />
              Import
            </button>
            <button
              onClick={handleExport}
              className="flex items-center gap-1 border border-gray-300 hover:border-indigo-600 text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-300"
              aria-label="Export"
            >
              <Download size={16} />
              Export
            </button>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="relative max-w-md mb-8">
        <Search
          size={20}
          className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400 pointer-events-none"
        />
        <input
          type="text"
          placeholder="Search schools..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition"
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl shadow-lg border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200 bg-white">
          <thead className="bg-gray-50">
            <tr>
              {[
                "Name",
                "District",
                "State",
                "Students",
                "Staff",
                "Actions",
              ].map((heading) => (
                <th
                  key={heading}
                  className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider"
                >
                  {heading}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            <AnimatePresence>
              {filteredSchools.length > 0 ? (
                filteredSchools.map((school) => (
                  <motion.tr
                    key={school.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    layout
                    className="hover:bg-indigo-50 cursor-pointer"
                  >
                    <td className="whitespace-nowrap px-6 py-4 font-medium text-gray-900">
                      {school.name}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-gray-700">
                      {school.district}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-gray-700">
                      {school.state}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-gray-700">
                      {school.studentCount.toLocaleString()}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-gray-700">
                      {school.staffCount.toLocaleString()}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-right space-x-2">
                      {/* Action buttons */}
                      <motion.button
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleViewSchool(school.id)}
                        className="text-indigo-600 hover:text-indigo-900 focus:outline-none"
                        aria-label="View"
                        title="View School"
                      >
                        <Eye size={20} />
                      </motion.button>

                      <motion.button
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleEditSchool(school.id)}
                        className="text-yellow-500 hover:text-yellow-700 focus:outline-none"
                        aria-label="Edit"
                        title="Edit School"
                      >
                        <Edit size={20} />
                      </motion.button>

                      <motion.button
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleDeleteSchool(school.id)}
                        className="text-red-600 hover:text-red-800 focus:outline-none"
                        aria-label="Delete"
                        title="Delete School"
                      >
                        <Trash size={20} />
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
                    colSpan={6}
                    className="text-center py-6 text-gray-500 italic select-none"
                  >
                    No schools found matching "{searchTerm}"
                  </td>
                </motion.tr>
              )}
            </AnimatePresence>
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="mt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-gray-600 text-sm">
        <p>
          Showing{" "}
          <span className="font-semibold">{filteredSchools.length}</span> school
          {filteredSchools.length !== 1 ? "s" : ""}
        </p>
        <div className="flex gap-2">
          <button
            disabled
            className="px-3 py-1 rounded-md border border-gray-300 text-gray-400 cursor-not-allowed select-none"
          >
            Previous
          </button>
          <button
            disabled
            className="px-3 py-1 rounded-md border border-gray-300 text-gray-400 cursor-not-allowed select-none"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default SchoolManagement;
