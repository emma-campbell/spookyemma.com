'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { SiteSettings } from "@/lib/keystatic";

type SiteSettingsContextType = {
  settings: SiteSettings;
  isLoading: boolean;
  error: string | null;
};

const SiteSettingsContext = createContext<SiteSettingsContextType | undefined>(undefined);

export function SiteSettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<SiteSettings>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadSettings() {
      try {
        setIsLoading(true);
        setError(null);
        const response = await fetch('/api/site-settings');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const siteSettings = await response.json();
        setSettings(siteSettings);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load site settings');
        console.error('Error loading site settings:', err);
      } finally {
        setIsLoading(false);
      }
    }

    loadSettings();
  }, []);

  return (
    <SiteSettingsContext.Provider value={{ settings, isLoading, error }}>
      {children}
    </SiteSettingsContext.Provider>
  );
}

export function useSiteSettings() {
  const context = useContext(SiteSettingsContext);
  if (context === undefined) {
    throw new Error('useSiteSettings must be used within a SiteSettingsProvider');
  }
  return context;
}