import { useGetAIResponse } from "@/api/StudentApi";
import Markdown from "react-markdown";
import { motion } from "framer-motion";
import { Bot, Loader2, Sparkles } from "lucide-react";
import { Card } from "@/components/ui/card";

export default function AISuggestion() {
  const { data: aiSuggestion, isLoading, refetch } = useGetAIResponse();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="h-full flex flex-col"
    >
      <Card className="flex-1 flex flex-col overflow-hidden border-0 shadow-lg">
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-4 text-white">
          <motion.div
            initial={{ x: -20 }}
            animate={{ x: 0 }}
            className="flex items-center gap-3"
          >
            <Bot className="h-8 w-8" />
            <h1 className="text-2xl font-bold">AI Insights</h1>
            <Sparkles className="h-5 w-5 ml-auto text-yellow-300 animate-pulse" />
          </motion.div>
        </div>

        <div className="flex-1 p-4 overflow-y-auto bg-gradient-to-b from-purple-50/50 to-white dark:from-purple-900/10 dark:to-gray-900">
          {isLoading ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center h-64 gap-4"
            >
              <Loader2 className="h-12 w-12 text-purple-600 animate-spin" />
              <p className="text-lg text-purple-600 dark:text-purple-400">
                Your AI companion is thinking...
              </p>
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
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              {/* AI Response */}
              <div className="flex gap-3">
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-purple-100 dark:bg-purple-900/50 flex items-center justify-center">
                  <Bot className="h-5 w-5 text-purple-600 dark:text-purple-300" />
                </div>
                <Card className="p-4 max-w-3xl bg-white dark:bg-gray-800 shadow-sm rounded-xl rounded-tl-none">
                  {/* <Markdown className="prose dark:prose-invert prose-p:my-2 prose-ul:my-2 prose-ol:my-2 prose-li:my-0"> */}
                  <Markdown>
                    {aiSuggestion ||
                      "Hello! How can I support your mental wellbeing today?"}
                  </Markdown>
                  <motion.div
                    className="flex gap-1 mt-3"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    {[...Array(3)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="h-1 w-1 rounded-full bg-purple-400"
                        animate={{
                          scale: [1, 1.5, 1],
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          delay: i * 0.5,
                        }}
                      />
                    ))}
                  </motion.div>
                </Card>
              </div>
            </motion.div>
          )}
        </div>
      </Card>
    </motion.div>
  );
}
