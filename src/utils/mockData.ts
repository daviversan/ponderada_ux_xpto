import { SearchResult } from '../types';

export const mockData: SearchResult[] = [
  {
    id: '1',
    title: 'Relatório de Vendas Q4 2024',
    category: 'relatório',
    description: 'Análise detalhada das vendas do último trimestre',
    department: 'vendas',
    priority: 'alta',
    status: 'ativo',
    createdAt: '2024-12-15'
  },
  {
    id: '2',
    title: 'Proposta de Marketing Digital',
    category: 'proposta',
    description: 'Estratégia de marketing para produtos digitais',
    department: 'marketing',
    priority: 'média',
    status: 'pendente',
    createdAt: '2024-12-10'
  },
  {
    id: '3',
    title: 'Manual de Integração de Funcionários',
    category: 'documento',
    description: 'Guia completo para novos colaboradores',
    department: 'recursos humanos',
    priority: 'baixa',
    status: 'ativo',
    createdAt: '2024-12-08'
  },
  {
    id: '4',
    title: 'Sistema de Gestão Interna',
    category: 'projeto',
    description: 'Desenvolvimento do novo sistema interno',
    department: 'tecnologia',
    priority: 'alta',
    status: 'ativo',
    createdAt: '2024-12-12'
  },
  {
    id: '5',
    title: 'Análise de Custos Operacionais',
    category: 'relatório',
    description: 'Estudo dos custos operacionais da empresa',
    department: 'financeiro',
    priority: 'média',
    status: 'concluído',
    createdAt: '2024-12-05'
  },
  {
    id: '6',
    title: 'Contrato de Prestação de Serviços',
    category: 'contrato',
    description: 'Contrato com fornecedor de serviços externos',
    department: 'operações',
    priority: 'alta',
    status: 'pendente',
    createdAt: '2024-12-14'
  }
];

export const searchData = (filters: Record<string, string>): SearchResult[] => {
  let results = [...mockData];

  if (filters.searchTerms) {
    const searchTerms = filters.searchTerms.toLowerCase();
    results = results.filter(item => 
      item.title.toLowerCase().includes(searchTerms) ||
      item.description.toLowerCase().includes(searchTerms)
    );
  }

  if (filters.department) {
    results = results.filter(item => 
      item.department.toLowerCase().includes(filters.department.toLowerCase())
    );
  }

  if (filters.priority) {
    results = results.filter(item => 
      item.priority.toLowerCase() === filters.priority.toLowerCase()
    );
  }

  if (filters.status) {
    results = results.filter(item => 
      item.status.toLowerCase() === filters.status.toLowerCase()
    );
  }

  if (filters.category) {
    results = results.filter(item => 
      item.category.toLowerCase().includes(filters.category.toLowerCase())
    );
  }

  return results;
};