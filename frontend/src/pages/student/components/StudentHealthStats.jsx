import { Activity, Heart, Award, TrendingUp } from "lucide-react";
import { motion, useAnimation } from "framer-motion";
import { Card } from "@/components/ui/card";
import { useEffect, useState } from "react";

export default function StudentHealthStats() {
  const [isHovered, setIsHovered] = useState(null);
  const controls = useAnimation();

  const stats = [
    {
      id: 1,
      title: "Activity Score",
      value: "86/100",
      change: "↑ 4% from last week",
      changeType: "positive",
      icon: Activity,
      bgColor:
        "bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30",
      borderColor: "border-blue-400",
      iconBg: "bg-blue-100 dark:bg-blue-900/30",
      iconColor: "text-blue-600 dark:text-blue-400",
      pulseColor: "bg-blue-200/50 dark:bg-blue-700/30",
    },
    {
      id: 2,
      title: "Health Status",
      value: "Excellent",
      change: "All metrics optimal",
      changeType: "positive",
      icon: Heart,
      bgColor:
        "bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/30",
      borderColor: "border-green-400",
      iconBg: "bg-green-100 dark:bg-green-900/30",
      iconColor: "text-green-600 dark:text-green-400",
      pulseColor: "bg-green-200/50 dark:bg-green-700/30",
    },
    {
      id: 3,
      title: "Badges Earned",
      value: "3",
      change: "1 badge available to earn",
      changeType: "info",
      icon: Award,
      bgColor:
        "bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-800/30",
      borderColor: "border-purple-400",
      iconBg: "bg-purple-100 dark:bg-purple-900/30",
      iconColor: "text-purple-600 dark:text-purple-400",
      pulseColor: "bg-purple-200/50 dark:bg-purple-700/30",
    },
    {
      id: 4,
      title: "Monthly Progress",
      value: "72%",
      change: "Ahead of schedule!",
      changeType: "success",
      icon: TrendingUp,
      bgColor:
        "bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-900/30 dark:to-amber-800/30",
      borderColor: "border-amber-400",
      iconBg: "bg-amber-100 dark:bg-amber-900/30",
      iconColor: "text-amber-600 dark:text-amber-400",
      pulseColor: "bg-amber-200/50 dark:bg-amber-700/30",
    },
  ];

  useEffect(() => {
    if (isHovered !== null) {
      controls.start({
        scale: [1, 1.05, 1],
        transition: { duration: 0.6 },
      });
    }
  }, [isHovered, controls]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          whileHover={{ y: -8 }}
          onHoverStart={() => setIsHovered(stat.id)}
          onHoverEnd={() => setIsHovered(null)}
          className="relative"
        >
          {/* Animated background pulse */}
          {isHovered === stat.id && (
            <motion.div
              className={`absolute inset-0 rounded-lg ${stat.pulseColor} -z-10`}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            />
          )}

          <Card
            className={`${stat.bgColor} border-l-4 ${stat.borderColor} p-6 transition-all duration-300 hover:shadow-xl overflow-hidden`}
          >
            {/* Animated border effect */}
            <motion.div
              className={`absolute top-0 left-0 w-1 h-full ${stat.borderColor}`}
              initial={{ height: 0 }}
              animate={{ height: "100%" }}
              transition={{ duration: 0.8, delay: index * 0.15 }}
            />

            <div className="flex items-center">
              <motion.div
                className={`p-3 rounded-full ${stat.iconBg} ${stat.iconColor} mr-4 relative z-10`}
                whileHover={{ rotate: [0, 15, -15, 0], scale: 1.1 }}
                transition={{ duration: 0.6 }}
                animate={controls}
              >
                <stat.icon size={24} />
              </motion.div>
              <div>
                <p className={`text-sm font-medium ${stat.iconColor}`}>
                  {stat.title}
                </p>
                <motion.p
                  className="text-2xl font-bold text-gray-800 dark:text-white"
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3 }}
                  whileHover={{ scale: 1.05 }}
                >
                  {stat.value}
                </motion.p>
              </div>
            </div>

            <motion.div
              className="mt-4 text-sm text-gray-600 dark:text-gray-400"
              whileHover={{ scale: 1.05 }}
            >
              {stat.changeType === "positive" ? (
                <span className="inline-flex items-center gap-1 text-success-500 font-medium">
                  <motion.span
                    animate={{ y: [0, -2, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  >
                    ▲
                  </motion.span>
                  {stat.change}
                </span>
              ) : (
                <span>{stat.change}</span>
              )}
            </motion.div>

            {/* Floating decorative elements */}
            <motion.div
              className={`absolute -right-4 -bottom-4 w-16 h-16 rounded-full ${stat.iconBg} opacity-20`}
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
