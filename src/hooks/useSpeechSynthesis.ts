import { useState, useCallback } from 'react';

interface SpeechSynthesisResult {
  speak: (text: string) => Promise<void>;
  isSpeaking: boolean;
  cancel: () => void;
  isSupported: boolean;
}

export const useSpeechSynthesis = (): SpeechSynthesisResult => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const isSupported = 'speechSynthesis' in window;

  const speak = useCallback((text: string): Promise<void> => {
    return new Promise((resolve) => {
      if (!isSupported) {
        resolve();
        return;
      }

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'pt-BR';
      utterance.rate = 0.9;
      utterance.pitch = 1;
      utterance.volume = 1;

      utterance.onstart = () => {
        setIsSpeaking(true);
      };

      utterance.onend = () => {
        setIsSpeaking(false);
        resolve();
      };

      utterance.onerror = () => {
        setIsSpeaking(false);
        resolve();
      };

      speechSynthesis.speak(utterance);
    });
  }, [isSupported]);

  const cancel = useCallback(() => {
    if (isSupported) {
      speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  }, [isSupported]);

  return {
    speak,
    isSpeaking,
    cancel,
    isSupported
  };
};