"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/hooks/use-language";
import { satCatalogMx } from "@/data/sat-catalog-mx";
import { brazilPlanoMock } from "@/data/brazil-plano-mock";
import { Search } from 'lucide-react';

export function OfficialCatalogTab() {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCatalog, setSelectedCatalog] = useState("sat");

  const currentCatalog = selectedCatalog === "sat" ? satCatalogMx : brazilPlanoMock;

  const filteredCatalog = currentCatalog.filter(
    (item) =>
      item.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Catalog Selector */}
      <Card>
        <CardHeader>
          <CardTitle>{t('baseCatalog')}</CardTitle>
        </CardHeader>
        <CardContent>
          <select
            value={selectedCatalog}
            onChange={(e) => setSelectedCatalog(e.target.value)}
            className="w-full md:w-64 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
          >
            <option value="sat">SAT - {t('mexico')}</option>
            <option value="brazil">Plano de Contas - {t('brazil')}</option>
          </select>
        </CardContent>
      </Card>

      {/* Search and Table */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <CardTitle>{t('officialCatalog')}</CardTitle>
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder={t('searchCatalog')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium text-gray-600">{t('level')}</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">{t('code')}</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">{t('accountName')}</th>
                </tr>
              </thead>
              <tbody>
                {filteredCatalog.slice(0, 50).map((item, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4 text-sm">{item.level}</td>
                    <td className="py-3 px-4 text-sm font-mono">{item.code}</td>
                    <td className="py-3 px-4 text-sm" style={{ paddingLeft: `${item.level * 20 + 16}px` }}>
                      {item.name}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filteredCatalog.length > 50 && (
              <div className="mt-4 text-center text-sm text-gray-500">
                {t('filter')} {filteredCatalog.length - 50} más...
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
