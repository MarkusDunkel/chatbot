export interface ChatRequest {
  message: string;
}

export interface ChatResponse {
  message: string;
}

export async function sendMessage(message: string): Promise<ChatResponse> {
  const res = await fetch('http://localhost:8080/api/chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ message }),
  });

  if (!res.ok) {
    throw new Error('Failed to send message');
  }

  return res.json();
}
