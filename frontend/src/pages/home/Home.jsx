import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  HeartPulse,
  Activity,
  Clock,
  ShieldCheck,
  Smartphone,
  Database,
  RefreshCw,
  Droplet,
  Wind,
  ChevronRight,
  Zap,
  TrendingUp,
  AlertCircle,
  BarChart2,
} from "lucide-react";
import { useTheme } from "@/context/ThemeStore";

const COLORS = {
  light: {
    primary: "text-gray-900",
    secondary: "text-gray-600",
    accent: "text-blue-600",
    bg: "bg-gray-50",
    card: "bg-white",
    border: "border-gray-200",
  },
  dark: {
    primary: "text-white",
    secondary: "text-gray-300",
    accent: "text-blue-400",
    bg: "bg-neutral-950",
    card: "bg-gray-900",
    border: "border-gray-800",
  },
};

const Home = () => {
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState("overview");
  const [typedText, setTypedText] = useState("");
  const [cursorVisible, setCursorVisible] = useState(true);
  const fullText = "Your Health, Smarter Than Ever";
  const coloredWord = "Smarter";

  // Typewriter effect with smooth cursor animation
  useEffect(() => {
    // Blinking cursor animation
    const cursorInterval = setInterval(() => {
      setCursorVisible((v) => !v);
    }, 500);

    // Typewriter effect
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setTypedText(fullText.substring(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
        setTimeout(() => {
          setCursorVisible(false);
          clearInterval(cursorInterval);
        }, 2000);
      }
    }, 80);

    return () => {
      clearInterval(typingInterval);
      clearInterval(cursorInterval);
    };
  }, []);

  // Enhanced features data with animation properties
  const features = [
    {
      icon: <HeartPulse className="w-8 h-8" />,
      title: "Real-time Monitoring",
      description: "Continuous tracking of vital signs with instant alerts",
      color: "bg-red-500/10 text-red-500",
    },
    {
      icon: <Activity className="w-8 h-8" />,
      title: "Health Analytics",
      description: "AI-powered insights into your health trends",
      color: "bg-blue-500/10 text-blue-500",
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "24/7 Support",
      description: "Round-the-clock access to health professionals",
      color: "bg-purple-500/10 text-purple-500",
    },
    {
      icon: <ShieldCheck className="w-8 h-8" />,
      title: "Data Security",
      description: "Military-grade encryption for your health data",
      color: "bg-green-500/10 text-green-500",
    },
    {
      icon: <Smartphone className="w-8 h-8" />,
      title: "Mobile Access",
      description: "Monitor your health from anywhere",
      color: "bg-yellow-500/10 text-yellow-500",
    },
    {
      icon: <Database className="w-8 h-8" />,
      title: "Health History",
      description: "Comprehensive records of all your metrics",
      color: "bg-indigo-500/10 text-indigo-500",
    },
  ];

  // Health stats data
  const healthStats = [
    {
      icon: <Activity className="w-6 h-6" />,
      title: "Heart Rate",
      value: "72",
      unit: "bpm",
      progress: 70,
      color: "bg-blue-500",
      bgColor: "bg-blue-500/10",
      textColor: "text-blue-500",
    },
    {
      icon: <Droplet className="w-6 h-6" />,
      title: "Blood Pressure",
      value: "120/80",
      unit: "mmHg",
      progress: 85,
      color: "bg-green-500",
      bgColor: "bg-green-500/10",
      textColor: "text-green-500",
    },
    {
      icon: <Wind className="w-6 h-6" />,
      title: "Oxygen Level",
      value: "98",
      unit: "%",
      progress: 98,
      color: "bg-purple-500",
      bgColor: "bg-purple-500/10",
      textColor: "text-purple-500",
    },
  ];

  // Animated background particles
  const Particle = ({ x, y, size, delay }) => (
    <motion.div
      className={`absolute rounded-full ${
        theme === "light" ? "bg-blue-200" : "bg-blue-900/50"
      }`}
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: [0, 0.5, 0],
        scale: [0, 1, 0],
        x: [x, x + (Math.random() - 0.5) * 50],
        y: [y, y + (Math.random() - 0.5) * 50],
      }}
      transition={{
        duration: 4 + Math.random() * 3,
        delay,
        repeat: Infinity,
        repeatType: "loop",
        ease: "easeInOut",
      }}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        left: `${x}px`,
        top: `${y}px`,
      }}
    />
  );

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${COLORS[theme].bg}`}
    >
      {/* Hero Section with Floating Particles */}
      <section className="relative overflow-hidden">
        {/* Animated particles background */}
        <div className="absolute inset-0 overflow-hidden opacity-30">
          {Array.from({ length: 15 }).map((_, i) => (
            <Particle
              key={i}
              x={Math.random() * 100}
              y={Math.random() * 100}
              size={10 + Math.random() * 50}
              delay={i * 0.5}
            />
          ))}
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 relative z-10">
          <div className="text-center">
            {/* Enhanced typewriter animation with gradient text */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-teal-500 dark:from-blue-400 dark:to-teal-300 bg-clip-text text-transparent"
            >
              {typedText.split(coloredWord)[0]}
              <span className="text-blue-600 dark:text-blue-400">
                {typedText.includes(coloredWord) ? coloredWord : ""}
              </span>
              {typedText.split(coloredWord)[1]}
              {cursorVisible && (
                <motion.span
                  className="ml-1 text-current"
                  animate={{ opacity: [0, 1] }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                >
                  |
                </motion.span>
              )}
            </motion.h1>

            {/* Subtitle with staggered animation */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className={`text-xl max-w-3xl mx-auto mb-10 ${COLORS[theme].secondary}`}
            >
              Advanced AI-powered health monitoring that adapts to your needs.
              Get real-time insights and predictive analytics for better health
              outcomes.
            </motion.p>

            {/* Buttons with spring animation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col sm:flex-row justify-center gap-4"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 text-white font-medium rounded-lg shadow-lg relative overflow-hidden group"
              >
                <span className="relative z-10">Get Started - It's Free</span>
                <motion.span
                  className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.6 }}
                />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-8 py-4 font-medium rounded-lg shadow-lg border ${
                  COLORS[theme].border
                } ${
                  theme === "light"
                    ? "bg-white hover:bg-gray-50"
                    : "bg-gray-900 hover:bg-gray-800"
                }`}
              >
                See How It Works
              </motion.button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Dashboard Preview with Enhanced Animations */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, type: "spring" }}
            className={`rounded-2xl overflow-hidden shadow-xl ${COLORS[theme].card} border ${COLORS[theme].border}`}
          >
            {/* Dashboard Header */}
            <div
              className={`flex items-center justify-between p-6 border-b ${COLORS[theme].border}`}
            >
              <h3 className={`text-xl font-semibold ${COLORS[theme].primary}`}>
                Health Dashboard
              </h3>
              <div className="flex items-center space-x-2">
                <span className={`text-sm ${COLORS[theme].secondary}`}>
                  Last updated: Just now
                </span>
                <motion.button
                  whileHover={{ rotate: 180 }}
                  whileTap={{ scale: 0.9 }}
                  className={`p-2 rounded-lg ${
                    theme === "light"
                      ? "bg-gray-100 hover:bg-gray-200"
                      : "bg-gray-800 hover:bg-gray-700"
                  }`}
                >
                  <RefreshCw className="w-4 h-4" />
                </motion.button>
              </div>
            </div>

            {/* Dashboard Tabs with spring animation */}
            <div className="flex border-b">
              {["overview", "analytics", "reports", "alerts"].map((tab) => (
                <motion.button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-4 font-medium text-sm capitalize relative ${
                    activeTab === tab
                      ? COLORS[theme].accent
                      : COLORS[theme].secondary
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {tab}
                  {activeTab === tab && (
                    <motion.div
                      layoutId="tabIndicator"
                      className={`absolute bottom-0 left-0 right-0 h-0.5 ${
                        theme === "light" ? "bg-blue-600" : "bg-blue-400"
                      }`}
                      transition={{
                        type: "spring",
                        bounce: 0.3,
                        duration: 0.6,
                      }}
                    />
                  )}
                </motion.button>
              ))}
            </div>

            {/* Dashboard Content with Animated Presence */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="p-6"
              >
                {/* Health Stats Cards with staggered animations */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  {healthStats.map((stat, index) => (
                    <motion.div
                      key={stat.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className={`p-5 rounded-xl ${stat.bgColor}`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p
                            className={`text-sm font-medium ${stat.textColor}`}
                          >
                            {stat.title}
                          </p>
                          <p className="text-2xl font-bold mt-1">
                            {stat.value}{" "}
                            <span className="text-sm font-normal">
                              {stat.unit}
                            </span>
                          </p>
                        </div>
                        <div className={stat.textColor}>{stat.icon}</div>
                      </div>
                      <div className="mt-3 h-2 bg-opacity-30 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${stat.progress}%` }}
                          transition={{ duration: 1, delay: index * 0.2 }}
                          className={`h-full rounded-full ${stat.color}`}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Health Chart with smooth bars animation */}
                <div
                  className={`p-5 rounded-xl ${
                    theme === "light" ? "bg-gray-50" : "bg-gray-800"
                  }`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <h4 className={`font-medium ${COLORS[theme].primary}`}>
                      Weekly Health Trend
                    </h4>
                    <select
                      className={`text-sm px-3 py-1 rounded-md ${
                        theme === "light"
                          ? "bg-white border border-gray-300"
                          : "bg-gray-700 border border-gray-600"
                      }`}
                    >
                      <option>This Week</option>
                      <option>Last Week</option>
                      <option>Last Month</option>
                    </select>
                  </div>

                  {/* Animated Chart */}
                  <div className="h-64 relative">
                    <div className="absolute bottom-0 left-0 right-0 h-px bg-gray-300 dark:bg-gray-700"></div>
                    <div className="absolute left-0 top-0 bottom-0 w-px bg-gray-300 dark:bg-gray-700"></div>

                    {/* Chart lines with spring animation */}
                    <div className="absolute inset-0 flex items-end space-x-4 px-4">
                      {[65, 80, 60, 72, 78, 85, 70].map((value, index) => (
                        <motion.div
                          key={index}
                          initial={{ height: 0 }}
                          whileInView={{ height: `${value}%` }}
                          viewport={{ once: true }}
                          transition={{
                            type: "spring",
                            damping: 10,
                            stiffness: 100,
                            delay: index * 0.1,
                          }}
                          className={`w-8 rounded-t-sm ${
                            theme === "light" ? "bg-blue-500" : "bg-blue-400"
                          }`}
                        />
                      ))}
                    </div>

                    {/* X-axis labels */}
                    <div className="absolute -bottom-7 left-0 right-0 flex justify-between px-4">
                      {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(
                        (day) => (
                          <motion.span
                            key={day}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{
                              delay:
                                0.5 +
                                0.05 *
                                  [
                                    "Mon",
                                    "Tue",
                                    "Wed",
                                    "Thu",
                                    "Fri",
                                    "Sat",
                                    "Sun",
                                  ].indexOf(day),
                            }}
                            className={`text-xs ${COLORS[theme].secondary}`}
                          >
                            {day}
                          </motion.span>
                        ),
                      )}
                    </div>
                  </div>
                </div>

                {/* Recent Activities */}
                <div className="mt-6">
                  <h4 className={`font-medium mb-4 ${COLORS[theme].primary}`}>
                    Recent Activities
                  </h4>
                  <div className="space-y-3">
                    {[
                      {
                        icon: <Zap className="w-5 h-5 text-yellow-500" />,
                        text: "High heart rate detected at 3:42 PM",
                        time: "2 mins ago",
                      },
                      {
                        icon: <TrendingUp className="w-5 h-5 text-green-500" />,
                        text: "Positive trend in sleep quality",
                        time: "1 hour ago",
                      },
                      {
                        icon: <AlertCircle className="w-5 h-5 text-red-500" />,
                        text: "Irregular blood pressure reading",
                        time: "3 hours ago",
                      },
                      {
                        icon: <BarChart2 className="w-5 h-5 text-blue-500" />,
                        text: "New weekly health report available",
                        time: "1 day ago",
                      },
                    ].map((activity, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 * index }}
                        className={`flex items-center p-3 rounded-lg ${
                          theme === "light" ? "bg-gray-50" : "bg-gray-800"
                        }`}
                      >
                        <div className="mr-3">{activity.icon}</div>
                        <div className="flex-1">
                          <p className={COLORS[theme].primary}>
                            {activity.text}
                          </p>
                          <p className={`text-xs ${COLORS[theme].secondary}`}>
                            {activity.time}
                          </p>
                        </div>
                        <ChevronRight className="w-4 h-4 text-gray-400" />
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Features Section with Staggered Animations */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2
              className={`text-3xl md:text-4xl font-bold mb-4 ${COLORS[theme].primary}`}
            >
              Comprehensive Health Monitoring
            </h2>
            <p
              className={`text-xl max-w-2xl mx-auto ${COLORS[theme].secondary}`}
            >
              Everything you need to take control of your health in one powerful
              platform
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.1,
                },
              },
            }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: {
                      type: "spring",
                      stiffness: 100,
                      damping: 15,
                    },
                  },
                }}
                whileHover={{ y: -5 }}
                className={`p-8 rounded-xl transition-all hover:shadow-lg ${COLORS[theme].card} border ${COLORS[theme].border}`}
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className={`w-16 h-16 rounded-full flex items-center justify-center mb-6 ${feature.color}`}
                >
                  {feature.icon}
                </motion.div>
                <h3
                  className={`text-xl font-bold mb-3 ${COLORS[theme].primary}`}
                >
                  {feature.title}
                </h3>
                <p className={COLORS[theme].secondary}>{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section with Gradient Background */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className={`py-20 relative overflow-hidden ${
          theme === "light"
            ? "bg-gradient-to-br from-blue-50 to-teal-50"
            : "bg-gradient-to-br from-blue-900/30 to-teal-900/30"
        }`}
      >
        {/* Floating abstract shapes */}
        <div className="absolute inset-0 overflow-hidden opacity-20">
          {Array.from({ length: 8 }).map((_, i) => (
            <motion.div
              key={i}
              className={`absolute rounded-full ${
                theme === "light" ? "bg-blue-200" : "bg-blue-700"
              }`}
              initial={{
                x: Math.random() * 100,
                y: Math.random() * 100,
                scale: 0,
              }}
              animate={{
                x: [null, (Math.random() - 0.5) * 100],
                y: [null, (Math.random() - 0.5) * 100],
                scale: [0, 1 + Math.random()],
                opacity: [0, 0.3, 0],
              }}
              transition={{
                duration: 10 + Math.random() * 10,
                delay: i * 1.5,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
              }}
              style={{
                width: `${50 + Math.random() * 100}px`,
                height: `${50 + Math.random() * 100}px`,
              }}
            />
          ))}
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className={`text-3xl md:text-4xl font-bold mb-6 ${COLORS[theme].primary}`}
          >
            Ready to Transform Your Health Monitoring?
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className={`text-xl mb-10 ${COLORS[theme].secondary}`}
          >
            Join thousands of users who are taking control of their health with
            our smart monitoring system.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row justify-center gap-4"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 text-white font-medium rounded-lg shadow-lg relative overflow-hidden group"
            >
              <span className="relative z-10">Start Your Free Trial</span>
              <motion.span
                className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10"
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 0.6 }}
              />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-8 py-4 font-medium rounded-lg shadow-lg border ${
                COLORS[theme].border
              } ${
                theme === "light"
                  ? "bg-white hover:bg-gray-50"
                  : "bg-gray-900 hover:bg-gray-800"
              }`}
            >
              Schedule a Demo
            </motion.button>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default Home;
