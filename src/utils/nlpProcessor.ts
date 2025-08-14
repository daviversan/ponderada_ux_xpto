import { VoiceCommand } from '../types';

const intents = {
  search: ['procurar', 'buscar', 'encontrar', 'localizar', 'pesquisar'],
  filter: ['filtrar', 'mostrar', 'exibir', 'listar'],
  help: ['ajuda', 'socorro', 'como', 'o que'],
  greeting: ['olá', 'oi', 'bom dia', 'boa tarde', 'boa noite'],
  clear: ['limpar', 'resetar', 'começar', 'novo']
};

const entities = {
  department: ['vendas', 'marketing', 'recursos humanos', 'rh', 'tecnologia', 'ti', 'financeiro', 'operações'],
  priority: ['alta', 'média', 'baixa', 'urgente', 'normal'],
  status: ['ativo', 'inativo', 'pendente', 'concluído'],
  category: ['projeto', 'tarefa', 'documento', 'relatório', 'contrato', 'proposta']
};

export const processVoiceCommand = (text: string): VoiceCommand => {
  const lowerText = text.toLowerCase();
  
  // Detectar intenção
  let detectedIntent = 'unknown';
  let maxScore = 0;

  for (const [intent, keywords] of Object.entries(intents)) {
    const score = keywords.reduce((acc, keyword) => {
      return acc + (lowerText.includes(keyword) ? 1 : 0);
    }, 0);

    if (score > maxScore) {
      maxScore = score;
      detectedIntent = intent;
    }
  }

  // Extrair entidades
  const extractedEntities: Record<string, string> = {};

  for (const [entityType, values] of Object.entries(entities)) {
    for (const value of values) {
      if (lowerText.includes(value)) {
        extractedEntities[entityType] = value;
        break;
      }
    }
  }

  // Extrair termos de busca
  const searchTerms = lowerText
    .replace(/\b(procurar|buscar|encontrar|por|para|de|da|do|em|na|no)\b/g, '')
    .trim();

  if (searchTerms) {
    extractedEntities.searchTerms = searchTerms;
  }

  return {
    intent: detectedIntent,
    entities: extractedEntities,
    confidence: maxScore > 0 ? 0.9 : 0.4
  };
};

export const generateDetailedResponse = (
  intent: string, 
  entities: Record<string, string>, 
  results: any[], 
  userInput: string
): string => {
  const entityDescriptions = {
    department: entities.department ? `do departamento de ${entities.department}` : '',
    priority: entities.priority ? `com prioridade ${entities.priority}` : '',
    status: entities.status ? `com status ${entities.status}` : '',
    category: entities.category ? `da categoria ${entities.category}` : '',
    searchTerms: entities.searchTerms ? `relacionados a "${entities.searchTerms}"` : ''
  };

  const activeFilters = Object.values(entityDescriptions).filter(desc => desc).join(', ');

  switch (intent) {
    case 'greeting':
      const greetings = [
        'Olá! Sou o assistente virtual da XPTO. Estou aqui para ajudá-lo a encontrar documentos, relatórios e informações da empresa de forma rápida e eficiente.',
        'Bem-vindo ao sistema XPTO! Posso ajudá-lo a buscar documentos por departamento, prioridade, status ou palavras-chave. Como posso ajudá-lo hoje?',
        'Oi! Sou seu assistente de busca da XPTO. Tenho acesso a documentos de todos os departamentos: vendas, marketing, RH, tecnologia, financeiro e operações. O que você precisa encontrar?'
      ];
      return greetings[Math.floor(Math.random() * greetings.length)];
    
    case 'search':
    case 'filter':
      if (results.length === 0) {
        return `Não encontrei resultados ${activeFilters ? activeFilters : 'para sua busca'}. 
                Você pode tentar: 
                • Usar termos mais gerais como "relatório" ou "projeto"
                • Verificar se o departamento existe (vendas, marketing, RH, tecnologia, financeiro, operações)
                • Tentar diferentes prioridades (alta, média, baixa)
                • Buscar por status (ativo, pendente, inativo, concluído)
                Posso ajudá-lo com uma nova busca?`;
      } else if (results.length === 1) {
        const item = results[0];
        return `Perfeito! Encontrei exatamente o que você procura: "${item.title}". 
                Este documento é ${entityDescriptions.category || 'um item'} do departamento de ${item.department}, 
                tem prioridade ${item.priority} e status ${item.status}. 
                Foi criado em ${new Date(item.createdAt).toLocaleDateString('pt-BR')}. 
                Descrição: ${item.description}`;
      } else {
        const departments = [...new Set(results.map(r => r.department))];
        const priorities = [...new Set(results.map(r => r.priority))];
        const categories = [...new Set(results.map(r => r.category))];
        
        let response = `Excelente! Encontrei ${results.length} resultados ${activeFilters ? activeFilters : 'para sua busca'}. `;
        
        if (departments.length > 1) {
          response += `Os documentos estão distribuídos entre os departamentos: ${departments.join(', ')}. `;
        }
        
        if (priorities.length > 1) {
          response += `Há itens com diferentes prioridades: ${priorities.join(', ')}. `;
        }
        
        if (categories.length > 1) {
          response += `Incluindo: ${categories.join(', ')}. `;
        }
        
        response += `Você pode refinar sua busca ou pedir para ver detalhes específicos de algum resultado.`;
        
        return response;
      }
    
    case 'help':
      return `Posso ajudá-lo de várias formas! Aqui estão alguns exemplos:
              
              🔍 BUSCAR: "Procurar relatórios", "Buscar contratos", "Encontrar propostas"
              
              🏢 POR DEPARTAMENTO: "Documentos de vendas", "Projetos de tecnologia", "Relatórios de marketing"
              
              ⚡ POR PRIORIDADE: "Tarefas urgentes", "Projetos de alta prioridade", "Itens de baixa prioridade"
              
              📊 POR STATUS: "Projetos ativos", "Documentos pendentes", "Tarefas concluídas"
              
              🎯 COMBINADO: "Relatórios de vendas com alta prioridade", "Contratos pendentes do financeiro"
              
              Fale naturalmente! Entendo português e posso combinar diferentes filtros numa única busca.`;
    
    case 'clear':
      return `Perfeito! Limpei todos os resultados e filtros anteriores. 
              Agora você pode fazer uma nova busca. 
              Que tipo de documento ou informação você gostaria de encontrar? 
              Posso buscar por departamento, prioridade, status ou palavras-chave específicas.`;
    
    default:
      return `Desculpe, não consegui entender completamente "${userInput}". 
              Você pode tentar reformular usando comandos como:
              • "Procurar [tipo de documento]"
              • "Mostrar documentos de [departamento]"
              • "Listar itens com prioridade [alta/média/baixa]"
              • "Buscar projetos [ativos/pendentes/concluídos]"
              
              Ou diga "ajuda" para ver todos os comandos disponíveis!`;
  }
};