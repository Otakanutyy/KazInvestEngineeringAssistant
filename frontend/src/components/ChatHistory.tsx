import type { ChatMessage } from '../api/chat';

interface ChatHistoryProps {
  messages: ChatMessage[];
  isLoading: boolean;
  pendingMessage?: string;
}

export function ChatHistory({ messages, isLoading, pendingMessage }: ChatHistoryProps) {
  if (messages.length === 0 && !pendingMessage) return null;

  return (
    <div className="chat-history">
      {messages.map((msg, idx) => (
        <div
          key={idx}
          className={msg.role === 'user' ? 'chat-message user' : 'chat-message assistant'}
        >
          <span className="chat-role">{msg.role === 'user' ? 'You' : 'AI'}</span>
          <p>{msg.content}</p>
        </div>
      ))}
      {pendingMessage && (
        <div className="chat-message user">
          <span className="chat-role">You</span>
          <p>{pendingMessage}</p>
        </div>
      )}
      {isLoading && (
        <div className="chat-message assistant loading">
          <span className="chat-role">AI</span>
          <p className="typing-indicator">Thinking...</p>
        </div>
      )}
    </div>
  );
}
