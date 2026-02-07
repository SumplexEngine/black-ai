import { MobileHeader } from "@/components/layout/mobile-header";
import { Sidebar } from "@/components/layout/sidebar";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // Verificar perfil completo
  const { data: profile } = await supabase
    .from("user_profiles")
    .select("username")
    .eq("user_id", user.id)
    .single();

  const userProfile = profile as { username: string | null } | null;

  if (!userProfile?.username) {
    redirect("/complete-profile");
  }

  return (
    <div className="flex h-screen bg-black text-white">
      {/* Sidebar Izquierda */}
      <Sidebar />

      {/* Contenido Principal */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <MobileHeader />

        <main className="flex-1 overflow-y-auto bg-[#050505]">{children}</main>
      </div>
    </div>
  );
}
