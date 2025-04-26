import { Card } from "@/components/ui/card";
import { BarChart3, School, Users } from "lucide-react";
import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";
import axiosInstance from "@/lib/axios";

export default function AdminStats() {
  const [hoveredCard, setHoveredCard] = useState(null);
  const controls = useAnimation();

  const [totalSchools, setTotalSchools] = useState(0);
  const [totalTeachers, setTotalTeachers] = useState(0);
  const [totalStudents, setTotalStudents] = useState(0);

  const getTotalSchools = async () => {
    const response = await axiosInstance.get("/admin/schools");
    return response.data.totalSchools;
  };

  useEffect(() => {
    getTotalSchools().then((res) => {
      setTotalSchools(res);
    });
  }, []);

  const getTotalTeachers = async () => {
    const response = await axiosInstance.get("/admin/teachers");
    return response.data.totalTeachers;
  };

  useEffect(() => {
    getTotalTeachers().then((res) => {
      setTotalTeachers(res);
    });
  }, []);

  const getTotalStudents = async () => {
    const response = await axiosInstance.get("/admin/students");
    return response.data.totalStudents;
  };

  useEffect(() => {
    getTotalStudents().then((res) => {
      setTotalStudents(res);
    });
  }, []);

  const statCards = [
    {
      id: 1,
      title: "Total Schools",
      value: totalSchools,
      change: "↑ 8%",
      changeType: "positive",
      icon: School,
      bgColor:
        "bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20",
      borderColor: "border-blue-400",
      iconBg: "bg-blue-100 dark:bg-blue-900/30",
      iconColor: "text-blue-600 dark:text-blue-400",
      pulseColor: "bg-blue-200/40",
    },
    {
      id: 2,
      title: "Total Teachers",
      value: totalTeachers,
      change: "↑ 3%",
      changeType: "positive",
      icon: Users,
      bgColor:
        "bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20",
      borderColor: "border-green-400",
      iconBg: "bg-green-100 dark:bg-green-900/30",
      iconColor: "text-green-600 dark:text-green-400",
      pulseColor: "bg-green-200/40",
    },
    {
      id: 3,
      title: "Total Students",
      value: totalStudents,
      change: "↑ 5%",
      changeType: "positive",
      icon: Users,
      bgColor:
        "bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20",
      borderColor: "border-purple-400",
      iconBg: "bg-purple-100 dark:bg-purple-900/30",
      iconColor: "text-purple-600 dark:text-purple-400",
      pulseColor: "bg-purple-200/40",
    },
    {
      id: 4,
      title: "Health Score",
      value: "78%",
      change: "↓ 2%",
      changeType: "negative",
      icon: BarChart3,
      bgColor:
        "bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-900/20 dark:to-amber-800/20",
      borderColor: "border-amber-400",
      iconBg: "bg-amber-100 dark:bg-amber-900/30",
      iconColor: "text-amber-600 dark:text-amber-400",
      pulseColor: "bg-amber-200/40",
    },
  ];

  useEffect(() => {
    if (hoveredCard !== null) {
      controls.start({
        scale: [1, 1.05, 1],
        transition: { duration: 0.6 },
      });
    }
  }, [hoveredCard, controls]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {statCards.map((card, index) => (
        <motion.div
          key={card.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          whileHover={{ y: -8 }}
          onHoverStart={() => setHoveredCard(card.id)}
          onHoverEnd={() => setHoveredCard(null)}
          className="relative"
        >
          {/* Animated background pulse */}
          {hoveredCard === card.id && (
            <motion.div
              className={`absolute inset-0 rounded-lg ${card.pulseColor} -z-10 dark:opacity-20`}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            />
          )}

          <Card
            className={`${card.bgColor} border-l-4 ${card.borderColor} p-6 transition-all duration-300 hover:shadow-xl overflow-hidden relative`}
          >
            {/* Animated growing border */}
            <motion.div
              className={`absolute top-0 left-0 w-1 h-full ${card.borderColor}`}
              initial={{ height: 0 }}
              animate={{ height: "100%" }}
              transition={{ duration: 0.8, delay: index * 0.15 }}
            />

            <div className="flex items-center z-10">
              <motion.div
                className={`p-3 rounded-full ${card.iconBg} ${card.iconColor} mr-4`}
                whileHover={{ rotate: [0, 15, -15, 0], scale: 1.1 }}
                transition={{ duration: 0.6 }}
                animate={controls}
              >
                <card.icon size={24} />
              </motion.div>
              <div>
                <p className={`text-sm font-medium ${card.iconColor}`}>
                  {card.title}
                </p>
                <motion.p
                  className="text-2xl font-bold text-gray-800 dark:text-white"
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3 }}
                  whileHover={{ scale: 1.05 }}
                >
                  {card.value}
                </motion.p>
              </div>
            </div>

            <motion.div
              className="mt-4 text-sm text-gray-600 dark:text-gray-400 z-10"
              whileHover={{ scale: 1.05 }}
            >
              <span
                className={`inline-flex items-center gap-1 ${
                  card.changeType === "positive"
                    ? "text-green-500"
                    : "text-red-500"
                } font-medium`}
              >
                {card.changeType === "positive" && (
                  <motion.span
                    animate={{ y: [0, -2, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  >
                    ▲
                  </motion.span>
                )}
                {card.changeType === "negative" && (
                  <motion.span
                    animate={{ y: [0, 2, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  >
                    ▼
                  </motion.span>
                )}
                {card.change}
              </span>{" "}
              from last month
            </motion.div>

            {/* Floating decorative element */}
            <motion.div
              className={`absolute -right-4 -bottom-4 w-16 h-16 rounded-full ${card.iconBg} opacity-20`}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.2, 0.3, 0.2],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
