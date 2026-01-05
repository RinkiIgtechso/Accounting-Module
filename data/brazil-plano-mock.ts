// Brazil Plano de Contas Referencial - Mock data
export const brazilPlanoMock = [
  { level: 0, code: "1", name: "Ativo" },
  { level: 1, code: "1.1", name: "Ativo Circulante" },
  { level: 2, code: "1.1.1", name: "Caixa e Equivalentes de Caixa" },
  { level: 3, code: "1.1.1.01", name: "Caixa" },
  { level: 3, code: "1.1.1.02", name: "Bancos Conta Movimento" },
  { level: 2, code: "1.1.2", name: "Contas a Receber" },
  { level: 3, code: "1.1.2.01", name: "Clientes" },
  { level: 3, code: "1.1.2.02", name: "Duplicatas a Receber" },
  { level: 2, code: "1.1.3", name: "Estoques" },
  { level: 3, code: "1.1.3.01", name: "Mercadorias para Revenda" },
  { level: 3, code: "1.1.3.02", name: "Matérias-Primas" },
  
  { level: 1, code: "1.2", name: "Ativo Não Circulante" },
  { level: 2, code: "1.2.1", name: "Realizável a Longo Prazo" },
  { level: 2, code: "1.2.2", name: "Investimentos" },
  { level: 2, code: "1.2.3", name: "Imobilizado" },
  { level: 3, code: "1.2.3.01", name: "Terrenos" },
  { level: 3, code: "1.2.3.02", name: "Edificações" },
  { level: 3, code: "1.2.3.03", name: "Máquinas e Equipamentos" },
  { level: 3, code: "1.2.3.04", name: "Veículos" },
  { level: 3, code: "1.2.3.05", name: "Depreciação Acumulada" },
  
  { level: 0, code: "2", name: "Passivo" },
  { level: 1, code: "2.1", name: "Passivo Circulante" },
  { level: 2, code: "2.1.1", name: "Fornecedores" },
  { level: 3, code: "2.1.1.01", name: "Fornecedores Nacionais" },
  { level: 2, code: "2.1.2", name: "Obrigações Fiscais" },
  { level: 3, code: "2.1.2.01", name: "ICMS a Recolher" },
  { level: 3, code: "2.1.2.02", name: "IPI a Recolher" },
  
  { level: 1, code: "2.2", name: "Passivo Não Circulante" },
  { level: 2, code: "2.2.1", name: "Empréstimos a Longo Prazo" },
  
  { level: 0, code: "3", name: "Patrimônio Líquido" },
  { level: 1, code: "3.1", name: "Capital Social" },
  { level: 1, code: "3.2", name: "Reservas de Lucros" },
  { level: 1, code: "3.3", name: "Lucros/Prejuízos Acumulados" },
  
  { level: 0, code: "4", name: "Receitas" },
  { level: 1, code: "4.1", name: "Receita de Vendas" },
  { level: 2, code: "4.1.1", name: "Vendas de Mercadorias" },
  { level: 2, code: "4.1.2", name: "Vendas de Serviços" },
  
  { level: 0, code: "5", name: "Custos" },
  { level: 1, code: "5.1", name: "Custo das Mercadorias Vendidas" },
  { level: 1, code: "5.2", name: "Custo dos Serviços Prestados" },
  
  { level: 0, code: "6", name: "Despesas" },
  { level: 1, code: "6.1", name: "Despesas Operacionais" },
  { level: 2, code: "6.1.1", name: "Despesas com Pessoal" },
  { level: 2, code: "6.1.2", name: "Despesas Gerais" },
];
