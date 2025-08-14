import React from 'react';
import { ConversationStep } from '../types';
import { User, Bot, Clock } from 'lucide-react';

interface ConversationHistoryProps {
  conversation: ConversationStep[];
  isVisible: boolean;
}

export const ConversationHistory: React.FC<ConversationHistoryProps> = ({ 
  conversation, 
  isVisible 
}) => {
  if (!isVisible || conversation.length === 0) return null;

  return (
    <div className="w-full max-w-4xl mx-auto mt-8">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-green-500 to-teal-600 text-white p-4">
          <h3 className="text-lg font-semibold">Histórico da Conversa</h3>
        </div>
        
        <div className="max-h-64 overflow-y-auto p-4 space-y-4">
          {conversation.map((step) => (
            <div key={step.id} className="space-y-2">
              {/* Mensagem do usuário */}
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <User className="w-6 h-6 text-blue-500" />
                </div>
                <div className="flex-1 bg-blue-50 rounded-lg p-3">
                  <p className="text-gray-800">{step.userInput}</p>
                  <div className="flex items-center space-x-1 mt-1 text-xs text-gray-500">
                    <Clock className="w-3 h-3" />
                    <span>{step.timestamp.toLocaleTimeString('pt-BR')}</span>
                  </div>
                </div>
              </div>

              {/* Resposta do assistente */}
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <Bot className="w-6 h-6 text-green-500" />
                </div>
                <div className="flex-1 bg-green-50 rounded-lg p-3">
                  <p className="text-gray-800">{step.assistantResponse}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};