import { motion } from "framer-motion";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Upload, FileBarChart } from "lucide-react";


const UploadData = ({ isUploadDialogOpen, setIsUploadDialogOpen, handleFileUpload, handleUpload,file }) => {
  return (
    <div>
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>    
              <Dialog
                open={isUploadDialogOpen}
                onOpenChange={setIsUploadDialogOpen}
              >
                <DialogTrigger asChild>
                  <Button variant="outline" className="gap-2">
                    <Upload size={18} />
                    Upload Data
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>Upload Weekly Data</DialogTitle>
                    <DialogDescription>
                      Upload an Excel file with your students' weekly health
                      metrics
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="flex items-center justify-center w-full">
                      <label
                        htmlFor="file-upload"
                        className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                      >
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <Upload className="w-8 h-8 mb-3 text-gray-400" />
                          <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                            <span className="font-semibold">
                              Click to upload
                            </span>{" "}
                            or drag and drop
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            Excel files only (XLS, XLSX)
                          </p>
                        </div>
                        <input
                          id="file-upload"
                          type="file"
                          className="hidden"
                          accept=".xlsx,.xls"
                          onChange={handleFileUpload}
                        />
                      </label>
                    </div>
                    {file && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-2 p-3 bg-gray-100 dark:bg-gray-800 rounded-md"
                      >
                        <FileBarChart className="h-5 w-5 text-blue-500" />
                        <span className="text-sm">{file.name}</span>
                        </motion.div>
                    )}
                  </div>
                  <DialogFooter>
                    <Button
                      type="submit"
                      onClick={handleUpload}
                      disabled={!file}
                      className="disabled:opacity-50"
                    >
                      Upload Data
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </motion.div>
            </div>
  );
};

export default UploadData;

