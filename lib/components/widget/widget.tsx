// import './widget.css';

import { Bot, Loader2, Send, User, X } from 'lucide-solid';
import { For, Show, createEffect, createSignal } from 'solid-js';

import { cn } from '../../libs/cn';
import { generateId } from '../../libs/generate-id';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { useChat } from './use-chat';

export function FlygensWidget() {
  const [isOpen, setIsOpen] = createSignal(false);
  let messagesEndRef: HTMLDivElement | undefined;

  const {
    messages,
    setMessages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
  } = useChat();

  const toggleChat = () => {
    setIsOpen(!isOpen());
    if (messages().length === 0) {
      setMessages([
        {
          id: generateId(),
          role: 'assistant',
          content: '¡Hola! Soy Flygens AI. ¿En qué puedo ayudarte hoy?',
        },
      ]);
    }
  };

  const startNewChat = () => {
    setMessages([
      {
        id: generateId(),
        role: 'assistant',
        content: '¡Hola! Soy Flygens AI. ¿En qué puedo ayudarte hoy?',
      },
    ]);
  };

  createEffect(() => {
    messages();
    isLoading();

    if (messagesEndRef) {
      messagesEndRef.scrollIntoView({ behavior: 'smooth' });
    }
  });

  return (
    <div class="fixed bottom-4 right-4 z-50 flex flex-col items-end">
      {/* Chat Panel */}
      <div
        class={cn(
          'mb-2 flex w-full flex-col overflow-hidden rounded-xl border bg-white shadow-lg transition-all duration-300 ease-in-out sm:w-[420px]',
          isOpen() ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0',
        )}
      >
        {/* Chat Header */}
        <div class="flex items-center justify-between border-b bg-white p-4">
          <div class="flex items-center gap-2">
            <div class="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
              <Bot class="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 class="font-medium">Flygens AI</h3>
              <p class="text-xs text-muted-foreground">Asistente virtual</p>
            </div>
          </div>
          <div class="flex gap-2">
            <Show when={messages().length > 0}>
              <Button
                variant="ghost"
                size="sm"
                onClick={startNewChat}
                class="h-8 text-xs"
              >
                Nueva conversación
              </Button>
            </Show>
            <Button
              variant="ghost"
              size="icon"
              class="h-8 w-8 rounded-full"
              onClick={toggleChat}
            >
              <X class="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Chat Messages */}
        <div
          class="flex-1 overflow-y-auto p-4"
          style={{ 'max-height': '450px' }}
        >
          <div class="space-y-4">
            <Show
              when={messages().length === 0}
              fallback={
                <For each={messages()}>
                  {(message) => (
                    <div
                      class={cn(
                        'flex gap-3',
                        message.role === 'user'
                          ? 'justify-end'
                          : 'justify-start',
                      )}
                    >
                      <Show when={message.role !== 'user'}>
                        <div class="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
                          <Bot class="h-4 w-4 text-primary" />
                        </div>
                      </Show>
                      <div
                        class={cn(
                          'flex max-w-[75%] flex-col rounded-xl px-4 py-3 text-sm',
                          message.role === 'user'
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted text-foreground',
                        )}
                      >
                        {message.content}
                      </div>
                      <Show when={message.role === 'user'}>
                        <div class="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-zinc-700">
                          <User class="h-4 w-4 text-zinc-100" />
                        </div>
                      </Show>
                    </div>
                  )}
                </For>
              }
            >
              <div class="flex h-32 items-center justify-center text-center text-sm text-muted-foreground">
                <p>Inicia una conversación con Flygens AI</p>
              </div>
            </Show>

            <Show when={isLoading()}>
              <div class="flex items-center gap-3">
                <div class="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
                  <Bot class="h-4 w-4 text-primary" />
                </div>
                <div class="flex max-w-[75%] items-center gap-2 rounded-xl bg-muted px-4 py-3 text-sm">
                  <Loader2 class="h-3 w-3 animate-spin" />
                  <p>Escribiendo...</p>
                </div>
              </div>
            </Show>

            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Chat Input */}
        <form
          onSubmit={handleSubmit}
          class="flex items-center gap-2 border-t p-4"
        >
          <Input
            placeholder="Escribe tu mensaje..."
            value={input()}
            onInput={handleInputChange}
            class="flex-1"
            disabled={isLoading()}
          />
          <Button
            type="submit"
            size="icon"
            class="h-10 w-10 rounded-full"
            disabled={isLoading() || !input().trim()}
          >
            <Send class="h-4 w-4" />
          </Button>
        </form>
      </div>

      {/* Chat Button */}
      <Button
        onClick={toggleChat}
        class="h-14 w-14 rounded-full shadow-lg relative"
        aria-label="Abrir chat"
      >
        <Show when={!isOpen() && messages().length > 0}>
          <span class="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] text-white">
            {messages().filter((m) => m.role === 'assistant').length}
          </span>
        </Show>
        <Bot class="h-7 w-7" />
      </Button>
    </div>
  );
}
