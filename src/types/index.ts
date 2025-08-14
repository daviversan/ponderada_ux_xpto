export interface SearchResult {
  id: string;
  title: string;
  category: string;
  description: string;
  department: string;
  priority: 'baixa' | 'média' | 'alta';
  status: 'ativo' | 'inativo' | 'pendente';
  createdAt: string;
}

export interface VoiceCommand {
  intent: string;
  entities: Record<string, string>;
  confidence: number;
}

export interface ConversationStep {
  id: string;
  userInput: string;
  assistantResponse: string;
  timestamp: Date;
  results?: SearchResult[];
}