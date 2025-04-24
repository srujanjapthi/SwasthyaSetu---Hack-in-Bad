import React, { useState } from "react";
import { motion } from "framer-motion";
import { HeartPulse, Activity, Clock, ShieldCheck, Smartphone, Database } from "lucide-react";
import { useTheme } from "@/context/ThemeStore";
import { RefreshCw, Droplet, Wind } from "lucide-react";

const Home = () => {
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState("overview");

  const features = [
    {
      icon: <HeartPulse className="w-8 h-8" />,
      title: "Real-time Monitoring",
      description: "Continuous tracking of vital signs with instant alerts"
    },
    {
      icon: <Activity className="w-8 h-8" />,
      title: "Health Analytics",
      description: "AI-powered insights into your health trends"
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "24/7 Support",
      description: "Round-the-clock access to health professionals"
    },
    {
      icon: <ShieldCheck className="w-8 h-8" />,
      title: "Data Security",
      description: "Military-grade encryption for your health data"
    },
    {
      icon: <Smartphone className="w-8 h-8" />,
      title: "Mobile Access",
      description: "Monitor your health from anywhere"
    },
    {
      icon: <Database className="w-8 h-8" />,
      title: "Health History",
      description: "Comprehensive records of all your metrics"
    }
  ];

  return (
    <div className={`min-h-screen transition-colors duration-300 ${theme === "light" ? "bg-gray-50" : "bg-neutral-950"}`}>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div className="relative z-10 text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className={`text-4xl md:text-6xl font-bold mb-6 ${theme === "light" ? "text-gray-900" : "text-white"}`}
            >
              Your Health, <span className="text-blue-600">Smarter</span> Than Ever
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className={`text-xl max-w-3xl mx-auto mb-10 ${theme === "light" ? "text-gray-600" : "text-gray-300"}`}
            >
              Advanced AI-powered health monitoring that adapts to your needs. Get real-time insights and predictive analytics for better health outcomes.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col sm:flex-row justify-center gap-4"
            >
              <button className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-lg transform hover:scale-105 transition-all">
                Get Started - It's Free
              </button>
              <button className={`px-8 py-4 font-medium rounded-lg shadow-lg border transform hover:scale-105 transition-all ${theme === "light"
                  ? "border-gray-300 hover:bg-gray-100"
                  : "border-gray-700 hover:bg-gray-800"
                }`}>
                See How It Works
              </button>
            </motion.div>
          </div>

          {/* Animated background elements */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20">
            <div className={`absolute rounded-full w-64 h-64 -top-32 -left-32 ${theme === "light" ? "bg-blue-200" : "bg-blue-900"
              }`}></div>
            <div className={`absolute rounded-full w-96 h-96 -bottom-48 -right-48 ${theme === "light" ? "bg-blue-100" : "bg-blue-800"
              }`}></div>
          </div>
        </div>
      </section>

      {/* Enhanced Dashboard Preview */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className={`rounded-xl overflow-hidden shadow-lg ${theme === "light" ? "bg-white" : "bg-gray-900"} border ${theme === "light" ? "border-gray-200" : "border-gray-800"
              }`}
          >
            {/* Dashboard Header */}
            <div className={`flex items-center justify-between p-6 border-b ${theme === "light" ? "border-gray-200" : "border-gray-800"
              }`}>
              <h3 className={`text-xl font-semibold ${theme === "light" ? "text-gray-800" : "text-white"}`}>
                Health Dashboard
              </h3>
              <div className="flex items-center space-x-2">
                <span className={`text-sm ${theme === "light" ? "text-gray-500" : "text-gray-400"}`}>
                  Last updated: Just now
                </span>
                <button className={`p-2 rounded-lg ${theme === "light" ? "bg-gray-100 hover:bg-gray-200" : "bg-gray-800 hover:bg-gray-700"
                  }`}>
                  <RefreshCw className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Dashboard Tabs */}
            <div className="flex border-b">
              {["overview", "analytics", "reports", "alerts"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-4 font-medium text-sm capitalize relative ${activeTab === tab
                      ? theme === "light"
                        ? "text-blue-600"
                        : "text-blue-400"
                      : theme === "light"
                        ? "text-gray-500 hover:text-gray-700"
                        : "text-gray-400 hover:text-gray-200"
                    }`}
                >
                  {tab}
                  {activeTab === tab && (
                    <motion.div
                      layoutId="tabIndicator"
                      className={`absolute bottom-0 left-0 right-0 h-0.5 ${theme === "light" ? "bg-blue-600" : "bg-blue-400"
                        }`}
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Dashboard Content */}
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                {/* Health Stats Cards */}
                <div className={`p-5 rounded-lg ${theme === "light" ? "bg-blue-50" : "bg-blue-900/30"
                  }`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className={`text-sm font-medium ${theme === "light" ? "text-blue-700" : "text-blue-300"
                        }`}>Heart Rate</p>
                      <p className="text-2xl font-bold mt-1">72 <span className="text-sm font-normal">bpm</span></p>
                    </div>
                    <Activity className={`w-6 h-6 ${theme === "light" ? "text-blue-600" : "text-blue-400"
                      }`} />
                  </div>
                  <div className="mt-3 h-2 bg-blue-200 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-600 rounded-full" style={{ width: '70%' }}></div>
                  </div>
                </div>

                <div className={`p-5 rounded-lg ${theme === "light" ? "bg-green-50" : "bg-green-900/30"
                  }`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className={`text-sm font-medium ${theme === "light" ? "text-green-700" : "text-green-300"
                        }`}>Blood Pressure</p>
                      <p className="text-2xl font-bold mt-1">120/80 <span className="text-sm font-normal">mmHg</span></p>
                    </div>
                    <Droplet className={`w-6 h-6 ${theme === "light" ? "text-green-600" : "text-green-400"
                      }`} />
                  </div>
                  <div className="mt-3 h-2 bg-green-200 rounded-full overflow-hidden">
                    <div className="h-full bg-green-600 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                </div>

                <div className={`p-5 rounded-lg ${theme === "light" ? "bg-purple-50" : "bg-purple-900/30"
                  }`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className={`text-sm font-medium ${theme === "light" ? "text-purple-700" : "text-purple-300"
                        }`}>Oxygen Level</p>
                      <p className="text-2xl font-bold mt-1">98 <span className="text-sm font-normal">%</span></p>
                    </div>
                    <Wind className={`w-6 h-6 ${theme === "light" ? "text-purple-600" : "text-purple-400"
                      }`} />
                  </div>
                  <div className="mt-3 h-2 bg-purple-200 rounded-full overflow-hidden">
                    <div className="h-full bg-purple-600 rounded-full" style={{ width: '98%' }}></div>
                  </div>
                </div>
              </div>

              {/* Health Chart */}
              <div className={`p-5 rounded-lg ${theme === "light" ? "bg-gray-50" : "bg-gray-800"
                }`}>
                <div className="flex items-center justify-between mb-4">
                  <h4 className={`font-medium ${theme === "light" ? "text-gray-700" : "text-gray-300"
                    }`}>Weekly Health Trend</h4>
                  <select className={`text-sm px-3 py-1 rounded-md ${theme === "light"
                      ? "bg-white border border-gray-300"
                      : "bg-gray-700 border border-gray-600"
                    }`}>
                    <option>This Week</option>
                    <option>Last Week</option>
                    <option>Last Month</option>
                  </select>
                </div>

                {/* Mock Chart */}
                <div className="h-64 relative">
                  <div className="absolute bottom-0 left-0 right-0 h-px bg-gray-300 dark:bg-gray-700"></div>
                  <div className="absolute left-0 top-0 bottom-0 w-px bg-gray-300 dark:bg-gray-700"></div>

                  {/* Chart lines */}
                  <div className="absolute inset-0 flex items-end space-x-4 px-4">
                    {[65, 80, 60, 72, 78, 85, 70].map((value, index) => (
                      <motion.div
                        key={index}
                        initial={{ height: 0 }}
                        whileInView={{ height: `${value}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: index * 0.1 }}
                        className={`w-8 rounded-t-sm ${theme === "light" ? "bg-blue-500" : "bg-blue-400"
                          }`}
                      ></motion.div>
                    ))}
                  </div>

                  {/* X-axis labels */}
                  <div className="absolute -bottom-7 left-0 right-0 flex justify-between px-4">
                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
                      <span key={day} className={`text-xs ${theme === "light" ? "text-gray-500" : "text-gray-400"}`}>
                        {day}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${theme === "light" ? "text-gray-900" : "text-white"}`}>
              Comprehensive Health Monitoring
            </h2>
            <p className={`text-xl max-w-2xl mx-auto ${theme === "light" ? "text-gray-600" : "text-gray-300"}`}>
              Everything you need to take control of your health in one powerful platform
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`p-8 rounded-xl transition-all hover:shadow-lg ${theme === "light"
                    ? "bg-white hover:shadow-blue-100 border border-gray-100"
                    : "bg-gray-900 hover:shadow-blue-900/50 border border-gray-800"
                  }`}
              >
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-6 ${theme === "light" ? "bg-blue-100 text-blue-600" : "bg-blue-900/50 text-blue-400"
                  }`}>
                  {feature.icon}
                </div>
                <h3 className={`text-xl font-bold mb-3 ${theme === "light" ? "text-gray-900" : "text-white"}`}>
                  {feature.title}
                </h3>
                <p className={theme === "light" ? "text-gray-600" : "text-gray-400"}>
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={`py-20 ${theme === "light" ? "bg-blue-50" : "bg-blue-900/20"}`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className={`text-3xl md:text-4xl font-bold mb-6 ${theme === "light" ? "text-gray-900" : "text-white"}`}>
            Ready to Transform Your Health Monitoring?
          </h2>
          <p className={`text-xl mb-10 ${theme === "light" ? "text-gray-600" : "text-gray-300"}`}>
            Join thousands of users who are taking control of their health with our smart monitoring system.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-lg transform hover:scale-105 transition-all">
              Start Your Free Trial
            </button>
            <button className={`px-8 py-4 font-medium rounded-lg shadow-lg border transform hover:scale-105 transition-all ${theme === "light"
                ? "border-gray-300 bg-white hover:bg-gray-50"
                : "border-gray-600 bg-gray-900 hover:bg-gray-800"
              }`}>
              Schedule a Demo
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;