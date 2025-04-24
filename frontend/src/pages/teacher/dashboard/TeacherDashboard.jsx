import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, FileBarChart, AlertTriangle, ChevronRight, HeartPulse, TrendingUp, Plus, Search, UserPlus, Activity, Scale, Upload, Bot } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import TeacherChart from '../components/TeacherChart';
import { useTheme } from '@/context/ThemeStore';

const TeacherDashboard = () => {
  const { theme } = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  const [isAIDialogOpen, setIsAIDialogOpen] = useState(false);
  const [newStudent, setNewStudent] = useState({
    name: '',
    grade: '9th',
    bmi: '',
    fitnessLevel: ''
  });
  const [activeTab, setActiveTab] = useState('all');
  const [file, setFile] = useState(null);
  const [aiQuery, setAiQuery] = useState('');
  const [aiResponse, setAiResponse] = useState('');

  // Sample data
  const allStudentsData = [
    { id: '1', name: 'Emma Thompson', grade: '10th', bmi: 22.1, fitnessLevel: 'Good', status: 'Healthy', reason: '' },
    { id: '2', name: 'James Wilson', grade: '9th', bmi: 18.5, fitnessLevel: 'Average', status: 'Monitor', reason: 'Low BMI' },
    { id: '3', name: 'Sofia Rodriguez', grade: '10th', bmi: 24.8, fitnessLevel: 'Excellent', status: 'Healthy', reason: '' },
    { id: '4', name: 'Ethan Johnson', grade: '9th', bmi: 16.2, fitnessLevel: 'Poor', status: 'At Risk', reason: 'Nutritional deficiency' },
    { id: '5', name: 'Olivia Chen', grade: '11th', bmi: 21.3, fitnessLevel: 'Good', status: 'Healthy', reason: '' },
  ];

  const atRiskStudentsData = allStudentsData.filter(student => student.status === 'At Risk' || student.status === 'Monitor');

  const statusColor = {
    'Healthy': 'bg-teal-100 text-teal-800 dark:bg-teal-900/30 dark:text-teal-300',
    'Monitor': 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300',
    'At Risk': 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300',
  };

  const fitnessColor = {
    'Excellent': 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300',
    'Good': 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
    'Average': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300',
    'Poor': 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300',
  };

  const filteredStudents = allStudentsData.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.grade.toLowerCase().includes(searchTerm.toLowerCase())
  ).filter(student => 
    activeTab === 'all' ? true : student.status === (activeTab === 'atRisk' ? 'At Risk' : 'Healthy')
  );

  const handleAddStudent = () => {
    // In a real app, you would add to your database/state here
    console.log('Adding new student:', newStudent);
    setIsAddDialogOpen(false);
    setNewStudent({ name: '', grade: '9th', bmi: '', fitnessLevel: '' });
  };

  const handleFileUpload = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      // Here you would process the Excel file in a real app
      console.log('File selected:', selectedFile.name);
    }
  };

  const handleUpload = () => {
    if (file) {
      // Process the file upload here
      console.log('Uploading file:', file.name);
      setIsUploadDialogOpen(false);
      setFile(null);
    }
  };

  const handleAIQuery = () => {
    // Simulate AI response
    const responses = [
      "Based on the data, I recommend focusing on nutritional education for students with low BMI.",
      "The fitness levels are improving overall, but 3 students need targeted exercise programs.",
      "Alert: Ethan Johnson's BMI is critically low. Please consult with the school nutritionist.",
      "Your class's average fitness score is 78, which is above the school average of 72.",
      "Consider implementing weekly fitness challenges to maintain student engagement."
    ];
    setAiResponse(responses[Math.floor(Math.random() * responses.length)]);
  };

  return (
    <div className={`p-6 min-h-screen transition-colors duration-300 ${theme === 'light' ? 'bg-gray-50' : 'bg-gray-950'} overflow-hidden`}>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <motion.h1 
              className={`text-3xl font-bold ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}
              whileHover={{ scale: 1.01 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              Teacher Dashboard
            </motion.h1>
            <p className={`mt-2 ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
              Monitor and manage your students' health metrics with AI insights
            </p>
          </div>
          <div className="flex gap-3">
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
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
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
                      Upload an Excel file with your students' weekly health metrics
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="flex items-center justify-center w-full">
                      <label htmlFor="file-upload" className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <Upload className="w-8 h-8 mb-3 text-gray-400" />
                          <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                            <span className="font-semibold">Click to upload</span> or drag and drop
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
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="gap-2">
                    <UserPlus size={18} />
                    Add Student
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>Add New Student</DialogTitle>
                    <DialogDescription>
                      Enter the student's information to add them to your class
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <label htmlFor="name" className="text-right">
                        Name
                      </label>
                      <Input
                        id="name"
                        value={newStudent.name}
                        onChange={(e) => setNewStudent({...newStudent, name: e.target.value})}
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <label htmlFor="grade" className="text-right">
                        Grade
                      </label>
                      <Select 
                        value={newStudent.grade} 
                        onValueChange={(value) => setNewStudent({...newStudent, grade: value})}
                      >
                        <SelectTrigger className="col-span-3">
                          <SelectValue placeholder="Select grade" />
                        </SelectTrigger>
                        <SelectContent className="dark:bg-gray-900 dark:border-gray-800">
                          <SelectItem value="9th">9th Grade</SelectItem>
                          <SelectItem value="10th">10th Grade</SelectItem>
                          <SelectItem value="11th">11th Grade</SelectItem>
                          <SelectItem value="12th">12th Grade</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <label htmlFor="bmi" className="text-right">
                        BMI
                      </label>
                      <Input
                        id="bmi"
                        type="number"
                        value={newStudent.bmi}
                        onChange={(e) => setNewStudent({...newStudent, bmi: e.target.value})}
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <label htmlFor="fitness" className="text-right">
                        Fitness Level
                      </label>
                      <Select
                        value={newStudent.fitnessLevel}
                        onValueChange={(value) => setNewStudent({...newStudent, fitnessLevel: value})}
                      >
                        <SelectTrigger className="col-span-3">
                          <SelectValue placeholder="Select fitness level" />
                        </SelectTrigger>
                        <SelectContent className="dark:bg-gray-900 dark:border-gray-800">
                          <SelectItem value="Excellent">Excellent</SelectItem>
                          <SelectItem value="Good">Good</SelectItem>
                          <SelectItem value="Average">Average</SelectItem>
                          <SelectItem value="Poor">Poor</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button 
                      type="submit" 
                      onClick={handleAddStudent}
                      className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white"
                    >
                      Add Student
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* AI Assistant Dialog */}
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
                  Get insights and recommendations about your students' health data
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
                  onKeyPress={(e) => e.key === 'Enter' && handleAIQuery()}
                />
                <Button onClick={handleAIQuery}>
                  <Search className="h-4 w-4 mr-2" />
                  Ask
                </Button>
              </div>
              <div className="text-xs text-muted-foreground">
                Try: "Which students need immediate attention?" or "Give me a summary of class fitness levels"
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
                    <div className="font-medium text-purple-600 dark:text-purple-300 mb-1">AI Assistant</div>
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
                  <div className="text-muted-foreground">Identify critical students</div>
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

      {/* Stats Cards */}
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
              <div className="text-sm font-medium text-muted-foreground">Healthy BMI Students</div>
              <div className="text-3xl font-bold mt-1">92%</div>
              <div className="mt-3 flex items-center gap-2">
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <TrendingUp className="h-4 w-4 text-green-500" />
                </motion.div>
                <span className="text-xs text-green-500">+5% from last term</span>
              </div>
              <div className="mt-4 relative">
                <div className="absolute inset-0 flex items-center justify-between text-xs text-muted-foreground">
                  <span>0%</span>
                  <span>100%</span>
                </div>
                <div className="mt-4 h-3 bg-gray-200/50 dark:bg-gray-800/70 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-gradient-to-r from-blue-400 to-blue-600 rounded-full" 
                    style={{ width: '92%' }}
                    initial={{ width: 0 }}
                    animate={{ width: '92%' }}
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
              <div className="text-sm font-medium text-muted-foreground">Average Fitness Level</div>
              <div className="flex items-end gap-2 mt-1">
                <span className="text-3xl font-bold">Good</span>
                <span className="text-sm text-green-500 mb-1 flex items-center">
                  <TrendingUp className="h-3 w-3 mr-1" />12%
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
                        scale: [1, 1.2, 1]
                      }}
                      transition={{ 
                        duration: 0.5, 
                        delay: i * 0.1,
                        repeat: Infinity,
                        repeatDelay: 2
                      }}
                    />
                  ))}
                </div>
                <span className="text-xs text-muted-foreground ml-2">12 improved</span>
              </div>
              <div className="mt-4 grid grid-cols-4 gap-2">
                {['Excellent', 'Good', 'Average', 'Poor'].map((level, i) => (
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
              <div className="text-sm font-medium text-muted-foreground">At-Risk Students</div>
              <div className="text-3xl font-bold mt-1">4</div>
              <div className="mt-3 flex items-center gap-2">
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <TrendingUp className="h-4 w-4 text-rose-500" />
                </motion.div>
                <span className="text-xs text-rose-500">↑ 2 from last week</span>
              </div>
              <div className="mt-4 relative">
                <div className="absolute inset-0 flex items-center justify-between text-xs text-muted-foreground">
                  <span>0</span>
                  <span>15</span>
                </div>
                <div className="mt-4 h-3 bg-gray-200/50 dark:bg-gray-800/70 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-gradient-to-r from-rose-400 to-rose-600 rounded-full" 
                    style={{ width: '30%' }}
                    initial={{ width: 0 }}
                    animate={{ width: '30%' }}
                    transition={{ duration: 1, delay: 0.3 }}
                  />
                </div>
              </div>
              <div className="mt-4">
                <div className="text-xs text-muted-foreground mb-1">Needs attention:</div>
                <div className="flex gap-2 flex-wrap">
                  {['2 Academic', '1 Health', '1 Behavior'].map((item, i) => (
                    <motion.div
                      key={i}
                      whileHover={{ scale: 1.05 }}
                    >
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

      {/* Student Management Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-8"
      >
        <Card className="border border-gray-200 dark:border-gray-800">
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <CardTitle className={theme === 'light' ? 'text-gray-900' : 'text-white'}>
                  Student Management
                </CardTitle>
                <CardDescription>
                  View and manage all students in your class
                </CardDescription>
              </div>
              <div className="flex gap-2">
                <motion.div 
                  className="relative"
                  whileHover={{ scale: 1.02 }}
                >
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search students..."
                    className="pl-10 w-full sm:w-[200px]"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </motion.div>
                <motion.div 
                  className="flex border rounded-md overflow-hidden"
                  whileHover={{ scale: 1.02 }}
                >
                  <button
                    className={`px-3 py-1 text-sm transition-colors ${activeTab === 'all' ? 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200' : 'bg-transparent'}`}
                    onClick={() => setActiveTab('all')}
                  >
                    All
                  </button>
                  <button
                    className={`px-3 py-1 text-sm transition-colors ${activeTab === 'healthy' ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200' : 'bg-transparent'}`}
                    onClick={() => setActiveTab('healthy')}
                  >
                    Healthy
                  </button>
                  <button
                    className={`px-3 py-1 text-sm transition-colors ${activeTab === 'atRisk' ? 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200' : 'bg-transparent'}`}
                    onClick={() => setActiveTab('atRisk')}
                  >
                    At Risk
                  </button>
                </motion.div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border overflow-hidden">
              <Table className="overflow-hidden">
                <TableHeader>
                  <TableRow>
                    <TableHead>Student</TableHead>
                    <TableHead>Grade</TableHead>
                    <TableHead>BMI</TableHead>
                    <TableHead>Fitness</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredStudents.map((student) => (
                    <motion.tr
                      key={student.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3 }}
                      className="hover:bg-gray-100 dark:hover:bg-gray-800 group"
                      whileHover={{ scale: 1.005 }}
                    >
                      <TableCell className="font-medium">
                        <div className="flex items-center">
                          <motion.div 
                            className={`h-8 w-8 rounded-full flex items-center justify-center mr-3 ${
                              theme === 'light' ? 'bg-gray-200' : 'bg-gray-700'
                            }`}
                            whileHover={{ rotate: 360 }}
                            transition={{ duration: 0.5 }}
                          >
                            <span className="text-sm">
                              {student.name.charAt(0)}
                            </span>
                          </motion.div>
                          {student.name}
                        </div>
                      </TableCell>
                      <TableCell>{student.grade}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Scale className="h-4 w-4 text-muted-foreground" />
                          {student.bmi}
                        </div>
                      </TableCell>
                      <TableCell>
                        <motion.span 
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            fitnessColor[student.fitnessLevel]
                          }`}
                          whileHover={{ scale: 1.05 }}
                        >
                          {student.fitnessLevel}
                        </motion.span>
                      </TableCell>
                      <TableCell>
                        <motion.span 
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            statusColor[student.status]
                          }`}
                          whileHover={{ scale: 1.05 }}
                        >
                          {student.status}
                        </motion.span>
                      </TableCell>
                      <TableCell className="text-right">
                        <motion.div whileHover={{ x: 3 }}>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="gap-1"
                            onClick={() => {
                              setAiQuery(`Analyze ${student.name}'s health metrics`);
                              setIsAIDialogOpen(true);
                            }}
                          >
                            <Bot className="h-4 w-4" />
                            Analyze
                          </Button>
                        </motion.div>
                      </TableCell>
                    </motion.tr>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Health Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <TeacherChart theme={theme} />
      </motion.div>

      {/* At-risk students table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mt-8"
      >
        <Card className="border border-gray-200 dark:border-gray-800">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className={theme === 'light' ? 'text-gray-900' : 'text-white'}>
                  At-Risk Students
                </CardTitle>
                <CardDescription>
                  Students requiring additional attention
                </CardDescription>
              </div>
              <motion.div whileHover={{ scale: 1.05 }}>
                <Button 
                  variant="outline"
                  onClick={() => {
                    setAiQuery("Generate a report on at-risk students with recommendations");
                    setIsAIDialogOpen(true);
                  }}
                >
                  <FileBarChart className="mr-2 h-4 w-4" />
                  Generate Report
                </Button>
              </motion.div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border overflow-hidden">
              <Table className="overflow-hidden">
                <TableHeader>
                  <TableRow>
                    <TableHead>Student</TableHead>
                    <TableHead>Grade</TableHead>
                    <TableHead>BMI</TableHead>
                    <TableHead>Fitness</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredStudents.map((student) => (
                    <motion.tr
                      key={student.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3 }}
                      className="hover:bg-gray-100 dark:hover:bg-gray-800 group"
                      whileHover={{ scale: 1.005 }}
                    >
                      <TableCell className="font-medium">
                        <div className="flex items-center">
                          <motion.div 
                            className={`h-8 w-8 rounded-full flex items-center justify-center mr-3 ${
                              theme === 'light' ? 'bg-gray-200' : 'bg-gray-700'
                            }`}
                            whileHover={{ rotate: 360 }}
                            transition={{ duration: 0.5 }}
                          >
                            <span className="text-sm">
                              {student.name.charAt(0)}
                            </span>
                          </motion.div>
                          {student.name}
                        </div>
                      </TableCell>
                      <TableCell>{student.grade}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Scale className="h-4 w-4 text-muted-foreground" />
                          {student.bmi}
                        </div>
                      </TableCell>
                      <TableCell>
                        <motion.span 
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            fitnessColor[student.fitnessLevel]
                          }`}
                          whileHover={{ scale: 1.05 }}
                        >
                          {student.fitnessLevel}
                        </motion.span>
                      </TableCell>
                      <TableCell>
                        <motion.span 
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            statusColor[student.status]
                          }`}
                          whileHover={{ scale: 1.05 }}
                        >                            
                          {student.status}
                        </motion.span>
                      </TableCell>
                      <TableCell className="text-right">
                        <motion.div whileHover={{ x: 3 }}>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="gap-1"
                            onClick={() => {
                              setAiQuery(`Analyze ${student.name}'s health metrics`);
                              setIsAIDialogOpen(true);
                            }}
                          >
                            <Bot className="h-4 w-4" />
                            Analyze
                          </Button>
                        </motion.div>
                      </TableCell>
                    </motion.tr>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* AI Query Dialog */}
      <Dialog open={isAIDialogOpen} onOpenChange={setIsAIDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>AI Analysis</DialogTitle>
            <DialogDescription>
              {aiQuery}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsAIDialogOpen(false)}
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TeacherDashboard;


