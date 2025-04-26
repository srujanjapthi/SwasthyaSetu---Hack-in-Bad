import axiosInstance from "@/lib/axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export const useGetUser = () => {
  const getUserRequest = async () => {
    const { data } = await axiosInstance.get("/student/me");
    return data;
  };

  const {
    data: user,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["getStudentUser"],
    queryFn: getUserRequest,
  });

  return { user, isLoading, error, isError, isSignedIn: !!user };
};

export const useGetAIResponse = () => {
  const getAIResponseRequest = async () => {
    const { data } = await axiosInstance.get("/student/ai/chat");
    return data.ai_suggestion;
  };

  const {
    data: aiSuggestion,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["getAIResponse"],
    queryFn: getAIResponseRequest,
  });
  return { aiSuggestion, isLoading, isError, error, refetch };
};

export const useLoginStudent = () => {
  const loginStudentRequest = async (data) => {
    const response = await axiosInstance.post("/student/signin", data);
    return response.data;
  };

  const {
    mutate: loginStudent,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useMutation({
    mutationKey: ["loginStudent"],
    mutationFn: loginStudentRequest,
  });
  const navigate = useNavigate();

  if (isSuccess) {
    toast.success("User Logged in successfully");
    navigate("/student/dashboard");
  }

  return { loginStudent, isLoading, isError, error };
};

export const useGetAllWeeklyHealthRecords = () => {
  const getAllWeeklyHealthRecordsRequest = async () => {
    const { data } = await axiosInstance.get(
      "/student/weekly-health-records/all",
    );
    return data;
  };

  const {
    data: weeklyHealthRecords,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["getAllWeeklyHealthRecords"],
    queryFn: getAllWeeklyHealthRecordsRequest,
  });
  return { weeklyHealthRecords, isLoading, isError, error };
};
