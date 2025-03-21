import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// import Library from './pages/library.tsx'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

