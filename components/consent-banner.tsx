"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useEffect, useState } from "react";
import type { GtagFunction } from "@/lib/analytics";

interface ConsentPreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
}

export default function ConsentBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [preferences, setPreferences] = useState<ConsentPreferences>({
    necessary: true, // Always true, can't be disabled
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem("consent-preferences");
    if (!consent) {
      setIsVisible(true);
    } else {
      const savedPreferences = JSON.parse(consent);
      setPreferences(savedPreferences);
      loadAnalytics(savedPreferences);
    }
  }, []);

  const loadAnalytics = (prefs: ConsentPreferences) => {
    if (prefs.analytics && typeof window !== "undefined") {
      // Load Google Analytics or GTM
      const script = document.createElement("script");
      script.src = `https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`;
      script.async = true;
      document.head.appendChild(script);

      // Initialize gtag
      const gtagFunction: GtagFunction =
        window.gtag ??
        ((...args: unknown[]) => {
          gtagFunction.q = gtagFunction.q ?? [];
          gtagFunction.q.push(args);
        });

      window.gtag = gtagFunction;
      gtagFunction("js", new Date());
      gtagFunction("config", process.env.NEXT_PUBLIC_GA_ID || "", {
        anonymize_ip: true,
        cookie_flags: "SameSite=None;Secure",
      });
    }
  };

  const handleAcceptAll = () => {
    const allAccepted = {
      necessary: true,
      analytics: true,
      marketing: true,
    };
    setPreferences(allAccepted);
    localStorage.setItem("consent-preferences", JSON.stringify(allAccepted));
    loadAnalytics(allAccepted);
    setIsVisible(false);
  };

  const handleRejectAll = () => {
    const onlyNecessary = {
      necessary: true,
      analytics: false,
      marketing: false,
    };
    setPreferences(onlyNecessary);
    localStorage.setItem("consent-preferences", JSON.stringify(onlyNecessary));
    setIsVisible(false);
  };

  const handleSavePreferences = () => {
    localStorage.setItem("consent-preferences", JSON.stringify(preferences));
    loadAnalytics(preferences);
    setIsVisible(false);
    setShowPreferences(false);
  };

  const handlePreferenceChange = (key: keyof ConsentPreferences) => {
    if (key === "necessary") return; // Can't change necessary cookies

    setPreferences((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-(--bg)/95 backdrop-blur supports-backdrop-filter:bg-(--bg)/80 border-t border-(--brand-200)">
      <div className="container-soft">
        <Card className="p-6 surface">
          {!showPreferences ? (
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-(--fg) mb-2">
                  🍪 Uso de Cookies
                </h3>
                <p className="text-sm text-(--muted)">
                  Utilizamos cookies para mejorar tu experiencia, analizar el
                  tráfico y personalizar contenido. Puedes elegir qué cookies
                  aceptar.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button onClick={handleAcceptAll} className="btn-primary">
                  Aceptar Todas
                </Button>
                <Button
                  onClick={handleRejectAll}
                  variant="outline"
                  className="border-(--brand-200) text-(--fg) hover:bg-(--brand-100)"
                >
                  Rechazar Todas
                </Button>
                <Button
                  onClick={() => setShowPreferences(true)}
                  variant="ghost"
                  className="text-(--brand-600) hover:bg-(--brand-50)"
                >
                  Configurar
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-(--fg) mb-2">
                  Configuración de Cookies
                </h3>
                <p className="text-sm text-(--muted)">
                  Selecciona qué tipos de cookies quieres permitir.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-(--fg)">Necesarias</h4>
                    <p className="text-sm text-(--muted)">
                      Esenciales para el funcionamiento del sitio web.
                    </p>
                  </div>
                  <div className="bg-(--brand-100) text-(--brand-700) px-2 py-1 rounded text-xs font-medium">
                    Siempre activas
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-(--fg)">Analíticas</h4>
                    <p className="text-sm text-(--muted)">
                      Nos ayudan a entender cómo usas el sitio web.
                    </p>
                  </div>
                  <button
                    onClick={() => handlePreferenceChange("analytics")}
                    className={`w-12 h-6 rounded-full transition-colors ${
                      preferences.analytics
                        ? "bg-(--brand-500)"
                        : "bg-(--brand-200)"
                    }`}
                  >
                    <div
                      className={`w-5 h-5 bg-white rounded-full transition-transform ${
                        preferences.analytics
                          ? "translate-x-6"
                          : "translate-x-0.5"
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-(--fg)">Marketing</h4>
                    <p className="text-sm text-(--muted)">
                      Para mostrarte contenido personalizado y publicidad.
                    </p>
                  </div>
                  <button
                    onClick={() => handlePreferenceChange("marketing")}
                    className={`w-12 h-6 rounded-full transition-colors ${
                      preferences.marketing
                        ? "bg-(--brand-500)"
                        : "bg-(--brand-200)"
                    }`}
                  >
                    <div
                      className={`w-5 h-5 bg-white rounded-full transition-transform ${
                        preferences.marketing
                          ? "translate-x-6"
                          : "translate-x-0.5"
                      }`}
                    />
                  </button>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button onClick={handleSavePreferences} className="btn-primary">
                  Guardar Preferencias
                </Button>
                <Button
                  onClick={() => setShowPreferences(false)}
                  variant="outline"
                  className="border-(--brand-200) text-(--fg) hover:bg-(--brand-100)"
                >
                  Cancelar
                </Button>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}

declare global {
  interface Window {
    gtag?: GtagFunction;
  }
}
