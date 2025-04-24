import { motion } from "framer-motion";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";


const AddStudent = ({ isAddDialogOpen, setIsAddDialogOpen, newStudent, setNewStudent, handleAddStudent }) => {
  return (
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
                        onChange={(e) =>
                          setNewStudent({ ...newStudent, name: e.target.value })
                        }
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <label htmlFor="grade" className="text-right">
                        Grade
                      </label>
                      <Select
                        value={newStudent.grade}
                        onValueChange={(value) =>
                          setNewStudent({ ...newStudent, grade: value })
                        }
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
                        onChange={(e) =>
                          setNewStudent({ ...newStudent, bmi: e.target.value })
                        }
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <label htmlFor="fitness" className="text-right">
                        Fitness Level
                      </label>
                      <Select
                        value={newStudent.fitnessLevel}
                        onValueChange={(value) =>
                          setNewStudent({ ...newStudent, fitnessLevel: value })
                        }
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
  );
};

export default AddStudent;

