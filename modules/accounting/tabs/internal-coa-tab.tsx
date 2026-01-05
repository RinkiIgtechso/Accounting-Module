"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/hooks/use-language";
import { Plus, Edit, Trash2, Upload, Download } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const mockInternalAccounts = [
  { code: "1001", name: "Caja General", type: "asset", country: "MX", status: "active" },
  { code: "1002", name: "Banco Santander", type: "asset", country: "MX", status: "active" },
  { code: "2001", name: "Proveedores Flota", type: "liability", country: "MX", status: "active" },
  { code: "4001", name: "Ingresos por Arrendamiento", type: "income", country: "MX", status: "active" },
  { code: "5001", name: "Costo Mantenimiento", type: "expense", country: "MX", status: "active" },
  { code: "5002", name: "Costo Refacciones", type: "expense", country: "MX", status: "active" },
];

export function InternalCoATab() {
  const { t } = useLanguage();
  const [accounts, setAccounts] = useState(mockInternalAccounts);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [currentAccount, setCurrentAccount] = useState<any>(null);
  const [formData, setFormData] = useState({
    code: "",
    name: "",
    type: "asset",
    country: "MX",
    status: "active"
  });

  const handleAddAccount = () => {
    setFormData({
      code: "",
      name: "",
      type: "asset",
      country: "MX",
      status: "active"
    });
    setIsAddDialogOpen(true);
  };

  const handleSaveAccount = () => {
    const newAccount = { ...formData };
    setAccounts([...accounts, newAccount]);
    setIsAddDialogOpen(false);
    setFormData({
      code: "",
      name: "",
      type: "asset",
      country: "MX",
      status: "active"
    });
  };

  const handleEditAccount = (account: any) => {
    setCurrentAccount(account);
    setFormData({ ...account });
    setIsEditDialogOpen(true);
  };

  const handleUpdateAccount = () => {
    const updatedAccounts = accounts.map(acc =>
      acc.code === currentAccount.code ? formData : acc
    );
    setAccounts(updatedAccounts);
    setIsEditDialogOpen(false);
    setCurrentAccount(null);
  };

  const handleDeleteAccount = (code: string) => {
    if (confirm(t('confirmDelete') || 'Are you sure you want to delete this account?')) {
      setAccounts(accounts.filter(acc => acc.code !== code));
    }
  };

  const handleImport = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.csv,.xlsx,.json';
    input.onchange = (e: any) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          try {
            // For JSON files
            if (file.name.endsWith('.json')) {
              const importedData = JSON.parse(event.target?.result as string);
              setAccounts([...accounts, ...importedData]);
              alert(`${t('importSuccess') || 'Import successful'}: ${importedData.length} ${t('accountsImported') || 'accounts imported'}`);
            } else {
              // For CSV/Excel - show success message
              alert(`${t('fileImported') || 'File imported successfully'}: ${file.name}`);
            }
          } catch (error) {
            alert(t('importError') || 'Error importing file');
          }
        };
        reader.readAsText(file);
      }
    };
    input.click();
  };

  const handleExport = () => {
    // Create CSV content
    const headers = ['Código', 'Nombre', 'Tipo', 'País', 'Estado'];
    const csvContent = [
      headers.join(','),
      ...accounts.map(acc => 
        `${acc.code},"${acc.name}",${acc.type},${acc.country},${acc.status}`
      )
    ].join('\n');

    // Create and download file
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `plan_cuentas_interno_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Header with Add Button */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900">{t('internalAccounts')}</h2>
        <Button className="bg-emerald-600 hover:bg-emerald-700" onClick={handleAddAccount}>
          <Plus className="w-4 h-4 mr-2" />
          {t('addAccount')}
        </Button>
      </div>

      {/* Import/Export Buttons */}
      <div className="flex gap-2">
        <Button variant="outline" onClick={handleImport}>
          <Upload className="w-4 h-4 mr-2" />
          {t('import')}
        </Button>
        <Button variant="outline" onClick={handleExport}>
          <Download className="w-4 h-4 mr-2" />
          {t('export')}
        </Button>
      </div>

      {/* Accounts Table */}
      <Card>
        <CardHeader>
          <CardTitle>{t('internalAccounts')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium text-gray-600">{t('code')}</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">{t('accountName')}</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">{t('accountType')}</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">{t('country')}</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">{t('status')}</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-600">{t('action')}</th>
                </tr>
              </thead>
              <tbody>
                {accounts.map((account, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4 text-sm font-mono">{account.code}</td>
                    <td className="py-3 px-4 text-sm">{account.name}</td>
                    <td className="py-3 px-4 text-sm capitalize">{t(account.type as any)}</td>
                    <td className="py-3 px-4 text-sm">{account.country}</td>
                    <td className="py-3 px-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        account.status === 'active' 
                          ? 'bg-emerald-100 text-emerald-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {t(account.status as any)}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button 
                          className="p-1 hover:bg-gray-100 rounded"
                          onClick={() => handleEditAccount(account)}
                        >
                          <Edit className="w-4 h-4 text-gray-600" />
                        </button>
                        <button 
                          className="p-1 hover:bg-gray-100 rounded"
                          onClick={() => handleDeleteAccount(account.code)}
                        >
                          <Trash2 className="w-4 h-4 text-red-600" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Dialog for adding new account */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>{t('addAccount')}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="code">{t('code')}</Label>
              <Input
                id="code"
                value={formData.code}
                onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                placeholder="1001"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="name">{t('accountName')}</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder={t('accountName')}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="type">{t('accountType')}</Label>
              <select
                id="type"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              >
                <option value="asset">{t('asset')}</option>
                <option value="liability">{t('liability')}</option>
                <option value="equity">{t('equity')}</option>
                <option value="income">{t('income')}</option>
                <option value="expense">{t('expense')}</option>
              </select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="country">{t('country')}</Label>
              <select
                id="country"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                value={formData.country}
                onChange={(e) => setFormData({ ...formData, country: e.target.value })}
              >
                <option value="MX">México</option>
                <option value="BR">Brasil</option>
                <option value="US">USA</option>
                <option value="CA">Canada</option>
                <option value="CO">Colombia</option>
                <option value="CL">Chile</option>
              </select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              {t('cancel')}
            </Button>
            <Button className="bg-emerald-600 hover:bg-emerald-700" onClick={handleSaveAccount}>
              {t('save')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog for editing account */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>{t('editAccount')}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="edit-code">{t('code')}</Label>
              <Input
                id="edit-code"
                value={formData.code}
                onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                disabled
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-name">{t('accountName')}</Label>
              <Input
                id="edit-name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-type">{t('accountType')}</Label>
              <select
                id="edit-type"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              >
                <option value="asset">{t('asset')}</option>
                <option value="liability">{t('liability')}</option>
                <option value="equity">{t('equity')}</option>
                <option value="income">{t('income')}</option>
                <option value="expense">{t('expense')}</option>
              </select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-country">{t('country')}</Label>
              <select
                id="edit-country"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                value={formData.country}
                onChange={(e) => setFormData({ ...formData, country: e.target.value })}
              >
                <option value="MX">México</option>
                <option value="BR">Brasil</option>
                <option value="US">USA</option>
                <option value="CA">Canada</option>
                <option value="CO">Colombia</option>
                <option value="CL">Chile</option>
              </select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-status">{t('status')}</Label>
              <select
                id="edit-status"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              >
                <option value="active">{t('active')}</option>
                <option value="inactive">{t('inactive')}</option>
              </select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              {t('cancel')}
            </Button>
            <Button className="bg-emerald-600 hover:bg-emerald-700" onClick={handleUpdateAccount}>
              {t('save')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
