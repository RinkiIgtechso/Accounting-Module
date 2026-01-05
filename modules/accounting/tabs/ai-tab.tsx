"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/hooks/use-language";
import { TrendingUp, AlertTriangle, Sparkles } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const predictionData = [
  { month: "Jul", actual: 95000, predicted: 98000 },
  { month: "Ago", actual: 105000, predicted: 102000 },
  { month: "Sep", predicted: 110000 },
  { month: "Oct", predicted: 108000 },
  { month: "Nov", predicted: 112000 },
  { month: "Dic", predicted: 115000 },
];

const anomalies = [
  { date: "2025-11-10", module: "Mantenimiento", type: "Gasto anormal", risk: "Alto", action: "Revisar proveedor XYZ" },
  { date: "2025-11-08", module: "Refacciones", type: "Patrón inusual", risk: "Medio", action: "Validar inventario" },
  { date: "2025-11-05", module: "Combustible", type: "Pico de consumo", risk: "Bajo", action: "Verificar rutas" },
];

const recommendations = [
  { title: "Reclasificación sugerida", desc: "Mover gastos de mantenimiento correctivo a cuenta 601.56 para mejor seguimiento fiscal" },
  { title: "Revisión de contratos", desc: "Proveedor ABC muestra costos 15% superiores al promedio del mercado en México" },
  { title: "Optimización de reglas", desc: "Automatizar asientos de arrendamiento para reducir tiempo de procesamiento en 40%" },
];

export function AITab() {
  const { t } = useLanguage();

  return (
    <div className="space-y-6">
      {/* AI Badge */}
      <div className="bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-lg p-4">
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="w-5 h-5 text-purple-600" />
          <span className="font-semibold text-purple-900">
            {t('poweredBy')} AWS Bedrock, S3, Athena & QuickSight
          </span>
        </div>
        <p className="text-sm text-purple-700">
          Análisis predictivo y recomendaciones inteligentes para optimizar tu contabilidad
        </p>
      </div>

      {/* Cost Prediction */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-emerald-600" />
            <CardTitle>{t('costPrediction')}</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex flex-wrap gap-4">
              <select className="px-4 py-2 border border-gray-300 rounded-lg">
                <option>México</option>
                <option>Brasil</option>
              </select>
              <select className="px-4 py-2 border border-gray-300 rounded-lg">
                <option>Toda la flota</option>
                <option>Flota Norte</option>
                <option>Flota Sur</option>
              </select>
              <Button className="bg-purple-600 hover:bg-purple-700">
                <Sparkles className="w-4 h-4 mr-2" />
                {t('runPrediction')}
              </Button>
            </div>

            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={predictionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="actual" stroke="#10b981" strokeWidth={2} name="Real" />
                <Line type="monotone" dataKey="predicted" stroke="#8b5cf6" strokeWidth={2} strokeDasharray="5 5" name="Predicción" />
              </LineChart>
            </ResponsiveContainer>

            <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
              <div className="text-sm font-medium text-emerald-900">{t('estimatedSavings')}</div>
              <div className="text-2xl font-bold text-emerald-700 mt-1">$12,500 MXN</div>
              <p className="text-xs text-emerald-600 mt-1">Optimizando mantenimiento preventivo</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Anomaly Detection */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-orange-600" />
            <CardTitle>{t('anomalyDetection')}</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium text-gray-600">{t('date')}</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Módulo</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">{t('alertType')}</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">{t('riskLevel')}</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">{t('suggestedAction')}</th>
                </tr>
              </thead>
              <tbody>
                {anomalies.map((anomaly, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4 text-sm">{anomaly.date}</td>
                    <td className="py-3 px-4 text-sm">{anomaly.module}</td>
                    <td className="py-3 px-4 text-sm">{anomaly.type}</td>
                    <td className="py-3 px-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        anomaly.risk === 'Alto' ? 'bg-red-100 text-red-800' :
                        anomaly.risk === 'Medio' ? 'bg-orange-100 text-orange-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {anomaly.risk}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm">{anomaly.action}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* AI Recommendations */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-purple-600" />
            <CardTitle>{t('aiRecommendations')}</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recommendations.map((rec, index) => (
              <div key={index} className="border border-purple-200 bg-purple-50 rounded-lg p-4">
                <h4 className="font-medium text-purple-900 mb-1">{rec.title}</h4>
                <p className="text-sm text-purple-700">{rec.desc}</p>
                <Button variant="ghost" size="sm" className="mt-2 text-purple-600 hover:text-purple-700">
                  Ver detalles →
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
