import { RegisterForm } from "@/components/auth/register-form";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Crear cuenta | Black AI",
  description: "Crea tu cuenta en Black AI y comienza a chatear con IA",
};

export default function RegisterPage() {
  return <RegisterForm />;
}
