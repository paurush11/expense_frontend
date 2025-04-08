import './index.css'
import { ChatLayout } from './components/ChatLayout'
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComment } from '@fortawesome/free-solid-svg-icons'
import { createPortal } from 'react-dom'

function App() {
  const [theme, setTheme] = useState<'theme-1' | 'theme-2'>('theme-1')
  const [isChatOpen, setIsChatOpen] = useState(false)

  const handleSendMessage = (message: string) => {
    console.log('Message sent:', message)
  }

  const chatContainer = document.getElementById('chat-widget-container')

  const renderChatPortal = () => {
    return (
      <div className={`bottom-6 right-6 fixed h-[500px] w-[400px] justify-end z-50 ${theme}`}>
        <ChatLayout
          setTheme={setTheme}
          theme={theme}
          userId="dev-user-123"
          supportId="support-agent-456"
          onSendMessage={handleSendMessage}
          setIsChatOpen={setIsChatOpen}
        />
      </div>
    )
  }

  return (
    <div className={theme}>
      {isChatOpen && chatContainer && createPortal(renderChatPortal(), chatContainer)}
      <div className="fixed bottom-6 right-6 z-50">
        {!isChatOpen && (
          <button
            onClick={() => setIsChatOpen(true)}
          >
            <FontAwesomeIcon icon={faComment} className="w-4 h-4 text-white bg-[hsl(var(--highlight-foreground))] rounded-full p-6 " />
          </button>
        )}
      </div>
    </div>
  )
}

export default App