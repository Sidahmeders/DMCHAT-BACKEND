import React from 'react'
import ReactDOM from 'react-dom/client'
import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter } from 'react-router-dom'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { TouchBackend } from 'react-dnd-touch-backend'
import App from './App'
import * as serviceWorker from './serviceWorkerRegistration'
import ChatProvider from './context/ChatProvider'

const isTouchDevice = () => 'ontouchstart' in window
const backendForDND = isTouchDevice() ? TouchBackend : HTML5Backend

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <DndProvider backend={backendForDND}>
        <ChatProvider>
          <ChakraProvider>
            <App />
          </ChakraProvider>
        </ChatProvider>
      </DndProvider>
    </BrowserRouter>
  </React.StrictMode>,
)

serviceWorker.register()
