import axiosInstance from "@/lib/axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export const useGetUser = () => {
  const getUserRequest = async () => {
    const { data } = await axiosInstance.get("/admin/me");
    return data;
  };

  const {
    data: user,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["getAdminUser"],
    queryFn: getUserRequest,
  });

  return { user, isLoading, error, isError, isSignedIn: !!user };
};

export const useLoginAdmin = () => {
  const loginAdminRequest = async (data) => {
    const response = await axiosInstance.post("/admin/signin", data);
    return response.data;
  };

  const {
    mutate: loginAdmin,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useMutation({
    mutationKey: ["loginAdmin"],
    mutationFn: loginAdminRequest,
  });
  const navigate = useNavigate();

  if (isSuccess) {
    toast.success("User Logged in successfully");
    navigate("/admin/dashboard");
  }

  return { loginAdmin, isLoading, isError, error };
};
