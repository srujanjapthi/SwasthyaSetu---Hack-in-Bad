import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon, User, BookOpen, Shield, X } from "lucide-react";
import { useTheme } from "@/context/ThemeStore";
import AppLogo from "@/components/AppLogo";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { theme, setTheme } = useTheme();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);
  const navigate = useNavigate();

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const handleLoginClick = () => {
    setShowLoginModal(true);
    setSelectedRole(null);
  };

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
    // Show loading state for 1 second before navigating
    setTimeout(() => {
      setIsAuthenticated(true);
      setShowLoginModal(false);
      navigate(`/${role}/login`);
    }, 1000);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className={`flex items-center justify-between w-full px-4 sm:px-8 py-4 border-b sticky top-0 z-50 
          ${theme === "light"
            ? "bg-white/80 backdrop-blur-lg border-neutral-200"
            : "bg-neutral-900/80 backdrop-blur-lg border-neutral-800"
          }`}
      >
        <div className="flex items-center">
          <AppLogo />
        </div>
        <div className="flex-1 mx-6">
          <input
            type="text"
            placeholder="Search health records..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex items-center gap-4">
          <motion.button
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.05 }}
            onClick={toggleTheme}
            className={`flex items-center gap-2 p-2 rounded-full transition-all cursor-pointer
            ${theme === "light"
                ? "text-amber-500 hover:bg-amber-50"
                : "text-indigo-300 hover:bg-neutral-800"
              }`}
            aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
          >
            {theme === "light" ? (
              <motion.div
                key="sun"
                initial={{ rotate: 0, scale: 0.8 }}
                animate={{ rotate: 360, scale: 1 }}
                transition={{ type: "spring", stiffness: 500 }}
              >
                <Sun className="w-5 h-5" />
              </motion.div>
            ) : (
              <motion.div
                key="moon"
                initial={{ rotate: 0, scale: 0.8 }}
                animate={{ rotate: 360, scale: 1 }}
                transition={{ type: "spring", stiffness: 500 }}
              >
                <Moon className="w-5 h-5" />
              </motion.div>
            )}
            <span className="hidden sm:inline">
              {theme === "light" ? "Dark Mode" : "Light Mode"}
            </span>
          </motion.button>

          {/* Modified Auth Buttons */}
          {!isAuthenticated ? (
            <button
              onClick={handleLoginClick}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer"
            >
              Login
            </button>
          ) : (
            <button
              onClick={() => setIsAuthenticated(false)}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors cursor-pointer"
            >
              Logout
            </button>
          )}
        </div>
      </motion.nav>

      {/* Login Modal */}
      <AnimatePresence>
        {showLoginModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`fixed inset-0 z-50 flex items-center justify-center p-4 ${theme === "light" ? "bg-black/30" : "bg-black/70"
              } backdrop-blur-sm`}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 20 }}
              className={`relative rounded-xl shadow-2xl max-w-md w-full overflow-hidden ${theme === "light"
                  ? "bg-white border border-gray-200"
                  : "bg-gray-900 border border-gray-800"
                }`}
            >
              <button
                onClick={() => setShowLoginModal(false)}
                className={`absolute top-4 right-4 p-1 rounded-full cursor-pointer ${theme === "light"
                    ? "hover:bg-gray-100"
                    : "hover:bg-gray-800"
                  }`}
              >
                <X className="w-5 h-5" />
              </button>

              <div className="p-8">
                {!selectedRole ? (
                  <>
                    <div className="text-center mb-8">
                      <h2 className={`text-2xl font-bold mb-2 ${theme === "light" ? "text-gray-900" : "text-white"
                        }`}>
                        Welcome Back!
                      </h2>
                      <p className={`${theme === "light" ? "text-gray-600" : "text-gray-400"
                        }`}>
                        Please select your role to continue
                      </p>
                    </div>

                    <div className="grid grid-cols-1 gap-4">
                      {[
                        {
                          role: "student",
                          icon: <User className="w-6 h-6" />,
                          title: "Student",
                          description: "Access your health records and analytics"
                        },
                        {
                          role: "teacher",
                          icon: <BookOpen className="w-6 h-6" />,
                          title: "Teacher",
                          description: "Monitor student health and reports"
                        },
                        {
                          role: "admin",
                          icon: <Shield className="w-6 h-6" />,
                          title: "Administrator",
                          description: "Manage system settings and users"
                        }
                      ].map((item) => (
                        <motion.button
                          key={item.role}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handleRoleSelect(item.role)}
                          className={`flex items-start gap-4 p-4 rounded-lg text-left transition-all cursor-pointer ${theme === "light"
                              ? "hover:bg-gray-50 border border-gray-200"
                              : "hover:bg-gray-800 border border-gray-700"
                            }`}
                        >
                          <div className={`p-3 rounded-full ${theme === "light"
                              ? "bg-blue-100 text-blue-600"
                              : "bg-blue-900/50 text-blue-400"
                            }`}>
                            {item.icon}
                          </div>
                          <div>
                            <h3 className={`font-semibold ${theme === "light" ? "text-gray-900" : "text-white"
                              }`}>
                              {item.title}
                            </h3>
                            <p className={`text-sm ${theme === "light" ? "text-gray-600" : "text-gray-400"
                              }`}>
                              {item.description}
                            </p>
                          </div>
                        </motion.button>
                      ))}
                    </div>
                  </>
                ) : (
                  <div className="text-center py-8">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                      className={`inline-flex items-center justify-center p-4 rounded-full mb-4 ${theme === "light"
                          ? "bg-blue-100 text-blue-600"
                          : "bg-blue-900/50 text-blue-400"
                        }`}
                    >
                      {selectedRole === "student" && <User className="w-8 h-8" />}
                      {selectedRole === "teacher" && <BookOpen className="w-8 h-8" />}
                      {selectedRole === "admin" && <Shield className="w-8 h-8" />}
                    </motion.div>
                    <h3 className={`text-xl font-semibold mb-2 ${theme === "light" ? "text-gray-900" : "text-white"
                      }`}>
                    </h3>
                    <p className={`${theme === "light" ? "text-gray-600" : "text-gray-400"
                      }`}>
                      Please wait while we authenticate...
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;