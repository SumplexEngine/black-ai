import { ResetPasswordForm } from "@/components/auth/reset-password-form";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nueva contraseña | Black AI",
  description: "Restablece tu contraseña de Black AI",
};

export default function ResetPasswordPage() {
  return <ResetPasswordForm />;
}
