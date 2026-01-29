interface InputBarProps {
  message: string;
  isLoading: boolean;
  isListening: boolean;
  onChange: (value: string) => void;
  onSubmit: () => void;
  onMicToggle: () => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

export function InputBar({
  message,
  isLoading,
  isListening,
  onChange,
  onSubmit,
  onMicToggle,
  onKeyDown,
}: InputBarProps) {
  return (
    <div className="input-container">
      <button
        className={`mic-button ${isListening ? 'listening' : ''}`}
        onClick={onMicToggle}
        type="button"
        aria-label="Voice input"
      >
        <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
          <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm-1-9c0-.55.45-1 1-1s1 .45 1 1v6c0 .55-.45 1-1 1s-1-.45-1-1V5z" />
          <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z" />
        </svg>
      </button>

      <input
        type="text"
        className="text-input"
        placeholder="Ask whatever you want"
        value={message}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={onKeyDown}
        disabled={isLoading}
      />

      <button
        className="send-button"
        onClick={onSubmit}
        disabled={isLoading || !message.trim()}
        type="button"
        aria-label="Send message"
      >
        {isLoading ? (
          <div className="spinner"></div>
        ) : (
          <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
            <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" />
          </svg>
        )}
      </button>
    </div>
  );
}
