import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Bot } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

            
const AiAssistant = ({ isAIDialogOpen, setIsAIDialogOpen, aiQuery, setAiQuery, aiResponse, handleAIQuery}) => {
  return (
    <>
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
      <Button
                variant="outline"
                className="gap-2 bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900/50 dark:to-blue-900/50"
                onClick={() => setIsAIDialogOpen(true)}
              >
        <Bot size={18} />
        AI Assistant
      </Button>
    </motion.div>

    <Dialog open={isAIDialogOpen} onOpenChange={setIsAIDialogOpen}>
    <DialogContent className="max-w-2xl">
      <DialogHeader>
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-full bg-purple-100 dark:bg-purple-900/50">
            <Bot className="h-6 w-6 text-purple-600 dark:text-purple-300" />
          </div>
          <div>
            <DialogTitle>Health Metrics AI Assistant</DialogTitle>
            <DialogDescription>
              Get insights and recommendations about your students' health
              data
            </DialogDescription>
          </div>
        </div>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Input
              placeholder="Ask about your students' health metrics..."
              value={aiQuery}
              onChange={(e) => setAiQuery(e.target.value)}
              className="flex-1"
              onKeyPress={(e) => e.key === "Enter" && handleAIQuery()}
            />
            <Button onClick={handleAIQuery}>
              <Search className="h-4 w-4 mr-2" />
              Ask
            </Button>
          </div>
          <div className="text-xs text-muted-foreground">
            Try: "Which students need immediate attention?" or "Give me a
            summary of class fitness levels"
          </div>
        </div>

        {aiResponse && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg"
          >
            <div className="flex gap-3">
              <div className="flex-shrink-0">
                <div className="p-2 rounded-full bg-purple-100 dark:bg-purple-900/50">
                  <Bot className="h-5 w-5 text-purple-600 dark:text-purple-300" />
                </div>
              </div>
              <div>
                <div className="font-medium text-purple-600 dark:text-purple-300 mb-1">
                  AI Assistant
                </div>
                <div className="text-sm">{aiResponse}</div>
              </div>
            </div>
          </motion.div>
        )}

        <div className="grid grid-cols-2 gap-3 mt-4">
          <Button
            variant="outline"
            className="text-xs h-auto py-2"
            onClick={() => {
              setAiQuery("Which students need immediate attention?");
              handleAIQuery();
            }}
          >
            <div className="text-left">
              <div className="font-medium">Urgent Cases</div>
              <div className="text-muted-foreground">
                Identify critical students
              </div>
            </div>
          </Button>
          <Button
            variant="outline"
            className="text-xs h-auto py-2"
            onClick={() => {
              setAiQuery("Give me a summary of class fitness levels");
              handleAIQuery();
            }}
          >
            <div className="text-left">
              <div className="font-medium">Fitness Summary</div>
              <div className="text-muted-foreground">Class overview</div>
            </div>
          </Button>
          <Button
            variant="outline"
            className="text-xs h-auto py-2"
            onClick={() => {
              setAiQuery("Suggest interventions for at-risk students");
              handleAIQuery();
            }}
          >
            <div className="text-left">
              <div className="font-medium">Interventions</div>
              <div className="text-muted-foreground">Recommendations</div>
            </div>
          </Button>
          <Button
            variant="outline"
            className="text-xs h-auto py-2"
            onClick={() => {
              setAiQuery("Compare this term's data to last term");
              handleAIQuery();
            }}
          >
            <div className="text-left">
              <div className="font-medium">Term Comparison</div>
              <div className="text-muted-foreground">Progress analysis</div>
            </div>
          </Button>
        </div>
      </div>
    </DialogContent>
  </Dialog>
  </>
  );
};

export default AiAssistant;
