import React, { useState, useEffect } from "react";
import {
  FileText,
  Download,
  ChevronRight,
  ChevronDown,
  Plus,
  Search,
  Calendar,
  X,
  Check,
  FileUp,
  FilePlus2,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const sampleMedicalRecords = [
  {
    _id: "1",
    student_id: "S12345",
    name: "Annual Physical Examination",
    description: "Complete physical examination with blood work and vitals",
    record_url: "/documents/physical-exam-2025.pdf",
    createdAt: "2025-01-15T14:30:00Z",
    type: "Examination",
    doctor: "Dr. Sarah Johnson",
  },
  {
    _id: "2",
    student_id: "S12345",
    name: "Vaccination Record",
    description: "COVID-19 booster shot and flu vaccination records",
    record_url: "/documents/vaccination-report.pdf",
    createdAt: "2025-02-10T09:15:00Z",
    type: "Vaccination",
    doctor: "Dr. Michael Chen",
  },
  {
    _id: "3",
    student_id: "S12345",
    name: "Allergy Test Results",
    description:
      "Comprehensive allergy panel testing results and recommendations",
    record_url: "/documents/allergy-test-results.pdf",
    createdAt: "2025-03-05T11:20:00Z",
    type: "Test Results",
    doctor: "Dr. Emily Rodriguez",
  },
  {
    _id: "4",
    student_id: "S12345",
    name: "Vision Screening",
    description: "Annual vision screening exam and prescription update",
    record_url: "/documents/vision-screening.pdf",
    createdAt: "2025-03-22T13:45:00Z",
    type: "Examination",
    doctor: "Dr. James Wilson",
  },
  {
    _id: "5",
    student_id: "S12345",
    name: "Dental Records",
    description: "Bi-annual dental check-up with x-rays and cleaning",
    record_url: "/documents/dental-checkup.pdf",
    createdAt: "2024-12-05T10:30:00Z",
    type: "Dental",
    doctor: "Dr. Lisa Park",
  },
];

// Function to group records by month and year
const groupRecordsByDate = (records) => {
  const grouped = {};

  records.forEach((record) => {
    const date = new Date(record.createdAt);
    const year = date.getFullYear();
    const month = date.toLocaleString("default", { month: "long" });

    if (!grouped[year]) {
      grouped[year] = {};
    }

    if (!grouped[year][month]) {
      grouped[year][month] = [];
    }

    grouped[year][month].push(record);
  });

  return grouped;
};

const MedicalRecordForm = ({ onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    type: "",
    doctor: "",
    file: null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prev) => ({ ...prev, file: e.target.files[0] }));
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFormData((prev) => ({ ...prev, file: e.dataTransfer.files[0] }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Create a new record object
    const newRecord = {
      _id: Math.random().toString(36).substring(2, 15),
      student_id: "S12345",
      name: formData.name,
      description: formData.description,
      type: formData.type,
      doctor: formData.doctor,
      record_url: formData.file
        ? URL.createObjectURL(formData.file)
        : "/documents/default.pdf",
      createdAt: new Date().toISOString(),
    };

    // Simulate API call delay
    setTimeout(() => {
      onSubmit(newRecord);
      setIsSubmitting(false);
      onClose();
    }, 1000);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4"
    >
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -20, opacity: 0 }}
        className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-md w-full overflow-hidden border border-gray-200 dark:border-gray-700"
      >
        <div className="flex justify-between items-center p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Add Medical Record
          </h2>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            aria-label="Close"
          >
            <X size={20} className="text-gray-500 dark:text-gray-400" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Record Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white transition-all"
                placeholder="e.g. Annual Physical Examination"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Description *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white h-24 transition-all"
                placeholder="Brief description of the medical record"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Record Type
                </label>
                <input
                  type="text"
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white transition-all"
                  placeholder="e.g. Examination, Vaccination"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Doctor/Provider
                </label>
                <input
                  type="text"
                  name="doctor"
                  value={formData.doctor}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white transition-all"
                  placeholder="e.g. Dr. Smith"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Upload Document *
              </label>
              <div
                className={`relative border-2 ${dragActive ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20" : "border-dashed border-gray-300 dark:border-gray-600"} rounded-lg p-6 transition-all`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <div className="text-center">
                  {formData.file ? (
                    <>
                      <FileUp className="mx-auto h-10 w-10 text-blue-500" />
                      <p className="mt-2 text-sm font-medium text-gray-900 dark:text-white">
                        {formData.file.name}
                      </p>
                      <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                        {(formData.file.size / 1024).toFixed(1)} KB
                      </p>
                    </>
                  ) : (
                    <>
                      <FilePlus2 className="mx-auto h-10 w-10 text-gray-400" />
                      <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                        <span className="font-medium text-blue-600 dark:text-blue-400">
                          Click to upload
                        </span>{" "}
                        or drag and drop
                      </p>
                      <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                        PDF, DOCX, JPG or PNG (max. 10MB)
                      </p>
                    </>
                  )}
                </div>
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                  required
                />
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 rounded-lg transition-colors flex items-center justify-center min-w-[120px]"
            >
              {isSubmitting ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Submitting...
                </>
              ) : (
                <>
                  <Check size={16} className="mr-2" />
                  Save Record
                </>
              )}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

const RecordCard = ({ record, onView }) => {
  const [isHovered, setIsHovered] = useState(false);

  const typeColors = {
    Examination:
      "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
    Vaccination:
      "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
    "Test Results":
      "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400",
    Dental:
      "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400",
    default: "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="border-l-2 border-blue-200 dark:border-blue-800 pl-4 pb-2"
    >
      <div
        className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => onView(record)}
      >
        <div className="flex items-start gap-3">
          <div
            className={`flex-shrink-0 p-2 rounded-lg ${typeColors[record.type] || typeColors.default}`}
          >
            <FileText size={18} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-start gap-2">
              <h3 className="text-md font-semibold text-gray-900 dark:text-white truncate">
                {record.name}
              </h3>
              <motion.div
                animate={{
                  opacity: isHovered ? 1 : 0,
                  x: isHovered ? 0 : 10,
                }}
                className="text-blue-600 dark:text-blue-400"
              >
                <Download size={16} />
              </motion.div>
            </div>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
              {record.description}
            </p>
            <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
              <span
                className={`px-2 py-1 rounded-full ${typeColors[record.type] || typeColors.default}`}
              >
                {record.type || "Medical"}
              </span>
              <span className="flex items-center text-gray-500 dark:text-gray-400">
                <Calendar size={12} className="mr-1" />
                {new Date(record.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </span>
              {record.doctor && (
                <span className="text-gray-500 dark:text-gray-400 truncate">
                  {record.doctor}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const MonthRecordsGroup = ({ month, records, onViewRecord }) => {
  const [expanded, setExpanded] = useState(true);

  return (
    <div className="mb-4 ml-4">
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex items-center text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 mb-2 group transition-colors"
      >
        {expanded ? (
          <ChevronDown
            size={18}
            className="mr-1 text-blue-500 group-hover:text-blue-600 dark:text-blue-400 dark:group-hover:text-blue-300 transition-transform"
          />
        ) : (
          <ChevronRight
            size={18}
            className="mr-1 text-blue-500 group-hover:text-blue-600 dark:text-blue-400 dark:group-hover:text-blue-300 transition-transform"
          />
        )}
        <span className="text-sm font-semibold">{month}</span>
        <span className="ml-2 text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 px-2 py-0.5 rounded-full">
          {records.length}
        </span>
      </button>

      {expanded && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="space-y-3 ml-6"
        >
          {records.map((record) => (
            <RecordCard
              key={record._id}
              record={record}
              onView={onViewRecord}
            />
          ))}
        </motion.div>
      )}
    </div>
  );
};

const YearRecordsGroup = ({ year, monthsData, onViewRecord }) => {
  const [expanded, setExpanded] = useState(true);

  const totalRecords = Object.values(monthsData).reduce(
    (sum, records) => sum + records.length,
    0,
  );

  return (
    <div className="mb-6">
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex items-center p-4 bg-gray-50 hover:bg-gray-100 dark:bg-gray-700/50 dark:hover:bg-gray-700 rounded-xl w-full text-left transition-colors"
      >
        {expanded ? (
          <ChevronDown
            size={20}
            className="text-blue-500 dark:text-blue-400 mr-3"
          />
        ) : (
          <ChevronRight
            size={20}
            className="text-blue-500 dark:text-blue-400 mr-3"
          />
        )}
        <span className="text-lg font-bold text-gray-800 dark:text-white">
          {year}
        </span>
        <span className="ml-2 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 px-2.5 py-0.5 rounded-full text-xs">
          {totalRecords} records
        </span>
      </button>

      {expanded && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="mt-3 border-l-2 border-gray-200 dark:border-gray-700 ml-5 pl-5"
        >
          {Object.entries(monthsData)
            .sort(([monthA], [monthB]) => {
              const monthOrder = [
                "January",
                "February",
                "March",
                "April",
                "May",
                "June",
                "July",
                "August",
                "September",
                "October",
                "November",
                "December",
              ];
              return monthOrder.indexOf(monthB) - monthOrder.indexOf(monthA);
            })
            .map(([month, records]) => (
              <MonthRecordsGroup
                key={`${year}-${month}`}
                month={month}
                records={records}
                onViewRecord={onViewRecord}
              />
            ))}
        </motion.div>
      )}
    </div>
  );
};

const MedicalRecordDetail = ({ record, onClose }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(record.student_id);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4"
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-2xl w-full overflow-hidden border border-gray-200 dark:border-gray-700"
      >
        <div className="flex justify-between items-center p-6 border-b border-gray-200 dark:border-gray-700">
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              {record.name}
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              {record.type || "Medical Record"}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            aria-label="Close"
          >
            <X size={20} className="text-gray-500 dark:text-gray-400" />
          </button>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                  Date Added
                </p>
                <p className="text-gray-900 dark:text-white font-medium">
                  {new Date(record.createdAt).toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                  Student ID
                </p>
                <div className="flex items-center">
                  <p className="text-gray-900 dark:text-white font-mono font-medium mr-2">
                    {record.student_id}
                  </p>
                  <button
                    onClick={copyToClipboard}
                    className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 p-1 rounded hover:bg-blue-50 dark:hover:bg-blue-900/20"
                    title="Copy to clipboard"
                  >
                    {copied ? (
                      <Check size={16} className="text-green-500" />
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <rect
                          x="9"
                          y="9"
                          width="13"
                          height="13"
                          rx="2"
                          ry="2"
                        ></rect>
                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                      </svg>
                    )}
                  </button>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {record.doctor && (
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                    Doctor/Provider
                  </p>
                  <p className="text-gray-900 dark:text-white font-medium">
                    {record.doctor}
                  </p>
                </div>
              )}

              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                  Document Type
                </p>
                <p className="text-gray-900 dark:text-white font-medium capitalize">
                  {record.type || "Medical Record"}
                </p>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
              Description
            </p>
            <p className="text-gray-900 dark:text-white p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              {record.description}
            </p>
          </div>

          <div className="mb-6 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700">
            <div className="p-4 bg-gray-50 dark:bg-gray-700 flex items-center">
              <FileText
                size={20}
                className="text-blue-500 dark:text-blue-400 mr-2"
              />
              <span className="text-gray-900 dark:text-white font-medium">
                Document Preview
              </span>
            </div>
            <div className="h-64 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 flex flex-col items-center justify-center">
              <FileText
                size={48}
                className="text-gray-300 dark:text-gray-600 mb-4"
              />
              <p className="text-gray-500 dark:text-gray-400 text-center px-4">
                Preview of {record.name} would appear here
              </p>
            </div>
          </div>
        </div>

        <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 rounded-lg transition-colors"
          >
            Close
          </button>
          <a
            href={record.record_url}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 rounded-lg transition-colors flex items-center"
          >
            <Download size={16} className="mr-2" />
            Download Document
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
};

const EmptyState = ({ searchQuery, onAddRecord }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="text-center py-12"
    >
      <div className="mx-auto w-24 h-24 bg-blue-50 dark:bg-blue-900/20 rounded-full flex items-center justify-center mb-6">
        <FileText size={40} className="text-blue-400 dark:text-blue-500" />
      </div>
      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">
        {searchQuery ? "No records found" : "No medical records yet"}
      </h3>
      <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-md mx-auto">
        {searchQuery
          ? "Try adjusting your search or filter to find what you're looking for."
          : "Add your first medical record to get started."}
      </p>
      {!searchQuery && (
        <button
          onClick={onAddRecord}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow flex items-center mx-auto transition-colors"
        >
          <Plus size={16} className="mr-2" />
          Add Medical Record
        </button>
      )}
    </motion.div>
  );
};

const MedicalRecordsSection = () => {
  const [records, setRecords] = useState([]);
  const [filteredRecords, setFilteredRecords] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);

  useEffect(() => {
    // Using sample data for demonstration
    setRecords(sampleMedicalRecords);
    setFilteredRecords(sampleMedicalRecords);
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredRecords(records);
    } else {
      const query = searchQuery.toLowerCase();
      const filtered = records.filter(
        (record) =>
          record.name.toLowerCase().includes(query) ||
          record.description.toLowerCase().includes(query) ||
          (record.type && record.type.toLowerCase().includes(query)) ||
          (record.doctor && record.doctor.toLowerCase().includes(query)),
      );
      setFilteredRecords(filtered);
    }
  }, [searchQuery, records]);

  const handleAddRecord = (newRecord) => {
    const updatedRecords = [newRecord, ...records];
    setRecords(updatedRecords);
    setFilteredRecords(updatedRecords);
  };

  const handleViewRecord = (record) => {
    setSelectedRecord(record);
  };

  const groupedRecords = groupRecordsByDate(filteredRecords);

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
              Medical Records
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">
              View and manage all your medical documents
            </p>
          </div>

          <button
            onClick={() => setShowAddForm(true)}
            className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-md flex items-center transition-colors whitespace-nowrap"
          >
            <Plus size={16} className="mr-2" />
            Add New Record
          </button>
        </div>

        <div className="mb-8">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm transition-all"
              placeholder="Search records by name, description, doctor..."
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                <X
                  size={18}
                  className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
                />
              </button>
            )}
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
          <div className="p-6">
            {Object.keys(groupedRecords).length > 0 ? (
              <div className="space-y-6">
                {Object.entries(groupedRecords)
                  .sort(([yearA], [yearB]) => parseInt(yearB) - parseInt(yearA))
                  .map(([year, monthsData]) => (
                    <YearRecordsGroup
                      key={year}
                      year={year}
                      monthsData={monthsData}
                      onViewRecord={handleViewRecord}
                    />
                  ))}
              </div>
            ) : (
              <EmptyState
                searchQuery={searchQuery}
                onAddRecord={() => setShowAddForm(true)}
              />
            )}
          </div>
        </div>

        {/* Add Record Modal */}
        {showAddForm && (
          <MedicalRecordForm
            onClose={() => setShowAddForm(false)}
            onSubmit={handleAddRecord}
          />
        )}

        {/* View Record Modal */}
        {selectedRecord && (
          <MedicalRecordDetail
            record={selectedRecord}
            onClose={() => setSelectedRecord(null)}
          />
        )}
      </div>
    </div>
  );
};

export default MedicalRecordsSection;
