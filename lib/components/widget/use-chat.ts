import { type JSX, createSignal } from 'solid-js';

import { generateId } from '../../libs/generate-id';
import { UUID } from '../../libs/uuid';
import { type Message, sendMessage } from './api';

export function useChat() {
  const [chatId] = createSignal(UUID());
  const [isLoading, setIsLoading] = createSignal(false);
  const [messages, setMessages] = createSignal<Message[]>([]);
  const [input, setInput] = createSignal('');

  const handleInputChange: JSX.EventHandler<HTMLInputElement, InputEvent> = (
    event,
  ) => {
    setInput(event.currentTarget.value);
  };

  const handleSubmit = async (e: Event) => {
    try {
      e.preventDefault();
      const value = input().trim();
      if (!value) return;

      const userMessage: Message = {
        id: generateId(),
        role: 'user',
        content: value,
      };

      const newMessages = [...messages(), userMessage];

      setMessages(newMessages);
      setInput('');

      setIsLoading(true);

      const aiResponse = await sendMessage(newMessages.slice(1), chatId());
      setMessages((prev) => [...prev, aiResponse]);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    setMessages,
  };
}
