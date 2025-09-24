import { FormEvent, KeyboardEvent, useEffect, useRef, useState } from 'react'
import { sendMessage, type ChatResponse } from '../chat-service'
import './SimpleChat.scss'

type MessageAuthor = 'user' | 'assistant'

interface Message {
  id: string
  author: MessageAuthor
  text: string
}

function createId() {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`
}

export default function SimpleChat() {
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<Message[]>([])
  const [isSending, setIsSending] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const listRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTo({
        top: listRef.current.scrollHeight,
        behavior: 'smooth',
      })
    }
  }, [messages.length])

  const statusLabel = isSending ? 'Sending…' : error ? 'Check connection' : 'Online'
  const statusClass = isSending ? 'chat__status--busy' : error ? 'chat__status--error' : 'chat__status--online'

  const submitMessage = async () => {
    const trimmed = input.trim()
    if (!trimmed || isSending) return

    const userMessage: Message = {
      id: createId(),
      author: 'user',
      text: trimmed,
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setError(null)
    setIsSending(true)

    try {
      const result: ChatResponse = await sendMessage(trimmed)
      const assistantMessage: Message = {
        id: createId(),
        author: 'assistant',
        text: result.message,
      }
      setMessages(prev => [...prev, assistantMessage])
    } catch (err) {
      console.error(err)
      setError('We couldn’t send that message. Try again in a moment.')
    } finally {
      setIsSending(false)
    }
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    await submitMessage()
  }

  const handleKeyDown = async (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      await submitMessage()
    }
  }

  return (
    <div className="chat">
      <header className="chat__header">
        <div className="chat__title">Simple Chat</div>
        <div className={`chat__status ${statusClass}`} aria-live="polite">
          <span className="chat__status-indicator" aria-hidden />
          {statusLabel}
        </div>
      </header>

      <div className="chat__panel" ref={listRef} aria-live="polite">
        {messages.length === 0 ? (
          <div className="chat__placeholder">
            Ask a question or share an idea to start the conversation.
          </div>
        ) : (
          messages.map(message => (
            <article
              key={message.id}
              className={`chat__message chat__message--${message.author}`}
            >
              <span className="chat__sender">
                {message.author === 'user' ? 'You' : 'AI'}
              </span>
              <p className="chat__content">{message.text}</p>
            </article>
          ))
        )}
      </div>

      {error && <div className="chat__error">{error}</div>}

      <form className="chat__composer" onSubmit={handleSubmit}>
        <label htmlFor="chat-input" className="sr-only">
          Message Simple Chat
        </label>
        <textarea
          id="chat-input"
          className="chat__input"
          placeholder="Write a message and press Enter to send"
          value={input}
          onChange={event => setInput(event.target.value)}
          onKeyDown={handleKeyDown}
          rows={1}
          autoComplete="off"
          spellCheck
          disabled={isSending}
        />
        <button
          type="submit"
          className="chat__button"
          disabled={isSending || !input.trim()}
        >
          {isSending ? 'Sending…' : 'Send'}
        </button>
      </form>
    </div>
  )
}
