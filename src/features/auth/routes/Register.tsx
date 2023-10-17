import { Layout as AuthLayout, RegisterForm } from "@/features/auth/components";

export const Register = () => {
  return (
    <AuthLayout authTitle="Signup">
      <RegisterForm />
    </AuthLayout>
  );
};
