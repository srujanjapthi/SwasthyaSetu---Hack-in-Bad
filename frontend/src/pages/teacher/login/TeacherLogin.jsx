// import { useAdminLoginRequest } from "@/api/AdminsApi";
import LoginForm from "@/forms/login/LoginForm";
import { User2 } from "lucide-react";

export default function TeacherLogin() {
  // const { loginAdmin, isLoading: isLoginRequestLoading } = useAdminLoginRequest();
  const { loginTeacher, isLoading: isLoginRequestLoading } = {
    loginTeacher: () => {},
    isLoading: false,
  };

  return (
    <LoginForm
      onSave={loginTeacher}
      isLoading={isLoginRequestLoading}
      loginHeader={
        <>
          <User2 />
          <span>Teacher Login</span>
        </>
      }
      imgIllustrationSrc="/images/admin_login_illustration.png"
    />
  );
}
