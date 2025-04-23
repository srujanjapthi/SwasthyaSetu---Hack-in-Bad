// import { useAdminLoginRequest } from "@/api/AdminsApi";
import LoginForm from "@/forms/login/LoginForm";
import { School } from "lucide-react";

export default function SchoolLogin() {
  // const { loginAdmin, isLoading: isLoginRequestLoading } = useAdminLoginRequest();
  const { loginSchool, isLoading: isLoginRequestLoading } = {
    loginSchool: () => {},
    isLoading: false,
  };

  return (
    <LoginForm
      onSave={loginSchool}
      isLoading={isLoginRequestLoading}
      loginHeader={
        <>
          <School />
          <span>School Login</span>
        </>
      }
      imgIllustrationSrc="/images/admin_login_illustration.png"
    />
  );
}
