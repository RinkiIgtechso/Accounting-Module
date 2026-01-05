"use client";

import { useState } from "react";
import { useLanguage } from "@/hooks/use-language";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Download, FileSpreadsheet, FileText } from 'lucide-react';

export function TrialBalanceTab() {
  const { t } = useLanguage();
  const [filters, setFilters] = useState({
    country: "mexico",
    catalogType: "sat",
    organization: "all",
    dateRange: "2024-01"
  });

  // Mock trial balance data
  const trialBalanceData = [
    { code: "101", name: "Caja", openingBalance: 50000, debits: 280000, credits: 250000, endingBalance: 80000 },
    { code: "102", name: "Bancos", openingBalance: 850000, debits: 3500000, credits: 3200000, endingBalance: 1150000 },
    { code: "105", name: "Clientes", openingBalance: 420000, debits: 1200000, credits: 980000, endingBalance: 640000 },
    { code: "115", name: "Inventario", openingBalance: 680000, debits: 950000, credits: 820000, endingBalance: 810000 },
    { code: "151", name: "Terrenos", openingBalance: 5000000, debits: 0, credits: 0, endingBalance: 5000000 },
    { code: "152", name: "Edificios", openingBalance: 8500000, debits: 0, credits: 0, endingBalance: 8500000 },
    { code: "201", name: "Proveedores", openingBalance: 350000, debits: 820000, credits: 950000, endingBalance: 480000 },
    { code: "213", name: "IVA por pagar", openingBalance: 85000, debits: 250000, credits: 280000, endingBalance: 115000 },
    { code: "252", name: "Préstamos L/P", openingBalance: 2500000, debits: 50000, credits: 0, endingBalance: 2450000 },
    { code: "301", name: "Capital social", openingBalance: 10000000, debits: 0, credits: 0, endingBalance: 10000000 },
    { code: "401", name: "Ventas", openingBalance: 0, debits: 0, credits: 1850000, endingBalance: 1850000 },
    { code: "601", name: "Gastos operativos", openingBalance: 0, debits: 680000, credits: 0, endingBalance: 680000 },
  ];

  const totals = trialBalanceData.reduce((acc, row) => ({
    openingBalance: acc.openingBalance + Math.abs(row.openingBalance),
    debits: acc.debits + row.debits,
    credits: acc.credits + row.credits,
    endingBalance: acc.endingBalance + Math.abs(row.endingBalance),
  }), { openingBalance: 0, debits: 0, credits: 0, endingBalance: 0 });

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
      minimumFractionDigits: 0,
    }).format(value);
  };

  const handleExport = (format: 'excel' | 'csv' | 'txt') => {
    const fileName = `trial-balance-${filters.dateRange}.${format === 'excel' ? 'xlsx' : format}`;
    
    if (format === 'txt') {
      // Export COI format for Mexico
      let content = "BALANZA DE COMPROBACIÓN\n";
      content += "Período: " + filters.dateRange + "\n\n";
      content += "Código|Cuenta|Saldo Inicial|Cargos|Abonos|Saldo Final\n";
      trialBalanceData.forEach(row => {
        content += `${row.code}|${row.name}|${row.openingBalance}|${row.debits}|${row.credits}|${row.endingBalance}\n`;
      });
      
      const blob = new Blob([content], { type: 'text/plain' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName;
      a.click();
      return;
    }
    
    alert(`${t('export')}: ${fileName}`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">{t('trialBalance')}</h2>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => handleExport('excel')}>
              <FileSpreadsheet className="w-4 h-4 mr-2" />
              {t('downloadExcel')}
            </Button>
            <Button variant="outline" onClick={() => handleExport('csv')}>
              <FileText className="w-4 h-4 mr-2" />
              {t('downloadCSV')}
            </Button>
            <Button variant="outline" onClick={() => handleExport('txt')}>
              <Download className="w-4 h-4 mr-2" />
              TXT COI
            </Button>
          </div>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">{t('country')}</label>
            <select 
              value={filters.country}
              onChange={(e) => setFilters({ ...filters, country: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            >
              <option value="mexico">{t('mexico')}</option>
              <option value="brazil">{t('brazil')}</option>
              <option value="usa">{t('usa')}</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">{t('catalogType')}</label>
            <select 
              value={filters.catalogType}
              onChange={(e) => setFilters({ ...filters, catalogType: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            >
              <option value="sat">SAT (México)</option>
              <option value="plano">Plano de Contas (Brasil)</option>
              <option value="internal">Plan Interno</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">{t('organization')}</label>
            <select 
              value={filters.organization}
              onChange={(e) => setFilters({ ...filters, organization: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            >
              <option value="all">Todas</option>
              <option value="org1">Organización 1</option>
              <option value="org2">Organización 2</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">{t('dateRange')}</label>
            <input
              type="month"
              value={filters.dateRange}
              onChange={(e) => setFilters({ ...filters, dateRange: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
        </div>
      </Card>

      {/* Trial Balance Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t('code')}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t('accountName')}
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t('openingBalance')}
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t('debits')}
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t('credits')}
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t('endingBalance')}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {trialBalanceData.map((row, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm text-gray-900">{row.code}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{row.name}</td>
                <td className="px-6 py-4 text-sm text-right text-gray-900">{formatCurrency(row.openingBalance)}</td>
                <td className="px-6 py-4 text-sm text-right text-gray-900">{formatCurrency(row.debits)}</td>
                <td className="px-6 py-4 text-sm text-right text-gray-900">{formatCurrency(row.credits)}</td>
                <td className="px-6 py-4 text-sm text-right text-gray-900">{formatCurrency(row.endingBalance)}</td>
              </tr>
            ))}
            <tr className="bg-emerald-50 font-semibold">
              <td className="px-6 py-4 text-sm text-gray-900" colSpan={2}>TOTALES</td>
              <td className="px-6 py-4 text-sm text-right text-gray-900">{formatCurrency(totals.openingBalance)}</td>
              <td className="px-6 py-4 text-sm text-right text-gray-900">{formatCurrency(totals.debits)}</td>
              <td className="px-6 py-4 text-sm text-right text-gray-900">{formatCurrency(totals.credits)}</td>
              <td className="px-6 py-4 text-sm text-right text-gray-900">{formatCurrency(totals.endingBalance)}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Balance Check */}
      <Card className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Verificación de Balances</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">{t('totalDebits')}:</span>
                <span className="text-sm font-semibold text-gray-900">{formatCurrency(totals.debits)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">{t('totalCredits')}:</span>
                <span className="text-sm font-semibold text-gray-900">{formatCurrency(totals.credits)}</span>
              </div>
              <div className="flex justify-between pt-2 border-t">
                <span className="text-sm font-semibold text-gray-900">Diferencia:</span>
                <span className={`text-sm font-semibold ${totals.debits === totals.credits ? 'text-emerald-600' : 'text-red-600'}`}>
                  {formatCurrency(Math.abs(totals.debits - totals.credits))}
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center">
            {totals.debits === totals.credits ? (
              <div className="text-center">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-sm font-medium text-emerald-600">Balanza cuadrada</p>
              </div>
            ) : (
              <div className="text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
                <p className="text-sm font-medium text-red-600">Balanza descuadrada</p>
              </div>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
}
