# RENO FMS - Estructura del Frontend
## Módulo de Contabilidad Global

## Estructura de Carpetas

\`\`\`
reno-fms-accounting/
├── app/
│   ├── layout.tsx          # Layout principal con LanguageProvider
│   ├── page.tsx            # Página principal (Sidebar + TopBar + AccountingPage)
│   └── globals.css         # Estilos globales Tailwind CSS v4
│
├── components/
│   ├── layout/
│   │   ├── sidebar.tsx     # Barra lateral con navegación (verde)
│   │   └── top-bar.tsx     # Barra superior con módulos y usuario
│   └── ui/                 # Componentes shadcn/ui
│       ├── button.tsx
│       ├── card.tsx
│       ├── dialog.tsx
│       ├── select.tsx
│       ├── input.tsx
│       ├── table.tsx
│       └── ... (otros)
│
├── modules/
│   └── accounting/
│       ├── accounting-page.tsx         # Página principal con tabs
│       └── tabs/
│           ├── overview-tab.tsx        # Resumen
│           ├── settings-tab.tsx        # Configuración
│           ├── official-catalog-tab.tsx # Catálogo SAT/Oficial
│           ├── internal-coa-tab.tsx    # Plan de cuentas interno
│           ├── mapping-tab.tsx         # Mapeos y reportes
│           ├── automation-tab.tsx      # Reglas automáticas
│           ├── ai-analytics-tab.tsx    # IA y Analytics
│           ├── financial-statements-tab.tsx # Estados financieros
│           ├── trial-balance-tab.tsx   # Balanza de comprobación
│           ├── closing-tab.tsx         # Cierre de periodos
│           ├── compliance-tab.tsx      # Cumplimiento fiscal
│           └── cfo-dashboard-tab.tsx   # Dashboard CFO
│
├── hooks/
│   ├── use-language.ts     # Hook para manejo de idioma (Context API)
│   ├── use-mobile.ts       # Hook para detectar mobile
│   └── use-toast.ts        # Hook para notificaciones
│
├── lib/
│   ├── translations.ts     # Traducciones ES/EN/FR/PT
│   └── utils.ts           # Utilidades (cn, formatters, etc.)
│
└── data/
    ├── sat-catalog-mx.ts   # Catálogo SAT México (850+ cuentas)
    └── brazil-plano-mock.ts # Plano de Contas Brasil (mock)
\`\`\`

## Tecnologías Utilizadas

- **Next.js 16** (App Router)
- **React 19.2** (Client + Server Components)
- **TypeScript**
- **Tailwind CSS v4**
- **shadcn/ui** (Componentes)
- **Recharts** (Gráficas)
- **Lucide React** (Iconos)
- **React Context API** (Estado idioma)

## Características Implementadas

### 1. Multiidioma (i18n)
- Español (ES) - Por defecto
- Inglés (EN)
- Francés (FR)
- Portugués (PT)
- Cambio en tiempo real desde el TopBar
- Persistencia en localStorage

### 2. Multi-país
- México (SAT)
- Brasil (Plano de Contas)
- Estados Unidos (US GAAP)
- Canadá
- Colombia
- Chile

### 3. Módulos Implementados

#### Resumen (Overview)
- Tarjetas con métricas principales
- Estado del periodo contable
- Últimas pólizas registradas
- Alertas y notificaciones

#### Configuración Contable
- País y moneda
- Periodo fiscal
- Formato de exportación (COI, ContpaqI, Excel, JSON)
- Catálogo oficial (SAT, Plano de Contas)
- Decimales, formato fecha/moneda
- Opciones de cierre automático
- Habilitación de IA

#### Catálogo Oficial
- Visualización completa del catálogo SAT (850+ cuentas)
- Navegación por niveles (1, 2, 3)
- Búsqueda por código o nombre
- Filtros por tipo de cuenta
- Exportación

#### Plan de Cuentas Interno
- Crear, editar, eliminar cuentas
- Estructura jerárquica (padre-hijo)
- Asignación de códigos personalizados
- Importar desde CSV/Excel/JSON
- Exportar a CSV
- Activar/desactivar cuentas

#### Mapeos y Reportes
- Mapeo cuenta interna ↔ cuenta oficial
- Edición de mapeos
- Importar/exportar mapeos
- Generación automática de reportes:
  - Balance General
  - Estado de Resultados
  - Reporte Fiscal

#### Reglas de Automatización
- Crear reglas para eventos (factura recibida, pago, nómina, etc.)
- Definir líneas contables automáticas (debe/haber)
- Activar/desactivar reglas
- Editar y eliminar reglas
- Por país

#### IA y Analytics
- Predicción de costos (AWS)
- Detección de anomalías
- Recomendaciones inteligentes
- Tendencias y patrones

#### Estados Financieros
- Balance General con gráfica
- Estado de Resultados con tendencia
- Flujo de Efectivo
- Filtros por periodo
- Comparativos
- Exportación (Excel, PDF, CSV)

#### Balanza de Comprobación
- Nivel de detalle configurable (1, 2, 3)
- Columnas: Código, Cuenta, Saldo Inicial, Cargo, Abono, Saldo Final, SAT
- Totales calculados
- Exportación (COI, Excel, CSV)

#### Cierre de Periodos
- Gestión de periodos (abrir/cerrar/bloquear)
- Checklist de tareas pre-cierre
- Generación automática de asientos de cierre
- Log de auditoría

#### Cumplimiento Fiscal
- Reportes por país:
  - México: COI, DIOT, IVA, ISR
  - Brasil: SPED Fiscal, SPED Contábil
  - USA: XBRL, IFRS
- Generación y descarga de archivos
- Historial de envíos

#### Dashboard CFO
- KPIs financieros (ingresos, utilidad, margen, flujo)
- Análisis multi-país
- Gráfica de gastos por categoría
- Tendencia de rentabilidad
- Exportación

## Integración con Backend

### Variables de Entorno Necesarias

\`\`\`env
# API Backend
NEXT_PUBLIC_API_URL=https://api.renofms.com/v1
NEXT_PUBLIC_API_TIMEOUT=30000

# Autenticación
NEXT_PUBLIC_AUTH_ENABLED=true

# Features
NEXT_PUBLIC_ENABLE_AI=true
NEXT_PUBLIC_ENABLE_MULTI_COUNTRY=true
\`\`\`

### Formato de Peticiones

Todas las peticiones al backend deben incluir:

\`\`\`typescript
const headers = {
  'Authorization': `Bearer ${token}`,
  'X-Organization-Id': organizationId,
  'Content-Type': 'application/json',
  'Accept-Language': language, // es, en, fr, pt
};
\`\`\`

### Manejo de Errores

El frontend espera respuestas con esta estructura:

\`\`\`typescript
// Éxito
{
  "success": true,
  "data": { ... }
}

// Error
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "El periodo ya está cerrado",
    "details": { ... }
  }
}
\`\`\`

## Próximos Pasos para Desarrollo

### Para el equipo de backend:
1. Leer las especificaciones en `BACKEND_API_SPECIFICATIONS.md`
2. Implementar los endpoints según la documentación
3. Usar los modelos de datos en `DATA_MODELS.ts` como referencia
4. Configurar base de datos con las tablas necesarias
5. Implementar autenticación JWT
6. Crear seeders con datos de prueba
7. Documentar endpoints con Swagger/OpenAPI
8. Configurar CORS para permitir el frontend

### Para integración:
1. Frontend ya está listo con mock data
2. Reemplazar llamadas mock por llamadas reales al API
3. Agregar manejo de loading states
4. Agregar manejo de errores
5. Implementar retry logic para peticiones fallidas
6. Agregar WebSockets para actualizaciones en tiempo real (opcional)

## Comandos de Desarrollo

\`\`\`bash
# Instalar dependencias
npm install

# Desarrollo local
npm run dev

# Build producción
npm run build

# Preview producción
npm run start

# Linting
npm run lint
\`\`\`

## Contacto

**Equipo Frontend:**
- Email: dev-frontend@renofms.com
- Slack: #reno-fms-accounting

**Documentación:**
- API Specs: `/docs/BACKEND_API_SPECIFICATIONS.md`
- Data Models: `/docs/DATA_MODELS.ts`
