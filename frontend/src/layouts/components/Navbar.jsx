import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sun,
  Moon,
  User,
  BookOpen,
  Shield,
  X,
  Search,
  LogIn,
  LogOut,
} from "lucide-react";
import { useTheme } from "@/context/ThemeStore";
import AppLogo from "@/components/AppLogo";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { theme, setTheme } = useTheme();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
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
    setTimeout(() => {
      setIsAuthenticated(true);
      setShowLoginModal(false);
      navigate(`/${role}/login`);
    }, 1000);
  };

  const roles = [
    {
      role: "student",
      icon: <User className="w-5 h-5" />,
      title: "Student",
      description: "Access your health records and analytics",
    },
    {
      role: "teacher",
      icon: <BookOpen className="w-5 h-5" />,
      title: "Teacher",
      description: "Monitor student health and reports",
    },
    {
      role: "admin",
      icon: <Shield className="w-5 h-5" />,
      title: "Administrator",
      description: "Manage system settings and users",
    },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className={`flex items-center justify-between w-full px-4 sm:px-8 py-3 sticky top-0 z-50 
          ${
            theme === "light"
              ? "bg-white/90 backdrop-blur-md border-b border-neutral-100"
              : "bg-neutral-900/90 backdrop-blur-md border-b border-neutral-800"
          }`}
      >
        {/* Logo */}
        <motion.div whileHover={{ scale: 1.03 }} className="flex items-center">
          <AppLogo />
        </motion.div>

        {/* Search Bar */}
        <motion.div
          className={`flex-1 mx-4 sm:mx-8 transition-all duration-300 ${
            isSearchFocused ? "max-w-2xl" : "max-w-xl"
          }`}
          layout
        >
          <div className="relative">
            <motion.div
              animate={{
                x: isSearchFocused ? -8 : 0,
                opacity: isSearchFocused ? 0 : 1,
              }}
              transition={{ type: "spring", stiffness: 300 }}
              className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
            >
              <Search className="h-5 w-5 text-gray-400" />
            </motion.div>
            <motion.input
              type="text"
              placeholder="Search health records..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
              className={`w-full pl-10 pr-4 py-2 rounded-xl border focus:outline-none focus:ring-2 transition-all
                ${
                  theme === "light"
                    ? "bg-gray-50 border-gray-200 focus:border-blue-500 focus:ring-blue-500/20"
                    : "bg-gray-800 border-gray-700 focus:border-blue-400 focus:ring-blue-400/20"
                }`}
            />
          </div>
        </motion.div>

        {/* Actions */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Theme Toggle */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.05 }}
            onClick={toggleTheme}
            className={`p-2 rounded-full transition-all cursor-pointer
              ${
                theme === "light"
                  ? "text-amber-500 hover:bg-amber-50"
                  : "text-indigo-300 hover:bg-neutral-800"
              }`}
            aria-label={`Switch to ${
              theme === "light" ? "dark" : "light"
            } mode`}
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
          </motion.button>

          {/* Auth Button */}
          {!isAuthenticated ? (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLoginClick}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl transition-colors cursor-pointer
                ${
                  theme === "light"
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : "bg-blue-700 text-white hover:bg-blue-600"
                }`}
            >
              <LogIn className="w-4 h-4" />
              <span className="hidden sm:inline text-sm font-medium">
                Login
              </span>
            </motion.button>
          ) : (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsAuthenticated(false)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl transition-colors cursor-pointer
                ${
                  theme === "light"
                    ? "bg-red-500 text-white hover:bg-red-600"
                    : "bg-red-600 text-white hover:bg-red-500"
                }`}
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline text-sm font-medium">
                Logout
              </span>
            </motion.button>
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
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 20, stiffness: 300 }}
              className={`relative rounded-2xl shadow-2xl max-w-md w-full overflow-hidden ${
                theme === "light"
                  ? "bg-white border border-gray-200"
                  : "bg-gray-900 border border-gray-800"
              }`}
            >
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setShowLoginModal(false)}
                className={`absolute top-4 right-4 p-1.5 rounded-full cursor-pointer ${
                  theme === "light"
                    ? "hover:bg-gray-100 text-gray-500"
                    : "hover:bg-gray-800 text-gray-400"
                }`}
              >
                <X className="w-5 h-5" />
              </motion.button>

              <div className="p-6">
                {!selectedRole ? (
                  <>
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                      className="text-center mb-8"
                    >
                      <h2
                        className={`text-2xl font-bold mb-2 ${
                          theme === "light" ? "text-gray-900" : "text-white"
                        }`}
                      >
                        Welcome Back!
                      </h2>
                      <p
                        className={`${
                          theme === "light" ? "text-gray-600" : "text-gray-400"
                        }`}
                      >
                        Please select your role to continue
                      </p>
                    </motion.div>

                    <motion.div
                      className="grid grid-cols-1 gap-3"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ staggerChildren: 0.1 }}
                    >
                      {roles.map((item) => (
                        <motion.button
                          key={item.role}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handleRoleSelect(item.role)}
                          className={`flex items-start gap-3 p-3 rounded-lg text-left transition-all cursor-pointer ${
                            theme === "light"
                              ? "hover:bg-gray-50 border border-gray-200"
                              : "hover:bg-gray-800 border border-gray-700"
                          }`}
                        >
                          <div
                            className={`p-2 rounded-lg ${
                              theme === "light"
                                ? "bg-blue-100 text-blue-600"
                                : "bg-blue-900/50 text-blue-400"
                            }`}
                          >
                            {item.icon}
                          </div>
                          <div>
                            <h3
                              className={`font-medium ${
                                theme === "light"
                                  ? "text-gray-900"
                                  : "text-white"
                              }`}
                            >
                              {item.title}
                            </h3>
                            <p
                              className={`text-sm ${
                                theme === "light"
                                  ? "text-gray-600"
                                  : "text-gray-400"
                              }`}
                            >
                              {item.description}
                            </p>
                          </div>
                        </motion.button>
                      ))}
                    </motion.div>
                  </>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-8"
                  >
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        repeat: Infinity,
                        duration: 1,
                        ease: "linear",
                      }}
                      className={`inline-flex items-center justify-center p-4 rounded-full mb-4 ${
                        theme === "light"
                          ? "bg-blue-100 text-blue-600"
                          : "bg-blue-900/50 text-blue-400"
                      }`}
                    >
                      {selectedRole === "student" && (
                        <User className="w-6 h-6" />
                      )}
                      {selectedRole === "teacher" && (
                        <BookOpen className="w-6 h-6" />
                      )}
                      {selectedRole === "admin" && (
                        <Shield className="w-6 h-6" />
                      )}
                    </motion.div>
                    <h3
                      className={`text-xl font-semibold mb-2 ${
                        theme === "light" ? "text-gray-900" : "text-white"
                      }`}
                    >
                      Redirecting to{" "}
                      {roles.find((r) => r.role === selectedRole)?.title}{" "}
                      login...
                    </h3>
                    <p
                      className={`${
                        theme === "light" ? "text-gray-600" : "text-gray-400"
                      }`}
                    >
                      Please wait while we authenticate
                    </p>
                  </motion.div>
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
