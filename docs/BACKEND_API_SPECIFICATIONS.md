# RENO FMS - Especificaciones de API Backend
## Módulo de Contabilidad Global

**Versión:** 1.0  
**Fecha:** 2025  
**Frontend:** Next.js 16 + React 19 + TypeScript  
**Backend Recomendado:** Node.js/Python + PostgreSQL/MongoDB

---

## Tabla de Contenidos

1. [Arquitectura General](#arquitectura-general)
2. [Modelos de Datos](#modelos-de-datos)
3. [Endpoints API](#endpoints-api)
4. [Autenticación y Seguridad](#autenticación-y-seguridad)
5. [Integración con Catálogos Oficiales](#integración-con-catálogos-oficiales)
6. [Reportes y Exportación](#reportes-y-exportación)
7. [Ejemplos de Peticiones](#ejemplos-de-peticiones)

---

## Arquitectura General

### Stack Tecnológico del Frontend
- **Framework:** Next.js 16 (App Router)
- **UI:** React 19.2 + TypeScript + Tailwind CSS v4
- **Componentes:** shadcn/ui
- **Gráficas:** Recharts
- **Estado:** React Context API
- **Idiomas:** ES, EN, FR, PT (i18n integrado)

### Requerimientos del Backend
- API RESTful o GraphQL
- Base de datos relacional (PostgreSQL recomendado)
- Autenticación JWT
- Soporte multi-tenant (multi-organización)
- Soporte multi-país
- Sistema de permisos basado en roles

### URL Base del API
\`\`\`
Desarrollo: http://localhost:4000/api/v1
Producción: https://api.renofms.com/v1
\`\`\`

---

## Modelos de Datos

### 1. Organization (Organización)
\`\`\`typescript
interface Organization {
  id: string;
  name: string;
  country: "MX" | "BR" | "US" | "CA" | "CO" | "CL";
  fiscalRegime: string;
  rfc?: string; // Para México
  taxId?: string; // Para otros países
  currency: "MXN" | "BRL" | "USD" | "CAD" | "COP" | "CLP";
  fiscalYear: number;
  createdAt: Date;
  updatedAt: Date;
}
\`\`\`

### 2. AccountingSettings (Configuración Contable)
\`\`\`typescript
interface AccountingSettings {
  id: string;
  organizationId: string;
  country: string;
  fiscalPeriod: "monthly" | "quarterly" | "annual";
  exportFormat: "COI_TXT" | "CONTPAQI" | "EXCEL" | "JSON";
  usesOfficialCatalog: boolean;
  catalogType: "SAT" | "PLANO_CONTAS" | "GAAP" | "IFRS";
  decimalPlaces: number;
  currencyFormat: string;
  dateFormat: string;
  autoClosing: boolean;
  requireApproval: boolean;
  enableAI: boolean;
  createdAt: Date;
  updatedAt: Date;
}
\`\`\`

### 3. ChartOfAccount (Plan de Cuentas Interno)
\`\`\`typescript
interface ChartOfAccount {
  id: string;
  organizationId: string;
  code: string; // Ej: "1010001"
  name: string; // Ej: "Caja general"
  level: number; // 1, 2, 3, etc.
  parentId?: string;
  accountType: "ASSET" | "LIABILITY" | "EQUITY" | "INCOME" | "EXPENSE";
  country: string;
  isActive: boolean;
  allowsTransactions: boolean;
  balance: number;
  currency: string;
  createdAt: Date;
  updatedAt: Date;
}
\`\`\`

### 4. OfficialAccountMapping (Mapeo SAT/Oficial)
\`\`\`typescript
interface OfficialAccountMapping {
  id: string;
  organizationId: string;
  internalAccountId: string; // ID del plan interno
  officialCode: string; // Ej: "102.01" (SAT)
  officialName: string; // Ej: "Bancos nacionales"
  catalogType: "SAT" | "PLANO_CONTAS";
  country: string;
  mappingType: "AUTO" | "MANUAL";
  confidence?: number; // 0-100 (para mapeos automáticos por IA)
  createdAt: Date;
  updatedAt: Date;
}
\`\`\`

### 5. JournalEntry (Póliza Contable)
\`\`\`typescript
interface JournalEntry {
  id: string;
  organizationId: string;
  entryNumber: string; // Ej: "PE-2025-001"
  entryType: "MANUAL" | "AUTO" | "ADJUSTMENT" | "CLOSING";
  date: Date;
  period: string; // "2025-01"
  description: string;
  reference?: string;
  status: "DRAFT" | "POSTED" | "APPROVED" | "CANCELLED";
  totalDebit: number;
  totalCredit: number;
  currency: string;
  createdBy: string;
  approvedBy?: string;
  approvedAt?: Date;
  lines: JournalEntryLine[];
  createdAt: Date;
  updatedAt: Date;
}

interface JournalEntryLine {
  id: string;
  journalEntryId: string;
  lineNumber: number;
  accountId: string; // ID del plan de cuentas interno
  description: string;
  debit: number;
  credit: number;
  currency: string;
  exchangeRate?: number;
  reference?: string;
}
\`\`\`

### 6. AutomationRule (Regla Automática)
\`\`\`typescript
interface AutomationRule {
  id: string;
  organizationId: string;
  name: string;
  country: string;
  triggerEvent: "INVOICE_RECEIVED" | "INVOICE_ISSUED" | "PAYMENT_RECEIVED" | 
                "PAYMENT_MADE" | "PAYROLL" | "BANK_TRANSACTION";
  condition?: string; // JSON con condiciones
  isActive: boolean;
  priority: number;
  lines: AutomationRuleLine[];
  createdAt: Date;
  updatedAt: Date;
}

interface AutomationRuleLine {
  id: string;
  ruleId: string;
  accountId: string;
  type: "DEBIT" | "CREDIT";
  amountFormula: string; // Ej: "{{invoice.total}}", "{{invoice.tax}}"
  description: string;
}
\`\`\`

### 7. FiscalPeriod (Periodo Contable)
\`\`\`typescript
interface FiscalPeriod {
  id: string;
  organizationId: string;
  year: number;
  month: number;
  periodName: string; // "Enero 2025"
  startDate: Date;
  endDate: Date;
  status: "OPEN" | "CLOSED" | "LOCKED";
  closedBy?: string;
  closedAt?: Date;
  lockedBy?: string;
  lockedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}
\`\`\`

### 8. ComplianceReport (Reporte de Cumplimiento)
\`\`\`typescript
interface ComplianceReport {
  id: string;
  organizationId: string;
  reportType: "COI" | "DIOT" | "IVA" | "ISR" | "SPED_FISCAL" | "SPED_CONTABIL" | 
               "XBRL" | "IFRS";
  country: string;
  period: string; // "2025-01"
  year: number;
  month?: number;
  status: "DRAFT" | "GENERATED" | "SUBMITTED" | "ACCEPTED" | "REJECTED";
  fileUrl?: string;
  fileHash?: string;
  generatedAt?: Date;
  submittedAt?: Date;
  metadata: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}
\`\`\`

### 9. AIAnalytics (Análisis IA)
\`\`\`typescript
interface AIAnalytics {
  id: string;
  organizationId: string;
  analysisType: "COST_PREDICTION" | "ANOMALY_DETECTION" | "TAX_OPTIMIZATION" | 
                "CASH_FLOW_FORECAST";
  period: string;
  inputData: Record<string, any>;
  predictions: Record<string, any>;
  confidence: number; // 0-100
  recommendations: string[];
  createdAt: Date;
}
\`\`\`

---

## Endpoints API

### Autenticación

#### POST /auth/login
Autenticar usuario y obtener token JWT.

**Request:**
\`\`\`json
{
  "email": "admin@empresa.com",
  "password": "password123"
}
\`\`\`

**Response:**
\`\`\`json
{
  "token": "eyJhbGc...",
  "user": {
    "id": "usr_123",
    "name": "Juan Pérez",
    "email": "admin@empresa.com",
    "role": "ADMIN",
    "organizationId": "org_456"
  }
}
\`\`\`

---

### Configuración Contable

#### GET /accounting/settings
Obtener configuración contable de la organización.

**Headers:**
\`\`\`
Authorization: Bearer {token}
X-Organization-Id: org_456
\`\`\`

**Response:**
\`\`\`json
{
  "id": "set_789",
  "organizationId": "org_456",
  "country": "MX",
  "fiscalPeriod": "monthly",
  "exportFormat": "COI_TXT",
  "usesOfficialCatalog": true,
  "catalogType": "SAT",
  "decimalPlaces": 2,
  "autoClosing": false,
  "enableAI": true
}
\`\`\`

#### PUT /accounting/settings
Actualizar configuración contable.

**Request:**
\`\`\`json
{
  "fiscalPeriod": "monthly",
  "exportFormat": "CONTPAQI",
  "enableAI": true
}
\`\`\`

**Response:**
\`\`\`json
{
  "id": "set_789",
  "organizationId": "org_456",
  "country": "MX",
  "fiscalPeriod": "monthly",
  "exportFormat": "CONTPAQI",
  "enableAI": true,
  "updatedAt": "2025-01-15T10:30:00Z"
}
\`\`\`

---

### Plan de Cuentas Interno

#### GET /chart-of-accounts
Obtener todas las cuentas del plan interno.

**Query Params:**
- `country` (opcional): Filtrar por país
- `accountType` (opcional): ASSET, LIABILITY, EQUITY, INCOME, EXPENSE
- `isActive` (opcional): true/false
- `search` (opcional): Búsqueda por código o nombre

**Response:**
\`\`\`json
{
  "accounts": [
    {
      "id": "acc_001",
      "code": "1010001",
      "name": "Caja general",
      "level": 3,
      "parentId": "acc_parent_001",
      "accountType": "ASSET",
      "country": "MX",
      "isActive": true,
      "balance": 50000.00,
      "currency": "MXN"
    }
  ],
  "total": 150
}
\`\`\`

#### POST /chart-of-accounts
Crear nueva cuenta.

**Request:**
\`\`\`json
{
  "code": "1010002",
  "name": "Caja chica",
  "level": 3,
  "parentId": "acc_parent_001",
  "accountType": "ASSET",
  "country": "MX",
  "isActive": true,
  "allowsTransactions": true
}
\`\`\`

#### PUT /chart-of-accounts/:id
Actualizar cuenta existente.

#### DELETE /chart-of-accounts/:id
Eliminar cuenta (solo si no tiene transacciones).

#### POST /chart-of-accounts/import
Importar plan de cuentas desde archivo (CSV, Excel, JSON).

**Request:**
\`\`\`
Content-Type: multipart/form-data

file: [archivo CSV/Excel/JSON]
country: "MX"
replaceExisting: false
\`\`\`

#### GET /chart-of-accounts/export
Exportar plan de cuentas.

**Query Params:**
- `format`: csv | excel | json
- `country` (opcional): Filtrar por país

**Response:**
Archivo descargable

---

### Catálogo Oficial (SAT/Plano de Contas)

#### GET /official-catalog
Obtener catálogo oficial según país.

**Query Params:**
- `country`: MX | BR | US | etc.
- `catalogType`: SAT | PLANO_CONTAS | GAAP
- `search` (opcional): Búsqueda por código o nombre
- `level` (opcional): Nivel del catálogo (1, 2, 3)

**Response:**
\`\`\`json
{
  "catalog": [
    {
      "code": "102.01",
      "name": "Bancos nacionales",
      "level": 2,
      "parentCode": "102",
      "category": "ASSET"
    }
  ],
  "catalogType": "SAT",
  "country": "MX",
  "total": 850
}
\`\`\`

---

### Mapeo de Cuentas

#### GET /account-mappings
Obtener todos los mapeos entre cuentas internas y oficiales.

**Response:**
\`\`\`json
{
  "mappings": [
    {
      "id": "map_001",
      "internalAccountId": "acc_001",
      "internalCode": "1010001",
      "internalName": "Caja general",
      "officialCode": "101.01",
      "officialName": "Caja y efectivo",
      "catalogType": "SAT",
      "country": "MX",
      "mappingType": "MANUAL"
    }
  ],
  "total": 120
}
\`\`\`

#### POST /account-mappings
Crear nuevo mapeo.

**Request:**
\`\`\`json
{
  "internalAccountId": "acc_001",
  "officialCode": "101.01",
  "catalogType": "SAT",
  "country": "MX"
}
\`\`\`

#### PUT /account-mappings/:id
Actualizar mapeo existente.

#### DELETE /account-mappings/:id
Eliminar mapeo.

#### POST /account-mappings/auto-map
Generar mapeos automáticos usando IA.

**Request:**
\`\`\`json
{
  "country": "MX",
  "catalogType": "SAT",
  "overwriteExisting": false
}
\`\`\`

**Response:**
\`\`\`json
{
  "mappingsCreated": 85,
  "averageConfidence": 92.5,
  "manualReviewNeeded": 12
}
\`\`\`

#### POST /account-mappings/import
Importar mapeos desde archivo.

#### GET /account-mappings/export
Exportar mapeos a archivo.

---

### Pólizas Contables (Journal Entries)

#### GET /journal-entries
Obtener pólizas contables.

**Query Params:**
- `period`: "2025-01"
- `status`: DRAFT | POSTED | APPROVED | CANCELLED
- `entryType`: MANUAL | AUTO | ADJUSTMENT | CLOSING
- `page`: 1
- `limit`: 50

**Response:**
\`\`\`json
{
  "entries": [
    {
      "id": "je_001",
      "entryNumber": "PE-2025-001",
      "date": "2025-01-15",
      "description": "Compra de material de oficina",
      "totalDebit": 1000.00,
      "totalCredit": 1000.00,
      "status": "POSTED",
      "lines": [
        {
          "accountCode": "6010055",
          "accountName": "Papelería y artículos de oficina",
          "debit": 1000.00,
          "credit": 0
        },
        {
          "accountCode": "1020001",
          "accountName": "Banco principal",
          "debit": 0,
          "credit": 1000.00
        }
      ]
    }
  ],
  "pagination": {
    "total": 450,
    "page": 1,
    "limit": 50,
    "pages": 9
  }
}
\`\`\`

#### POST /journal-entries
Crear nueva póliza.

**Request:**
\`\`\`json
{
  "entryType": "MANUAL",
  "date": "2025-01-15",
  "period": "2025-01",
  "description": "Compra de material de oficina",
  "reference": "FAC-001",
  "lines": [
    {
      "accountId": "acc_gastos_001",
      "description": "Papelería",
      "debit": 1000.00,
      "credit": 0
    },
    {
      "accountId": "acc_banco_001",
      "description": "Pago en efectivo",
      "debit": 0,
      "credit": 1000.00
    }
  ]
}
\`\`\`

**Response:**
\`\`\`json
{
  "id": "je_001",
  "entryNumber": "PE-2025-001",
  "status": "DRAFT",
  "totalDebit": 1000.00,
  "totalCredit": 1000.00,
  "createdAt": "2025-01-15T10:30:00Z"
}
\`\`\`

#### PUT /journal-entries/:id
Actualizar póliza (solo si está en DRAFT).

#### POST /journal-entries/:id/post
Publicar póliza (cambiar estado a POSTED).

#### POST /journal-entries/:id/approve
Aprobar póliza (cambiar estado a APPROVED).

#### DELETE /journal-entries/:id
Cancelar póliza.

---

### Reglas de Automatización

#### GET /automation-rules
Obtener todas las reglas de automatización.

**Response:**
\`\`\`json
{
  "rules": [
    {
      "id": "rule_001",
      "name": "Factura de proveedor recibida",
      "country": "MX",
      "triggerEvent": "INVOICE_RECEIVED",
      "isActive": true,
      "lines": [
        {
          "accountCode": "5020001",
          "accountName": "Compras nacionales",
          "type": "DEBIT",
          "amountFormula": "{{invoice.subtotal}}"
        },
        {
          "accountCode": "1180001",
          "accountName": "IVA acreditable",
          "type": "DEBIT",
          "amountFormula": "{{invoice.tax}}"
        },
        {
          "accountCode": "2010001",
          "accountName": "Proveedores",
          "type": "CREDIT",
          "amountFormula": "{{invoice.total}}"
        }
      ]
    }
  ]
}
\`\`\`

#### POST /automation-rules
Crear nueva regla.

#### PUT /automation-rules/:id
Actualizar regla existente.

#### DELETE /automation-rules/:id
Eliminar regla.

#### POST /automation-rules/:id/activate
Activar regla.

#### POST /automation-rules/:id/deactivate
Desactivar regla.

---

### Periodos Contables

#### GET /fiscal-periods
Obtener periodos contables.

**Query Params:**
- `year`: 2025
- `status`: OPEN | CLOSED | LOCKED

**Response:**
\`\`\`json
{
  "periods": [
    {
      "id": "per_001",
      "year": 2025,
      "month": 1,
      "periodName": "Enero 2025",
      "startDate": "2025-01-01",
      "endDate": "2025-01-31",
      "status": "OPEN"
    }
  ]
}
\`\`\`

#### POST /fiscal-periods/:id/close
Cerrar periodo contable.

**Request:**
\`\`\`json
{
  "generateClosingEntries": true
}
\`\`\`

#### POST /fiscal-periods/:id/reopen
Reabrir periodo cerrado (requiere permisos especiales).

#### POST /fiscal-periods/:id/lock
Bloquear periodo (no se pueden hacer más modificaciones).

---

### Estados Financieros

#### GET /financial-statements/balance-sheet
Obtener balance general.

**Query Params:**
- `period`: "2025-01"
- `format`: json | pdf | excel
- `comparison`: true/false (comparativo con periodo anterior)

**Response:**
\`\`\`json
{
  "period": "2025-01",
  "currency": "MXN",
  "assets": {
    "current": {
      "total": 500000.00,
      "accounts": [
        {
          "code": "1010001",
          "name": "Caja general",
          "balance": 50000.00
        }
      ]
    },
    "nonCurrent": {
      "total": 1500000.00,
      "accounts": []
    },
    "total": 2000000.00
  },
  "liabilities": {
    "current": {
      "total": 300000.00,
      "accounts": []
    },
    "nonCurrent": {
      "total": 200000.00,
      "accounts": []
    },
    "total": 500000.00
  },
  "equity": {
    "total": 1500000.00,
    "accounts": []
  }
}
\`\`\`

#### GET /financial-statements/income-statement
Obtener estado de resultados.

**Query Params:**
- `startPeriod`: "2025-01"
- `endPeriod`: "2025-12"
- `format`: json | pdf | excel

**Response:**
\`\`\`json
{
  "startPeriod": "2025-01",
  "endPeriod": "2025-12",
  "currency": "MXN",
  "revenue": {
    "total": 1000000.00,
    "accounts": []
  },
  "costOfSales": {
    "total": 400000.00,
    "accounts": []
  },
  "grossProfit": 600000.00,
  "operatingExpenses": {
    "total": 350000.00,
    "accounts": []
  },
  "operatingIncome": 250000.00,
  "otherIncome": 10000.00,
  "otherExpenses": 5000.00,
  "netIncome": 255000.00
}
\`\`\`

#### GET /financial-statements/trial-balance
Obtener balanza de comprobación.

**Query Params:**
- `period`: "2025-01"
- `level`: 1 | 2 | 3 (nivel de detalle)
- `format`: json | csv | excel | coi

**Response:**
\`\`\`json
{
  "period": "2025-01",
  "currency": "MXN",
  "accounts": [
    {
      "code": "1010001",
      "name": "Caja general",
      "initialBalance": 40000.00,
      "debit": 25000.00,
      "credit": 15000.00,
      "finalBalance": 50000.00,
      "satCode": "101.01"
    }
  ],
  "totals": {
    "initialBalance": 1800000.00,
    "debit": 550000.00,
    "credit": 550000.00,
    "finalBalance": 1800000.00
  }
}
\`\`\`

---

### Reportes de Cumplimiento

#### GET /compliance-reports
Obtener reportes de cumplimiento generados.

**Query Params:**
- `reportType`: COI | DIOT | IVA | ISR | SPED_FISCAL | etc.
- `year`: 2025
- `month`: 1

**Response:**
\`\`\`json
{
  "reports": [
    {
      "id": "rep_001",
      "reportType": "COI",
      "country": "MX",
      "period": "2025-01",
      "status": "GENERATED",
      "fileUrl": "https://storage.com/reports/coi_2025_01.txt",
      "generatedAt": "2025-02-01T08:00:00Z"
    }
  ]
}
\`\`\`

#### POST /compliance-reports/generate
Generar nuevo reporte de cumplimiento.

**Request:**
\`\`\`json
{
  "reportType": "COI",
  "country": "MX",
  "period": "2025-01",
  "includeXML": true
}
\`\`\`

**Response:**
\`\`\`json
{
  "id": "rep_001",
  "reportType": "COI",
  "status": "GENERATING",
  "estimatedTime": "2 minutes"
}
\`\`\`

#### GET /compliance-reports/:id/download
Descargar archivo de reporte.

**Response:**
Archivo descargable (TXT, XML, ZIP, etc.)

---

### Dashboard CFO

#### GET /cfo-dashboard/kpis
Obtener KPIs financieros para el dashboard del CFO.

**Query Params:**
- `period`: "2025-01"
- `comparison`: true/false

**Response:**
\`\`\`json
{
  "period": "2025-01",
  "revenue": {
    "current": 850000.00,
    "previous": 780000.00,
    "change": 8.97,
    "trend": "up"
  },
  "netProfit": {
    "current": 180000.00,
    "previous": 150000.00,
    "change": 20.00,
    "trend": "up"
  },
  "profitMargin": {
    "current": 21.18,
    "previous": 19.23,
    "change": 1.95,
    "trend": "up"
  },
  "operatingCashFlow": {
    "current": 220000.00,
    "previous": 195000.00,
    "change": 12.82,
    "trend": "up"
  }
}
\`\`\`

#### GET /cfo-dashboard/expense-analysis
Obtener análisis de gastos por categoría.

**Response:**
\`\`\`json
{
  "period": "2025-01",
  "expenses": [
    {
      "category": "Nómina",
      "amount": 280000.00,
      "percentage": 40.0,
      "budget": 300000.00,
      "variance": -6.67
    },
    {
      "category": "Renta",
      "amount": 140000.00,
      "percentage": 20.0,
      "budget": 140000.00,
      "variance": 0
    }
  ],
  "total": 700000.00
}
\`\`\`

#### GET /cfo-dashboard/profitability-trend
Obtener tendencia de rentabilidad.

**Query Params:**
- `months`: 6 (últimos 6 meses)

**Response:**
\`\`\`json
{
  "data": [
    {
      "period": "2024-08",
      "revenue": 750000.00,
      "profit": 140000.00,
      "margin": 18.67
    },
    {
      "period": "2024-09",
      "revenue": 780000.00,
      "profit": 150000.00,
      "margin": 19.23
    }
  ]
}
\`\`\`

---

### AI y Analytics

#### POST /ai/predict-costs
Predecir costos futuros usando IA.

**Request:**
\`\`\`json
{
  "category": "OPERATIONAL",
  "months": 3,
  "includeSeasonality": true
}
\`\`\`

**Response:**
\`\`\`json
{
  "predictions": [
    {
      "period": "2025-02",
      "predicted": 295000.00,
      "confidence": 87,
      "range": {
        "min": 285000.00,
        "max": 305000.00
      }
    }
  ],
  "accuracy": 92.5,
  "model": "AWS Forecast v2.1"
}
\`\`\`

#### POST /ai/detect-anomalies
Detectar anomalías en transacciones contables.

**Request:**
\`\`\`json
{
  "period": "2025-01",
  "sensitivity": "high"
}
\`\`\`

**Response:**
\`\`\`json
{
  "anomalies": [
    {
      "id": "anom_001",
      "date": "2025-01-15",
      "account": "Gastos de viaje",
      "amount": 45000.00,
      "expectedRange": [5000, 15000],
      "severity": "high",
      "description": "Gasto inusualmente alto detectado"
    }
  ],
  "total": 3
}
\`\`\`

#### GET /ai/recommendations
Obtener recomendaciones de IA para optimización.

**Response:**
\`\`\`json
{
  "recommendations": [
    {
      "id": "rec_001",
      "type": "TAX_OPTIMIZATION",
      "priority": "high",
      "title": "Optimizar deducción de depreciación",
      "description": "Puedes aumentar la deducción de activos fijos en $50,000",
      "potentialSavings": 50000.00,
      "confidence": 95
    }
  ]
}
\`\`\`

---

## Autenticación y Seguridad

### Headers Requeridos
Todas las peticiones API deben incluir:

\`\`\`
Authorization: Bearer {jwt_token}
X-Organization-Id: {organization_id}
Content-Type: application/json
\`\`\`

### Roles y Permisos

**Roles:**
- `ADMIN`: Acceso total
- `ACCOUNTANT`: Acceso contable completo
- `VIEWER`: Solo lectura
- `APPROVER`: Puede aprobar pólizas

**Permisos por Módulo:**

| Recurso | ADMIN | ACCOUNTANT | VIEWER | APPROVER |
|---------|-------|------------|--------|----------|
| Configuración | R/W | R | R | R |
| Plan de Cuentas | R/W | R/W | R | R |
| Mapeos | R/W | R/W | R | R |
| Pólizas | R/W/D | R/W | R | R/A |
| Periodos | R/W/C | R/C | R | R |
| Reportes | R/W | R/W | R | R |

**Leyenda:** R=Read, W=Write, D=Delete, C=Close, A=Approve

---

## Integración con Catálogos Oficiales

### México - SAT
- **Catálogo de Cuentas:** 850+ cuentas oficiales
- **Formato COI:** Versión 1.3
- **CFDI 4.0:** Integración con facturación
- **DIOT:** Declaración informativa de operaciones con terceros

### Brasil - Plano de Contas
- **Plano de Contas Referencial:** Categorías estándar brasileñas
- **SPED Fiscal:** Sistema Público de Escrituração Digital
- **SPED Contábil:** Escrituração Contábil Digital

### USA - GAAP
- **US GAAP:** Generally Accepted Accounting Principles
- **XBRL:** eXtensible Business Reporting Language

---

## Reportes y Exportación

### Formatos Soportados

#### 1. COI (Contabilidad en Línea) - México
Formato de texto plano según especificaciones SAT.

**Estructura:**
\`\`\`
EC|2025|01|MXN|2
CO|1010001|Caja general|1
DE|102.01|Bancos nacionales
MO|2025|01|N|PE-2025-001|15|Compra material oficina
PD|1010001|1000.00|
PH|1020001|1000.00|
\`\`\`

#### 2. ContpaqI
Formato compatible con sistema ContpaqI.

**Formato CSV:**
\`\`\`csv
Tipo,Codigo,Cuenta,Naturaleza,Nivel,SAT
C,1010001,Caja general,D,3,101.01
C,1020001,Banco principal,D,3,102.01
P,PE-2025-001,15/01/2025,Compra material,
D,1010001,1000.00,
H,1020001,1000.00,
\`\`\`

#### 3. Excel
Archivo .xlsx con múltiples hojas:
- Catálogo de cuentas
- Balanza de comprobación
- Pólizas del periodo
- Estados financieros

#### 4. JSON
Formato estructurado para integración con otros sistemas.

---

## Ejemplos de Peticiones

### Ejemplo 1: Crear Plan de Cuentas Completo

\`\`\`bash
POST /chart-of-accounts/bulk
Authorization: Bearer {token}
X-Organization-Id: org_456

[
  {
    "code": "1000000",
    "name": "ACTIVO",
    "level": 1,
    "accountType": "ASSET",
    "country": "MX",
    "isActive": true,
    "allowsTransactions": false
  },
  {
    "code": "1010000",
    "name": "ACTIVO CIRCULANTE",
    "level": 2,
    "parentCode": "1000000",
    "accountType": "ASSET",
    "country": "MX",
    "isActive": true,
    "allowsTransactions": false
  },
  {
    "code": "1010001",
    "name": "Caja general",
    "level": 3,
    "parentCode": "1010000",
    "accountType": "ASSET",
    "country": "MX",
    "isActive": true,
    "allowsTransactions": true
  }
]
\`\`\`

### Ejemplo 2: Registrar Factura de Proveedor

\`\`\`bash
POST /journal-entries
Authorization: Bearer {token}
X-Organization-Id: org_456

{
  "entryType": "AUTO",
  "date": "2025-01-15",
  "period": "2025-01",
  "description": "Factura proveedor ABC-001",
  "reference": "ABC-001",
  "automationRuleId": "rule_001",
  "lines": [
    {
      "accountId": "acc_compras",
      "description": "Compra mercancía",
      "debit": 10000.00,
      "credit": 0
    },
    {
      "accountId": "acc_iva_acreditable",
      "description": "IVA 16%",
      "debit": 1600.00,
      "credit": 0
    },
    {
      "accountId": "acc_proveedores",
      "description": "Proveedor ABC",
      "debit": 0,
      "credit": 11600.00
    }
  ]
}
\`\`\`

### Ejemplo 3: Generar Reporte COI

\`\`\`bash
POST /compliance-reports/generate
Authorization: Bearer {token}
X-Organization-Id: org_456

{
  "reportType": "COI",
  "country": "MX",
  "year": 2025,
  "month": 1,
  "format": "TXT",
  "options": {
    "includeXML": true,
    "includeBalanza": true,
    "includePolizas": true
  }
}
\`\`\`

---

## Notas de Implementación

### Performance
- Implementar caché para catálogos oficiales (no cambian frecuentemente)
- Paginación obligatoria en endpoints con grandes volúmenes
- Índices en base de datos: `organizationId`, `period`, `code`, `date`

### Validaciones
- Validar que débitos = créditos en pólizas
- Validar que periodo esté abierto antes de crear pólizas
- Validar formato de códigos según catálogo oficial
- Validar permisos del usuario según rol

### Webhooks (Opcional)
Notificar al frontend cuando:
- Se genera un reporte de cumplimiento
- Se detecta una anomalía
- Se cierra un periodo
- Se completa un mapeo automático

**Formato:**
\`\`\`json
{
  "event": "report.generated",
  "organizationId": "org_456",
  "timestamp": "2025-01-15T10:30:00Z",
  "data": {
    "reportId": "rep_001",
    "reportType": "COI",
    "status": "GENERATED"
  }
}
\`\`\`

---

## Contacto y Soporte

Para preguntas sobre la integración, contactar al equipo de desarrollo frontend:
- **Email:** dev-frontend@renofms.com
- **Documentación adicional:** https://docs.renofms.com/api

**Versión del documento:** 1.0  
**Última actualización:** Enero 2025
