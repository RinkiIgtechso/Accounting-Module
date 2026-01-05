"use client";

import { useState } from "react";
import { useLanguage } from "@/hooks/use-language";
import { Card } from "@/components/ui/card";
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { TrendingUp, TrendingDown, DollarSign, AlertTriangle } from 'lucide-react';

export function CFODashboardTab() {
  const { t } = useLanguage();
  const [aggregateBy, setAggregateBy] = useState<"country" | "organization" | "fleet">("country");

  // Mock KPI data
  const kpis = [
    {
      label: t('ebitda'),
      value: '$3,500,000',
      change: '+12.5%',
      trend: 'up' as const,
      icon: DollarSign,
    },
    {
      label: t('netIncome'),
      value: '$1,890,000',
      change: '+8.3%',
      trend: 'up' as const,
      icon: TrendingUp,
    },
    {
      label: t('operatingCashFlow'),
      value: '$3,200,000',
      change: '+15.2%',
      trend: 'up' as const,
      icon: DollarSign,
    },
    {
      label: t('maintenanceCostPerUnit'),
      value: '$2,450',
      change: '-3.1%',
      trend: 'down' as const,
      icon: TrendingDown,
    },
    {
      label: t('taxExposure'),
      value: '$810,000',
      change: '+5.8%',
      trend: 'up' as const,
      icon: AlertTriangle,
    },
  ];

  // Expense by category
  const expenseData = [
    { name: 'Mantenimiento', value: 3800, color: '#10b981' },
    { name: 'Refacciones', value: 2200, color: '#3b82f6' },
    { name: 'Combustible', value: 1800, color: '#f59e0b' },
    { name: 'Personal', value: 2500, color: '#8b5cf6' },
    { name: 'Seguros', value: 800, color: '#ec4899' },
  ];

  // Profitability trends
  const profitabilityData = [
    { month: 'Jul', margin: 14.2, ebitda: 3200 },
    { month: 'Ago', margin: 14.8, ebitda: 3350 },
    { month: 'Sep', margin: 15.1, ebitda: 3400 },
    { month: 'Oct', margin: 14.5, ebitda: 3280 },
    { month: 'Nov', margin: 15.3, ebitda: 3520 },
    { month: 'Dic', margin: 15.1, ebitda: 3500 },
  ];

  // Cash position by country
  const cashPositionData = [
    { country: 'México', cash: 8500, receivables: 3200, payables: 2800 },
    { country: 'Brasil', cash: 4200, receivables: 1800, payables: 1500 },
    { country: 'USA', cash: 6800, receivables: 2500, payables: 2100 },
    { country: 'Chile', cash: 3200, receivables: 1200, payables: 900 },
  ];

  // Multi-country comparison
  const countryPerformanceData = [
    { country: 'México', revenue: 7500, expenses: 5200, profit: 2300 },
    { country: 'Brasil', revenue: 3200, expenses: 2400, profit: 800 },
    { country: 'USA', revenue: 4800, expenses: 3200, profit: 1600 },
    { country: 'Chile', revenue: 2000, expenses: 1400, profit: 600 },
  ];

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
      minimumFractionDigits: 0,
    }).format(value * 1000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">{t('cfoDashboard')}</h2>
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-gray-700">{t('aggregateBy')}:</label>
          <select 
            value={aggregateBy}
            onChange={(e) => setAggregateBy(e.target.value as any)}
            className="px-3 py-2 border border-gray-300 rounded-md"
          >
            <option value="country">{t('country')}</option>
            <option value="organization">{t('organization')}</option>
            <option value="fleet">{t('fleet')}</option>
          </select>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {kpis.map((kpi, index) => (
          <Card key={index} className="p-6">
            <div className="flex items-start justify-between mb-2">
              <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center">
                <kpi.icon className="w-5 h-5 text-emerald-600" />
              </div>
              <span className={`text-sm font-medium ${kpi.trend === 'up' ? 'text-emerald-600' : 'text-red-600'}`}>
                {kpi.change}
              </span>
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">{kpi.value}</div>
            <div className="text-sm text-gray-600">{kpi.label}</div>
          </Card>
        ))}
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Expense by Category */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('expenseByCategory')}</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={expenseData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {expenseData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => formatCurrency(value as number)} />
            </PieChart>
          </ResponsiveContainer>
        </Card>

        {/* Profitability Trends */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('profitabilityTrends')}</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={profitabilityData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Legend />
              <Line yAxisId="left" type="monotone" dataKey="margin" stroke="#10b981" name="Margen Neto %" />
              <Line yAxisId="right" type="monotone" dataKey="ebitda" stroke="#3b82f6" name="EBITDA (miles)" />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Cash Position */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('cashPosition')} - {t('multiCountryView')}</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={cashPositionData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="country" />
              <YAxis />
              <Tooltip formatter={(value) => formatCurrency(value as number)} />
              <Legend />
              <Bar dataKey="cash" fill="#10b981" name="Efectivo" />
              <Bar dataKey="receivables" fill="#3b82f6" name="Por cobrar" />
              <Bar dataKey="payables" fill="#f59e0b" name="Por pagar" />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Country Performance */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Desempeño por País</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={countryPerformanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="country" />
              <YAxis />
              <Tooltip formatter={(value) => formatCurrency(value as number)} />
              <Legend />
              <Bar dataKey="revenue" fill="#10b981" name="Ingresos" />
              <Bar dataKey="expenses" fill="#f59e0b" name="Gastos" />
              <Bar dataKey="profit" fill="#3b82f6" name="Utilidad" />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Summary Table */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Resumen Ejecutivo Multi-País</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">País</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Ingresos</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Gastos</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">EBITDA</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Margen %</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Utilidad</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {countryPerformanceData.map((row, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{row.country}</td>
                  <td className="px-6 py-4 text-sm text-right text-gray-900">{formatCurrency(row.revenue)}</td>
                  <td className="px-6 py-4 text-sm text-right text-gray-900">{formatCurrency(row.expenses)}</td>
                  <td className="px-6 py-4 text-sm text-right text-gray-900">{formatCurrency(row.profit * 1.3)}</td>
                  <td className="px-6 py-4 text-sm text-right text-emerald-600 font-medium">
                    {((row.profit / row.revenue) * 100).toFixed(1)}%
                  </td>
                  <td className="px-6 py-4 text-sm text-right font-semibold text-gray-900">{formatCurrency(row.profit)}</td>
                </tr>
              ))}
              <tr className="bg-emerald-50 font-semibold">
                <td className="px-6 py-4 text-sm text-gray-900">TOTAL</td>
                <td className="px-6 py-4 text-sm text-right text-gray-900">
                  {formatCurrency(countryPerformanceData.reduce((sum, r) => sum + r.revenue, 0))}
                </td>
                <td className="px-6 py-4 text-sm text-right text-gray-900">
                  {formatCurrency(countryPerformanceData.reduce((sum, r) => sum + r.expenses, 0))}
                </td>
                <td className="px-6 py-4 text-sm text-right text-gray-900">
                  {formatCurrency(countryPerformanceData.reduce((sum, r) => sum + r.profit * 1.3, 0))}
                </td>
                <td className="px-6 py-4 text-sm text-right text-emerald-600">
                  {((countryPerformanceData.reduce((sum, r) => sum + r.profit, 0) / 
                     countryPerformanceData.reduce((sum, r) => sum + r.revenue, 0)) * 100).toFixed(1)}%
                </td>
                <td className="px-6 py-4 text-sm text-right text-gray-900">
                  {formatCurrency(countryPerformanceData.reduce((sum, r) => sum + r.profit, 0))}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
