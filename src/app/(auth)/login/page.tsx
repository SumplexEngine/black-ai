import { LoginForm } from "@/components/auth/login-form";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Iniciar sesión | Black AI",
  description: "Inicia sesión en tu cuenta de Black AI",
};

export default function LoginPage() {
  return <LoginForm />;
}
