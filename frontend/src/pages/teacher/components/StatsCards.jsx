import { motion } from "framer-motion";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bot } from "lucide-react";
import { TrendingUp, Activity, AlertTriangle } from "lucide-react";
import { Badge } from "@/components/ui/badge";  
import { HeartPulse } from "lucide-react";

const StatsCards = ({ isAIDialogOpen, setIsAIDialogOpen, aiQuery, setAiQuery, aiResponse, handleAIQuery }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Health Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          whileHover={{ scale: 1.02, y: -5 }}
          className="hover:shadow-xl transition-all"
        >
          <Card className="hover:shadow-lg transition-all duration-300 h-full flex flex-col bg-gradient-to-br from-blue-50 to-blue-100/30 dark:from-blue-950/70 dark:to-blue-900/30 border border-blue-200 dark:border-blue-900/50">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <motion.div
                className="p-3 rounded-lg bg-blue-100/70 dark:bg-blue-900/50 backdrop-blur-sm"
                whileHover={{ rotate: 10, scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <HeartPulse className="h-6 w-6 text-blue-600 dark:text-blue-300" />
              </motion.div>
              <Button
                variant="ghost"
                size="sm"
                className="text-blue-600 dark:text-blue-300"
                onClick={() => {
                  setAiQuery("Analyze the healthy BMI statistics");
                  setIsAIDialogOpen(true);
                }}
              >
                <Bot className="h-4 w-4 mr-1" />
                Analyze
              </Button>
            </CardHeader>
            <CardContent className="flex-1">
              <div className="text-sm font-medium text-muted-foreground">
                Healthy BMI Students
            </div>
              <div className="text-3xl font-bold mt-1">92%</div>
              <div className="mt-3 flex items-center gap-2">
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <TrendingUp className="h-4 w-4 text-green-500" />
                </motion.div>
                <span className="text-xs text-green-500">
                  +5% from last term
                </span>
              </div>
              <div className="mt-4 relative">
                <div className="absolute inset-0 flex items-center justify-between text-xs text-muted-foreground">
                  <span>0%</span>
                  <span>100%</span>
                </div>
                <div className="mt-4 h-3 bg-gray-200/50 dark:bg-gray-800/70 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-blue-400 to-blue-600 rounded-full"
                    style={{ width: "92%" }}
                    initial={{ width: 0 }}
                    animate={{ width: "92%" }}
                    transition={{ duration: 1, delay: 0.3 }}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="text-xs text-muted-foreground pt-0">
              <span>Based on latest health screening</span>
            </CardFooter>
          </Card>
        </motion.div>

        {/* Performance Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          whileHover={{ scale: 1.02, y: -5 }}
          className="hover:shadow-xl transition-all"
        >
          <Card className="hover:shadow-lg transition-all duration-300 h-full flex flex-col bg-gradient-to-br from-green-50 to-emerald-100/30 dark:from-emerald-950/70 dark:to-emerald-900/30 border border-green-200 dark:border-emerald-900/50">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <motion.div
                className="p-3 rounded-lg bg-green-100/70 dark:bg-emerald-900/50 backdrop-blur-sm"
                whileHover={{ rotate: 10, scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Activity className="h-6 w-6 text-green-600 dark:text-emerald-300" />
              </motion.div>
              <Button
                variant="ghost"
                size="sm"
                className="text-green-600 dark:text-emerald-300"
                onClick={() => {
                  setAiQuery("Analyze the fitness performance data");
                  setIsAIDialogOpen(true);
                }}
              >
                <Bot className="h-4 w-4 mr-1" />
                Analyze
              </Button>
            </CardHeader>
            <CardContent className="flex-1">
              <div className="text-sm font-medium text-muted-foreground">
                Average Fitness Level
              </div>
              <div className="flex items-end gap-2 mt-1">
                <span className="text-3xl font-bold">Good</span>
                <span className="text-sm text-green-500 mb-1 flex items-center">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  12%
                </span>
              </div>
              <div className="mt-4 flex items-center">
                <div className="flex -space-x-1">
                  {[1, 2, 3, 4, 5].map((_, i) => (
                    <motion.div
                      key={i}
                      className="w-5 h-5 rounded-full bg-green-500/80 border-2 border-white dark:border-gray-900"
                      animate={{
                        y: [0, -5, 0],
                        scale: [1, 1.2, 1],
                      }}
                      transition={{
                        duration: 0.5,
                        delay: i * 0.1,
                        repeat: Infinity,
                        repeatDelay: 2,
                      }}
                    />
                  ))}
                </div>
                <span className="text-xs text-muted-foreground ml-2">
                  12 improved
                </span>
              </div>
              <div className="mt-4 grid grid-cols-4 gap-2">
                {["Excellent", "Good", "Average", "Poor"].map((level, i) => (
                  <motion.div
                    key={level}
                    className="text-center p-2 rounded-lg bg-white dark:bg-gray-900 shadow-sm"
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="text-xs text-muted-foreground">{level}</div>
                    <div className="text-lg font-bold">{[3, 8, 4, 2][i]}</div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="text-xs text-muted-foreground pt-0">
              <span className="flex items-center">
                <motion.span
                  className="w-2 h-2 rounded-full bg-green-500 mr-1.5"
                  animate={{ opacity: [0.6, 1, 0.6] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                Weekly progress
              </span>
            </CardFooter>
          </Card>
        </motion.div>

        {/* At-Risk Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          whileHover={{ scale: 1.02, y: -5 }}
          className="hover:shadow-xl transition-all"
        >
          <Card className="hover:shadow-lg transition-all duration-300 h-full flex flex-col bg-gradient-to-br from-rose-50 to-rose-100/30 dark:from-rose-950/70 dark:to-rose-900/30 border border-rose-200 dark:border-rose-900/50">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <motion.div
                className="p-3 rounded-lg bg-rose-100/70 dark:bg-rose-900/50 backdrop-blur-sm"
                whileHover={{ rotate: 10, scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <AlertTriangle className="h-6 w-6 text-rose-600 dark:text-rose-300" />
              </motion.div>
              <Button
                variant="ghost"
                size="sm"
                className="text-rose-600 dark:text-rose-300"
                onClick={() => {
                  setAiQuery("Analyze the at-risk student data");
                  setIsAIDialogOpen(true);
                }}
              >
                <Bot className="h-4 w-4 mr-1" />
                Analyze
              </Button>
            </CardHeader>
            <CardContent className="flex-1">
              <div className="text-sm font-medium text-muted-foreground">
                At-Risk Students
              </div>
              <div className="text-3xl font-bold mt-1">4</div>
              <div className="mt-3 flex items-center gap-2">
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <TrendingUp className="h-4 w-4 text-rose-500" />
                </motion.div>
                <span className="text-xs text-rose-500">
                  ↑ 2 from last week
                </span>
              </div>
              <div className="mt-4 relative">
                <div className="absolute inset-0 flex items-center justify-between text-xs text-muted-foreground">
                  <span>0</span>
                  <span>15</span>
                </div>
                <div className="mt-4 h-3 bg-gray-200/50 dark:bg-gray-800/70 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-rose-400 to-rose-600 rounded-full"
                    style={{ width: "30%" }}
                    initial={{ width: 0 }}
                    animate={{ width: "30%" }}
                    transition={{ duration: 1, delay: 0.3 }}
                  />
                </div>
              </div>
              <div className="mt-4">
                <div className="text-xs text-muted-foreground mb-1">
                  Needs attention:
                </div>
                <div className="flex gap-2 flex-wrap">
                  {["2 Academic", "1 Health", "1 Behavior"].map((item, i) => (
                    <motion.div key={i} whileHover={{ scale: 1.05 }}>
                      <Badge variant="destructive" className="text-xs">
                        {item}
                      </Badge>
                    </motion.div>
                  ))}
                </div>
              </div>
            </CardContent>
            <CardFooter className="text-xs text-rose-500 font-medium pt-0">
              <motion.span
                animate={{ x: [0, 2, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                Intervention recommended
              </motion.span>
            </CardFooter>
          </Card>
        </motion.div>
      </div>
  );
};

export default StatsCards;