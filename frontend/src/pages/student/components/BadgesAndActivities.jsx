import { motion } from "framer-motion";
import {
  Clock,
  Award,
  Trophy,
  HeartPulse,
  Activity,
  CheckCircle,
} from "lucide-react";

export default function BadgesAndActivities() {
  // Static data for badges
  const badges = [
    {
      id: 1,
      name: "Health Champion",
      description: "Complete 30 days of activity tracking",
      awarded: true,
      icon: <Trophy className="w-6 h-6" />,
      color: "text-amber-500",
    },
    {
      id: 2,
      name: "Fitness Pro",
      description: "Reach 10,000 steps for 7 consecutive days",
      awarded: false,
      icon: <Activity className="w-6 h-6" />,
      color: "text-blue-500",
      progress: 60,
    },
    {
      id: 3,
      name: "Wellness Warrior",
      description: "Log meals for 14 days straight",
      awarded: true,
      icon: <HeartPulse className="w-6 h-6" />,
      color: "text-emerald-500",
    },
    {
      id: 4,
      name: "Sleep Master",
      description: "Achieve 8 hours of sleep for 5 nights",
      awarded: false,
      icon: <CheckCircle className="w-6 h-6" />,
      color: "text-purple-500",
      progress: 30,
    },
  ];

  // Static data for activities
  const upcomingActivities = [
    {
      id: 1,
      title: "Annual Health Checkup",
      date: "2023-11-15",
      time: "9:00 AM",
    },
    {
      id: 2,
      title: "Nutrition Workshop",
      date: "2023-11-20",
      time: "2:00 PM",
    },
    {
      id: 3,
      title: "Yoga Session",
      date: "2023-11-22",
      time: "4:30 PM",
    },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Achievements Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center">
            <Award className="w-5 h-5 mr-2 text-amber-500" />
            Achievements
          </h2>
          <button className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline">
            View All
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {badges.map((badge) => (
            <motion.div
              key={badge.id}
              whileHover={{ y: -3 }}
              className={`rounded-lg border p-4 transition-all ${
                badge.awarded
                  ? "border-emerald-200 bg-emerald-50 dark:border-emerald-800/50 dark:bg-emerald-900/20"
                  : "border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-700/20"
              }`}
            >
              <div className="flex items-start mb-3">
                <div
                  className={`p-2 rounded-full ${badge.color} bg-opacity-20 mr-3`}
                >
                  {badge.icon}
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">
                    {badge.name}
                  </h3>
                  {badge.awarded && (
                    <span className="inline-block mt-1 text-xs bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300 px-2 py-0.5 rounded-full">
                      Earned
                    </span>
                  )}
                </div>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                {badge.description}
              </p>

              {!badge.awarded && (
                <div>
                  <div className="w-full h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${badge.progress}%` }}
                      transition={{ duration: 0.8 }}
                      className={`h-full rounded-full ${badge.color.replace("text", "bg")}`}
                    />
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {badge.progress}% completed
                  </p>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Activities Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center">
            <Clock className="w-5 h-5 mr-2 text-blue-500" />
            Upcoming Activities
          </h2>
          <button className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline">
            View Calendar
          </button>
        </div>

        <div className="space-y-4">
          {upcomingActivities.map((activity, index) => (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="flex items-start p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/50"
            >
              <div className="p-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 mr-4">
                <Clock className="w-4 h-4" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-gray-900 dark:text-white">
                  {activity.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {new Date(activity.date).toLocaleDateString("en-US", {
                    weekday: "short",
                    month: "short",
                    day: "numeric",
                  })}{" "}
                  at {activity.time}
                </p>
              </div>
              <button className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline">
                Details
              </button>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
