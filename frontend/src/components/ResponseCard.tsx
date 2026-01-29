interface ResponseCardProps {
  text: string;
}

export function ResponseCard({ text }: ResponseCardProps) {
  if (!text) return null;

  return (
    <div className="response">
      <p>{text}</p>
    </div>
  );
}
