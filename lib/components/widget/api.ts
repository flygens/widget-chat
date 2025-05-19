import { FlygensAgent } from './init';

export type Message = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  // timestamp: string;
};

export async function sendMessage(
  messages: Message[],
  chatId: string,
): Promise<Message> {
  const publicKey = FlygensAgent.instance.getApiKey();

  if (!publicKey) {
    throw new Error('public key es requerido');
  }

  const res = await fetch(`https://api.flygens.com/chat/${chatId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': publicKey,
    },
    body: JSON.stringify({
      messages,
    }),
  });

  if (!res.ok) {
    throw new Error('Ocurrio un error al enviar el mensaje');
  }

  return await res.json();
}
