import axiosInstance from "@/lib/axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export const useGetUser = () => {
  const getUserRequest = async () => {
    const { data } = await axiosInstance.get("/teacher/me");
    return data;
  };

  const {
    data: user,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["getTeacherUser"],
    queryFn: getUserRequest,
  });

  return { user, isLoading, error, isError, isSignedIn: !!user };
};

export const useLoginTeacher = () => {
  const loginTeacherRequest = async (data) => {
    const response = axiosInstance.post("/teacher/signin", data);
    return response.data;
  };

  const {
    mutate: loginTeacher,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useMutation({
    mutationKey: ["loginTeacher"],
    mutationFn: loginTeacherRequest,
  });
  const navigate = useNavigate();

  if (isSuccess) {
    toast.success("User Logged in successfully");
    navigate("/teacher/dashboard");
  }

  return { loginTeacher, isLoading, isError, error };
};

export const useGetHealthStatus = () => {
  const getHealthStatus = async () => {
    const { data } = await axiosInstance.get("/teacher/health-status/all");
    return data;
  };

  const {
    data: healthStatus,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["healthStatus"],
    queryFn: getHealthStatus,
  });

  return { healthStatus, isLoading, isError, error };
};

export const useGetStudentHealthDetails = () => {
  const getStudentHealthDetails = async () => {
    const { data } = await axiosInstance.get("/teacher/health-details/all");
    return data;
  };

  return useQuery({
    queryKey: ["studentHealthDetails"],
    queryFn: getStudentHealthDetails,
  });
};
