import { Shield } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function AppLogo() {
  const navigate = useNavigate();

  return (
    <motion.div
      className="flex items-center gap-3 cursor-pointer group"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => navigate("/")}
    >
      <motion.div
        className="relative flex overflow-hidden rounded-full p-2 bg-gradient-to-br from-blue-500 to-teal-400 dark:from-blue-600 dark:to-teal-500"
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{
          repeat: Infinity,
          repeatType: "loop",
          duration: 20,
          ease: "linear",
        }}
        whileHover={{
          scale: 1.1,
          rotate: 0,
          transition: { duration: 0.5 },
        }}
      >
        <Shield
          size={30}
          className="text-white group-hover:scale-110 transition-transform"
          fill="currentColor"
        />
      </motion.div>

      <div className="flex flex-col gap-1">
        <motion.h1
          className="text-2xl font-bold leading-none dark:text-white bg-gradient-to-r from-blue-600 to-teal-500 dark:from-blue-400 dark:to-teal-300 bg-clip-text text-transparent"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          SwasthyaSetu
        </motion.h1>
        <motion.p
          className="text-sm leading-none text-muted-foreground font-medium"
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          healthcare redefined
        </motion.p>
      </div>
    </motion.div>
  );
}
