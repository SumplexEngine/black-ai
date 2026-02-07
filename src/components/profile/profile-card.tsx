"use client";

import { useAuth } from "@/hooks/use-auth";
import { useUserStats } from "@/hooks/use-user";
import { createClient } from "@/lib/supabase/client";
import { cn, getInitials } from "@/lib/utils";
import {
  Briefcase,
  Calendar,
  Check,
  Edit2,
  Globe,
  Mail,
  Trash2,
  User,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";

// Tipos para las preferencias
interface UserPreferences {
  birth_date?: string;
  gender?: string;
  usage_type?: string;
}

const usageOptions = [
  { value: "personal", label: "Uso Personal" },
  { value: "education", label: "Educación" },
  { value: "development", label: "Desarrollo de Software" },
  { value: "business", label: "Negocios / Trabajo" },
  { value: "research", label: "Investigación" },
];

const languageOptions = [
  { value: "es", label: "Español" },
  { value: "en", label: "English" },
  { value: "pt", label: "Português" },
  { value: "fr", label: "Français" },
  { value: "de", label: "Deutsch" },
  { value: "it", label: "Italiano" },
  { value: "ja", label: "日本語" },
  { value: "zh-CN", label: "中文 (简体)" },
];

export function ProfileCard() {
  const { user, profile, refresh } = useAuth();
  const { stats } = useUserStats(user?.id ?? null);

  const [isLoading, setIsLoading] = useState(false);
  const [editingField, setEditingField] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    birthDate: "",
    gender: "",
    usageType: "personal",
    language: "es",
  });

  // Cargar datos reales
  useEffect(() => {
    const fetchSettings = async () => {
      if (profile && user) {
        const supabase = createClient();

        // Obtener user_settings con tipado explícito
        const { data: settings } = await supabase
          .from("user_settings")
          .select("preferences, language")
          .eq("user_id", user.id)
          .single();

        // Castear a un tipo conocido para evitar 'never'
        const safeSettings = settings as {
          preferences: UserPreferences | null;
          language: string;
        } | null;

        const prefs = safeSettings?.preferences || {};

        setFormData({
          fullName: profile.full_name || "",
          username: profile.username || "",
          email: user.email || "",
          birthDate: prefs.birth_date || "",
          gender: prefs.gender || "",
          usageType: prefs.usage_type || "personal",
          language: safeSettings?.language || "es",
        });
      }
    };

    fetchSettings();
  }, [profile, user]);

  // Google Translate
  useEffect(() => {
    const addGoogleTranslate = () => {
      const script = document.createElement("script");
      script.src =
        "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.body.appendChild(script);

      window.googleTranslateElementInit = () => {
        new window.google.translate.TranslateElement(
          { pageLanguage: "es", autoDisplay: false },
          "google_translate_element"
        );
      };
    };

    if (!window.google || !window.google.translate) {
      addGoogleTranslate();
    }
  }, []);

  const changeLanguage = async (lang: string) => {
    setFormData({ ...formData, language: lang });

    const supabase = createClient();
    if (user) {
      // ✅ Cast en .from() para romper la cadena 'never'
      await (supabase.from("user_settings") as any)
        .update({ language: lang })
        .eq("user_id", user.id);
    }

    const select = document.querySelector(
      ".goog-te-combo"
    ) as HTMLSelectElement;
    if (select) {
      select.value = lang;
      select.dispatchEvent(new Event("change"));
    }
  };

  const initials = getInitials(formData.fullName);

  const saveField = async (field: string) => {
    setIsLoading(true);
    const supabase = createClient();

    try {
      if (!user?.id) return;

      if (field === "fullName" || field === "username") {
        // ✅ Cast en .from() para romper la cadena 'never'
        const { error } = await (supabase.from("user_profiles") as any)
          .update({
            full_name: formData.fullName,
            username: formData.username,
          })
          .eq("user_id", user.id);

        if (error) throw error;
      }

      if (["birthDate", "gender", "usageType"].includes(field)) {
        const { data: currentSettings } = await supabase
          .from("user_settings")
          .select("preferences")
          .eq("user_id", user.id)
          .single();

        // Tipado seguro
        const safeSettings = currentSettings as {
          preferences: UserPreferences | null;
        } | null;
        const currentPrefs = safeSettings?.preferences || {};

        const newPrefs = {
          ...currentPrefs,
          birth_date: formData.birthDate,
          gender: formData.gender,
          usage_type: formData.usageType,
        };

        // ✅ Cast en .from() para romper la cadena 'never'
        const { error } = await (supabase.from("user_settings") as any)
          .update({ preferences: newPrefs })
          .eq("user_id", user.id);

        if (error) throw error;
      }

      await refresh();
      setEditingField(null);
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Error al actualizar el perfil");
    } finally {
      setIsLoading(false);
    }
  };

  const cancelEdit = () => {
    setEditingField(null);
    window.location.reload();
  };

  const handleDeleteAccount = async () => {
    if (
      confirm(
        "¿Estás seguro? Esta acción borrará permanentemente tu cuenta y datos."
      )
    ) {
      alert("Función de eliminación segura se implementará en backend.");
    }
  };

  const renderField = (
    label: string,
    value: string,
    fieldKey: string,
    icon: React.ReactNode,
    type: string = "text",
    options?: { value: string; label: string }[]
  ) => {
    const isEditing = editingField === fieldKey;

    return (
      <div className="space-y-1.5">
        <label className="text-xs text-gray-400">{label}</label>
        <div className="relative flex items-center gap-2">
          <div className="relative flex-1">
            <div className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-500">
              {icon}
            </div>

            {options ? (
              <select
                value={value}
                onChange={(e) =>
                  setFormData({ ...formData, [fieldKey]: e.target.value })
                }
                disabled={!isEditing}
                className={cn(
                  "w-full appearance-none rounded-lg py-2.5 pr-8 pl-10 text-sm transition-colors focus:outline-none",
                  isEditing
                    ? "border border-white/20 bg-[#0a0a0a] text-white focus:border-white/50"
                    : "border border-transparent bg-transparent text-gray-300"
                )}
              >
                <option value="">Seleccionar...</option>
                {options.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type={type}
                value={value}
                onChange={(e) =>
                  setFormData({ ...formData, [fieldKey]: e.target.value })
                }
                disabled={!isEditing}
                className={cn(
                  "w-full rounded-lg py-2.5 pr-4 pl-10 text-sm transition-colors focus:outline-none",
                  isEditing
                    ? "border border-white/20 bg-[#0a0a0a] text-white focus:border-white/50"
                    : "border border-transparent bg-transparent text-gray-300"
                )}
              />
            )}
          </div>

          {isEditing ? (
            <div className="flex gap-1">
              <button
                onClick={() => saveField(fieldKey)}
                disabled={isLoading}
                className="rounded-lg bg-green-500/10 p-2 text-green-500 hover:bg-green-500/20"
              >
                <Check className="h-4 w-4" />
              </button>
              <button
                onClick={cancelEdit}
                disabled={isLoading}
                className="rounded-lg bg-red-500/10 p-2 text-red-500 hover:bg-red-500/20"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => setEditingField(fieldKey)}
              className="rounded-lg p-2 text-gray-500 transition-colors hover:bg-white/5 hover:text-white"
            >
              <Edit2 className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="animate-fade-in mx-auto w-full max-w-2xl space-y-12 px-4">
      <div id="google_translate_element" className="hidden"></div>

      <div className="flex items-center gap-6">
        <div className="flex h-20 w-20 items-center justify-center rounded-full border border-white/5 bg-[#1a1a1a] text-2xl font-bold text-white">
          {initials}
        </div>
        <div>
          <h1 className="text-foreground text-2xl font-bold">
            {profile?.full_name || "Usuario"}
          </h1>
          <p className="text-gray-500">@{profile?.username}</p>
          <div className="mt-2 flex items-center gap-2">
            <span className="text-foreground rounded bg-white/10 px-2 py-0.5 text-[10px] font-medium tracking-wide uppercase">
              {stats?.planName || "Free"}
            </span>
          </div>
        </div>
      </div>

      <div className="space-y-8">
        <div className="space-y-4">
          <h2 className="text-sm font-semibold tracking-wider text-gray-500 uppercase">
            Información Personal
          </h2>

          <div className="grid gap-4">
            {renderField(
              "Nombre completo",
              formData.fullName,
              "fullName",
              <User className="h-4 w-4" />
            )}

            <div className="grid gap-4 md:grid-cols-2">
              {renderField(
                "Nombre de usuario",
                formData.username,
                "username",
                <span className="text-sm font-bold">@</span>
              )}

              <div className="space-y-1.5 opacity-60">
                <label className="text-xs text-gray-400">
                  Correo electrónico
                </label>
                <div className="relative">
                  <Mail className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-500" />
                  <input
                    type="email"
                    value={formData.email}
                    disabled
                    className="w-full rounded-lg border border-transparent bg-transparent py-2.5 pr-4 pl-10 text-sm text-gray-300"
                  />
                </div>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {renderField(
                "Fecha de nacimiento",
                formData.birthDate,
                "birthDate",
                <Calendar className="h-4 w-4" />,
                "date"
              )}

              {renderField(
                "Sexo",
                formData.gender,
                "gender",
                <User className="h-4 w-4" />,
                "select",
                [
                  { value: "male", label: "Masculino" },
                  { value: "female", label: "Femenino" },
                  { value: "other", label: "Otro" },
                ]
              )}
            </div>
          </div>
        </div>

        <div className="h-px bg-white/5" />

        <div className="space-y-4">
          <h2 className="text-sm font-semibold tracking-wider text-gray-500 uppercase">
            Preferencias
          </h2>

          <div className="grid gap-6 md:grid-cols-2">
            {renderField(
              "Uso principal de la IA",
              formData.usageType,
              "usageType",
              <Briefcase className="h-4 w-4" />,
              "select",
              usageOptions
            )}

            <div className="space-y-1.5">
              <label className="text-xs text-gray-400">Idioma de la App</label>
              <div className="relative">
                <Globe className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-500" />
                <select
                  value={formData.language}
                  onChange={(e) => changeLanguage(e.target.value)}
                  className="w-full appearance-none rounded-lg border border-white/10 bg-[#0a0a0a] py-2.5 pr-8 pl-10 text-sm text-white transition-colors focus:border-white/30 focus:outline-none"
                >
                  {languageOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="h-px bg-white/5" />

        <div className="pt-4">
          <h2 className="mb-4 text-sm font-semibold tracking-wider text-red-500 uppercase">
            Zona de Peligro
          </h2>
          <div className="flex items-center justify-between rounded-xl border border-red-500/20 bg-red-500/5 p-4">
            <div>
              <h3 className="text-sm font-medium text-white">
                Eliminar cuenta
              </h3>
              <p className="mt-1 text-xs text-gray-500">
                Se borrarán todos tus datos y conversaciones permanentemente.
              </p>
            </div>
            <button
              onClick={handleDeleteAccount}
              className="flex items-center gap-2 rounded-lg bg-red-500/10 px-4 py-2 text-xs font-semibold text-red-500 transition-all hover:bg-red-500 hover:text-white"
            >
              <Trash2 className="h-3.5 w-3.5" />
              Eliminar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

declare global {
  interface Window {
    google: any;
    googleTranslateElementInit: any;
  }
}
