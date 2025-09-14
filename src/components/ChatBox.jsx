import { useState, useRef, useEffect } from 'react'
import { Send } from 'lucide-react'
import './ChatBox.css'

const ChatBox = ({ messages, onNewMessage, hasDocuments }) => {
  const [inputValue, setInputValue] = useState('')
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (inputValue.trim()) {
      const newMessage = {
        id: Date.now(),
        text: inputValue.trim(),
        sender: 'user',
        timestamp: new Date().toLocaleTimeString()
      }
      onNewMessage(newMessage)
      setInputValue('')
      
      // Simulate a bot response (you can replace this with actual AI integration)
      setTimeout(() => {
        let responseText = "I received your message. "
        if (hasDocuments) {
          responseText += "I can see you have uploaded documents. Once integrated with an AI service, I'll be able to analyze your PDFs and answer questions about their content."
        } else {
          responseText += "Please upload a PDF document first so I can help you analyze it and answer questions about its content."
        }
        
        const botResponse = {
          id: Date.now() + 1,
          text: responseText,
          sender: 'bot',
          timestamp: new Date().toLocaleTimeString()
        }
        onNewMessage(botResponse)
      }, 1000)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  return (
    <div className="chatbox">
      {messages.length > 0 && (
        <div className="messages-container">
          {messages.map((message) => (
            <div key={message.id} className={`message ${message.sender}`}>
              <div className="message-content">
                <p>{message.text}</p>
                <span className="timestamp">{message.timestamp}</span>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      )}
      
      <form className="input-form" onSubmit={handleSubmit}>
        <div className="input-container">
          <textarea
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={hasDocuments ? "Ask me about your uploaded documents..." : "Upload a PDF first, then ask questions about it..."}
            rows="1"
            className="message-input"
          />
          <button type="submit" className="send-button" disabled={!inputValue.trim()}>
            <Send size={20} />
          </button>
        </div>
      </form>
    </div>
  )
}

export default ChatBox
