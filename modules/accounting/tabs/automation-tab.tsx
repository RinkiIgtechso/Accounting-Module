"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useLanguage } from "@/hooks/use-language";
import { Plus, Trash2, PlusCircle } from 'lucide-react';

type AccountingLine = {
  type: 'debit' | 'credit';
  account: string;
  percentage: number;
};

type AutomationRule = {
  id: string;
  event: string;
  country: string;
  status: 'active' | 'inactive';
  condition?: string;
  lines: AccountingLine[];
};

const initialRules: AutomationRule[] = [
  { 
    id: '1',
    event: "OS Aprobada", 
    country: "MX", 
    status: "active",
    condition: "Tipo = Preventivo",
    lines: [
      { type: 'debit', account: '5001 - Costo Mantenimiento', percentage: 100 },
      { type: 'credit', account: '2001 - Proveedores', percentage: 100 }
    ]
  },
  { 
    id: '2',
    event: "OS Cerrada", 
    country: "MX", 
    status: "active",
    condition: "Estado = Completado",
    lines: [
      { type: 'debit', account: '1201 - Activo Fijo', percentage: 100 },
      { type: 'credit', account: '5001 - Costo Mantenimiento', percentage: 100 },
      { type: 'credit', account: '2105 - IVA Trasladado', percentage: 16 }
    ]
  },
  { 
    id: '3',
    event: "Compra Registrada", 
    country: "MX", 
    status: "active",
    condition: "",
    lines: [
      { type: 'debit', account: '1151 - Inventarios', percentage: 100 },
      { type: 'credit', account: '2001 - Proveedores', percentage: 100 }
    ]
  },
  { 
    id: '4',
    event: "Factura Emitida", 
    country: "BR", 
    status: "inactive",
    condition: "",
    lines: [
      { type: 'debit', account: '1201 - Clientes', percentage: 100 },
      { type: 'credit', account: '4001 - Ventas', percentage: 100 }
    ]
  },
];

export function AutomationTab() {
  const { t } = useLanguage();
  const [rules, setRules] = useState<AutomationRule[]>(initialRules);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedRule, setSelectedRule] = useState<AutomationRule | null>(null);
  const [editingRule, setEditingRule] = useState<Partial<AutomationRule>>({
    event: '',
    country: 'MX',
    status: 'active',
    condition: '',
    lines: []
  });

  const handleAddRule = () => {
    setEditingRule({
      event: '',
      country: 'MX',
      status: 'active',
      condition: '',
      lines: [
        { type: 'debit', account: '', percentage: 100 },
        { type: 'credit', account: '', percentage: 100 }
      ]
    });
    setSelectedRule(null);
    setIsAddDialogOpen(true);
  };

  const handleEditRule = (rule: AutomationRule) => {
    setSelectedRule(rule);
    setEditingRule(rule);
    setIsEditDialogOpen(true);
  };

  const handleSaveRule = () => {
    if (!editingRule.event || !editingRule.lines || editingRule.lines.length === 0) {
      alert('Por favor completa todos los campos requeridos');
      return;
    }

    if (selectedRule) {
      // Update existing rule
      setRules(rules.map(r => 
        r.id === selectedRule.id 
          ? { ...editingRule, id: selectedRule.id } as AutomationRule
          : r
      ));
    } else {
      // Add new rule
      const newRule: AutomationRule = {
        ...editingRule,
        id: Date.now().toString(),
      } as AutomationRule;
      setRules([...rules, newRule]);
    }
    
    setIsAddDialogOpen(false);
    setIsEditDialogOpen(false);
    setEditingRule({
      event: '',
      country: 'MX',
      status: 'active',
      condition: '',
      lines: []
    });
  };

  const handleDeleteRule = (ruleId: string) => {
    if (confirm('¿Estás seguro de eliminar esta regla?')) {
      setRules(rules.filter(r => r.id !== ruleId));
    }
  };

  const handleAddLine = () => {
    setEditingRule({
      ...editingRule,
      lines: [
        ...(editingRule.lines || []),
        { type: 'debit', account: '', percentage: 100 }
      ]
    });
  };

  const handleUpdateLine = (index: number, field: keyof AccountingLine, value: any) => {
    const updatedLines = [...(editingRule.lines || [])];
    updatedLines[index] = { ...updatedLines[index], [field]: value };
    setEditingRule({ ...editingRule, lines: updatedLines });
  };

  const handleRemoveLine = (index: number) => {
    setEditingRule({
      ...editingRule,
      lines: editingRule.lines?.filter((_, i) => i !== index) || []
    });
  };

  const handleToggleStatus = (ruleId: string) => {
    setRules(rules.map(r => 
      r.id === ruleId 
        ? { ...r, status: r.status === 'active' ? 'inactive' : 'active' } as AutomationRule
        : r
    ));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900">{t('automationRulesList')}</h2>
        <Button onClick={handleAddRule} className="bg-emerald-600 hover:bg-emerald-700">
          <Plus className="w-4 h-4 mr-2" />
          {t('addRule')}
        </Button>
      </div>

      {/* Rules List */}
      <Card>
        <CardHeader>
          <CardTitle>{t('automationRules')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium text-gray-600">{t('event')}</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">{t('country')}</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Líneas</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">{t('status')}</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-600">{t('action')}</th>
                </tr>
              </thead>
              <tbody>
                {rules.map((rule) => (
                  <tr key={rule.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4 text-sm font-medium">{rule.event}</td>
                    <td className="py-3 px-4 text-sm">{rule.country}</td>
                    <td className="py-3 px-4 text-sm">{rule.lines.length}</td>
                    <td className="py-3 px-4">
                      <button 
                        onClick={() => handleToggleStatus(rule.id)}
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium cursor-pointer ${
                          rule.status === 'active' 
                            ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200' 
                            : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                        }`}
                      >
                        {t(rule.status as any)}
                      </button>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex justify-end gap-2">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleEditRule(rule)}
                        >
                          {t('edit')}
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleDeleteRule(rule.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
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

      {/* Rule Example */}
      <Card>
        <CardHeader>
          <CardTitle>Ejemplo de Regla</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Evento: OS Aprobada
              </label>
              <p className="text-sm text-gray-600">Condición: Tipo = Preventivo</p>
            </div>
            <div className="border rounded-lg p-4">
              <div className="grid grid-cols-3 gap-4 mb-2">
                <div className="font-medium text-sm text-gray-600">{t('debit')}/{t('credit')}</div>
                <div className="font-medium text-sm text-gray-600">Cuenta</div>
                <div className="font-medium text-sm text-gray-600">{t('amount')}</div>
              </div>
              <div className="grid grid-cols-3 gap-4 items-center py-2">
                <div className="text-sm">{t('debit')}</div>
                <div className="text-sm">5001 - Costo Mantenimiento</div>
                <div className="text-sm">100%</div>
              </div>
              <div className="grid grid-cols-3 gap-4 items-center py-2">
                <div className="text-sm">{t('credit')}</div>
                <div className="text-sm">2001 - Proveedores</div>
                <div className="text-sm">100%</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Agregar Nueva Regla de Automatización</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="event">Evento *</Label>
                <Input
                  id="event"
                  value={editingRule.event || ''}
                  onChange={(e) => setEditingRule({ ...editingRule, event: e.target.value })}
                  placeholder="ej: OS Aprobada, Factura Emitida"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="country">País *</Label>
                <Select
                  value={editingRule.country || 'MX'}
                  onValueChange={(value) => setEditingRule({ ...editingRule, country: value })}
                >
                  <SelectTrigger id="country">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="MX">México (MX)</SelectItem>
                    <SelectItem value="BR">Brasil (BR)</SelectItem>
                    <SelectItem value="US">USA</SelectItem>
                    <SelectItem value="CA">Canadá (CA)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="condition">Condición (opcional)</Label>
              <Input
                id="condition"
                value={editingRule.condition || ''}
                onChange={(e) => setEditingRule({ ...editingRule, condition: e.target.value })}
                placeholder="ej: Tipo = Preventivo, Monto > 1000"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Estado *</Label>
              <Select
                value={editingRule.status || 'active'}
                onValueChange={(value: 'active' | 'inactive') => setEditingRule({ ...editingRule, status: value })}
              >
                <SelectTrigger id="status">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Activa</SelectItem>
                  <SelectItem value="inactive">Inactiva</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <Label>Líneas Contables *</Label>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleAddLine}
                >
                  <PlusCircle className="w-4 h-4 mr-2" />
                  Agregar Línea
                </Button>
              </div>

              <div className="space-y-2">
                {editingRule.lines?.map((line, index) => (
                  <div key={index} className="flex gap-2 items-end">
                    <div className="flex-1">
                      <Select
                        value={line.type}
                        onValueChange={(value: 'debit' | 'credit') => handleUpdateLine(index, 'type', value)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="debit">Debe</SelectItem>
                          <SelectItem value="credit">Haber</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex-[2]">
                      <Input
                        value={line.account}
                        onChange={(e) => handleUpdateLine(index, 'account', e.target.value)}
                        placeholder="Código y nombre de cuenta"
                      />
                    </div>
                    <div className="flex-1">
                      <Input
                        type="number"
                        value={line.percentage}
                        onChange={(e) => handleUpdateLine(index, 'percentage', parseFloat(e.target.value))}
                        placeholder="%"
                        min="0"
                        max="100"
                      />
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveLine(index)}
                      className="text-red-600"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSaveRule} className="bg-emerald-600 hover:bg-emerald-700">
              Guardar Regla
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Editar Regla de Automatización</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-event">Evento *</Label>
                <Input
                  id="edit-event"
                  value={editingRule.event || ''}
                  onChange={(e) => setEditingRule({ ...editingRule, event: e.target.value })}
                  placeholder="ej: OS Aprobada, Factura Emitida"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="edit-country">País *</Label>
                <Select
                  value={editingRule.country || 'MX'}
                  onValueChange={(value) => setEditingRule({ ...editingRule, country: value })}
                >
                  <SelectTrigger id="edit-country">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="MX">México (MX)</SelectItem>
                    <SelectItem value="BR">Brasil (BR)</SelectItem>
                    <SelectItem value="US">USA</SelectItem>
                    <SelectItem value="CA">Canadá (CA)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-condition">Condición (opcional)</Label>
              <Input
                id="edit-condition"
                value={editingRule.condition || ''}
                onChange={(e) => setEditingRule({ ...editingRule, condition: e.target.value })}
                placeholder="ej: Tipo = Preventivo, Monto > 1000"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-status">Estado *</Label>
              <Select
                value={editingRule.status || 'active'}
                onValueChange={(value: 'active' | 'inactive') => setEditingRule({ ...editingRule, status: value })}
              >
                <SelectTrigger id="edit-status">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Activa</SelectItem>
                  <SelectItem value="inactive">Inactiva</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <Label>Líneas Contables *</Label>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleAddLine}
                >
                  <PlusCircle className="w-4 h-4 mr-2" />
                  Agregar Línea
                </Button>
              </div>

              <div className="space-y-2">
                {editingRule.lines?.map((line, index) => (
                  <div key={index} className="flex gap-2 items-end">
                    <div className="flex-1">
                      <Select
                        value={line.type}
                        onValueChange={(value: 'debit' | 'credit') => handleUpdateLine(index, 'type', value)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="debit">Debe</SelectItem>
                          <SelectItem value="credit">Haber</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex-[2]">
                      <Input
                        value={line.account}
                        onChange={(e) => handleUpdateLine(index, 'account', e.target.value)}
                        placeholder="Código y nombre de cuenta"
                      />
                    </div>
                    <div className="flex-1">
                      <Input
                        type="number"
                        value={line.percentage}
                        onChange={(e) => handleUpdateLine(index, 'percentage', parseFloat(e.target.value))}
                        placeholder="%"
                        min="0"
                        max="100"
                      />
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveLine(index)}
                      className="text-red-600"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSaveRule} className="bg-emerald-600 hover:bg-emerald-700">
              Guardar Cambios
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
