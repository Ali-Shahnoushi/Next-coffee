import LoginOrRegister from "@/components/templates/login-register/LoginOrRegister";
import { authUser } from "@/utils/serverHelpers";
import { redirect } from "next/navigation";

const Login_register = async () => {
  const user = await authUser();
  if (user) {
    return redirect("/");
  }

  return <LoginOrRegister />;
};

export default Login_register;
