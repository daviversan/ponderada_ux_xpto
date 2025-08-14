import React, { useState, useEffect } from 'react';
import { useSpeechRecognition } from './hooks/useSpeechRecognition';
import { useSpeechSynthesis } from './hooks/useSpeechSynthesis';
import { processVoiceCommand, generateDetailedResponse } from './utils/nlpProcessor';
import { searchData } from './utils/mockData';
import { VoiceVisualizer } from './components/VoiceVisualizer';
import { CommandSuggestions } from './components/CommandSuggestions';
import { SearchResults } from './components/SearchResults';
import { ConversationHistory } from './components/ConversationHistory';
import { HelpPanel } from './components/HelpPanel';
import { SearchResult, ConversationStep } from './types';
import { Bot, History, HelpCircle, AlertCircle, Sparkles } from 'lucide-react';

function App() {
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [conversation, setConversation] = useState<ConversationStep[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [showCommands, setShowCommands] = useState(true);
  const [currentFilters, setCurrentFilters] = useState<Record<string, string>>({});

  const { transcript, isListening, startListening, stopListening, resetTranscript, isSupported: speechSupported } = useSpeechRecognition();
  const { speak, isSpeaking } = useSpeechSynthesis();

  const handleVoiceCommand = async (command: string) => {
    const processedCommand = processVoiceCommand(command);
    let results: SearchResult[] = [];

    if (processedCommand.intent === 'clear') {
      setSearchResults([]);
      setCurrentFilters({});
      setShowResults(false);
      setShowCommands(true);
    } else if (processedCommand.intent === 'search' || processedCommand.intent === 'filter') {
      results = searchData(processedCommand.entities);
      setSearchResults(results);
      setCurrentFilters(processedCommand.entities);
      setShowResults(true);
      setShowCommands(false);
    }

    const response = generateDetailedResponse(
      processedCommand.intent, 
      processedCommand.entities, 
      results,
      command
    );

    const conversationStep: ConversationStep = {
      id: Date.now().toString(),
      userInput: command,
      assistantResponse: response,
      timestamp: new Date(),
      results: results.length > 0 ? results : undefined
    };

    setConversation(prev => [...prev, conversationStep]);
    
    await speak(response);
  };

  const handleCommandClick = async (command: string) => {
    await handleVoiceCommand(command);
  };

  const handleToggleListening = () => {
    if (isListening) {
      stopListening();
    } else {
      resetTranscript();
      startListening();
    }
  };

  useEffect(() => {
    if (transcript && !isListening) {
      handleVoiceCommand(transcript);
      resetTranscript();
    }
  }, [transcript, isListening]);

  if (!speechSupported) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-xl shadow-lg text-center max-w-md">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-800 mb-2">Navegador não suportado</h2>
          <p className="text-gray-600">
            Seu navegador não suporta reconhecimento de voz. Por favor, use Chrome, Edge ou Safari mais recentes.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-2 rounded-lg">
                <Bot className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Assistente XPTO</h1>
                <p className="text-gray-600 text-sm">Interface de Voz Inteligente</p>
              </div>
              <Sparkles className="w-6 h-6 text-yellow-500 animate-pulse" />
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowCommands(!showCommands)}
                className={`p-2 rounded-lg transition-colors ${showCommands ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'}`}
                title="Comandos"
              >
                <Bot className="w-5 h-5" />
              </button>
              
              <button
                onClick={() => setShowHistory(!showHistory)}
                className={`p-2 rounded-lg transition-colors ${showHistory ? 'bg-green-100 text-green-600' : 'text-gray-600 hover:bg-gray-100'}`}
                title="Histórico"
              >
                <History className="w-5 h-5" />
              </button>
              
              <button
                onClick={() => setShowHelp(true)}
                className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
                title="Ajuda"
              >
                <HelpCircle className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Voice Interface */}
        <div className="text-center mb-8" id="voice-interface">
          <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md mx-auto">
            <VoiceVisualizer
              isListening={isListening}
              isSpeaking={isSpeaking}
              onToggleListening={handleToggleListening}
            />
            
            {transcript && (
              <div className="mt-6 p-3 bg-blue-50 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Você disse:</p>
                <p className="text-blue-800 font-medium">"{transcript}"</p>
              </div>
            )}

            {Object.keys(currentFilters).length > 0 && (
              <div className="mt-4 p-3 bg-green-50 rounded-lg">
                <p className="text-sm text-gray-600 mb-2">Filtros ativos:</p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {Object.entries(currentFilters).map(([key, value]) => (
                    <span key={key} className="px-2 py-1 bg-green-200 text-green-800 rounded text-xs">
                      {key}: {value}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Command Suggestions */}
        {showCommands && (
          <CommandSuggestions 
            onCommandClick={handleCommandClick}
            isListening={isListening}
            isSpeaking={isSpeaking}
          />
        )}

        {/* Results */}
        <SearchResults results={searchResults} isVisible={showResults} />
        
        {/* Conversation History */}
        <ConversationHistory conversation={conversation} isVisible={showHistory} />
      </main>

      {/* Help Modal */}
      <HelpPanel isVisible={showHelp} onClose={() => setShowHelp(false)} />

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 py-8 text-center">
          <div className="text-gray-600">
            <p className="mb-2">Assistente Virtual XPTO - Interface de Voz</p>
            <p className="text-sm">Desenvolvido para facilitar o acesso às informações da empresa</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;