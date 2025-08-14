import React from 'react';
import { SearchResult } from '../types';
import { FileText, Calendar, User, AlertCircle, CheckCircle, Clock } from 'lucide-react';

interface SearchResultsProps {
  results: SearchResult[];
  isVisible: boolean;
}

export const SearchResults: React.FC<SearchResultsProps> = ({ results, isVisible }) => {
  if (!isVisible || results.length === 0) return null;

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'alta': return 'text-red-600 bg-red-50';
      case 'média': return 'text-yellow-600 bg-yellow-50';
      case 'baixa': return 'text-green-600 bg-green-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'ativo': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'pendente': return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'inativo': return <AlertCircle className="w-4 h-4 text-red-500" />;
      default: return <FileText className="w-4 h-4 text-gray-500" />;
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto mt-8 animate-fade-in">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6">
          <h2 className="text-xl font-bold">Resultados da Busca</h2>
          <p className="text-blue-100 mt-1">{results.length} resultado(s) encontrado(s)</p>
        </div>
        
        <div className="divide-y divide-gray-200 max-h-96 overflow-y-auto">
          {results.map((result) => (
            <div key={result.id} className="p-6 hover:bg-gray-50 transition-colors duration-200">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <FileText className="w-5 h-5 text-blue-500" />
                    <h3 className="font-semibold text-gray-900">{result.title}</h3>
                    {getStatusIcon(result.status)}
                  </div>
                  
                  <p className="text-gray-600 mb-3">{result.description}</p>
                  
                  <div className="flex flex-wrap items-center gap-3 text-sm">
                    <div className="flex items-center space-x-1">
                      <User className="w-4 h-4 text-gray-400" />
                      <span className="capitalize font-medium text-gray-700">{result.department}</span>
                    </div>
                    
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600">{new Date(result.createdAt).toLocaleDateString('pt-BR')}</span>
                    </div>
                    
                    <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${getPriorityColor(result.priority)}`}>
                      {result.priority}
                    </span>
                    
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 capitalize">
                      {result.category}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};