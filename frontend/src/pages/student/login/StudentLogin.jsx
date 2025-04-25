import { useLoginStudent } from "@/api/StudentApi";
import LoginForm from "@/forms/login/LoginForm";
import { User2 } from "lucide-react";

export default function StudentLogin() {
  const { loginStudent, isLoading: isLoginRequestLoading } = useLoginStudent();

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
