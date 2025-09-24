export interface ChatRequest {
  message: string;
}

export interface ChatResponse {
  message: string;
}

const API_BASE_URL = "http://localhost:8080";

// const API_BASE_URL = "https://chatbot-925708659658.europe-west4.run.app";

export async function sendMessage(message: string): Promise<ChatResponse> {
  const res = await fetch(`${API_BASE_URL}/api/chat`, {
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
