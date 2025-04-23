// import { useAdminLoginRequest } from "@/api/AdminsApi";
import LoginForm from "@/forms/login/LoginForm";
import { User2 } from "lucide-react";

export default function StudentLogin() {
  // const { loginAdmin, isLoading: isLoginRequestLoading } = useAdminLoginRequest();
  const { loginStudent, isLoading: isLoginRequestLoading } = {
    loginStudent: () => {},
    isLoading: false,
  };

  return (
    <LoginForm
      onSave={loginStudent}
      isLoading={isLoginRequestLoading}
      loginHeader={
        <>
          <User2 />
          <span>Student Login</span>
        </>
      }
      imgIllustrationSrc="/images/admin_login_illustration.png"
    />
  );
}
