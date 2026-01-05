"use client";

import { useState } from "react";
import { useLanguage } from "@/hooks/use-language";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Lock, Unlock, CheckCircle, Clock, AlertCircle } from 'lucide-react';

type PeriodStatus = "open" | "closed" | "locked";
type TaskStatus = "pending" | "inProgress" | "completed";

export function ClosingTab() {
  const { t } = useLanguage();
  const [selectedPeriod, setSelectedPeriod] = useState("2024-01");

  // Mock period data
  const periods = [
    { period: "2024-01", status: "open" as PeriodStatus },
    { period: "2023-12", status: "locked" as PeriodStatus },
    { period: "2023-11", status: "locked" as PeriodStatus },
    { period: "2023-10", status: "locked" as PeriodStatus },
  ];

  // Mock closing tasks
  const closingTasks = [
    { id: 1, name: t('monthlyDepreciation'), status: "completed" as TaskStatus, responsible: "Sistema", date: "2024-01-31" },
    { id: 2, name: t('reclassifications'), status: "completed" as TaskStatus, responsible: "Juan Pérez", date: "2024-01-31" },
    { id: 3, name: t('taxCalculations'), status: "inProgress" as TaskStatus, responsible: "María García", date: null },
    { id: 4, name: t('closingEntries'), status: "pending" as TaskStatus, responsible: "Sistema", date: null },
    { id: 5, name: t('transferResults'), status: "pending" as TaskStatus, responsible: "Sistema", date: null },
  ];

  // Mock audit log
  const auditLog = [
    { date: "2024-01-31 18:45", user: "Sistema", action: "Depreciación mensual ejecutada", period: "2024-01" },
    { date: "2024-01-31 17:30", user: "Juan Pérez", action: "Reclasificación de gastos", period: "2024-01" },
    { date: "2023-12-31 23:59", user: "Admin", action: "Período 2023-12 bloqueado", period: "2023-12" },
    { date: "2023-12-31 20:15", user: "Sistema", action: "Cierre contable completado", period: "2023-12" },
  ];

  const getStatusBadge = (status: PeriodStatus) => {
    const badges = {
      open: { label: t('open'), color: 'bg-emerald-100 text-emerald-800' },
      closed: { label: t('closed'), color: 'bg-blue-100 text-blue-800' },
      locked: { label: t('locked'), color: 'bg-gray-100 text-gray-800' },
    };
    const badge = badges[status];
    return <span className={`px-2 py-1 text-xs font-medium rounded-full ${badge.color}`}>{badge.label}</span>;
  };

  const getTaskStatusIcon = (status: TaskStatus) => {
    if (status === "completed") return <CheckCircle className="w-5 h-5 text-emerald-600" />;
    if (status === "inProgress") return <Clock className="w-5 h-5 text-blue-600" />;
    return <AlertCircle className="w-5 h-5 text-gray-400" />;
  };

  const getTaskStatusBadge = (status: TaskStatus) => {
    const badges = {
      completed: { label: t('completed'), color: 'bg-emerald-100 text-emerald-800' },
      inProgress: { label: t('inProgress'), color: 'bg-blue-100 text-blue-800' },
      pending: { label: t('pending'), color: 'bg-gray-100 text-gray-800' },
    };
    const badge = badges[status];
    return <span className={`px-2 py-1 text-xs font-medium rounded-full ${badge.color}`}>{badge.label}</span>;
  };

  const completedTasks = closingTasks.filter(t => t.status === "completed").length;
  const progress = (completedTasks / closingTasks.length) * 100;

  return (
    <div className="space-y-6">
      {/* Period Management */}
      <Card className="p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">{t('periodManagement')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {periods.map((p) => (
            <div
              key={p.period}
              className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                selectedPeriod === p.period
                  ? 'border-emerald-600 bg-emerald-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => setSelectedPeriod(p.period)}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-lg font-semibold text-gray-900">{p.period}</span>
                {p.status === "locked" && <Lock className="w-4 h-4 text-gray-600" />}
                {p.status === "open" && <Unlock className="w-4 h-4 text-emerald-600" />}
              </div>
              {getStatusBadge(p.status)}
            </div>
          ))}
        </div>

        <div className="mt-6 flex gap-2">
          <Button className="bg-emerald-600 hover:bg-emerald-700">
            {t('closeMonth')}
          </Button>
          <Button variant="outline">
            {t('lockPeriod')}
          </Button>
          <Button variant="outline">
            {t('unlockPeriod')}
          </Button>
        </div>
      </Card>

      {/* Closing Progress */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900">{t('closingChecklist')}</h2>
          <div className="text-sm text-gray-600">
            Progreso: {completedTasks} / {closingTasks.length} ({Math.round(progress)}%)
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-3 mb-6">
          <div
            className="bg-emerald-600 h-3 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Task List */}
        <div className="space-y-3">
          {closingTasks.map((task) => (
            <div
              key={task.id}
              className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
            >
              <div className="flex items-center gap-3 flex-1">
                {getTaskStatusIcon(task.status)}
                <div className="flex-1">
                  <div className="font-medium text-gray-900">{task.name}</div>
                  <div className="text-sm text-gray-600">
                    {t('responsible')}: {task.responsible}
                    {task.date && ` • ${task.date}`}
                  </div>
                </div>
              </div>
              {getTaskStatusBadge(task.status)}
            </div>
          ))}
        </div>
      </Card>

      {/* Country-Specific Rules */}
      <Card className="p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">{t('automaticTasks')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 border border-gray-200 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">{t('mexico')}</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• {t('monthlyDepreciation')}</li>
              <li>• Cálculo IVA/ISR</li>
              <li>• {t('closingEntries')}</li>
            </ul>
          </div>
          <div className="p-4 border border-gray-200 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">{t('brazil')}</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• {t('monthlyDepreciation')}</li>
              <li>• Mapeamento SPED</li>
              <li>• {t('closingEntries')}</li>
            </ul>
          </div>
          <div className="p-4 border border-gray-200 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">IFRS</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• {t('monthlyDepreciation')}</li>
              <li>• Cierre anual</li>
              <li>• {t('transferResults')}</li>
            </ul>
          </div>
        </div>
      </Card>

      {/* Audit Log */}
      <Card className="p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">{t('auditLog')}</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">{t('date')}</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Usuario</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Acción</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">{t('period')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {auditLog.map((log, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-900">{log.date}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{log.user}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{log.action}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{log.period}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
