import { useState } from 'react'
import ChatBox from './components/ChatBox'
import FileUpload from './components/FileUpload'
import './App.css'

function App() {
  const [messages, setMessages] = useState([])
  const [uploadedFiles, setUploadedFiles] = useState([])

  const handleNewMessage = (message) => {
    setMessages(prev => [...prev, message])
  }

  const handleFileUpload = (fileInfo) => {
    setUploadedFiles(prev => [...prev, fileInfo])
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>Mirage</h1>
        <p>Upload your PDF. We'll annotate.</p>
      </header>
      
      <main className="app-main">
        <div className="unified-interface">
          <FileUpload 
            onFileUpload={handleFileUpload} 
            uploadedFiles={uploadedFiles}
          />
          <ChatBox 
            messages={messages} 
            onNewMessage={handleNewMessage}
            hasDocuments={uploadedFiles.length > 0}
          />
        </div>
      </main>
    </div>
  )
}

export default App
