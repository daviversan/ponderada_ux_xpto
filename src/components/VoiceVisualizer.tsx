import React from 'react';
import { Mic, MicOff, Volume2 } from 'lucide-react';

interface VoiceVisualizerProps {
  isListening: boolean;
  isSpeaking: boolean;
  onToggleListening: () => void;
}

export const VoiceVisualizer: React.FC<VoiceVisualizerProps> = ({
  isListening,
  isSpeaking,
  onToggleListening
}) => {
  return (
    <div className="relative flex flex-col items-center justify-center">
      {/* Ondas sonoras animadas */}
      <div className="relative">
        {(isListening || isSpeaking) && (
          <>
            <div className="absolute inset-0 rounded-full border-2 border-blue-400 animate-ping opacity-30"></div>
            <div className="absolute inset-0 rounded-full border-2 border-blue-400 animate-pulse opacity-50" style={{ animationDelay: '0.5s' }}></div>
            <div className="absolute inset-0 rounded-full border border-blue-300 animate-pulse opacity-70" style={{ animationDelay: '1s' }}></div>
          </>
        )}
        
        {/* Botão principal */}
        <button
          onClick={onToggleListening}
          disabled={isSpeaking}
          className={`relative z-10 w-20 h-20 rounded-full flex items-center justify-center text-white text-2xl transition-all duration-300 shadow-lg ${
            isListening
              ? 'bg-red-500 hover:bg-red-600 shadow-red-200'
              : isSpeaking
              ? 'bg-green-500 cursor-not-allowed shadow-green-200'
              : 'bg-blue-500 hover:bg-blue-600 shadow-blue-200 hover:shadow-xl transform hover:scale-105'
          }`}
        >
          {isSpeaking ? (
            <Volume2 className="w-8 h-8 animate-pulse" />
          ) : isListening ? (
            <div className="flex space-x-1">
              <div className="w-1 bg-white rounded-full animate-bounce" style={{ height: '20px', animationDelay: '0ms' }}></div>
              <div className="w-1 bg-white rounded-full animate-bounce" style={{ height: '16px', animationDelay: '150ms' }}></div>
              <div className="w-1 bg-white rounded-full animate-bounce" style={{ height: '20px', animationDelay: '300ms' }}></div>
              <div className="w-1 bg-white rounded-full animate-bounce" style={{ height: '12px', animationDelay: '450ms' }}></div>
            </div>
          ) : (
            <Mic className="w-8 h-8" />
          )}
        </button>
      </div>

      {/* Status text */}
      <div className="mt-4 text-center">
        <p className={`text-sm font-medium transition-colors duration-300 ${
          isListening ? 'text-red-600' : isSpeaking ? 'text-green-600' : 'text-gray-600'
        }`}>
          {isListening ? 'Escutando...' : isSpeaking ? 'Falando...' : 'Toque para falar'}
        </p>
        {!isListening && !isSpeaking && (
          <p className="text-xs text-gray-500 mt-1">
            Diga "Olá XPTO" para começar
          </p>
        )}
      </div>
    </div>
  );
};