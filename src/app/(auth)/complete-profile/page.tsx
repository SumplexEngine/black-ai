import { CompleteProfileForm } from "@/components/auth/complete-profile-form";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Completar perfil | Black AI",
  description: "Completa tu perfil para comenzar a usar Black AI",
};

export default function CompleteProfilePage() {
  return <CompleteProfileForm />;
}
