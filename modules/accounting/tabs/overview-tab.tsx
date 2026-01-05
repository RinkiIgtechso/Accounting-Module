"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/hooks/use-language";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

const costByTypeData = [
  { name: "Preventivo", value: 45000 },
  { name: "Correctivo", value: 32000 },
  { name: "Terceros", value: 18000 },
];

const costTrendData = [
  { month: "Ene", cost: 85000 },
  { month: "Feb", cost: 92000 },
  { month: "Mar", cost: 88000 },
  { month: "Abr", cost: 95000 },
  { month: "May", cost: 105000 },
  { month: "Jun", cost: 98000 },
];

const recentEntriesData = [
  { date: "2025-11-15", source: "Mantenimiento", description: "Servicio preventivo Unidad 1234", amount: "$2,500" },
  { date: "2025-11-14", source: "Refacciones", description: "Compra de llantas", amount: "$8,000" },
  { date: "2025-11-13", source: "Servicios ext.", description: "Reparación motor", amount: "$15,000" },
  { date: "2025-11-12", source: "Mantenimiento", description: "Cambio de aceite", amount: "$1,200" },
];

export function OverviewTab() {
  const { t } = useLanguage();

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">{t('journalEntriesMonth')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">156</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">{t('maintenanceCost')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">$95,000</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">{t('partsPurchases')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">$32,500</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">{t('externalServices')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">$18,200</div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>{t('costByType')}</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={costByTypeData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#10b981" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t('costTrend')}</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={costTrendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="cost" stroke="#10b981" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Entries Table */}
      <Card>
        <CardHeader>
          <CardTitle>{t('recentEntries')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium text-gray-600">{t('date')}</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">{t('source')}</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">{t('description')}</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-600">{t('amount')}</th>
                </tr>
              </thead>
              <tbody>
                {recentEntriesData.map((entry, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4 text-sm">{entry.date}</td>
                    <td className="py-3 px-4 text-sm">{entry.source}</td>
                    <td className="py-3 px-4 text-sm">{entry.description}</td>
                    <td className="py-3 px-4 text-sm text-right font-medium">{entry.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
