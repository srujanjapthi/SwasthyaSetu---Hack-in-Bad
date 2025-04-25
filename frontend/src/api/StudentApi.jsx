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
    queryKey: ["getUser"],
    queryFn: getUserRequest,
  });

  return { user, isLoading, error, isError, isSignedIn: !!user };
};

export const useGetAIResponse = () => {
  const getAIResponseRequest = async () => {
    const { data } = await axiosInstance.get("/student/ai/chat");
    return data.ai_suggestion;
  };

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["getAIResponse"],
    queryFn: getAIResponseRequest,
  });
  return { data, isLoading, isError, error };
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
