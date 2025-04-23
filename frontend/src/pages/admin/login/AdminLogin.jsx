// import { useAdminLoginRequest } from "@/api/AdminsApi";
import LoginForm from "@/forms/login/LoginForm";
import { User2 } from "lucide-react";

export default function AdminLogin() {
  // const { loginAdmin, isLoading: isLoginRequestLoading } = useAdminLoginRequest();
  const { loginAdmin, isLoading: isLoginRequestLoading } = {
    loginAdmin: () => {},
    isLoading: false,
  };

  return (
    <LoginForm
      onSave={loginAdmin}
      isLoading={isLoginRequestLoading}
      loginHeader={
        <>
          <User2 />
          <span>Admin Login</span>
        </>
      }
      imgIllustrationSrc="/images/admin_login_illustration.png"
    />
  );
}
