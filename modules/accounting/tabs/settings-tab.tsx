"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/hooks/use-language";
import { Check, Download } from 'lucide-react';

export function SettingsTab() {
  const { t } = useLanguage();
  const [saved, setSaved] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState("mexico");
  const [selectedExportFormat, setSelectedExportFormat] = useState<string | null>(null);

  const countries = [
    { value: "mexico", label: t('mexico') },
    { value: "brazil", label: t('brazil') },
    { value: "usa", label: t('usa') },
    { value: "canada", label: t('canada') },
    { value: "colombia", label: t('colombia') },
    { value: "chile", label: t('chile') },
  ];

  const exportFormats = [
    { id: 'coi', label: 'COI TXT', fileExt: 'txt' },
    { id: 'contpaqi', label: 'ContpaqI', fileExt: 'txt' },
    { id: 'excel', label: 'Excel (XLSX)', fileExt: 'xlsx' },
    { id: 'json', label: 'JSON (SAP/NetSuite)', fileExt: 'json' },
  ];

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleExportFormat = (formatId: string) => {
    setSelectedExportFormat(formatId);
    
    // Simulate export file generation
    const format = exportFormats.find(f => f.id === formatId);
    if (!format) return;

    // In a real application, this would generate the actual file
    console.log(`[v0] Exporting accounting data in ${format.label} format`);
    
    // Create a sample file download
    const sampleContent = generateSampleExport(formatId);
    const blob = new Blob([sampleContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `accounting_export_${new Date().toISOString().split('T')[0]}.${format.fileExt}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);

    // Reset selection after 2 seconds
    setTimeout(() => setSelectedExportFormat(null), 2000);
  };

  const generateSampleExport = (formatId: string): string => {
    switch (formatId) {
      case 'coi':
        return 'COI|601.56|Mantenimiento preventivo|5000.00|D\nCOI|102.01|Banco|5000.00|C\n';
      case 'contpaqi':
        return 'N|601.56|Mantenimiento preventivo|5000.00|0.00\nN|102.01|Banco|0.00|5000.00\n';
      case 'excel':
        return 'Account,Description,Debit,Credit\n601.56,Mantenimiento preventivo,5000.00,0.00\n102.01,Banco,0.00,5000.00\n';
      case 'json':
        return JSON.stringify({
          entries: [
            { account: '601.56', description: 'Mantenimiento preventivo', debit: 5000, credit: 0 },
            { account: '102.01', description: 'Banco', debit: 0, credit: 5000 }
          ]
        }, null, 2);
      default:
        return '';
    }
  };

  return (
    <div className="space-y-6">
      {/* Country Selection */}
      <Card>
        <CardHeader>
          <CardTitle>{t('country')}</CardTitle>
        </CardHeader>
        <CardContent>
          <select
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.target.value)}
            className="w-full md:w-64 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          >
            {countries.map((country) => (
              <option key={country.value} value={country.value}>
                {country.label}
              </option>
            ))}
          </select>
        </CardContent>
      </Card>

      {/* Default Accounts */}
      <Card>
        <CardHeader>
          <CardTitle>{t('defaultAccounts')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('preventiveMaintenance')}
                </label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500">
                  <option>601.56 - Mantenimiento y conservación</option>
                  <option>604.56 - Mantenimiento y conservación</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('correctiveMaintenance')}
                </label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500">
                  <option>601.56 - Mantenimiento y conservación</option>
                  <option>604.56 - Mantenimiento y conservación</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('partsPurchase')}
                </label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500">
                  <option>502.01 - Compras nacionales</option>
                  <option>502.03 - Compras de importación</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('externalServicesAcc')}
                </label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500">
                  <option>601.32 - Servicios administrativos</option>
                  <option>602.32 - Servicios administrativos</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('taxes')}
                </label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500">
                  <option>213.01 - IVA por pagar</option>
                  <option>213.03 - ISR por pagar</option>
                </select>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Base Catalog */}
      <Card>
        <CardHeader>
          <CardTitle>{t('baseCatalog')}</CardTitle>
        </CardHeader>
        <CardContent>
          <select className="w-full md:w-64 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500">
            <option>SAT (México)</option>
            <option>Plano de Contas (Brasil)</option>
            <option>Custom Import</option>
          </select>
        </CardContent>
      </Card>

      {/* Export Format */}
      <Card>
        <CardHeader>
          <CardTitle>{t('exportFormat')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {exportFormats.map((format) => (
              <Button
                key={format.id}
                variant={selectedExportFormat === format.id ? "default" : "outline"}
                onClick={() => handleExportFormat(format.id)}
                className={selectedExportFormat === format.id ? "bg-emerald-600 hover:bg-emerald-700" : ""}
              >
                <Download className="w-4 h-4 mr-2" />
                {format.label}
              </Button>
            ))}
          </div>
          <p className="text-sm text-gray-500 mt-3">
            {t('exportFormat') === 'Formato de exportación' 
              ? 'Selecciona un formato para descargar tus registros contables'
              : 'Select a format to download your accounting records'}
          </p>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex items-center gap-4">
        <Button onClick={handleSave} className="bg-emerald-600 hover:bg-emerald-700">
          {t('save')}
        </Button>
        {saved && (
          <div className="flex items-center gap-2 text-emerald-600">
            <Check className="w-5 h-5" />
            <span className="text-sm font-medium">{t('settingsSaved')}</span>
          </div>
        )}
      </div>
    </div>
  );
}
