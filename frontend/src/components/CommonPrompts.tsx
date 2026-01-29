interface CommonPromptsProps {
  onSelect: (text: string) => void;
}

const PROMPTS: string[] = [
  'Summarize the following text in 2-3 sentences.',
  'Explain like I am 5 years old.',
  'Give me 5 ideas for a blog post about investing.',
  'Compare stocks vs bonds in simple terms.',
  'What are common mistakes new investors make?'
];

export function CommonPrompts({ onSelect }: CommonPromptsProps) {
  return (
    <div style={{ width: '100%', marginTop: 12 }}>
      {PROMPTS.map((p) => (
        <button
          key={p}
          onClick={() => onSelect(p)}
          className="response"
          style={{
            display: 'block',
            width: '100%',
            textAlign: 'left',
            marginBottom: 10,
            cursor: 'pointer',
            padding: '12px 20px',
          }}
        >
          <p style={{ margin: 0, color: '#e2e8f0' }}>{p}</p>
        </button>
      ))}
    </div>
  );
}
