"use client";

import { useState } from "react";
import { useLanguage } from "@/hooks/use-language";
import { cn } from "@/lib/utils";
import { OverviewTab } from "./tabs/overview-tab";
import { SettingsTab } from "./tabs/settings-tab";
import { OfficialCatalogTab } from "./tabs/official-catalog-tab";
import { InternalCoATab } from "./tabs/internal-coa-tab";
import { MappingTab } from "./tabs/mapping-tab";
import { AutomationTab } from "./tabs/automation-tab";
import { AITab } from "./tabs/ai-tab";
import { FinancialStatementsTab } from "./tabs/financial-statements-tab";
import { TrialBalanceTab } from "./tabs/trial-balance-tab";
import { ClosingTab } from "./tabs/closing-tab";
import { ComplianceTab } from "./tabs/compliance-tab";
import { CFODashboardTab } from "./tabs/cfo-dashboard-tab";

type TabType = "overview" | "settings" | "catalog" | "internal" | "mapping" | "automation" | "ai" | "statements" | "trial" | "closing" | "compliance" | "cfo";

export function AccountingPage() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<TabType>("overview");

  const tabs = [
    { id: "overview" as TabType, label: t('accountingOverview') },
    { id: "cfo" as TabType, label: t('cfoDashboard') },
    { id: "statements" as TabType, label: t('financialStatements') },
    { id: "trial" as TabType, label: t('trialBalance') },
    { id: "closing" as TabType, label: t('closingProcess') },
    { id: "compliance" as TabType, label: t('compliance') },
    { id: "settings" as TabType, label: t('accountingSettings') },
    { id: "catalog" as TabType, label: t('officialCatalog') },
    { id: "internal" as TabType, label: t('internalCoA') },
    { id: "mapping" as TabType, label: t('mappingReporting') },
    { id: "automation" as TabType, label: t('automationRules') },
    { id: "ai" as TabType, label: t('aiAnalytics') },
  ];

  const renderTab = () => {
    switch (activeTab) {
      case "overview":
        return <OverviewTab />;
      case "cfo":
        return <CFODashboardTab />;
      case "statements":
        return <FinancialStatementsTab />;
      case "trial":
        return <TrialBalanceTab />;
      case "closing":
        return <ClosingTab />;
      case "compliance":
        return <ComplianceTab />;
      case "settings":
        return <SettingsTab />;
      case "catalog":
        return <OfficialCatalogTab />;
      case "internal":
        return <InternalCoATab />;
      case "mapping":
        return <MappingTab />;
      case "automation":
        return <AutomationTab />;
      case "ai":
        return <AITab />;
      default:
        return <OverviewTab />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Welcome Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <h1 className="text-2xl font-bold text-gray-900">{t('welcome')}</h1>
        <p className="text-sm text-gray-500 mt-1">
          Hoy es {new Date().toLocaleDateString('es-MX', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </p>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-gray-200 px-6">
        <div className="flex gap-2 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap",
                activeTab === tab.id
                  ? "border-emerald-600 text-emerald-600"
                  : "border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300"
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="p-6">
        {renderTab()}
      </div>
    </div>
  );
}
