const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';
const CHAT_URL = `${API_BASE.replace(/\/$/, '')}/chat`;

export async function sendMessage(message: string): Promise<string> {
  const res = await fetch(CHAT_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ message }),
  });

  if (!res.ok) {
    throw new Error('Failed to get response');
  }

  const data = await res.json();
  if (!data?.reply) {
    throw new Error('Empty response');
  }

  return data.reply as string;
}
