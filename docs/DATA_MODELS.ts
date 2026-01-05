// Modelos de TypeScript para referencia del backend
// Estos son los tipos que el frontend espera recibir

export interface Organization {
  id: string;
  name: string;
  country: "MX" | "BR" | "US" | "CA" | "CO" | "CL";
  fiscalRegime: string;
  rfc?: string;
  taxId?: string;
  currency: "MXN" | "BRL" | "USD" | "CAD" | "COP" | "CLP";
  fiscalYear: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface AccountingSettings {
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

export interface ChartOfAccount {
  id: string;
  organizationId: string;
  code: string;
  name: string;
  level: number;
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

export interface OfficialAccountMapping {
  id: string;
  organizationId: string;
  internalAccountId: string;
  officialCode: string;
  officialName: string;
  catalogType: "SAT" | "PLANO_CONTAS";
  country: string;
  mappingType: "AUTO" | "MANUAL";
  confidence?: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface JournalEntry {
  id: string;
  organizationId: string;
  entryNumber: string;
  entryType: "MANUAL" | "AUTO" | "ADJUSTMENT" | "CLOSING";
  date: Date;
  period: string;
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

export interface JournalEntryLine {
  id: string;
  journalEntryId: string;
  lineNumber: number;
  accountId: string;
  description: string;
  debit: number;
  credit: number;
  currency: string;
  exchangeRate?: number;
  reference?: string;
}

export interface AutomationRule {
  id: string;
  organizationId: string;
  name: string;
  country: string;
  triggerEvent: "INVOICE_RECEIVED" | "INVOICE_ISSUED" | "PAYMENT_RECEIVED" | 
                "PAYMENT_MADE" | "PAYROLL" | "BANK_TRANSACTION";
  condition?: string;
  isActive: boolean;
  priority: number;
  lines: AutomationRuleLine[];
  createdAt: Date;
  updatedAt: Date;
}

export interface AutomationRuleLine {
  id: string;
  ruleId: string;
  accountId: string;
  type: "DEBIT" | "CREDIT";
  amountFormula: string;
  description: string;
}

export interface FiscalPeriod {
  id: string;
  organizationId: string;
  year: number;
  month: number;
  periodName: string;
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

export interface ComplianceReport {
  id: string;
  organizationId: string;
  reportType: "COI" | "DIOT" | "IVA" | "ISR" | "SPED_FISCAL" | "SPED_CONTABIL" | 
               "XBRL" | "IFRS";
  country: string;
  period: string;
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

export interface AIAnalytics {
  id: string;
  organizationId: string;
  analysisType: "COST_PREDICTION" | "ANOMALY_DETECTION" | "TAX_OPTIMIZATION" | 
                "CASH_FLOW_FORECAST";
  period: string;
  inputData: Record<string, any>;
  predictions: Record<string, any>;
  confidence: number;
  recommendations: string[];
  createdAt: Date;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: any;
  };
  pagination?: {
    total: number;
    page: number;
    limit: number;
    pages: number;
  };
}

export interface TrialBalanceData {
  period: string;
  currency: string;
  accounts: TrialBalanceAccount[];
  totals: {
    initialBalance: number;
    debit: number;
    credit: number;
    finalBalance: number;
  };
}

export interface TrialBalanceAccount {
  code: string;
  name: string;
  initialBalance: number;
  debit: number;
  credit: number;
  finalBalance: number;
  satCode?: string;
}

export interface BalanceSheetData {
  period: string;
  currency: string;
  assets: {
    current: { total: number; accounts: BalanceSheetAccount[] };
    nonCurrent: { total: number; accounts: BalanceSheetAccount[] };
    total: number;
  };
  liabilities: {
    current: { total: number; accounts: BalanceSheetAccount[] };
    nonCurrent: { total: number; accounts: BalanceSheetAccount[] };
    total: number;
  };
  equity: {
    total: number;
    accounts: BalanceSheetAccount[];
  };
}

export interface BalanceSheetAccount {
  code: string;
  name: string;
  balance: number;
}

export interface IncomeStatementData {
  startPeriod: string;
  endPeriod: string;
  currency: string;
  revenue: { total: number; accounts: IncomeStatementAccount[] };
  costOfSales: { total: number; accounts: IncomeStatementAccount[] };
  grossProfit: number;
  operatingExpenses: { total: number; accounts: IncomeStatementAccount[] };
  operatingIncome: number;
  otherIncome: number;
  otherExpenses: number;
  netIncome: number;
}

export interface IncomeStatementAccount {
  code: string;
  name: string;
  amount: number;
}

export interface CFODashboardKPIs {
  period: string;
  revenue: KPI;
  netProfit: KPI;
  profitMargin: KPI;
  operatingCashFlow: KPI;
}

export interface KPI {
  current: number;
  previous: number;
  change: number;
  trend: "up" | "down" | "stable";
}
