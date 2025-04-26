import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Bot,
  Sparkles,
  ClipboardList,
  Activity,
  HeartPulse,
  TrendingUp,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useGetHealthStatus } from "@/api/TeacherApi";
import { useEffect, useRef, useState } from "react";
import Markdown from "react-markdown";

const HealthStatusAI = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { healthStatus, isLoading, isError } = useGetHealthStatus();
  const [displayedResponse, setDisplayedResponse] = useState("");
  const indexRef = useRef(0);

  useEffect(() => {
    if (!healthStatus?.health_status || !isDialogOpen) return;

    setDisplayedResponse("");
    indexRef.current = 0;

    const responseText = healthStatus.health_status;

    const interval = setInterval(() => {
      if (indexRef.current < responseText.length) {
        setDisplayedResponse((prev) => prev + responseText[indexRef.current]);
        indexRef.current += 1;
      } else {
        clearInterval(interval);
      }
    }, 20);

    return () => clearInterval(interval);
  }, [healthStatus, isDialogOpen]);

  return (
    <>
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Button
          variant="outline"
          className="gap-2 bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900/30 dark:to-blue-900/30 hover:shadow-md"
          onClick={() => setIsDialogOpen(true)}
        >
          <Bot size={18} />
          <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Health Insights
          </span>
          <Sparkles className="h-4 w-4 text-yellow-500" />
        </Button>
      </motion.div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl h-[80vh] flex flex-col">
          <DialogHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-gradient-to-br from-purple-100 to-blue-100 dark:from-purple-900/30 dark:to-blue-900/30">
                <Bot className="h-6 w-6 text-purple-600 dark:text-purple-300" />
              </div>
              <div>
                <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  Student Health Analysis
                </DialogTitle>
              </div>
            </div>
          </DialogHeader>

          <div className="flex-1 overflow-y-auto space-y-6">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center h-full gap-4">
                <motion.div
                  animate={{
                    rotate: 360,
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                >
                  <Bot className="h-12 w-12 text-purple-600" />
                </motion.div>
                <motion.p
                  className="text-lg text-purple-600 dark:text-purple-400"
                  animate={{ opacity: [0.6, 1, 0.6] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  Analyzing health data...
                </motion.p>
                <div className="flex gap-2">
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="h-2 w-2 rounded-full bg-purple-400"
                      animate={{
                        y: [0, -10, 0],
                        opacity: [0.5, 1, 0.5],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        delay: i * 0.3,
                      }}
                    />
                  ))}
                </div>
              </div>
            ) : isError ? (
              <div className="flex flex-col items-center justify-center h-full gap-3 p-6 bg-red-50 dark:bg-red-900/20 rounded-lg">
                <div className="text-red-600 dark:text-red-400 text-lg">
                  Failed to load health analysis
                </div>
                <Button
                  variant="outline"
                  onClick={() => window.location.reload()}
                >
                  Try Again
                </Button>
              </div>
            ) : (
              <AnimatePresence>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-8"
                >
                  {/* Key Insights Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <motion.div
                      whileHover={{ y: -5 }}
                      className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 p-4 rounded-xl border-l-4 border-purple-400"
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <ClipboardList className="h-5 w-5 text-purple-600 dark:text-purple-300" />
                        <h3 className="font-semibold">General Overview</h3>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Analysis of overall class health metrics and trends
                      </p>
                    </motion.div>

                    <motion.div
                      whileHover={{ y: -5 }}
                      className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 p-4 rounded-xl border-l-4 border-blue-400"
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <Activity className="h-5 w-5 text-blue-600 dark:text-blue-300" />
                        <h3 className="font-semibold">Activity Levels</h3>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Breakdown of student participation and performance
                      </p>
                    </motion.div>

                    <motion.div
                      whileHover={{ y: -5 }}
                      className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 p-4 rounded-xl border-l-4 border-green-400"
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <HeartPulse className="h-5 w-5 text-green-600 dark:text-green-300" />
                        <h3 className="font-semibold">Health Risks</h3>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Potential areas of concern and recommendations
                      </p>
                    </motion.div>
                  </div>

                  {/* Detailed Analysis */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden"
                  >
                    <div className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0">
                          <div className="p-2 rounded-full bg-purple-100 dark:bg-purple-900/30">
                            <Bot className="h-5 w-5 text-purple-600 dark:text-purple-300" />
                          </div>
                        </div>
                        <div className="flex-1">
                          <div className="prose dark:prose-invert max-w-none">
                            <Markdown>
                              {displayedResponse || "Generating analysis..."}
                            </Markdown>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Recommendations */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/10 dark:to-purple-900/10 p-6 rounded-xl border border-indigo-200 dark:border-indigo-800"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <TrendingUp className="h-5 w-5 text-indigo-600 dark:text-indigo-300" />
                      <h3 className="font-semibold text-lg">
                        Key Recommendations
                      </h3>
                    </div>
                    <ul className="space-y-3 pl-5">
                      <li className="relative before:content-['•'] before:absolute before:-left-5 before:text-indigo-500">
                        Incorporate more strength training exercises
                      </li>
                      <li className="relative before:content-['•'] before:absolute before:-left-5 before:text-indigo-500">
                        Provide education on sleep hygiene
                      </li>
                      <li className="relative before:content-['•'] before:absolute before:-left-5 before:text-indigo-500">
                        Monitor students with consistently low activity levels
                      </li>
                      <li className="relative before:content-['•'] before:absolute before:-left-5 before:text-indigo-500">
                        Consider nutritional guidance sessions
                      </li>
                    </ul>
                  </motion.div>
                </motion.div>
              </AnimatePresence>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default HealthStatusAI;
