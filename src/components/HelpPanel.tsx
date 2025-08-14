import React from 'react';
import { HelpCircle, Mic, Search, Filter, RotateCcw } from 'lucide-react';

interface HelpPanelProps {
  isVisible: boolean;
  onClose: () => void;
}

export const HelpPanel: React.FC<HelpPanelProps> = ({ isVisible, onClose }) => {
  if (!isVisible) return null;

  const commands = [
    {
      icon: <Mic className="w-5 h-5" />,
      command: '"Olá XPTO"',
      description: 'Inicia a conversa com o assistente'
    },
    {
      icon: <Search className="w-5 h-5" />,
      command: '"Procurar relatórios"',
      description: 'Busca por documentos específicos'
    },
    {
      icon: <Filter className="w-5 h-5" />,
      command: '"Mostrar projetos do setor de vendas"',
      description: 'Filtra por departamento'
    },
    {
      icon: <Filter className="w-5 h-5" />,
      command: '"Listar tarefas de alta prioridade"',
      description: 'Filtra por prioridade'
    },
    {
      icon: <RotateCcw className="w-5 h-5" />,
      command: '"Limpar resultados"',
      description: 'Limpa a busca atual'
    }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">
        <div className="bg-gradient-to-r from-purple-500 to-blue-600 text-white p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <HelpCircle className="w-6 h-6" />
              <h2 className="text-xl font-bold">Como usar o Assistente XPTO</h2>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:text-gray-200 text-2xl font-bold"
            >
              ×
            </button>
          </div>
        </div>
        
        <div className="p-6">
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Comandos Disponíveis</h3>
            <div className="space-y-4">
              {commands.map((item, index) => (
                <div key={index} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                  <div className="text-blue-500 mt-1">
                    {item.icon}
                  </div>
                  <div>
                    <code className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm font-mono">
                      {item.command}
                    </code>
                    <p className="text-gray-600 mt-1 text-sm">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Departamentos Disponíveis</h3>
            <div className="flex flex-wrap gap-2">
              {['Vendas', 'Marketing', 'Recursos Humanos', 'Tecnologia', 'Financeiro', 'Operações'].map((dept) => (
                <span key={dept} className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                  {dept}
                </span>
              ))}
            </div>
          </div>
          
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-blue-800 text-sm">
              <strong>Dica:</strong> Fale de forma natural! O assistente entende comandos em português e 
              pode combinar filtros. Por exemplo: "Buscar relatórios de vendas com alta prioridade".
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};