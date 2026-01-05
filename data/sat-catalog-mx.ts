// Mexican SAT Chart of Accounts - Complete catalog from official document
export const satCatalogMx = [
  // ACTIVO (100)
  { level: 0, code: "100", name: "Activo" },
  { level: 0, code: "100.01", name: "Activo a corto plazo" },
  { level: 1, code: "101", name: "Caja" },
  { level: 2, code: "101.01", name: "Caja y efectivo" },
  { level: 1, code: "102", name: "Bancos" },
  { level: 2, code: "102.01", name: "Bancos nacionales" },
  { level: 2, code: "102.02", name: "Bancos extranjeros" },
  { level: 1, code: "103", name: "Inversiones" },
  { level: 2, code: "103.01", name: "Inversiones temporales" },
  { level: 2, code: "103.02", name: "Inversiones en fideicomisos" },
  { level: 2, code: "103.03", name: "Otras inversiones" },
  { level: 1, code: "105", name: "Clientes" },
  { level: 2, code: "105.01", name: "Clientes nacionales" },
  { level: 2, code: "105.02", name: "Clientes extranjeros" },
  { level: 1, code: "115", name: "Inventario" },
  { level: 2, code: "115.01", name: "Inventario" },
  { level: 2, code: "115.02", name: "Materia prima y materiales" },
  { level: 2, code: "115.03", name: "Producción en proceso" },
  { level: 2, code: "115.04", name: "Productos terminados" },
  
  // ACTIVO A LARGO PLAZO
  { level: 0, code: "100.02", name: "Activo a largo plazo" },
  { level: 1, code: "151", name: "Terrenos" },
  { level: 2, code: "151.01", name: "Terrenos" },
  { level: 1, code: "152", name: "Edificios" },
  { level: 2, code: "152.01", name: "Edificios" },
  { level: 1, code: "153", name: "Maquinaria y equipo" },
  { level: 2, code: "153.01", name: "Maquinaria y equipo" },
  { level: 1, code: "154", name: "Automóviles, autobuses, camiones de carga, tractocamiones, montacargas y remolques" },
  { level: 2, code: "154.01", name: "Automóviles, autobuses, camiones de carga, tractocamiones, montacargas y remolques" },
  { level: 1, code: "171", name: "Depreciación acumulada de activos fijos" },
  { level: 2, code: "171.01", name: "Depreciación acumulada de edificios" },
  { level: 2, code: "171.02", name: "Depreciación acumulada de maquinaria y equipo" },
  
  // PASIVO (200)
  { level: 0, code: "200", name: "Pasivo" },
  { level: 0, code: "200.01", name: "Pasivo a corto plazo" },
  { level: 1, code: "201", name: "Proveedores" },
  { level: 2, code: "201.01", name: "Proveedores nacionales" },
  { level: 2, code: "201.02", name: "Proveedores extranjeros" },
  { level: 1, code: "202", name: "Cuentas por pagar a corto plazo" },
  { level: 2, code: "202.01", name: "Documentos por pagar bancario y financiero nacional" },
  { level: 1, code: "213", name: "Impuestos y derechos por pagar" },
  { level: 2, code: "213.01", name: "IVA por pagar" },
  { level: 2, code: "213.03", name: "ISR por pagar" },
  
  // PASIVO A LARGO PLAZO
  { level: 0, code: "200.02", name: "Pasivo a largo plazo" },
  { level: 1, code: "252", name: "Cuentas por pagar a largo plazo" },
  { level: 2, code: "252.01", name: "Documentos bancarios y financieros por pagar a largo plazo nacional" },
  
  // CAPITAL CONTABLE (300)
  { level: 0, code: "300", name: "Capital contable" },
  { level: 1, code: "301", name: "Capital social" },
  { level: 2, code: "301.01", name: "Capital fijo" },
  { level: 2, code: "301.02", name: "Capital variable" },
  { level: 1, code: "304", name: "Resultado de ejercicios anteriores" },
  { level: 2, code: "304.01", name: "Utilidad de ejercicios anteriores" },
  { level: 2, code: "304.02", name: "Pérdida de ejercicios anteriores" },
  { level: 1, code: "305", name: "Resultado del ejercicio" },
  { level: 2, code: "305.01", name: "Utilidad del ejercicio" },
  { level: 2, code: "305.02", name: "Pérdida del ejercicio" },
  
  // INGRESOS (400)
  { level: 0, code: "400", name: "Ingresos" },
  { level: 1, code: "401", name: "Ingresos" },
  { level: 2, code: "401.01", name: "Ventas y/o servicios gravados a la tasa general" },
  { level: 2, code: "401.04", name: "Ventas y/o servicios gravados al 0%" },
  { level: 2, code: "401.07", name: "Ventas y/o servicios exentos" },
  { level: 1, code: "402", name: "Devoluciones, descuentos o bonificaciones sobre ingresos" },
  { level: 2, code: "402.01", name: "Devoluciones, descuentos o bonificaciones sobre ventas y/o servicios a la tasa general" },
  
  // COSTOS (500)
  { level: 0, code: "500", name: "Costos" },
  { level: 1, code: "501", name: "Costo de venta y/o servicio" },
  { level: 2, code: "501.01", name: "Costo de venta" },
  { level: 2, code: "501.02", name: "Costo de servicios (Mano de obra)" },
  { level: 1, code: "502", name: "Compras" },
  { level: 2, code: "502.01", name: "Compras nacionales" },
  { level: 2, code: "502.03", name: "Compras de Importación" },
  
  // GASTOS (600)
  { level: 0, code: "600", name: "Gastos" },
  { level: 1, code: "601", name: "Gastos generales" },
  { level: 2, code: "601.01", name: "Sueldos y salarios" },
  { level: 2, code: "601.48", name: "Combustibles y lubricantes" },
  { level: 2, code: "601.49", name: "Viáticos y gastos de viaje" },
  { level: 2, code: "601.56", name: "Mantenimiento y conservación" },
  { level: 1, code: "602", name: "Gastos de venta" },
  { level: 2, code: "602.01", name: "Sueldos y salarios" },
  { level: 1, code: "603", name: "Gastos de administración" },
  { level: 2, code: "603.01", name: "Sueldos y salarios" },
  
  // RESULTADO INTEGRAL DE FINANCIAMIENTO (700)
  { level: 0, code: "700", name: "Resultado integral de financiamiento" },
  { level: 1, code: "701", name: "Gastos financieros" },
  { level: 2, code: "701.01", name: "Pérdida cambiaria" },
  { level: 2, code: "701.04", name: "Intereses a cargo bancario nacional" },
  { level: 1, code: "702", name: "Productos financieros" },
  { level: 2, code: "702.01", name: "Utilidad cambiaria" },
  { level: 2, code: "702.04", name: "Intereses a favor bancarios nacional" },
  
  // CUENTAS DE ORDEN (800)
  { level: 0, code: "800", name: "Cuentas de orden" },
  { level: 1, code: "801", name: "UFIN del ejercicio" },
  { level: 2, code: "801.01", name: "UFIN" },
  { level: 1, code: "802", name: "CUFIN del ejercicio" },
  { level: 2, code: "802.01", name: "CUFIN" },
];
