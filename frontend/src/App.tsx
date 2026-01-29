import { useState, useRef } from 'react';
import './App.css';
import { sendMessage } from './api/chat';
import { ChatHeader } from './components/ChatHeader';
import { ResponseCard } from './components/ResponseCard';
import { ErrorBanner } from './components/ErrorBanner';
import { InputBar } from './components/InputBar';

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
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isListening, setIsListening] = useState(false);
  
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  const handleSubmit = async () => {
    if (!message.trim()) return;

    setIsLoading(true);
    setError('');
    setResponse('');

    try {
      const reply = await sendMessage(message);
      setResponse(reply);
      setMessage('');
    } catch (err) {
      setError('Ошибка при отправке сообщения. Проверьте подключение к серверу.');
      console.error(err);
    } finally {
      setIsLoading(false);
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

  return (
    <div className="container">
      <ChatHeader />

      <ResponseCard text={response} />
      <ErrorBanner message={error} />

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
