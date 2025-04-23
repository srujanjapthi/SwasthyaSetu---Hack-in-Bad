import { Card } from "@/components/ui/card";
import { BarChart3, School, Users } from "lucide-react";
import { motion } from "framer-motion";

const statCards = [
  {
    id: 1,
    title: "Total Schools",
    value: "64",
    change: "↑ 8%",
    changeType: "positive",
    icon: School,
    bgColor: "bg-admin-50 dark:bg-gray-800",
    borderColor: "border-admin-500",
    iconBg: "bg-admin-100 dark:bg-admin-900/30",
    iconColor: "text-admin-600 dark:text-admin-400",
  },
  {
    id: 2,
    title: "Total Teachers",
    value: "1,248",
    change: "↑ 3%",
    changeType: "positive",
    icon: Users,
    bgColor: "bg-teacher-50 dark:bg-gray-800",
    borderColor: "border-teacher-500",
    iconBg: "bg-teacher-100 dark:bg-teacher-900/30",
    iconColor: "text-teacher-600 dark:text-teacher-400",
  },
  {
    id: 3,
    title: "Total Students",
    value: "24,389",
    change: "↑ 5%",
    changeType: "positive",
    icon: Users,
    bgColor: "bg-student-50 dark:bg-gray-800",
    borderColor: "border-student-500",
    iconBg: "bg-student-100 dark:bg-student-900/30",
    iconColor: "text-student-600 dark:text-student-400",
  },
  {
    id: 4,
    title: "Health Score",
    value: "78%",
    change: "↓ 2%",
    changeType: "negative",
    icon: BarChart3,
    bgColor: "bg-gray-50 dark:bg-gray-800",
    borderColor: "border-gray-500",
    iconBg: "bg-gray-100 dark:bg-gray-900/30",
    iconColor: "text-gray-600 dark:text-gray-400",
  },
];

export default function AdminStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {statCards.map((card, index) => (
        <motion.div
          key={card.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          whileHover={{ y: -5 }}
        >
          <Card
            className={`${card.bgColor} border-l-4 ${card.borderColor} p-6 transition-all duration-300 hover:shadow-lg dark:hover:shadow-gray-700/50`}
          >
            <div className="flex items-center">
              <motion.div
                className={`p-3 rounded-full ${card.iconBg} ${card.iconColor} mr-4`}
                whileHover={{ rotate: 15, scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
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
                >
                  {card.value}
                </motion.p>
              </div>
            </div>
            <motion.div
              className="mt-4 text-sm text-gray-600 dark:text-gray-400"
              whileHover={{ scale: 1.05 }}
            >
              <span
                className={`${
                  card.changeType === "positive"
                    ? "text-green-500"
                    : "text-red-500"
                } font-medium`}
              >
                {card.change}
              </span>{" "}
              from last month
            </motion.div>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
