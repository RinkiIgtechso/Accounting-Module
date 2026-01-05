"use client";

import { Home, FileText, TrendingUp, Wallet, Settings, BarChart3 } from 'lucide-react';
import { cn } from "@/lib/utils";

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const navItems = [
    { icon: Home, label: "Inicio", active: false },
    { icon: BarChart3, label: "Dashboard", active: false },
    { icon: FileText, label: "Contabilidad", active: true },
    { icon: TrendingUp, label: "Finanzas", active: false },
    { icon: Wallet, label: "Tesorería", active: false },
    { icon: Settings, label: "Configuración", active: false },
  ];

  return (
    <aside className={cn("w-16 bg-gradient-to-b from-emerald-600 to-emerald-800 flex flex-col items-center py-6 gap-6", className)}>
      {/* Logo */}
      <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center mb-4">
        <div className="w-6 h-6 bg-gradient-to-br from-emerald-500 to-emerald-700 rounded" />
      </div>

      {/* Navigation */}
      <nav className="flex-1 flex flex-col gap-4">
        {navItems.map((item, index) => (
          <button
            key={index}
            className={cn(
              "w-10 h-10 rounded-lg flex items-center justify-center transition-colors",
              item.active
                ? "bg-white/20 text-white"
                : "text-white/60 hover:bg-white/10 hover:text-white"
            )}
            title={item.label}
          >
            <item.icon className="w-5 h-5" />
          </button>
        ))}
      </nav>
    </aside>
  );
}
