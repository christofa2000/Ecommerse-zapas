"use client";

import { useEffect, useState } from "react";
import { Dictionary, getDictionary, Locale } from "./i18n-server";

// Client-side hook for i18n
export function useI18n(locale: Locale) {
  const [dict, setDict] = useState<Dictionary | null>(null);

  useEffect(() => {
    getDictionary(locale).then(setDict);
  }, [locale]);

  const t = (key: string): string => {
    if (!dict) return key;

    const keys = key.split(".");
    let value: any = dict;

    for (const k of keys) {
      if (value && typeof value === "object" && k in value) {
        value = value[k];
      } else {
        return key;
      }
    }

    return typeof value === "string" ? value : key;
  };

  return { t, dict, locale };
}




