export function ChatHeader() {
  return (
    <>
      <div className="chat-icon">
        <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
          <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
        </svg>
      </div>
      <h1 className="greeting">Hi there!</h1>
      <h2 className="question">What would you like to know?</h2>
      <p className="subtitle">
        Use one of the most common prompts below
        <br />
        or ask your own question
      </p>
    </>
  );
}
