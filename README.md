# Document Assistant React App

A modern, minimalist React application for uploading PDF documents and chatting with an AI assistant about them.

## Features

- **Clean, Modern UI**: Minimalist design with gradient backgrounds and smooth animations
- **PDF Upload**: Drag-and-drop file upload with Firebase Storage integration
- **Interactive Chat**: Real-time chat interface with message history
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Firebase Integration**: Secure file storage in the cloud

## Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Firebase Configuration
1. Create a new Firebase project at [https://console.firebase.google.com/](https://console.firebase.google.com/)
2. Enable Firebase Storage in your project
3. Get your Firebase configuration from Project Settings
4. Create a `.env` file in the root directory with your Firebase config:

```env
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
VITE_FIREBASE_APP_ID=your-app-id
```

### 3. Run the Development Server
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

## Project Structure

```
src/
├── components/
│   ├── ChatBox.jsx          # Chat interface component
│   ├── ChatBox.css          # Chat styling
│   ├── FileUpload.jsx       # File upload component
│   └── FileUpload.css       # Upload styling
├── firebase/
│   └── config.js            # Firebase configuration
├── App.jsx                  # Main app component
├── App.css                  # Main app styling
├── index.css                # Global styles
└── main.jsx                 # App entry point
```

## Technologies Used

- **React 18** - Modern React with hooks
- **Vite** - Fast build tool and dev server
- **Firebase Storage** - Cloud file storage
- **Lucide React** - Beautiful icons
- **CSS3** - Modern styling with gradients and animations

## Usage

1. **Upload PDFs**: Drag and drop PDF files or click to browse
2. **Chat**: Type messages in the chat box to interact with the assistant
3. **File Management**: View uploaded files in the sidebar

## Next Steps

To make this a fully functional document assistant, you could:

1. Integrate with an AI service (OpenAI, Anthropic, etc.) for intelligent responses
2. Add PDF text extraction and processing
3. Implement user authentication
4. Add file management features (delete, rename)
5. Store chat history in a database

## License

MIT License - feel free to use this project as a starting point for your own applications!