"use client";

import { useState } from "react";
import { useLanguage } from "@/hooks/use-language";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Download, FileSpreadsheet, FileText, FileCode } from 'lucide-react';

export function ComplianceTab() {
  const { t } = useLanguage();
  const [selectedCountry, setSelectedCountry] = useState<"mexico" | "brazil" | "usa">("mexico");

  const handleExport = (reportType: string, format: string) => {
    alert(`Exportando: ${reportType} - ${format}`);
  };

  const renderMexicoReports = () => (
    <div className="space-y-4">
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{t('exportCOI')}</h3>
            <p className="text-sm text-gray-600">Formato de Contabilidad Electrónica para el SAT</p>
          </div>
          <Button 
            onClick={() => handleExport('COI', 'TXT')}
            className="bg-emerald-600 hover:bg-emerald-700"
          >
            <FileText className="w-4 h-4 mr-2" />
            Generar COI
          </Button>
        </div>
      </Card>

      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{t('ivaIsrSummary')}</h3>
            <p className="text-sm text-gray-600">Resumen mensual de IVA e ISR</p>
          </div>
          <Button 
            onClick={() => handleExport('IVA-ISR', 'XLSX')}
            className="bg-emerald-600 hover:bg-emerald-700"
          >
            <FileSpreadsheet className="w-4 h-4 mr-2" />
            {t('generateCompliance')}
          </Button>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="p-3 bg-gray-50 rounded-lg">
            <div className="text-xs text-gray-600">IVA trasladado</div>
            <div className="text-lg font-semibold text-gray-900">$280,000</div>
          </div>
          <div className="p-3 bg-gray-50 rounded-lg">
            <div className="text-xs text-gray-600">IVA acreditable</div>
            <div className="text-lg font-semibold text-gray-900">$150,000</div>
          </div>
          <div className="p-3 bg-gray-50 rounded-lg">
            <div className="text-xs text-gray-600">IVA por pagar</div>
            <div className="text-lg font-semibold text-emerald-600">$130,000</div>
          </div>
          <div className="p-3 bg-gray-50 rounded-lg">
            <div className="text-xs text-gray-600">ISR estimado</div>
            <div className="text-lg font-semibold text-gray-900">$189,000</div>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{t('satTrialBalance')}</h3>
            <p className="text-sm text-gray-600">Balanza de Comprobación formato SAT</p>
          </div>
          <Button 
            onClick={() => handleExport('Balanza-SAT', 'XML')}
            className="bg-emerald-600 hover:bg-emerald-700"
          >
            <FileCode className="w-4 h-4 mr-2" />
            Exportar XML
          </Button>
        </div>
      </Card>
    </div>
  );

  const renderBrazilReports = () => (
    <div className="space-y-4">
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{t('spedMapping')}</h3>
            <p className="text-sm text-gray-600">Sistema Público de Escrituração Digital</p>
          </div>
          <Button 
            onClick={() => handleExport('SPED', 'TXT')}
            className="bg-emerald-600 hover:bg-emerald-700"
          >
            <FileText className="w-4 h-4 mr-2" />
            Gerar SPED
          </Button>
        </div>
        <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-800">
            Mapeamento automático para o Plano de Contas conforme legislação brasileira
          </p>
        </div>
      </Card>

      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">DRE - Demonstração do Resultado</h3>
            <p className="text-sm text-gray-600">Conforme legislação brasileira</p>
          </div>
          <Button 
            onClick={() => handleExport('DRE', 'XLSX')}
            className="bg-emerald-600 hover:bg-emerald-700"
          >
            <FileSpreadsheet className="w-4 h-4 mr-2" />
            Gerar DRE
          </Button>
        </div>
      </Card>

      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Balanço Patrimonial</h3>
            <p className="text-sm text-gray-600">Conforme CPC / IFRS</p>
          </div>
          <Button 
            onClick={() => handleExport('Balanco', 'XLSX')}
            className="bg-emerald-600 hover:bg-emerald-700"
          >
            <FileSpreadsheet className="w-4 h-4 mr-2" />
            Gerar Balanço
          </Button>
        </div>
      </Card>
    </div>
  );

  const renderUSAReports = () => (
    <div className="space-y-4">
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{t('ifrsReports')}</h3>
            <p className="text-sm text-gray-600">International Financial Reporting Standards</p>
          </div>
          <Button 
            onClick={() => handleExport('IFRS', 'XLSX')}
            className="bg-emerald-600 hover:bg-emerald-700"
          >
            <FileSpreadsheet className="w-4 h-4 mr-2" />
            {t('generateReport')}
          </Button>
        </div>
      </Card>

      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{t('usGaapReports')}</h3>
            <p className="text-sm text-gray-600">Generally Accepted Accounting Principles</p>
          </div>
          <Button 
            onClick={() => handleExport('US-GAAP', 'XLSX')}
            className="bg-emerald-600 hover:bg-emerald-700"
          >
            <FileSpreadsheet className="w-4 h-4 mr-2" />
            {t('generateReport')}
          </Button>
        </div>
      </Card>

      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{t('xbrlExport')}</h3>
            <p className="text-sm text-gray-600">eXtensible Business Reporting Language</p>
          </div>
          <Button 
            onClick={() => handleExport('XBRL', 'XML')}
            className="bg-emerald-600 hover:bg-emerald-700"
          >
            <FileCode className="w-4 h-4 mr-2" />
            Export XBRL
          </Button>
        </div>
        <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-800">
            Standard format for regulatory reporting to SEC and other authorities
          </p>
        </div>
      </Card>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('complianceReports')}</h2>
        <p className="text-gray-600 mb-6">
          Reportes de cumplimiento fiscal y regulatorio por país
        </p>

        {/* Country Selector */}
        <div className="flex gap-2">
          <Button
            variant={selectedCountry === "mexico" ? "default" : "outline"}
            onClick={() => setSelectedCountry("mexico")}
            className={selectedCountry === "mexico" ? "bg-emerald-600 hover:bg-emerald-700" : ""}
          >
            {t('mexicoCompliance')}
          </Button>
          <Button
            variant={selectedCountry === "brazil" ? "default" : "outline"}
            onClick={() => setSelectedCountry("brazil")}
            className={selectedCountry === "brazil" ? "bg-emerald-600 hover:bg-emerald-700" : ""}
          >
            {t('brazilCompliance')}
          </Button>
          <Button
            variant={selectedCountry === "usa" ? "default" : "outline"}
            onClick={() => setSelectedCountry("usa")}
            className={selectedCountry === "usa" ? "bg-emerald-600 hover:bg-emerald-700" : ""}
          >
            {t('usaCompliance')}
          </Button>
        </div>
      </Card>

      {/* Country-specific reports */}
      {selectedCountry === "mexico" && renderMexicoReports()}
      {selectedCountry === "brazil" && renderBrazilReports()}
      {selectedCountry === "usa" && renderUSAReports()}
    </div>
  );
}
