import React from 'react';
import { Mic, Search, Filter, RotateCcw, Users, AlertTriangle, CheckCircle } from 'lucide-react';

interface CommandSuggestionsProps {
  onCommandClick: (command: string) => void;
  isListening: boolean;
  isSpeaking: boolean;
}

export const CommandSuggestions: React.FC<CommandSuggestionsProps> = ({
  onCommandClick,
  isListening,
  isSpeaking
}) => {
  const commands = [
    {
      category: 'Iniciar Conversa',
      icon: <Mic className="w-4 h-4" />,
      color: 'bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100',
      items: [
        'Olá XPTO',
        'Bom dia assistente',
        'Preciso de ajuda'
      ]
    },
    {
      category: 'Buscar Documentos',
      icon: <Search className="w-4 h-4" />,
      color: 'bg-green-50 border-green-200 text-green-700 hover:bg-green-100',
      items: [
        'Procurar relatórios',
        'Buscar contratos',
        'Encontrar propostas',
        'Localizar documentos de vendas'
      ]
    },
    {
      category: 'Filtrar por Departamento',
      icon: <Users className="w-4 h-4" />,
      color: 'bg-purple-50 border-purple-200 text-purple-700 hover:bg-purple-100',
      items: [
        'Mostrar documentos de vendas',
        'Listar projetos de tecnologia',
        'Exibir relatórios de marketing',
        'Documentos do financeiro'
      ]
    },
    {
      category: 'Filtrar por Prioridade',
      icon: <AlertTriangle className="w-4 h-4" />,
      color: 'bg-orange-50 border-orange-200 text-orange-700 hover:bg-orange-100',
      items: [
        'Tarefas de alta prioridade',
        'Projetos urgentes',
        'Documentos de prioridade média',
        'Itens de baixa prioridade'
      ]
    },
    {
      category: 'Filtrar por Status',
      icon: <CheckCircle className="w-4 h-4" />,
      color: 'bg-teal-50 border-teal-200 text-teal-700 hover:bg-teal-100',
      items: [
        'Projetos ativos',
        'Documentos pendentes',
        'Tarefas concluídas',
        'Itens inativos'
      ]
    },
    {
      category: 'Comandos Especiais',
      icon: <RotateCcw className="w-4 h-4" />,
      color: 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100',
      items: [
        'Limpar resultados',
        'Mostrar histórico',
        'Repetir última busca',
        'Ajuda com comandos'
      ]
    }
  ];

  const isDisabled = isListening || isSpeaking;

  return (
    <div className="w-full max-w-6xl mx-auto mt-8">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-4">
          <h3 className="text-lg font-semibold flex items-center">
            <Mic className="w-5 h-5 mr-2" />
            Comandos de Voz Disponíveis
          </h3>
          <p className="text-indigo-100 text-sm mt-1">
            Clique em qualquer comando ou fale naturalmente
          </p>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {commands.map((category, categoryIndex) => (
              <div key={categoryIndex} className="space-y-3">
                <div className="flex items-center space-x-2 mb-3">
                  <div className="text-gray-600">
                    {category.icon}
                  </div>
                  <h4 className="font-semibold text-gray-800 text-sm">
                    {category.category}
                  </h4>
                </div>
                
                <div className="space-y-2">
                  {category.items.map((command, commandIndex) => (
                    <button
                      key={commandIndex}
                      onClick={() => !isDisabled && onCommandClick(command)}
                      disabled={isDisabled}
                      className={`w-full text-left px-3 py-2 rounded-lg border text-xs font-medium transition-all duration-200 ${
                        isDisabled 
                          ? 'opacity-50 cursor-not-allowed bg-gray-50 border-gray-200 text-gray-400'
                          : `${category.color} cursor-pointer transform hover:scale-105 hover:shadow-md`
                      }`}
                    >
                      "{command}"
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h4 className="font-semibold text-blue-800 mb-2">💡 Dicas de Uso:</h4>
            <ul className="text-blue-700 text-sm space-y-1">
              <li>• Combine filtros: "Buscar relatórios de vendas com alta prioridade"</li>
              <li>• Use linguagem natural: "Quero ver os projetos do setor de tecnologia"</li>
              <li>• Seja específico: "Mostrar contratos pendentes do departamento financeiro"</li>
              <li>• Para limpar: "Limpar resultados" ou "Começar nova busca"</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};