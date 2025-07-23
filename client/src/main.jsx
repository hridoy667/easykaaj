import { StrictMode, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import './index.css'

export function Root() {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.getRegistrations().then(registrations => {
        for (const registration of registrations) {
          registration.unregister()
        }
      })
    }
  }, [])

  return (
    <StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </StrictMode>
  )
}

createRoot(document.getElementById('root')).render(<Root />)
