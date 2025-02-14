import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FiArrowLeft, FiSave } from "react-icons/fi";
import Link from "next/link";

const SettingsPage = () => {
  const { isLoaded, isSignedIn } = useUser();
  const router = useRouter();
  const [settings, setSettings] = useState({
    enableNotifications: true,
    enableEmailAlerts: true,
    taskReminders: true,
    darkMode: false,
    language: "pt-BR",
  });

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push("/sign-in");
    }
  }, [isLoaded, isSignedIn, router]);

  if (!isLoaded || !isSignedIn) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-100 via-primary-200 to-primary-300">
      <header className="bg-white/10 backdrop-blur-md border-b border-white/20 shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <Link href="/admin" className="text-gray-600 hover:text-gray-800">
                <FiArrowLeft className="w-6 h-6" />
              </Link>
              <h1 className="text-2xl font-bold text-gray-800">
                Configurações do Sistema
              </h1>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-primary-400 text-white rounded-lg hover:bg-primary-300">
              <FiSave className="w-5 h-5" />
              Salvar Alterações
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-6">
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Notificações
              </h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-gray-700">
                    Ativar notificações push
                  </label>
                  <input
                    type="checkbox"
                    checked={settings.enableNotifications}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        enableNotifications: e.target.checked,
                      })
                    }
                    className="w-5 h-5 text-primary-400 rounded focus:ring-primary-400"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <label className="text-gray-700">
                    Ativar alertas por email
                  </label>
                  <input
                    type="checkbox"
                    checked={settings.enableEmailAlerts}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        enableEmailAlerts: e.target.checked,
                      })
                    }
                    className="w-5 h-5 text-primary-400 rounded focus:ring-primary-400"
                  />
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Preferências
              </h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-gray-700">Modo escuro</label>
                  <input
                    type="checkbox"
                    checked={settings.darkMode}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        darkMode: e.target.checked,
                      })
                    }
                    className="w-5 h-5 text-primary-400 rounded focus:ring-primary-400"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Idioma</label>
                  <select
                    value={settings.language}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        language: e.target.value,
                      })
                    }
                    className="w-full p-2 border rounded-lg bg-white/80"
                  >
                    <option value="pt-BR">Português (Brasil)</option>
                    <option value="en">English</option>
                    <option value="es">Español</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SettingsPage;
