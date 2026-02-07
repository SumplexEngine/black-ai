import { ProfileCard } from "@/components/profile/profile-card";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mi Perfil | Black AI",
  description: "Gestiona tu perfil y ver tus estadísticas",
};

export default function ProfilePage() {
  return (
    <div className="min-h-full bg-black py-8">
      <ProfileCard />
    </div>
  );
}
