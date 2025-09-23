import { useState } from 'react';
import { sendMessage, type ChatResponse } from '../chat-service';

export default function SimpleChat() {
  const [input, setInput] = useState('');
  const [responses, setResponses] = useState<string[]>([]);

  const handleSend = async () => {
    try {
      const result: ChatResponse = await sendMessage(input);
      console.log('result: ', result)
      setResponses(prev => [...prev, `You: ${input}`, `AI: ${result.message}`]);
      setInput('');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Simple Chat</h2>
      <div>
        {responses.map((r, i) => <div key={i}>{r}</div>)}
      </div>
      <input
        type="text"
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder="Type your message"
      />
      <button onClick={handleSend}>Send</button>
    </div>
  );
}