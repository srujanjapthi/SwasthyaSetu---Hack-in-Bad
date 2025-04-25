import { useLoginTeacher } from "@/api/TeacherApi";
import LoginForm from "@/forms/login/LoginForm";
import { User2 } from "lucide-react";

export default function TeacherLogin() {
  const { loginTeacher, isLoading: isLoginRequestLoading } = useLoginTeacher();

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
