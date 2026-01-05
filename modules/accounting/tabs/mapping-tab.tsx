"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/hooks/use-language";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Edit, Trash2, Upload, Download, Save, FileText } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface Mapping {
  id: string;
  official: string;
  internal: string;
  usage: string;
}

const initialMappings: Mapping[] = [
  { id: "1", official: "601.56 - Mantenimiento y conservación", internal: "5001 - Costo Mantenimiento", usage: "Mantenimiento" },
  { id: "2", official: "502.01 - Compras nacionales", internal: "5002 - Costo Refacciones", usage: "Refacciones" },
  { id: "3", official: "213.01 - IVA por pagar", internal: "2003 - IVA Trasladado", usage: "Impuestos" },
  { id: "4", official: "401.01 - Ventas y/o servicios", internal: "4001 - Ingresos Arrendamiento", usage: "Arrendamiento" },
];

export function MappingTab() {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [mappings, setMappings] = useState<Mapping[]>(initialMappings);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [importDialogOpen, setImportDialogOpen] = useState(false);
  const [currentMapping, setCurrentMapping] = useState<Mapping | null>(null);
  const [editForm, setEditForm] = useState({ official: "", internal: "", usage: "" });

  const handleSaveMapping = () => {
    const mappingData = mappings.map(m => ({
      official: m.official,
      internal: m.internal,
      usage: m.usage
    }));
    
    localStorage.setItem('accountMappings', JSON.stringify(mappingData));
    
    toast({
      title: t('success') || "Éxito",
      description: t('mappingSaved') || "Mapeo guardado correctamente",
    });
  };

  const handleImportMapping = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        let importedMappings: Mapping[] = [];

        if (file.name.endsWith('.json')) {
          const data = JSON.parse(content);
          importedMappings = data.map((item: any, index: number) => ({
            id: `imported-${Date.now()}-${index}`,
            official: item.official || item.officialAccount || "",
            internal: item.internal || item.internalAccount || "",
            usage: item.usage || item.mainUsage || ""
          }));
        } else if (file.name.endsWith('.csv')) {
          const lines = content.split('\n');
          importedMappings = lines.slice(1).filter(line => line.trim()).map((line, index) => {
            const [official, internal, usage] = line.split(',').map(s => s.trim());
            return {
              id: `imported-${Date.now()}-${index}`,
              official: official || "",
              internal: internal || "",
              usage: usage || ""
            };
          });
        }

        setMappings([...mappings, ...importedMappings]);
        setImportDialogOpen(false);
        
        toast({
          title: t('success') || "Éxito",
          description: `${importedMappings.length} mapeos importados correctamente`,
        });
      } catch (error) {
        toast({
          title: t('error') || "Error",
          description: "Error al importar el archivo. Verifica el formato.",
          variant: "destructive"
        });
      }
    };
    reader.readAsText(file);
  };

  const handleExportMapping = () => {
    const csvContent = [
      'Cuenta Oficial,Cuenta Interna,Uso Principal',
      ...mappings.map(m => `"${m.official}","${m.internal}","${m.usage}"`)
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `mapeo_cuentas_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();

    toast({
      title: t('success') || "Éxito",
      description: t('mappingExported') || "Mapeo exportado correctamente",
    });
  };

  const handleEditMapping = (mapping: Mapping) => {
    setCurrentMapping(mapping);
    setEditForm({
      official: mapping.official,
      internal: mapping.internal,
      usage: mapping.usage
    });
    setEditDialogOpen(true);
  };

  const handleSaveEdit = () => {
    if (!currentMapping) return;

    setMappings(mappings.map(m => 
      m.id === currentMapping.id 
        ? { ...m, ...editForm }
        : m
    ));
    
    setEditDialogOpen(false);
    setCurrentMapping(null);
    
    toast({
      title: t('success') || "Éxito",
      description: t('mappingUpdated') || "Mapeo actualizado correctamente",
    });
  };

  const handleDeleteMapping = (id: string) => {
    setMappings(mappings.filter(m => m.id !== id));
    
    toast({
      title: t('success') || "Éxito",
      description: t('mappingDeleted') || "Mapeo eliminado correctamente",
    });
  };

  const handleGenerateBalanceGeneral = () => {
    const reportDate = new Date().toISOString().split('T')[0];
    const reportContent = [
      'BALANCE GENERAL',
      `Fecha: ${reportDate}`,
      '',
      'ACTIVOS',
      '─────────────────────────────────────',
      ...mappings.filter(m => m.official.startsWith('1')).map(m => 
        `${m.internal.padEnd(40)} $${(Math.random() * 100000).toFixed(2)}`
      ),
      '',
      'PASIVOS',
      '─────────────────────────────────────',
      ...mappings.filter(m => m.official.startsWith('2')).map(m => 
        `${m.internal.padEnd(40)} $${(Math.random() * 50000).toFixed(2)}`
      ),
      '',
      'CAPITAL',
      '─────────────────────────────────────',
      ...mappings.filter(m => m.official.startsWith('3')).map(m => 
        `${m.internal.padEnd(40)} $${(Math.random() * 150000).toFixed(2)}`
      ),
    ].join('\n');

    const blob = new Blob([reportContent], { type: 'text/plain;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `balance_general_${reportDate}.txt`;
    link.click();

    toast({
      title: "Reporte Generado",
      description: "Balance General descargado correctamente",
    });
  };

  const handleGenerateEstadoResultados = () => {
    const reportDate = new Date().toISOString().split('T')[0];
    const reportContent = [
      'ESTADO DE RESULTADOS',
      `Fecha: ${reportDate}`,
      '',
      'INGRESOS',
      '─────────────────────────────────────',
      ...mappings.filter(m => m.official.startsWith('4')).map(m => 
        `${m.internal.padEnd(40)} $${(Math.random() * 200000).toFixed(2)}`
      ),
      '',
      'COSTOS',
      '─────────────────────────────────────',
      ...mappings.filter(m => m.official.startsWith('5')).map(m => 
        `${m.internal.padEnd(40)} $${(Math.random() * 80000).toFixed(2)}`
      ),
      '',
      'GASTOS',
      '─────────────────────────────────────',
      ...mappings.filter(m => m.official.startsWith('6')).map(m => 
        `${m.internal.padEnd(40)} $${(Math.random() * 60000).toFixed(2)}`
      ),
      '',
      'UTILIDAD NETA: $' + (Math.random() * 100000).toFixed(2),
    ].join('\n');

    const blob = new Blob([reportContent], { type: 'text/plain;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `estado_resultados_${reportDate}.txt`;
    link.click();

    toast({
      title: "Reporte Generado",
      description: "Estado de Resultados descargado correctamente",
    });
  };

  const handleGenerateReporteFiscal = () => {
    const reportDate = new Date().toISOString().split('T')[0];
    const csvContent = [
      'REPORTE FISCAL - MAPEO DE CUENTAS',
      `Fecha: ${reportDate}`,
      '',
      'Cuenta SAT,Código SAT,Cuenta Interna,Uso,Tipo',
      ...mappings.map(m => {
        const satCode = m.official.split(' - ')[0];
        const accountType = satCode.startsWith('1') ? 'Activo' :
                           satCode.startsWith('2') ? 'Pasivo' :
                           satCode.startsWith('3') ? 'Capital' :
                           satCode.startsWith('4') ? 'Ingreso' :
                           satCode.startsWith('5') ? 'Costo' :
                           satCode.startsWith('6') ? 'Gasto' : 'Otro';
        return `"${m.official}","${satCode}","${m.internal}","${m.usage}","${accountType}"`;
      })
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `reporte_fiscal_${reportDate}.csv`;
    link.click();

    toast({
      title: "Reporte Generado",
      description: "Reporte Fiscal descargado correctamente",
    });
  };

  return (
    <div className="space-y-6">
      {/* Action Buttons */}
      <div className="flex flex-wrap gap-2">
        <Button 
          className="bg-emerald-600 hover:bg-emerald-700"
          onClick={handleSaveMapping}
        >
          <Save className="h-4 w-4 mr-2" />
          {t('saveMapping')}
        </Button>
        <Button 
          variant="outline"
          onClick={() => setImportDialogOpen(true)}
        >
          <Upload className="h-4 w-4 mr-2" />
          {t('importMapping')}
        </Button>
        <Button 
          variant="outline"
          onClick={handleExportMapping}
        >
          <Download className="h-4 w-4 mr-2" />
          {t('exportMapping')}
        </Button>
      </div>

      {/* Mapping Table */}
      <Card>
        <CardHeader>
          <CardTitle>{t('mappingReporting')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium text-gray-600">{t('officialAccount')}</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">{t('internalAccount')}</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">{t('mainUsage')}</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-600">{t('action')}</th>
                </tr>
              </thead>
              <tbody>
                {mappings.map((mapping) => (
                  <tr key={mapping.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4 text-sm">{mapping.official}</td>
                    <td className="py-3 px-4 text-sm">{mapping.internal}</td>
                    <td className="py-3 px-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {mapping.usage}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleEditMapping(mapping)}
                        >
                          <Edit className="h-4 w-4 mr-1" />
                          {t('edit')}
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleDeleteMapping(mapping.id)}
                        >
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Reporting Presets */}
      <Card>
        <CardHeader>
          <CardTitle>Reportes Predefinidos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button 
              variant="outline" 
              className="h-20 flex flex-col items-center justify-center hover:bg-emerald-50 hover:border-emerald-600"
              onClick={handleGenerateBalanceGeneral}
            >
              <FileText className="h-5 w-5 mb-2 text-emerald-600" />
              <span className="font-medium">Balance General</span>
              <span className="text-xs text-gray-500 mt-1">Financial Statement</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-20 flex flex-col items-center justify-center hover:bg-blue-50 hover:border-blue-600"
              onClick={handleGenerateEstadoResultados}
            >
              <FileText className="h-5 w-5 mb-2 text-blue-600" />
              <span className="font-medium">Estado de Resultados</span>
              <span className="text-xs text-gray-500 mt-1">P&L Statement</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-20 flex flex-col items-center justify-center hover:bg-purple-50 hover:border-purple-600"
              onClick={handleGenerateReporteFiscal}
            >
              <FileText className="h-5 w-5 mb-2 text-purple-600" />
              <span className="font-medium">Reporte Fiscal</span>
              <span className="text-xs text-gray-500 mt-1">Tax Report</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{t('editMapping') || "Editar Mapeo"}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label>{t('officialAccount')}</Label>
              <Input
                value={editForm.official}
                onChange={(e) => setEditForm({ ...editForm, official: e.target.value })}
                placeholder="601.56 - Mantenimiento y conservación"
              />
            </div>
            <div className="space-y-2">
              <Label>{t('internalAccount')}</Label>
              <Input
                value={editForm.internal}
                onChange={(e) => setEditForm({ ...editForm, internal: e.target.value })}
                placeholder="5001 - Costo Mantenimiento"
              />
            </div>
            <div className="space-y-2">
              <Label>{t('mainUsage')}</Label>
              <Input
                value={editForm.usage}
                onChange={(e) => setEditForm({ ...editForm, usage: e.target.value })}
                placeholder="Mantenimiento"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditDialogOpen(false)}>
              {t('cancel')}
            </Button>
            <Button onClick={handleSaveEdit} className="bg-emerald-600 hover:bg-emerald-700">
              {t('save')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Import Dialog */}
      <Dialog open={importDialogOpen} onOpenChange={setImportDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t('importMapping') || "Importar Mapeo"}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label>{t('selectFile') || "Seleccionar Archivo"}</Label>
              <Input
                type="file"
                accept=".csv,.json"
                onChange={handleImportMapping}
              />
              <p className="text-sm text-gray-500">
                Formatos soportados: CSV, JSON
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setImportDialogOpen(false)}>
              {t('cancel')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
