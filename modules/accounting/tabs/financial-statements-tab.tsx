"use client";

import { useState } from "react";
import { useLanguage } from "@/hooks/use-language";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Download, FileSpreadsheet, FileText } from 'lucide-react';

type StatementType = "income" | "balance" | "cashflow";

export function FinancialStatementsTab() {
  const { t } = useLanguage();
  const [activeStatement, setActiveStatement] = useState<StatementType>("income");
  const [filters, setFilters] = useState({
    country: "mexico",
    organization: "all",
    dateRange: "2024-01",
    groupBy: "country"
  });

  // Mock data for Income Statement
  const incomeStatementData = [
    { label: t('revenue'), amount: 12500000 },
    { label: t('services'), amount: 7500000, indent: 1 },
    { label: t('leasing'), amount: 3000000, indent: 1 },
    { label: t('partsIncome'), amount: 2000000, indent: 1 },
    { label: t('costOfServices'), amount: -5200000 },
    { label: t('grossMargin'), amount: 7300000, bold: true },
    { label: t('operatingExpenses'), amount: -3800000 },
    { label: t('ebitda'), amount: 3500000, bold: true },
    { label: t('depreciation'), amount: -800000 },
    { label: t('taxes'), amount: -810000 },
    { label: t('netIncome'), amount: 1890000, bold: true, highlight: true },
  ];

  // Mock data for Balance Sheet
  const balanceSheetData = [
    { label: t('assets'), amount: 45000000, bold: true },
    { label: t('currentAssets'), amount: 18000000, indent: 1 },
    { label: t('longTermAssets'), amount: 27000000, indent: 1 },
    { label: t('liabilities'), amount: 28000000, bold: true },
    { label: t('currentLiabilities'), amount: 12000000, indent: 1 },
    { label: t('longTermLiabilities'), amount: 16000000, indent: 1 },
    { label: t('equity'), amount: 17000000, bold: true, highlight: true },
  ];

  // Mock data for Cash Flow Statement
  const cashFlowData = [
    { label: t('operatingActivities'), amount: 3200000, bold: true },
    { label: t('netIncome'), amount: 1890000, indent: 1 },
    { label: t('depreciation'), amount: 800000, indent: 1 },
    { label: t('investingActivities'), amount: -1500000, bold: true },
    { label: t('financingActivities'), amount: -800000, bold: true },
  ];

  // Chart data
  const revenueChartData = [
    { month: 'Ene', services: 700, leasing: 280, parts: 185 },
    { month: 'Feb', services: 720, leasing: 290, parts: 195 },
    { month: 'Mar', services: 750, leasing: 300, parts: 200 },
    { month: 'Abr', services: 730, leasing: 295, parts: 190 },
    { month: 'May', services: 760, leasing: 305, parts: 205 },
    { month: 'Jun', services: 780, leasing: 310, parts: 210 },
  ];

  const profitabilityChartData = [
    { month: 'Ene', grossMargin: 58.5, netMargin: 14.8 },
    { month: 'Feb', grossMargin: 59.2, netMargin: 15.1 },
    { month: 'Mar', grossMargin: 58.8, netMargin: 15.0 },
    { month: 'Abr', grossMargin: 59.5, netMargin: 15.3 },
    { month: 'May', grossMargin: 59.0, netMargin: 15.2 },
    { month: 'Jun', grossMargin: 58.4, netMargin: 15.1 },
  ];

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
      minimumFractionDigits: 0,
    }).format(Math.abs(value));
  };

  const handleExport = (format: 'excel' | 'csv') => {
    const fileName = `financial-statement-${activeStatement}-${filters.dateRange}.${format === 'excel' ? 'xlsx' : 'csv'}`;
    alert(`${t('export')}: ${fileName}`);
  };

  const renderStatement = () => {
    let data = incomeStatementData;
    if (activeStatement === "balance") data = balanceSheetData;
    if (activeStatement === "cashflow") data = cashFlowData;

    return (
      <div className="bg-white rounded-lg border border-gray-200">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t('description')}
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t('amount')}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {data.map((row, index) => (
              <tr 
                key={index}
                className={row.highlight ? 'bg-emerald-50' : ''}
              >
                <td 
                  className={`px-6 py-4 text-sm ${row.bold ? 'font-semibold' : ''} text-gray-900`}
                  style={{ paddingLeft: `${(row.indent || 0) * 24 + 24}px` }}
                >
                  {row.label}
                </td>
                <td className={`px-6 py-4 text-sm ${row.bold ? 'font-semibold' : ''} text-right ${row.amount < 0 ? 'text-red-600' : 'text-gray-900'}`}>
                  {row.amount < 0 && '('}
                  {formatCurrency(row.amount)}
                  {row.amount < 0 && ')'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Statement Type Selector */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex gap-2">
            <Button
              variant={activeStatement === "income" ? "default" : "outline"}
              onClick={() => setActiveStatement("income")}
              className={activeStatement === "income" ? "bg-emerald-600 hover:bg-emerald-700" : ""}
            >
              {t('incomeStatement')}
            </Button>
            <Button
              variant={activeStatement === "balance" ? "default" : "outline"}
              onClick={() => setActiveStatement("balance")}
              className={activeStatement === "balance" ? "bg-emerald-600 hover:bg-emerald-700" : ""}
            >
              {t('balanceSheet')}
            </Button>
            <Button
              variant={activeStatement === "cashflow" ? "default" : "outline"}
              onClick={() => setActiveStatement("cashflow")}
              className={activeStatement === "cashflow" ? "bg-emerald-600 hover:bg-emerald-700" : ""}
            >
              {t('cashFlowStatement')}
            </Button>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => handleExport('excel')}>
              <FileSpreadsheet className="w-4 h-4 mr-2" />
              {t('downloadExcel')}
            </Button>
            <Button variant="outline" onClick={() => handleExport('csv')}>
              <FileText className="w-4 h-4 mr-2" />
              {t('downloadCSV')}
            </Button>
          </div>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">{t('country')}</label>
            <select 
              value={filters.country}
              onChange={(e) => setFilters({ ...filters, country: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            >
              <option value="all">Todos</option>
              <option value="mexico">{t('mexico')}</option>
              <option value="brazil">{t('brazil')}</option>
              <option value="usa">{t('usa')}</option>
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
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">{t('groupBy')}</label>
            <select 
              value={filters.groupBy}
              onChange={(e) => setFilters({ ...filters, groupBy: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            >
              <option value="country">{t('country')}</option>
              <option value="organization">{t('organization')}</option>
              <option value="fleet">{t('fleet')}</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Statement Table */}
      {renderStatement()}

      {/* Charts */}
      {activeStatement === "income" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('revenue')} - {t('costTrend')}</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={revenueChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="services" fill="#10b981" name={t('services')} />
                <Bar dataKey="leasing" fill="#3b82f6" name={t('leasing')} />
                <Bar dataKey="parts" fill="#f59e0b" name="Refacciones" />
              </BarChart>
            </ResponsiveContainer>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('profitabilityTrends')}</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={profitabilityChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="grossMargin" stroke="#10b981" name={t('grossMargin') + ' %'} />
                <Line type="monotone" dataKey="netMargin" stroke="#3b82f6" name="Margen Neto %" />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </div>
      )}
    </div>
  );
}
