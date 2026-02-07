import { ForgotPasswordForm } from "@/components/auth/forgot-password-form";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Recuperar contraseña | Black AI",
  description: "Recupera el acceso a tu cuenta de Black AI",
};

export default function ForgotPasswordPage() {
  return <ForgotPasswordForm />;
}
