import { useState, useRef, useEffect } from 'react';
import './App.css';
import { sendMessage } from './api/chat';
import type { ChatMessage } from './api/chat';
import { ChatHeader } from './components/ChatHeader';
import { ChatHistory } from './components/ChatHistory';
import { ErrorBanner } from './components/ErrorBanner';
import { InputBar } from './components/InputBar';
import { CommonPrompts } from './components/CommonPrompts';

const STORAGE_KEY = 'kazinvest_chat_history';

// Интерфейс для Web Speech API
interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
}

interface SpeechRecognitionErrorEvent extends Event {
  error: string;
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start(): void;
  stop(): void;
  onresult: ((event: SpeechRecognitionEvent) => void) | null;
  onerror: ((event: SpeechRecognitionErrorEvent) => void) | null;
  onend: (() => void) | null;
}

declare global {
  interface Window {
    SpeechRecognition: new () => SpeechRecognition;
    webkitSpeechRecognition: new () => SpeechRecognition;
  }
}

function App() {
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [history, setHistory] = useState<ChatMessage[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  });
  const [pendingMessage, setPendingMessage] = useState<string | undefined>();
  
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  // Persist history to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
  }, [history]);

  const handleSubmit = async () => {
    if (!message.trim()) return;

    const userMessage = message.trim();
    setMessage('');
    setPendingMessage(userMessage);
    setIsLoading(true);
    setError('');

    try {
      const reply = await sendMessage(userMessage, history);
      
      // Update history with user message and reply
      setHistory(prev => {
        const updated = [
          ...prev,
          { role: 'user' as const, content: userMessage },
          { role: 'assistant' as const, content: reply },
        ];
        return updated.slice(-10); // Keep last 5 pairs
      });
    } catch (err) {
      setError('Ошибка при отправке сообщения. Проверьте подключение к серверу.');
      console.error(err);
    } finally {
      setIsLoading(false);
      setPendingMessage(undefined);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !isLoading) {
      handleSubmit();
    }
  };

  const startListening = () => {
    const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (!SpeechRecognitionAPI) {
      setError('Ваш браузер не поддерживает голосовой ввод');
      return;
    }

    if (isListening && recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
      return;
    }

    const recognition = new SpeechRecognitionAPI();
    recognitionRef.current = recognition;
    
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'ru-RU';

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const transcript = event.results[0][0].transcript;
      setMessage(prev => prev + (prev ? ' ' : '') + transcript);
    };

    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      console.error('Speech recognition error:', event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
    setIsListening(true);
  };

  const hasMessages = history.length > 0 || !!pendingMessage;

  return (
    <div className="container">
      <ChatHeader showPromptHint={!hasMessages} />

      <ChatHistory 
        messages={history} 
        isLoading={isLoading} 
        pendingMessage={pendingMessage} 
      />
      <ErrorBanner message={error} />

      {!hasMessages && <CommonPrompts onSelect={(text) => setMessage(text)} />}

      <InputBar
        message={message}
        isLoading={isLoading}
        isListening={isListening}
        onChange={setMessage}
        onSubmit={handleSubmit}
        onMicToggle={startListening}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
}

export default App;
