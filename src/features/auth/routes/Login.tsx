import { Layout as AuthLayout, LoginForm } from "@/features/auth/components";

export const Login = () => {
  return (
    <AuthLayout authTitle="Login">
      <LoginForm />
    </AuthLayout>
  );
};
