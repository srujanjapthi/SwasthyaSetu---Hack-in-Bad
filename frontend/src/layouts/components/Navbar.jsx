import AppLogo from "@/components/AppLogo";
import { useTheme } from "@/context/ThemeStore";
import { motion } from "framer-motion";
import { Sun, Moon } from "lucide-react";

export default function Navbar() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={`flex items-center justify-between w-full px-4 sm:px-8 md:px-12 lg:px-16 py-4 border-b sticky top-0 z-50 
        ${
          theme === "light"
            ? "bg-white/80 backdrop-blur-lg border-neutral-200"
            : "bg-neutral-900/80 backdrop-blur-lg border-neutral-800"
        }`}
    >
      <div className="flex items-center">
        <AppLogo />
      </div>

      <div className="flex items-center gap-4">
        <motion.button
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.05 }}
          onClick={toggleTheme}
          className={`flex items-center gap-2 p-2 rounded-full transition-all
            ${
              theme === "light"
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
      </div>
    </motion.nav>
  );
}
