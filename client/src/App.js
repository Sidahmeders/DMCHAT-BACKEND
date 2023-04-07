import { Routes, Route, Navigate } from 'react-router-dom'
import { Home, Chat, Calendar } from './pages'
import TopNavigation from './components/TopNavigation/TopNavigation'

import { ChatState } from './context/ChatProvider'

import './App.css'

const App = () => {
  const { user } = ChatState()

  return (
    <div className="App">
      {user && <TopNavigation />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chats" element={<Chat />} />
        <Route path="/calendar" element={<Calendar />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  )
}

export default App
