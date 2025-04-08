import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane, faTimes, faSun, faMoon, faMicrophone, } from '@fortawesome/free-solid-svg-icons'
import { VoiceWaves } from './VoiceWaves'

interface Message {
    id: string
    content: string
    sender: 'user' | 'support'
    timestamp: Date
}

interface ChatLayoutProps {
    theme: 'theme-1' | 'theme-2'
    userId: string
    supportId: string
    onSendMessage: (message: string) => void
    setTheme: (theme: 'theme-1' | 'theme-2') => void
    setIsChatOpen: (isChatOpen: boolean) => void
}

export const ChatLayout = ({ theme, userId, supportId, onSendMessage, setTheme, setIsChatOpen }: ChatLayoutProps) => {
    const [messages, setMessages] = useState<Message[]>([])
    const [newMessage, setNewMessage] = useState('')
    const [isVoiceMode, setIsVoiceMode] = useState(false)
    const [isRecording, setIsRecording] = useState(false)
    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault()
        if (newMessage.trim()) {
            setMessages([...messages, {
                id: new Date().toISOString(),
                content: newMessage,
                sender: 'user',
                timestamp: new Date()
            }])
            onSendMessage(newMessage)
            setNewMessage('')
            console.log('Message sent:', newMessage, userId, supportId)
        }
    }

    const formatTime = (date: Date) => {
        return date.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        })
    }

    const renderAgent = () => {
        return (
            <div className="flex flex-col items-center justify-center h-full gap-4">
                <button className="p-2 rounded-full hover:bg-[hsl(var(--muted))] transition-colors" onClick={() => setIsVoiceMode(!isVoiceMode)}>
                    {isVoiceMode ? (
                        <VoiceWaves isActive={isVoiceMode} theme={theme} />
                    ) : (
                        <img src="/avatar.png" alt="Expense AI" className="w-50 h-50 rounded-full hover:scale-105 transition-all duration-300 hover:shadow-lg " />
                    )}
                </button>
                <h2 className="text-[hsl(var(--foreground))] font-semibold">Bharvis</h2>
                <p className="text-[hsl(var(--muted-foreground))] text-sm px-6 justify-center items-center text-center">Hi, I'm Expense AI, ask me anything about your expenses and finances</p>
            </div>
        )
    }


    return (
        <div className={`chat-container flex flex-col`}>

            {/* Chat Header */}
            <div className="bg-[hsl(var(--card))] p-4 border-b border-[hsl(var(--border))] flex justify-between items-center">
                <div className="flex flex-col">
                    <h2 className="text-[hsl(var(--foreground))] font-semibold">Expense AI</h2>
                </div>
                <div className="flex gap-4 justify-end ml-auto">
                    <div className="flex gap-4">
                        <button
                            onClick={() => setTheme(theme === 'theme-1' ? 'theme-2' : 'theme-1')}
                            className="p-2 rounded-full hover:bg-[hsl(var(--muted))] transition-colors"
                        >
                            {theme === 'theme-1' ? <FontAwesomeIcon icon={faSun} className="h-5 w-5 text-black" /> : <FontAwesomeIcon icon={faMoon} className="h-5 w-5 text-white" />}
                        </button>

                        <button
                            onClick={() => setIsChatOpen(false)}
                            className="p-2 rounded-full hover:bg-[hsl(var(--muted))] transition-colors"
                        >
                            <FontAwesomeIcon icon={faTimes} className={`h-5 w-5 ${theme === 'theme-1' ? 'text-black' : 'text-white'}`} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Messages Container */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                    <div
                        key={message.id}
                        className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                        <div
                            className={`max-w-[70%] p-3 ${message.sender === 'user' ? 'message-sent' : 'message-received'
                                }`}
                        >
                            <p>{message.content}</p>
                            <p className="text-xs mt-1 opacity-70">{formatTime(message.timestamp)}</p>
                        </div>
                    </div>
                ))}
                {messages.length === 0 && renderAgent()}
            </div>

            {/* Message Input */}
            <form onSubmit={handleSendMessage} className="p-4 bg-[hsl(var(--card))] border-t border-[hsl(var(--border))]">
                <div className="flex items-center space-x-2">
                    <button
                        type="button"
                        onClick={() => setIsRecording(!isRecording)}
                        className={`p-2 rounded-full transition-colors ${isRecording
                            ? 'bg-[hsl(var(--destructive))] text-[hsl(var(--destructive-foreground))]'
                            : 'text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]'
                            }`}
                    >
                        <FontAwesomeIcon icon={faMicrophone} className="h-5 w-5" />
                    </button>
                    <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type your message..."
                        className="chat-input flex-1 p-2 rounded-lg border"
                    />
                    <button
                        type="submit"
                        disabled={!newMessage.trim()}
                        className="p-2 text-[hsl(var(--primary))] hover:text-[hsl(var(--primary-foreground))] disabled:opacity-50 transition-colors"
                    >
                        <FontAwesomeIcon icon={faPaperPlane} className="h-5 w-5" />
                    </button>
                </div>
            </form>
        </div>
    )
} 