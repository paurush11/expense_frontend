const ChatContent = ({ children }: { children: React.ReactNode }) => {
    return (
        <div>
            <div className="flex h-10 w-10">
                {children}
                <div id="chat-root"></div>
                <div id="chat-widget-container"></div>
            </div>
        </div>
    )
}

const ChatProvider = ({ children }: { children: React.ReactNode }) => {
    return (
        <ChatContent >
            {children}
        </ChatContent>
    )
}

export default ChatProvider