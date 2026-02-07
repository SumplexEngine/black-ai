"use client";

import { Logo } from "@/components/common/logo";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { createClient } from "@/lib/supabase/client";
import { ArrowRight, AtSign, Calendar, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

// ============================================
// OPCIONES DE SELECT
// ============================================

const dayOptions = Array.from({ length: 31 }, (_, i) => ({
  value: String(i + 1).padStart(2, "0"),
  label: String(i + 1),
}));

const monthOptions = [
  { value: "01", label: "Enero" },
  { value: "02", label: "Febrero" },
  { value: "03", label: "Marzo" },
  { value: "04", label: "Abril" },
  { value: "05", label: "Mayo" },
  { value: "06", label: "Junio" },
  { value: "07", label: "Julio" },
  { value: "08", label: "Agosto" },
  { value: "09", label: "Septiembre" },
  { value: "10", label: "Octubre" },
  { value: "11", label: "Noviembre" },
  { value: "12", label: "Diciembre" },
];

const currentYear = new Date().getFullYear();
const yearOptions = Array.from({ length: 100 }, (_, i) => ({
  value: String(currentYear - i),
  label: String(currentYear - i),
}));

const genderOptions = [
  { value: "male", label: "Masculino" },
  { value: "female", label: "Femenino" },
  { value: "other", label: "Otro" },
  { value: "prefer_not_to_say", label: "Prefiero no decir" },
];

// ============================================
// TIPOS
// ============================================

interface ProfileUpdate {
  full_name: string;
  username: string;
}

interface SettingsUpdate {
  preferences: {
    birth_date: string;
    gender: string;
  };
}

// ============================================
// COMPONENTE PRINCIPAL
// ============================================

export function CompleteProfileForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    birthDay: "",
    birthMonth: "",
    birthYear: "",
    gender: "",
  });

  const [touched, setTouched] = useState({
    fullName: false,
    username: false,
    birthDay: false,
    birthMonth: false,
    birthYear: false,
    gender: false,
  });

  // Obtener usuario actual
  useEffect(() => {
    const getUser = async () => {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        // Si no hay usuario, redirigir a login
        router.push("/login");
        return;
      }

      setUserId(user.id);

      // Verificar si ya tiene perfil completo
      const { data: profile } = await supabase
        .from("user_profiles")
        .select("full_name, username")
        .eq("user_id", user.id)
        .single();

      const userProfile = profile as {
        full_name: string | null;
        username: string | null;
      } | null;

      // Si ya tiene perfil completo, redirigir al chat
      if (userProfile?.full_name && userProfile?.username) {
        router.push("/chat");
        return;
      }
    };

    getUser();
  }, [router]);

  // Validaciones
  const isFullNameValid = formData.fullName.trim().length >= 2;
  const isUsernameValid = /^[a-zA-Z0-9_]{3,20}$/.test(formData.username);
  const isBirthDateValid =
    formData.birthDay && formData.birthMonth && formData.birthYear;
  const isGenderValid = formData.gender !== "";

  const canSubmit =
    isFullNameValid && isUsernameValid && isBirthDateValid && isGenderValid;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError(null);
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError(null);
  };

  const handleBlur = (name: string) => {
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit || !userId) return;

    setIsLoading(true);
    setError(null);

    try {
      const supabase = createClient();

      // Formatear fecha de nacimiento
      const birthDate = `${formData.birthYear}-${formData.birthMonth}-${formData.birthDay}`;

      // Datos para actualizar perfil
      const profileData: ProfileUpdate = {
        full_name: formData.fullName.trim(),
        username: formData.username.toLowerCase().trim(),
      };

      // Actualizar perfil
      const { error: updateError } = await supabase
        .from("user_profiles")
        .update(profileData as never)
        .eq("user_id", userId);

      if (updateError) {
        if (updateError.message.includes("unique constraint")) {
          setError("Este nombre de usuario ya está en uso. Elige otro.");
        } else {
          setError(updateError.message);
        }
        return;
      }

      // Datos para actualizar settings
      const settingsData: SettingsUpdate = {
        preferences: {
          birth_date: birthDate,
          gender: formData.gender,
        },
      };

      // Actualizar settings con género y fecha de nacimiento
      const { error: settingsError } = await supabase
        .from("user_settings")
        .update(settingsData as never)
        .eq("user_id", userId);

      if (settingsError) {
        console.error("Error updating settings:", settingsError);
      }

      // Redirigir al chat
      router.push("/chat");
      router.refresh();
    } catch {
      setError("Ocurrió un error inesperado. Intenta de nuevo.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Logo */}
      <div className="flex justify-center">
        <Logo size="lg" />
      </div>

      {/* Card */}
      <Card className="border-white/10 bg-white/5">
        <CardHeader className="text-center">
          <CardTitle className="text-xl text-white">
            Completa tu perfil
          </CardTitle>
          <CardDescription className="text-gray-400">
            Necesitamos algunos datos para personalizar tu experiencia
          </CardDescription>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            {/* Error */}
            {error && (
              <div className="animate-fade-in rounded-lg border border-red-500/50 bg-red-500/10 p-3 text-sm text-red-400">
                {error}
              </div>
            )}

            {/* Nombre Completo */}
            <Input
              name="fullName"
              type="text"
              label="Nombre completo"
              placeholder="Tu nombre completo"
              value={formData.fullName}
              onChange={handleInputChange}
              onBlur={() => handleBlur("fullName")}
              leftIcon={<User className="h-4 w-4" />}
              error={
                touched.fullName && !isFullNameValid && formData.fullName
                  ? "Ingresa un nombre válido (mínimo 2 caracteres)"
                  : undefined
              }
              disabled={isLoading}
              required
            />

            {/* Nombre de Usuario */}
            <Input
              name="username"
              type="text"
              label="Nombre de usuario"
              placeholder="tu_usuario"
              value={formData.username}
              onChange={handleInputChange}
              onBlur={() => handleBlur("username")}
              leftIcon={<AtSign className="h-4 w-4" />}
              helperText="Solo letras, números y guiones bajos (3-20 caracteres)"
              error={
                touched.username && !isUsernameValid && formData.username
                  ? "Solo letras, números y _ (3-20 caracteres)"
                  : undefined
              }
              disabled={isLoading}
              required
            />

            {/* Fecha de Nacimiento */}
            <div className="space-y-2">
              <label className="text-foreground flex items-center gap-2 text-sm font-medium">
                <Calendar className="text-muted-foreground h-4 w-4" />
                Fecha de nacimiento
              </label>
              <div className="grid grid-cols-3 gap-3">
                <Select
                  options={dayOptions}
                  placeholder="Día"
                  value={formData.birthDay}
                  onChange={(value) => handleSelectChange("birthDay", value)}
                  disabled={isLoading}
                />
                <Select
                  options={monthOptions}
                  placeholder="Mes"
                  value={formData.birthMonth}
                  onChange={(value) => handleSelectChange("birthMonth", value)}
                  disabled={isLoading}
                />
                <Select
                  options={yearOptions}
                  placeholder="Año"
                  value={formData.birthYear}
                  onChange={(value) => handleSelectChange("birthYear", value)}
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* Género */}
            <Select
              label="Sexo"
              options={genderOptions}
              placeholder="Selecciona una opción"
              value={formData.gender}
              onChange={(value) => handleSelectChange("gender", value)}
              disabled={isLoading}
            />
          </CardContent>

          <CardFooter>
            <Button
              type="submit"
              className="w-full bg-white text-black hover:bg-gray-200"
              size="lg"
              isLoading={isLoading}
              disabled={!canSubmit}
              rightIcon={<ArrowRight className="h-4 w-4" />}
            >
              Continuar
            </Button>
          </CardFooter>
        </form>
      </Card>

      {/* Info */}
      <p className="px-4 text-center text-xs text-gray-500">
        Esta información nos ayuda a brindarte una mejor experiencia. Puedes
        modificarla después en la configuración de tu cuenta.
      </p>
    </div>
  );
}
