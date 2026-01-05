"use client";

import { Search, Bell, ChevronDown, Globe } from 'lucide-react';
import { useLanguage } from "@/hooks/use-language";
import { Language } from "@/lib/translations";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function TopBar() {
  const { language, setLanguage, t } = useLanguage();

  const languages = [
    { code: 'es' as Language, label: 'ES', name: 'Español' },
    { code: 'en' as Language, label: 'EN', name: 'English' },
    { code: 'fr' as Language, label: 'FR', name: 'Français' },
    { code: 'pt' as Language, label: 'PT', name: 'Português' },
  ];

  const modules = [
    { value: 'finanzas', label: t('finances') },
    { value: 'contabilidad', label: t('accounting') },
    { value: 'tesoreria', label: t('treasury') },
  ];

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
      {/* Left section */}
      <div className="flex items-center gap-4">
        {/* Module selector */}
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
            <span className="font-medium text-gray-700">{t('accounting')}</span>
            <ChevronDown className="w-4 h-4 text-gray-500" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            {modules.map((module) => (
              <DropdownMenuItem key={module.value}>
                {module.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Right section */}
      <div className="flex items-center gap-4">
        {/* Language selector */}
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors">
            <Globe className="w-4 h-4 text-gray-500" />
            <span className="text-sm font-medium text-gray-700">
              {languages.find(l => l.code === language)?.label}
            </span>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {languages.map((lang) => (
              <DropdownMenuItem
                key={lang.code}
                onClick={() => setLanguage(lang.code)}
                className={language === lang.code ? 'bg-gray-100' : ''}
              >
                <span className="font-medium">{lang.label}</span>
                <span className="ml-2 text-gray-500">{lang.name}</span>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Search */}
        <button className="p-2 rounded-lg hover:bg-gray-50 transition-colors">
          <Search className="w-5 h-5 text-gray-500" />
        </button>

        {/* Notifications */}
        <button className="p-2 rounded-lg hover:bg-gray-50 transition-colors relative">
          <Bell className="w-5 h-5 text-gray-500" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
        </button>

        {/* User profile */}
        <div className="flex items-center gap-3 ml-2">
          <div className="text-right">
            <div className="text-sm font-medium text-gray-700">RENO FMS</div>
            <div className="text-xs text-gray-500">Administrador de la organización</div>
          </div>
          <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center">
            <span className="text-white font-semibold text-sm">R</span>
          </div>
        </div>
      </div>
    </header>
  );
}
